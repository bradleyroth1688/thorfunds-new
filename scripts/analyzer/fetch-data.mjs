#!/usr/bin/env node
// Fetch historical price data from Yahoo Finance and Ultimus API
// Generates all static JSON files for the portfolio analyzer

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '../../public/data/analyzer');

// Universe of tickers
const UNIVERSE = {
  etfs: [
    { ticker: 'SPY', name: 'SPDR S&P 500 ETF', sector: 'Broad Market' },
    { ticker: 'QQQ', name: 'Invesco QQQ Trust', sector: 'Technology' },
    { ticker: 'DIA', name: 'SPDR Dow Jones', sector: 'Broad Market' },
    { ticker: 'IWM', name: 'iShares Russell 2000', sector: 'Small Cap' },
    { ticker: 'VTI', name: 'Vanguard Total Stock Market', sector: 'Broad Market' },
    { ticker: 'VXUS', name: 'Vanguard Total International', sector: 'International' },
    { ticker: 'VEA', name: 'Vanguard FTSE Developed', sector: 'International' },
    { ticker: 'VWO', name: 'Vanguard FTSE Emerging', sector: 'Emerging Markets' },
    { ticker: 'AGG', name: 'iShares Core US Aggregate Bond', sector: 'Bonds' },
    { ticker: 'BND', name: 'Vanguard Total Bond Market', sector: 'Bonds' },
    { ticker: 'TLT', name: 'iShares 20+ Year Treasury', sector: 'Bonds' },
    { ticker: 'IEF', name: 'iShares 7-10 Year Treasury', sector: 'Bonds' },
    { ticker: 'SHY', name: 'iShares 1-3 Year Treasury', sector: 'Bonds' },
    { ticker: 'LQD', name: 'iShares Investment Grade Corp', sector: 'Bonds' },
    { ticker: 'HYG', name: 'iShares High Yield Corp', sector: 'Bonds' },
    { ticker: 'TIP', name: 'iShares TIPS', sector: 'Bonds' },
    { ticker: 'GLD', name: 'SPDR Gold Shares', sector: 'Commodities' },
    { ticker: 'SLV', name: 'iShares Silver Trust', sector: 'Commodities' },
    { ticker: 'DBC', name: 'Invesco DB Commodity Index', sector: 'Commodities' },
    { ticker: 'VNQ', name: 'Vanguard Real Estate', sector: 'Real Estate' },
    { ticker: 'XLRE', name: 'Real Estate Select Sector', sector: 'Real Estate' },
    { ticker: 'XLK', name: 'Technology Select Sector', sector: 'Technology' },
    { ticker: 'XLF', name: 'Financial Select Sector', sector: 'Financials' },
    { ticker: 'XLE', name: 'Energy Select Sector', sector: 'Energy' },
    { ticker: 'XLV', name: 'Health Care Select Sector', sector: 'Healthcare' },
    { ticker: 'XLI', name: 'Industrial Select Sector', sector: 'Industrials' },
    { ticker: 'XLB', name: 'Materials Select Sector', sector: 'Materials' },
    { ticker: 'XLY', name: 'Consumer Discretionary Select', sector: 'Consumer Discretionary' },
    { ticker: 'XLP', name: 'Consumer Staples Select', sector: 'Consumer Staples' },
    { ticker: 'XLU', name: 'Utilities Select Sector', sector: 'Utilities' },
    { ticker: 'XLC', name: 'Communication Services Select', sector: 'Communication' },
    { ticker: 'ARKK', name: 'ARK Innovation ETF', sector: 'Technology' },
    { ticker: 'SCHD', name: 'Schwab US Dividend Equity', sector: 'Dividend' },
    { ticker: 'VIG', name: 'Vanguard Dividend Appreciation', sector: 'Dividend' },
    { ticker: 'JEPI', name: 'JPMorgan Equity Premium Income', sector: 'Income' },
    { ticker: 'VOO', name: 'Vanguard S&P 500', sector: 'Broad Market' },
    { ticker: 'IVV', name: 'iShares Core S&P 500', sector: 'Broad Market' },
    { ticker: 'EFA', name: 'iShares MSCI EAFE', sector: 'International' },
    { ticker: 'EEM', name: 'iShares MSCI Emerging Markets', sector: 'Emerging Markets' },
  ],
  stocks: [
    { ticker: 'AAPL', name: 'Apple Inc.', sector: 'Technology' },
    { ticker: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology' },
    { ticker: 'AMZN', name: 'Amazon.com Inc.', sector: 'Consumer Discretionary' },
    { ticker: 'GOOGL', name: 'Alphabet Inc.', sector: 'Communication' },
    { ticker: 'NVDA', name: 'NVIDIA Corp.', sector: 'Technology' },
    { ticker: 'META', name: 'Meta Platforms Inc.', sector: 'Communication' },
    { ticker: 'TSLA', name: 'Tesla Inc.', sector: 'Consumer Discretionary' },
    { ticker: 'BRK-B', name: 'Berkshire Hathaway B', sector: 'Financials' },
    { ticker: 'JPM', name: 'JPMorgan Chase & Co.', sector: 'Financials' },
    { ticker: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare' },
    { ticker: 'V', name: 'Visa Inc.', sector: 'Financials' },
    { ticker: 'PG', name: 'Procter & Gamble Co.', sector: 'Consumer Staples' },
    { ticker: 'UNH', name: 'UnitedHealth Group', sector: 'Healthcare' },
    { ticker: 'HD', name: 'Home Depot Inc.', sector: 'Consumer Discretionary' },
    { ticker: 'MA', name: 'Mastercard Inc.', sector: 'Financials' },
  ],
};

const ALL_TICKERS = [
  ...UNIVERSE.etfs.map(e => ({ ...e, type: 'etf' })),
  ...UNIVERSE.stocks.map(s => ({ ...s, type: 'stock' })),
];

// ===== Yahoo Finance Fetcher =====

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchJSON(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch { reject(new Error(`Failed to parse JSON from ${url}: ${data.slice(0, 200)}`)); }
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function fetchYahooMonthly(ticker, years = 10) {
  const now = Math.floor(Date.now() / 1000);
  const start = now - years * 365.25 * 86400;
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?period1=${Math.floor(start)}&period2=${now}&interval=1mo&includeAdjustedClose=true`;

  try {
    const data = await fetchJSON(url);
    const result = data?.chart?.result?.[0];
    if (!result) return null;

    const timestamps = result.timestamp || [];
    const adjClose = result.indicators?.adjclose?.[0]?.adjclose ||
                     result.indicators?.quote?.[0]?.close || [];

    if (timestamps.length < 12) return null;

    const prices = [];
    for (let i = 0; i < timestamps.length; i++) {
      if (adjClose[i] != null) {
        const date = new Date(timestamps[i] * 1000);
        const ym = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        prices.push({ date: ym, price: adjClose[i] });
      }
    }

    return prices;
  } catch (err) {
    console.error(`  Failed to fetch ${ticker}: ${err.message}`);
    return null;
  }
}

// ===== Ultimus API for THOR Funds =====

async function fetchUltimusPrices(fundId) {
  try {
    // Auth
    const authData = JSON.stringify({ email: 'broth@thoranalytics.com', password: '000b6e14-48a9-46fb-8113-f1d0cc2166ef' });
    const token = await new Promise((resolve, reject) => {
      const req = https.request('https://uauth.ultimusfundsolutions.com/server/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': authData.length },
      }, (res) => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => resolve(d.replace(/"/g, '')));
        res.on('error', reject);
      });
      req.on('error', reject);
      req.write(authData);
      req.end();
    });

    // Fetch pricing
    const data = await new Promise((resolve, reject) => {
      https.get(`https://funddata.ultimusfundsolutions.com/funds/${fundId}/pricing`, {
        headers: { Authorization: `Bearer ${token}` },
      }, (res) => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => {
          try { resolve(JSON.parse(d)); }
          catch { reject(new Error('Failed to parse Ultimus data')); }
        });
        res.on('error', reject);
      }).on('error', reject);
    });

    return data;
  } catch (err) {
    console.error(`  Failed to fetch Ultimus fund ${fundId}: ${err.message}`);
    return null;
  }
}

function ultimusPricesToMonthly(pricingData) {
  if (!Array.isArray(pricingData) || pricingData.length === 0) return null;

  // Group by year-month, take last price in each month
  const byMonth = {};
  for (const entry of pricingData) {
    const date = new Date(entry.asOfDate || entry.date);
    if (isNaN(date.getTime())) continue;
    const ym = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const price = entry.nav || entry.closingPrice || entry.price;
    if (price != null && price > 0) {
      byMonth[ym] = price;
    }
  }

  const sorted = Object.entries(byMonth).sort((a, b) => a[0].localeCompare(b[0]));
  return sorted.map(([date, price]) => ({ date, price }));
}

// ===== Compute Returns =====

function pricesToReturns(prices) {
  const returns = [];
  for (let i = 1; i < prices.length; i++) {
    if (prices[i - 1].price > 0) {
      returns.push({
        date: prices[i].date,
        return: (prices[i].price - prices[i - 1].price) / prices[i - 1].price,
      });
    }
  }
  return returns;
}

function computeStats(returns) {
  if (returns.length < 12) return null;
  const vals = returns.map(r => r.return);
  const n = vals.length;

  // Annualized return
  let cum = 1;
  for (const r of vals) cum *= (1 + r);
  const years = n / 12;
  const annReturn = Math.pow(cum, 1 / years) - 1;

  // Volatility
  const mean = vals.reduce((a, b) => a + b, 0) / n;
  const variance = vals.reduce((s, r) => s + (r - mean) ** 2, 0) / (n - 1);
  const vol = Math.sqrt(variance) * Math.sqrt(12);

  // Max drawdown
  const nav = [100];
  for (const r of vals) nav.push(nav[nav.length - 1] * (1 + r));
  let peak = nav[0], maxDD = 0;
  for (const v of nav) {
    peak = Math.max(peak, v);
    maxDD = Math.min(maxDD, (v - peak) / peak);
  }

  // Sharpe
  const rf = 0.045;
  const sharpe = vol > 0 ? (annReturn - rf) / vol : 0;

  // Sortino
  let sumSqDown = 0;
  for (const r of vals) { if (r < 0) sumSqDown += r * r; }
  const downDev = Math.sqrt(sumSqDown / n) * Math.sqrt(12);
  const sortino = downDev > 0 ? (annReturn - rf) / downDev : 0;

  return {
    annualizedReturn: round(annReturn, 6),
    volatility: round(vol, 6),
    maxDrawdown: round(maxDD, 6),
    sharpeRatio: round(sharpe, 4),
    sortinoRatio: round(sortino, 4),
  };
}

function round(v, d) { return Math.round(v * 10 ** d) / 10 ** d; }

// ===== Main =====

async function main() {
  console.log('=== THOR Portfolio Analyzer Data Pipeline ===\n');

  // Ensure output dirs exist
  for (const sub of ['securities', 'thor', 'metadata']) {
    fs.mkdirSync(path.join(OUTPUT_DIR, sub), { recursive: true });
  }

  // 1. Fetch all ticker data from Yahoo Finance
  const allReturns = {};
  const allDates = new Set();
  const tickerLookup = {};
  const securityStats = [];
  let failedTickers = [];

  console.log(`Fetching ${ALL_TICKERS.length} tickers from Yahoo Finance...`);
  
  for (let i = 0; i < ALL_TICKERS.length; i++) {
    const { ticker, name, type, sector } = ALL_TICKERS[i];
    process.stdout.write(`  [${i + 1}/${ALL_TICKERS.length}] ${ticker}...`);
    
    const prices = await fetchYahooMonthly(ticker);
    if (!prices || prices.length < 12) {
      console.log(' SKIP (insufficient data)');
      failedTickers.push(ticker);
      continue;
    }

    const returns = pricesToReturns(prices);
    for (const r of returns) allDates.add(r.date);
    allReturns[ticker] = returns;

    const stats = computeStats(returns);
    if (stats) {
      securityStats.push({ ticker, name, type, sector, ...stats });
    }

    tickerLookup[ticker] = { ticker, name, type, sector };
    console.log(` OK (${returns.length} months)`);

    // Rate limit: small delay
    await new Promise(r => setTimeout(r, 300));
  }

  // 2. Fetch THOR fund data from Ultimus
  console.log('\nFetching THOR fund data from Ultimus...');
  
  const thorFunds = [
    { id: '1469', ticker: 'THIR', name: 'THOR Income & Return ETF' },
    { id: '1468', ticker: 'THLV', name: 'THOR Low Volatility ETF' },
  ];

  for (const fund of thorFunds) {
    process.stdout.write(`  ${fund.ticker} (ID ${fund.id})...`);
    const pricingData = await fetchUltimusPrices(fund.id);
    
    if (pricingData) {
      const prices = ultimusPricesToMonthly(pricingData);
      if (prices && prices.length >= 3) {
        const returns = pricesToReturns(prices);
        for (const r of returns) allDates.add(r.date);
        allReturns[fund.ticker] = returns;

        const stats = computeStats(returns);
        tickerLookup[fund.ticker] = { ticker: fund.ticker, name: fund.name, type: 'etf', sector: 'THOR' };
        
        // Save individual THOR data
        fs.writeFileSync(
          path.join(OUTPUT_DIR, 'thor', `${fund.ticker.toLowerCase()}.json`),
          JSON.stringify({ ...fund, prices, returns, stats }, null, 2)
        );
        
        if (stats) {
          securityStats.push({ ticker: fund.ticker, name: fund.name, type: 'etf', sector: 'THOR', ...stats });
        }
        
        console.log(` OK (${returns.length} months)`);
      } else {
        console.log(' SKIP (insufficient monthly data)');
      }
    } else {
      console.log(' FAILED');
    }
  }

  // 3. Build returns matrix (aligned dates)
  console.log('\nBuilding returns matrix...');
  const sortedDates = [...allDates].sort();
  const returnsMatrix = { dates: sortedDates, returns: {} };

  for (const [ticker, returns] of Object.entries(allReturns)) {
    const dateMap = {};
    for (const r of returns) dateMap[r.date] = r.return;
    
    returnsMatrix.returns[ticker] = sortedDates.map(d => {
      const val = dateMap[d];
      return val !== undefined ? round(val, 8) : 0;
    });
  }

  // 4. Write output files
  console.log('\nWriting output files...');

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'securities', 'returns-matrix.json'),
    JSON.stringify(returnsMatrix)
  );
  console.log(`  returns-matrix.json: ${sortedDates.length} dates × ${Object.keys(returnsMatrix.returns).length} tickers`);

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'securities', 'stats.json'),
    JSON.stringify(securityStats, null, 2)
  );
  console.log(`  stats.json: ${securityStats.length} securities`);

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'metadata', 'ticker-lookup.json'),
    JSON.stringify(tickerLookup, null, 2)
  );
  console.log(`  ticker-lookup.json: ${Object.keys(tickerLookup).length} tickers`);

  // 5. Templates
  const templates = [
    {
      id: 'conservative',
      name: 'Conservative',
      description: 'Heavy bond allocation for capital preservation',
      equity: 20, bonds: 70, other: 10, expectedRisk: 25,
      holdings: [
        { ticker: 'AGG', name: 'iShares Core US Aggregate Bond', allocation: 40, type: 'bond' },
        { ticker: 'BND', name: 'Vanguard Total Bond Market', allocation: 20, type: 'bond' },
        { ticker: 'TIP', name: 'iShares TIPS', allocation: 10, type: 'bond' },
        { ticker: 'SPY', name: 'SPDR S&P 500 ETF', allocation: 15, type: 'etf' },
        { ticker: 'VIG', name: 'Vanguard Dividend Appreciation', allocation: 5, type: 'etf' },
        { ticker: 'GLD', name: 'SPDR Gold Shares', allocation: 10, type: 'etf' },
      ],
    },
    {
      id: 'balanced',
      name: 'Balanced 60/40',
      description: 'Classic balanced allocation — 60% stocks, 40% bonds',
      equity: 60, bonds: 40, other: 0, expectedRisk: 55,
      holdings: [
        { ticker: 'SPY', name: 'SPDR S&P 500 ETF', allocation: 35, type: 'etf' },
        { ticker: 'VXUS', name: 'Vanguard Total International', allocation: 15, type: 'etf' },
        { ticker: 'IWM', name: 'iShares Russell 2000', allocation: 10, type: 'etf' },
        { ticker: 'AGG', name: 'iShares Core US Aggregate Bond', allocation: 25, type: 'bond' },
        { ticker: 'TLT', name: 'iShares 20+ Year Treasury', allocation: 15, type: 'bond' },
      ],
    },
    {
      id: 'growth',
      name: 'Growth',
      description: 'Equity-heavy for long-term capital appreciation',
      equity: 80, bonds: 15, other: 5, expectedRisk: 70,
      holdings: [
        { ticker: 'SPY', name: 'SPDR S&P 500 ETF', allocation: 30, type: 'etf' },
        { ticker: 'QQQ', name: 'Invesco QQQ Trust', allocation: 20, type: 'etf' },
        { ticker: 'VXUS', name: 'Vanguard Total International', allocation: 15, type: 'etf' },
        { ticker: 'IWM', name: 'iShares Russell 2000', allocation: 15, type: 'etf' },
        { ticker: 'AGG', name: 'iShares Core US Aggregate Bond', allocation: 15, type: 'bond' },
        { ticker: 'GLD', name: 'SPDR Gold Shares', allocation: 5, type: 'etf' },
      ],
    },
    {
      id: 'aggressive',
      name: 'Aggressive',
      description: 'Maximum growth focus with concentrated equity',
      equity: 95, bonds: 5, other: 0, expectedRisk: 82,
      holdings: [
        { ticker: 'QQQ', name: 'Invesco QQQ Trust', allocation: 30, type: 'etf' },
        { ticker: 'SPY', name: 'SPDR S&P 500 ETF', allocation: 25, type: 'etf' },
        { ticker: 'IWM', name: 'iShares Russell 2000', allocation: 15, type: 'etf' },
        { ticker: 'VXUS', name: 'Vanguard Total International', allocation: 15, type: 'etf' },
        { ticker: 'XLK', name: 'Technology Select Sector', allocation: 10, type: 'etf' },
        { ticker: 'AGG', name: 'iShares Core US Aggregate Bond', allocation: 5, type: 'bond' },
      ],
    },
    {
      id: 'all-weather',
      name: 'All Weather',
      description: 'Ray Dalio-inspired diversified portfolio',
      equity: 30, bonds: 55, other: 15, expectedRisk: 35,
      holdings: [
        { ticker: 'VTI', name: 'Vanguard Total Stock Market', allocation: 30, type: 'etf' },
        { ticker: 'TLT', name: 'iShares 20+ Year Treasury', allocation: 40, type: 'bond' },
        { ticker: 'IEF', name: 'iShares 7-10 Year Treasury', allocation: 15, type: 'bond' },
        { ticker: 'GLD', name: 'SPDR Gold Shares', allocation: 7.5, type: 'etf' },
        { ticker: 'DBC', name: 'Invesco DB Commodity Index', allocation: 7.5, type: 'etf' },
      ],
    },
    {
      id: 'income',
      name: 'Income Focus',
      description: 'Dividend and income-generating investments',
      equity: 50, bonds: 40, other: 10, expectedRisk: 45,
      holdings: [
        { ticker: 'SCHD', name: 'Schwab US Dividend Equity', allocation: 25, type: 'etf' },
        { ticker: 'VIG', name: 'Vanguard Dividend Appreciation', allocation: 15, type: 'etf' },
        { ticker: 'JEPI', name: 'JPMorgan Equity Premium Income', allocation: 10, type: 'etf' },
        { ticker: 'AGG', name: 'iShares Core US Aggregate Bond', allocation: 20, type: 'bond' },
        { ticker: 'LQD', name: 'iShares Investment Grade Corp', allocation: 10, type: 'bond' },
        { ticker: 'HYG', name: 'iShares High Yield Corp', allocation: 10, type: 'bond' },
        { ticker: 'VNQ', name: 'Vanguard Real Estate', allocation: 10, type: 'etf' },
      ],
    },
  ];

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'metadata', 'templates.json'),
    JSON.stringify(templates, null, 2)
  );
  console.log(`  templates.json: ${templates.length} templates`);

  console.log('\n✅ Data pipeline complete!');
  if (failedTickers.length > 0) {
    console.log(`⚠️  Failed tickers: ${failedTickers.join(', ')}`);
  }
}

main().catch(console.error);
