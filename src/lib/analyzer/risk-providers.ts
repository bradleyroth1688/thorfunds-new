// Risk Provider definitions and normalization

export interface RiskProvider {
  id: string;
  name: string;
  min: number;
  max: number;
  unit: string;
  step?: number;
}

export const RISK_PROVIDERS: RiskProvider[] = [
  { id: 'nitrogen', name: 'Nitrogen (Riskalyze)', min: 1, max: 99, unit: 'Risk Number' },
  { id: 'stratifi', name: 'StratiFi', min: 1, max: 10, unit: 'PRISM Rating', step: 0.1 },
  { id: 'orion', name: 'Orion Risk Intelligence', min: 0, max: 100, unit: 'Risk Score' },
  { id: 'morningstar_mprs', name: 'Morningstar Portfolio Risk', min: 100, max: 600, unit: 'MPRS Score' },
  { id: 'tolerisk', name: 'Tolerisk', min: 0, max: 100, unit: 'Equity %' },
  { id: 'finametrica', name: 'FinaMetrica', min: 0, max: 100, unit: 'Risk Score' },
  { id: 'none', name: "I don't have one", min: 0, max: 0, unit: '' },
];

export function normalizeToInternal(score: number, provider: string): number {
  switch (provider) {
    case 'nitrogen': return Math.round(score);
    case 'stratifi': return Math.round((score - 1) * (98 / 9) + 1);
    case 'orion': return Math.min(99, Math.max(1, Math.round(score * 0.99)));
    case 'morningstar_mprs': return Math.round(((score - 100) / 500) * 98 + 1);
    case 'tolerisk': return Math.max(1, Math.round(score * 0.99));
    case 'finametrica': return Math.max(1, Math.round(score * 0.99));
    default: return Math.round(score);
  }
}

export interface RiskProfile {
  label: string;
  downside6m: string;
  color: string;
}

export function getRiskProfile(internalScore: number): RiskProfile {
  if (internalScore <= 15) return { label: 'Very Conservative', downside6m: '~2-4%', color: '#10b981' };
  if (internalScore <= 30) return { label: 'Conservative', downside6m: '~5-8%', color: '#34d399' };
  if (internalScore <= 45) return { label: 'Moderately Conservative', downside6m: '~9-13%', color: '#a3e635' };
  if (internalScore <= 60) return { label: 'Moderate', downside6m: '~14-19%', color: '#fbbf24' };
  if (internalScore <= 75) return { label: 'Moderately Aggressive', downside6m: '~20-25%', color: '#f97316' };
  if (internalScore <= 90) return { label: 'Aggressive', downside6m: '~26-35%', color: '#ef4444' };
  return { label: 'Very Aggressive', downside6m: '~36%+', color: '#dc2626' };
}
