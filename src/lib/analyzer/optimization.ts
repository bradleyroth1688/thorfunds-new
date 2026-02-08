// THOR Portfolio Risk Analyzer — Optimization Engine

import { Holding, ReturnsData, PortfolioMetrics, OptimizationResult, OptimizationMode } from './types';
import { calculateAllMetrics } from './risk-engine';
import { calculateRiskScore } from './scoring';

export const THOR_PRODUCTS = [
  { ticker: 'THIR', name: 'THOR SDQ Index Rotation ETF', type: 'etf' as const },
  { ticker: 'THLV', name: 'THOR Equal Weight Low Volatility ETF', type: 'etf' as const },
];

export function applyThorAllocation(
  originalHoldings: Holding[],
  thirPct: number,
  thlvPct: number
): Holding[] {
  const totalThor = thirPct + thlvPct;
  if (totalThor === 0) return [...originalHoldings];

  const scaleFactor = (100 - totalThor) / 100;

  const adjusted = originalHoldings.map(h => ({
    ...h,
    allocation: h.allocation * scaleFactor,
  })).filter(h => h.allocation >= 0.1);

  if (thirPct > 0) {
    adjusted.push({ ticker: 'THIR', name: THOR_PRODUCTS[0].name, type: 'etf', allocation: thirPct });
  }
  if (thlvPct > 0) {
    adjusted.push({ ticker: 'THLV', name: THOR_PRODUCTS[1].name, type: 'etf', allocation: thlvPct });
  }

  return adjusted;
}

export function computeMetricsForAllocation(
  originalHoldings: Holding[],
  returnsData: ReturnsData,
  thirPct: number,
  thlvPct: number
): OptimizationResult {
  const holdings = applyThorAllocation(originalHoldings, thirPct, thlvPct);
  const metrics = calculateAllMetrics(holdings, returnsData);
  const riskScore = calculateRiskScore(holdings, metrics);
  metrics.riskScore = riskScore;

  return {
    thorAllocation: thirPct + thlvPct,
    thirPct,
    thlvPct,
    holdings,
    metrics,
    riskScore,
  };
}

// 2D grid search: THIR 0-25 x THLV 0-25 in steps of 5, total capped at 50
export function computeOptimizationGrid(
  originalHoldings: Holding[],
  returnsData: ReturnsData
): OptimizationResult[] {
  const grid: OptimizationResult[] = [];

  for (let thir = 0; thir <= 25; thir += 5) {
    for (let thlv = 0; thlv <= 25; thlv += 5) {
      if (thir + thlv > 50) continue;
      grid.push(computeMetricsForAllocation(originalHoldings, returnsData, thir, thlv));
    }
  }

  return grid;
}

export function findOptimal(
  grid: OptimizationResult[],
  mode: OptimizationMode,
  currentMetrics: PortfolioMetrics,
  targetScore?: number
): { thirPct: number; thlvPct: number } {
  const zero = { thirPct: 0, thlvPct: 0 };

  switch (mode) {
    case 'max-return': {
      let best: OptimizationResult | null = null;
      for (const point of grid) {
        if (Math.abs(point.riskScore - currentMetrics.riskScore) <= 3) {
          if (!best || point.metrics.annualizedReturn > best.metrics.annualizedReturn) best = point;
        }
      }
      return best ? { thirPct: best.thirPct, thlvPct: best.thlvPct } : zero;
    }
    case 'min-risk': {
      let best: OptimizationResult | null = null;
      for (const point of grid) {
        if (Math.abs(point.metrics.annualizedReturn - currentMetrics.annualizedReturn) <= 0.005) {
          if (!best || point.riskScore < best.riskScore) best = point;
        }
      }
      return best ? { thirPct: best.thirPct, thlvPct: best.thlvPct } : zero;
    }
    case 'min-drawdown': {
      let best: OptimizationResult | null = null;
      for (const point of grid) {
        if (!best || Math.abs(point.metrics.maxDrawdown) < Math.abs(best.metrics.maxDrawdown)) best = point;
      }
      return best ? { thirPct: best.thirPct, thlvPct: best.thlvPct } : zero;
    }
    case 'target-score': {
      if (targetScore === undefined) return zero;
      let best: OptimizationResult | null = null;
      let bestDist = Infinity;
      for (const point of grid) {
        const dist = Math.abs(point.riskScore - targetScore);
        if (dist < bestDist) { bestDist = dist; best = point; }
      }
      return best ? { thirPct: best.thirPct, thlvPct: best.thlvPct } : zero;
    }
  }
}
