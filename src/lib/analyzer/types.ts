// THOR Portfolio Risk Analyzer — TypeScript Interfaces

export interface Holding {
  ticker: string;
  name: string;
  allocation: number; // 0-100 percentage
  type: 'etf' | 'mutual_fund' | 'stock' | 'bond' | 'cash';
  sector?: string;
  annualizedReturn?: number;
  volatility?: number;
  proxyTicker?: string; // If set, this ticker's data is proxied from another
}

export interface ReturnsData {
  dates: string[]; // YYYY-MM format
  returns: Record<string, number[]>; // ticker -> monthly returns (decimal)
}

export interface SecurityStats {
  ticker: string;
  name: string;
  type: string;
  sector?: string;
  annualizedReturn: number;
  volatility: number;
  maxDrawdown: number;
  sharpeRatio: number;
  sortinoRatio: number;
}

export interface PortfolioMetrics {
  annualizedReturn: number;
  volatility: number;
  maxDrawdown: number;
  sharpeRatio: number;
  sortinoRatio: number;
  calmarRatio: number;
  var95: number;
  cvar95: number;
  riskScore: number;
  monthlyReturns: number[];
  drawdownSeries: number[];
}

export interface OptimizationResult {
  thorAllocation: number;
  thirPct: number;
  thlvPct: number;
  holdings: Holding[];
  metrics: PortfolioMetrics;
  riskScore: number;
}

export interface PortfolioTemplate {
  id: string;
  name: string;
  description: string;
  equity: number;
  bonds: number;
  other: number;
  expectedRisk: number;
  holdings: Holding[];
}

export interface TickerInfo {
  ticker: string;
  name: string;
  type: string;
  sector?: string;
}

export type OptimizationMode = 'max-return' | 'min-risk' | 'min-drawdown' | 'target-score';

export type WizardStep = 1 | 2 | 3 | 4;

export type InputMode = 'upload' | 'manual' | 'template';

export interface RiskCategory {
  label: string;
  color: string;
  min: number;
  max: number;
}

export const RISK_CATEGORIES: RiskCategory[] = [
  { label: 'Very Conservative', color: '#10b981', min: 1, max: 20 },
  { label: 'Conservative', color: '#34d399', min: 21, max: 40 },
  { label: 'Moderate', color: '#fbbf24', min: 41, max: 60 },
  { label: 'Aggressive', color: '#f97316', min: 61, max: 80 },
  { label: 'Very Aggressive', color: '#ef4444', min: 81, max: 100 },
];

export function getRiskCategory(score: number): string {
  const cat = RISK_CATEGORIES.find(c => score >= c.min && score <= c.max);
  return cat?.label || 'Unknown';
}

export function getRiskColor(score: number): string {
  const cat = RISK_CATEGORIES.find(c => score >= c.min && score <= c.max);
  return cat?.color || '#94a3b8';
}
