// THOR Portfolio Risk Analyzer — Core Risk Engine
// All formulas from risk-engine-spec.md

import { Holding, ReturnsData, PortfolioMetrics } from './types';

const RISK_FREE_RATE = 0.045; // 10-year Treasury ~4.5% as of 2026

// ===== RETURN CALCULATIONS =====

export function annualizedReturn(monthlyReturns: number[]): number {
  if (monthlyReturns.length === 0) return 0;
  let cumulative = 1;
  for (const r of monthlyReturns) {
    cumulative *= (1 + r);
  }
  const years = monthlyReturns.length / 12;
  if (years === 0) return 0;
  if (cumulative <= 0) return -1;
  return Math.pow(cumulative, 1 / years) - 1;
}

// ===== VOLATILITY =====

export function annualizedVolatility(monthlyReturns: number[]): number {
  const n = monthlyReturns.length;
  if (n < 2) return 0;
  const mean = monthlyReturns.reduce((a, b) => a + b, 0) / n;
  const variance = monthlyReturns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / (n - 1);
  return Math.sqrt(variance) * Math.sqrt(12);
}

// ===== VALUE AT RISK =====

export function valueAtRisk(monthlyReturns: number[], confidence = 0.95): number {
  if (monthlyReturns.length === 0) return 0;
  const sorted = [...monthlyReturns].sort((a, b) => a - b);
  const index = Math.floor((1 - confidence) * sorted.length);
  return -sorted[index];
}

export function conditionalVaR(monthlyReturns: number[], confidence = 0.95): number {
  if (monthlyReturns.length === 0) return 0;
  const sorted = [...monthlyReturns].sort((a, b) => a - b);
  const cutoffIndex = Math.floor((1 - confidence) * sorted.length);
  const tailReturns = sorted.slice(0, cutoffIndex + 1);
  if (tailReturns.length === 0) return 0;
  const avg = tailReturns.reduce((a, b) => a + b, 0) / tailReturns.length;
  return -avg;
}

// ===== RISK-ADJUSTED METRICS =====

export function sharpeRatio(annReturn: number, annVol: number, rf = RISK_FREE_RATE): number {
  if (annVol === 0) return 0;
  return (annReturn - rf) / annVol;
}

export function sortinoRatio(monthlyReturns: number[], rf = RISK_FREE_RATE): number {
  const n = monthlyReturns.length;
  if (n === 0) return 0;
  let sumSquaredDownside = 0;
  for (const r of monthlyReturns) {
    if (r < 0) sumSquaredDownside += r * r;
  }
  const downsideDeviation = Math.sqrt(sumSquaredDownside / n) * Math.sqrt(12);
  if (downsideDeviation === 0) return 0;
  const annReturn = annualizedReturn(monthlyReturns);
  return (annReturn - rf) / downsideDeviation;
}

export function calmarRatio(annReturn: number, maxDD: number): number {
  if (maxDD === 0) return 0;
  return annReturn / Math.abs(maxDD);
}

// ===== DRAWDOWN ANALYSIS =====

export function calculateDrawdowns(monthlyReturns: number[]): number[] {
  const nav = [100];
  for (const r of monthlyReturns) {
    nav.push(nav[nav.length - 1] * (1 + r));
  }
  const drawdowns: number[] = [];
  let peak = nav[0];
  for (let i = 0; i < nav.length; i++) {
    peak = Math.max(peak, nav[i]);
    drawdowns.push((nav[i] - peak) / peak);
  }
  return drawdowns;
}

export function maxDrawdown(monthlyReturns: number[]): number {
  const dd = calculateDrawdowns(monthlyReturns);
  return Math.min(...dd);
}

// ===== PORTFOLIO AGGREGATION =====

export function portfolioMonthlyReturns(holdings: Holding[], returnsData: ReturnsData): number[] {
  const { dates, returns } = returnsData;
  const portfolioReturns: number[] = [];

  for (let t = 0; t < dates.length; t++) {
    let monthReturn = 0;
    let coveredWeight = 0;

    for (const h of holdings) {
      const weight = h.allocation / 100;
      const ticker = h.proxyTicker || h.ticker;
      const secReturns = returns[ticker];
      if (secReturns && secReturns[t] !== undefined) {
        monthReturn += weight * secReturns[t];
        coveredWeight += weight;
      }
    }

    // Scale up if some holdings don't have data
    if (coveredWeight > 0 && coveredWeight < 0.99) {
      monthReturn = monthReturn / coveredWeight;
    }

    portfolioReturns.push(monthReturn);
  }

  return portfolioReturns;
}

// ===== COVARIANCE =====

function covariance(a: number[], b: number[]): number {
  const n = Math.min(a.length, b.length);
  if (n < 2) return 0;
  const meanA = a.slice(0, n).reduce((s, v) => s + v, 0) / n;
  const meanB = b.slice(0, n).reduce((s, v) => s + v, 0) / n;
  let cov = 0;
  for (let i = 0; i < n; i++) {
    cov += (a[i] - meanA) * (b[i] - meanB);
  }
  return cov / (n - 1);
}

export function portfolioVolatility(holdings: Holding[], returnsData: ReturnsData): number {
  const weights = holdings.map(h => h.allocation / 100);
  const tickers = holdings.map(h => h.proxyTicker || h.ticker);
  const n = tickers.length;

  // Build covariance matrix from monthly returns
  const covMatrix: number[][] = [];
  for (let i = 0; i < n; i++) {
    covMatrix[i] = [];
    const ri = returnsData.returns[tickers[i]] || [];
    for (let j = 0; j < n; j++) {
      const rj = returnsData.returns[tickers[j]] || [];
      covMatrix[i][j] = covariance(ri, rj);
    }
  }

  let variance = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      variance += weights[i] * weights[j] * covMatrix[i][j];
    }
  }

  return Math.sqrt(Math.max(0, variance) * 12);
}

// ===== COMPLETE PORTFOLIO METRICS =====

export function calculateAllMetrics(holdings: Holding[], returnsData: ReturnsData): PortfolioMetrics {
  const monthlyRets = portfolioMonthlyReturns(holdings, returnsData);
  const annReturn = annualizedReturn(monthlyRets);
  const annVol = annualizedVolatility(monthlyRets);
  const mdd = maxDrawdown(monthlyRets);
  const drawdownSeries = calculateDrawdowns(monthlyRets);

  return {
    annualizedReturn: sanitize(annReturn),
    volatility: sanitize(annVol),
    maxDrawdown: sanitize(mdd),
    sharpeRatio: sanitize(sharpeRatio(annReturn, annVol)),
    sortinoRatio: sanitize(sortinoRatio(monthlyRets)),
    calmarRatio: sanitize(calmarRatio(annReturn, mdd)),
    var95: sanitize(valueAtRisk(monthlyRets)),
    cvar95: sanitize(conditionalVaR(monthlyRets)),
    riskScore: 0, // Will be set by scoring.ts
    monthlyReturns: monthlyRets,
    drawdownSeries,
  };
}

function sanitize(x: number): number {
  if (!Number.isFinite(x)) return 0;
  return x;
}
