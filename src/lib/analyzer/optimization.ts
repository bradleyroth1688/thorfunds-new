// THOR Portfolio Risk Analyzer — Optimization Engine
// Pre-computes 101-point grid for smooth slider

import { Holding, ReturnsData, PortfolioMetrics, OptimizationResult, OptimizationMode } from './types';
import { calculateAllMetrics } from './risk-engine';
import { calculateRiskScore } from './scoring';

const THOR_PRODUCTS = [
  { ticker: 'THIR', name: 'THOR Income & Return ETF', type: 'etf' as const },
  { ticker: 'THLV', name: 'THOR Low Volatility ETF', type: 'etf' as const },
];

export function applyThorAllocation(originalHoldings: Holding[], thorPct: number): Holding[] {
  if (thorPct === 0) return [...originalHoldings];
  
  const perProduct = thorPct / THOR_PRODUCTS.length;
  const scaleFactor = (100 - thorPct) / 100;

  const adjusted = originalHoldings.map(h => ({
    ...h,
    allocation: h.allocation * scaleFactor,
  })).filter(h => h.allocation >= 0.1);

  for (const product of THOR_PRODUCTS) {
    adjusted.push({
      ...product,
      allocation: perProduct,
    });
  }

  return adjusted;
}

export function computeOptimizationGrid(
  originalHoldings: Holding[],
  returnsData: ReturnsData
): OptimizationResult[] {
  const grid: OptimizationResult[] = [];

  for (let pct = 0; pct <= 100; pct++) {
    const holdings = applyThorAllocation(originalHoldings, pct);
    const metrics = calculateAllMetrics(holdings, returnsData);
    const riskScore = calculateRiskScore(holdings, metrics);
    metrics.riskScore = riskScore;

    grid.push({
      thorAllocation: pct,
      holdings,
      metrics,
      riskScore,
    });
  }

  return grid;
}

export function findOptimal(
  grid: OptimizationResult[],
  mode: OptimizationMode,
  currentMetrics: PortfolioMetrics,
  targetScore?: number
): number {
  switch (mode) {
    case 'max-return': {
      let best: OptimizationResult | null = null;
      for (const point of grid) {
        if (Math.abs(point.riskScore - currentMetrics.riskScore) <= 3) {
          if (!best || point.metrics.annualizedReturn > best.metrics.annualizedReturn) {
            best = point;
          }
        }
      }
      return best?.thorAllocation || 0;
    }

    case 'min-risk': {
      let best: OptimizationResult | null = null;
      for (const point of grid) {
        if (Math.abs(point.metrics.annualizedReturn - currentMetrics.annualizedReturn) <= 0.005) {
          if (!best || point.riskScore < best.riskScore) {
            best = point;
          }
        }
      }
      return best?.thorAllocation || 0;
    }

    case 'min-drawdown': {
      let best: OptimizationResult | null = null;
      for (const point of grid) {
        if (!best || Math.abs(point.metrics.maxDrawdown) < Math.abs(best.metrics.maxDrawdown)) {
          best = point;
        }
      }
      return best?.thorAllocation || 0;
    }

    case 'target-score': {
      if (targetScore === undefined) return 0;
      let best: OptimizationResult | null = null;
      let bestDist = Infinity;
      for (const point of grid) {
        const dist = Math.abs(point.riskScore - targetScore);
        if (dist < bestDist) {
          bestDist = dist;
          best = point;
        }
      }
      return best?.thorAllocation || 0;
    }
  }
}
