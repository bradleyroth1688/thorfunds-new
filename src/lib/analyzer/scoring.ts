// THOR Portfolio Risk Analyzer — Risk Score Computation (1-100)

import { Holding, PortfolioMetrics } from './types';

function volatilityComponent(annualVol: number): number {
  if (annualVol <= 0.05) return (annualVol / 0.05) * 20;
  if (annualVol <= 0.15) return 20 + ((annualVol - 0.05) / 0.10) * 30;
  if (annualVol <= 0.25) return 50 + ((annualVol - 0.15) / 0.10) * 30;
  return Math.min(100, 80 + ((annualVol - 0.25) / 0.15) * 20);
}

function drawdownComponent(maxDD: number): number {
  const abs = Math.abs(maxDD);
  if (abs <= 0.10) return (abs / 0.10) * 25;
  if (abs <= 0.25) return 25 + ((abs - 0.10) / 0.15) * 25;
  if (abs <= 0.50) return 50 + ((abs - 0.25) / 0.25) * 35;
  return Math.min(100, 85 + ((abs - 0.50) / 0.30) * 15);
}

function varComponent(var95: number): number {
  const annualized = var95 * Math.sqrt(12);
  if (annualized <= 0.10) return (annualized / 0.10) * 25;
  if (annualized <= 0.25) return 25 + ((annualized - 0.10) / 0.15) * 25;
  if (annualized <= 0.40) return 50 + ((annualized - 0.25) / 0.15) * 30;
  return Math.min(100, 80 + ((annualized - 0.40) / 0.20) * 20);
}

function equityComponent(holdings: Holding[]): number {
  const equityTypes = new Set(['stock', 'etf']);
  let equityWeight = 0;
  for (const h of holdings) {
    if (equityTypes.has(h.type)) equityWeight += h.allocation;
  }
  return equityWeight;
}

export function calculateRiskScore(holdings: Holding[], metrics: PortfolioMetrics): number {
  const volComp = volatilityComponent(metrics.volatility);
  const ddComp = drawdownComponent(metrics.maxDrawdown);
  const varComp = varComponent(metrics.var95);
  const eqComp = equityComponent(holdings);

  const rawScore = 0.35 * volComp + 0.30 * ddComp + 0.20 * varComp + 0.15 * eqComp;
  return Math.max(1, Math.min(100, Math.round(rawScore)));
}
