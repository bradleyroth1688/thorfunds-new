#!/usr/bin/env node
// Fetch THOR fund data from Ultimus and add to analyzer data files

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '../../public/data/analyzer');

function httpsRequest(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(d));
      res.on('error', reject);
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function main() {
  // Auth
  const authData = JSON.stringify({ email: 'broth@thoranalytics.com', password: '000b6e14-48a9-46fb-8113-f1d0cc2166ef' });
  const token = (await httpsRequest('https://uauth.ultimusfundsolutions.com/server/api/login', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': authData.length }
  }, authData)).replace(/"/g, '');

  const funds = [
    { id: '1469', ticker: 'THIR', name: 'THOR Income & Return ETF' },
    { id: '1468', ticker: 'THLV', name: 'THOR Low Volatility ETF' },
  ];

  // Load existing data
  const matrixPath = path.join(OUTPUT_DIR, 'securities/returns-matrix.json');
  const lookupPath = path.join(OUTPUT_DIR, 'metadata/ticker-lookup.json');
  const statsPath = path.join(OUTPUT_DIR, 'securities/stats.json');
  
  const matrix = JSON.parse(fs.readFileSync(matrixPath, 'utf8'));
  const lookup = JSON.parse(fs.readFileSync(lookupPath, 'utf8'));
  const stats = JSON.parse(fs.readFileSync(statsPath, 'utf8'));

  for (const fund of funds) {
    console.log(`Fetching ${fund.ticker}...`);
    const raw = await httpsRequest(
      `https://funddata.ultimusfundsolutions.com/funds/${fund.id}/pricing/range/01-01-2020/02-08-2026`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    const data = JSON.parse(raw);
    console.log(`  Got ${data.length} daily prices`);

    // Group by month, take last NAV
    const byMonth = {};
    for (const entry of data) {
      const d = new Date(entry.performanceDate);
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      byMonth[ym] = entry.naV_NoLoad || entry.marketPrice;
    }

    const months = Object.keys(byMonth).sort();
    console.log(`  ${months.length} months: ${months[0]} to ${months[months.length - 1]}`);

    // Compute monthly returns
    const returns = [];
    const returnDates = [];
    for (let i = 1; i < months.length; i++) {
      const prev = byMonth[months[i - 1]];
      const curr = byMonth[months[i]];
      if (prev > 0) {
        returns.push(Math.round(((curr - prev) / prev) * 1e8) / 1e8);
        returnDates.push(months[i]);
      }
    }
    console.log(`  ${returns.length} monthly returns`);

    // Add to returns matrix — align with existing dates
    const aligned = matrix.dates.map(d => {
      const idx = returnDates.indexOf(d);
      return idx >= 0 ? returns[idx] : 0;
    });
    matrix.returns[fund.ticker] = aligned;

    // Add to ticker lookup
    lookup[fund.ticker] = { ticker: fund.ticker, name: fund.name, type: 'etf', sector: 'THOR' };

    // Compute stats
    if (returns.length >= 3) {
      let cum = 1;
      for (const r of returns) cum *= (1 + r);
      const years = returns.length / 12;
      const annReturn = Math.pow(cum, 1 / years) - 1;
      const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
      const variance = returns.reduce((s, r) => s + (r - mean) ** 2, 0) / (returns.length - 1);
      const vol = Math.sqrt(variance) * Math.sqrt(12);
      
      // Max drawdown
      const nav = [100];
      for (const r of returns) nav.push(nav[nav.length - 1] * (1 + r));
      let peak = 100, maxDD = 0;
      for (const v of nav) { peak = Math.max(peak, v); maxDD = Math.min(maxDD, (v - peak) / peak); }

      const rf = 0.045;
      const sharpe = vol > 0 ? (annReturn - rf) / vol : 0;
      let sumSqDown = 0;
      for (const r of returns) { if (r < 0) sumSqDown += r * r; }
      const downDev = Math.sqrt(sumSqDown / returns.length) * Math.sqrt(12);
      const sortino = downDev > 0 ? (annReturn - rf) / downDev : 0;

      const fundStats = {
        ticker: fund.ticker, name: fund.name, type: 'etf', sector: 'THOR',
        annualizedReturn: Math.round(annReturn * 1e6) / 1e6,
        volatility: Math.round(vol * 1e6) / 1e6,
        maxDrawdown: Math.round(maxDD * 1e6) / 1e6,
        sharpeRatio: Math.round(sharpe * 1e4) / 1e4,
        sortinoRatio: Math.round(sortino * 1e4) / 1e4,
      };
      
      // Remove existing entry if any
      const existingIdx = stats.findIndex(s => s.ticker === fund.ticker);
      if (existingIdx >= 0) stats.splice(existingIdx, 1);
      stats.push(fundStats);
      console.log(`  Stats:`, fundStats);

      // Save individual file
      fs.writeFileSync(
        path.join(OUTPUT_DIR, 'thor', `${fund.ticker.toLowerCase()}.json`),
        JSON.stringify({ ...fund, monthlyPrices: byMonth, returns: returnDates.map((d, i) => ({ date: d, return: returns[i] })), stats: fundStats }, null, 2)
      );
    }
  }

  // Write updated files
  fs.writeFileSync(matrixPath, JSON.stringify(matrix));
  fs.writeFileSync(lookupPath, JSON.stringify(lookup, null, 2));
  fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2));

  console.log('\n✅ THOR fund data added to analyzer files');
}

main().catch(console.error);
