'use client';

import { create } from 'zustand';
import { PortfolioMetrics, ReturnsData, Holding } from '../types';
import { calculateAllMetrics } from '../risk-engine';
import { calculateRiskScore } from '../scoring';

interface AnalysisState {
  metrics: PortfolioMetrics | null;
  isLoading: boolean;
  returnsData: ReturnsData | null;
  benchmarks: Record<string, PortfolioMetrics>;

  setReturnsData: (data: ReturnsData) => void;
  runAnalysis: (holdings: Holding[]) => void;
  reset: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set, get) => ({
  metrics: null,
  isLoading: false,
  returnsData: null,
  benchmarks: {},

  setReturnsData: (data) => set({ returnsData: data }),

  runAnalysis: (holdings) => {
    const returnsData = get().returnsData;
    if (!returnsData) return;

    set({ isLoading: true });

    // Use setTimeout to avoid blocking the UI
    setTimeout(() => {
      // Resolve proxies for tickers not in our data
      const resolvedHoldings = resolveProxies(holdings, returnsData);
      const metrics = calculateAllMetrics(resolvedHoldings, returnsData);
      const riskScore = calculateRiskScore(holdings, metrics);
      metrics.riskScore = riskScore;

      // Compute benchmark metrics
      const benchmarkPortfolios: Record<string, Holding[]> = {
        'S&P 500': [{ ticker: 'SPY', name: 'S&P 500', allocation: 100, type: 'etf' }],
        '60/40': [
          { ticker: 'SPY', name: 'S&P 500', allocation: 60, type: 'etf' },
          { ticker: 'AGG', name: 'Agg Bond', allocation: 40, type: 'bond' },
        ],
        'Bonds': [{ ticker: 'AGG', name: 'Agg Bond', allocation: 100, type: 'bond' }],
      };

      const benchmarks: Record<string, PortfolioMetrics> = {};
      for (const [name, bHoldings] of Object.entries(benchmarkPortfolios)) {
        const bMetrics = calculateAllMetrics(bHoldings, returnsData);
        bMetrics.riskScore = calculateRiskScore(bHoldings, bMetrics);
        benchmarks[name] = bMetrics;
      }

      set({ metrics, benchmarks, isLoading: false });
    }, 50);
  },

  reset: () => set({ metrics: null, isLoading: false, benchmarks: {} }),
}));

// ===== PROXY RESOLUTION =====
// Maps unknown tickers to sector-appropriate proxies for analysis

const PROXY_MAP: Record<string, string> = {
  // Money market / cash equivalents → BIL
  'SWVXX': 'BIL', 'SPAXX': 'BIL', 'VMFXX': 'BIL', 'FDRXX': 'BIL', 'SWTSX': 'VTI',
};

const SECTOR_PROXIES: Record<string, string> = {
  'technology': 'XLK', 'financial': 'XLF', 'healthcare': 'XLV', 'energy': 'XLE',
  'industrial': 'XLI', 'materials': 'XLB', 'consumer discretionary': 'XLY',
  'consumer staples': 'XLP', 'utilities': 'XLU', 'real estate': 'XLRE',
  'communication': 'XLK',
};

const TYPE_PROXIES: Record<string, string> = {
  'etf': 'VTI', 'stock': 'SPY', 'mutual_fund': 'VTI', 'bond': 'AGG', 'cash': 'BIL',
};

function resolveProxies(holdings: Holding[], returnsData: ReturnsData): Holding[] {
  return holdings.map(h => {
    // Already have data for this ticker
    if (returnsData.returns[h.ticker]) return h;

    // Check explicit proxy map
    let proxy = PROXY_MAP[h.ticker];
    
    // Try sector proxy
    if (!proxy && h.sector) {
      const sectorLower = h.sector.toLowerCase();
      for (const [key, val] of Object.entries(SECTOR_PROXIES)) {
        if (sectorLower.includes(key)) { proxy = val; break; }
      }
    }

    // Fall back to type proxy
    if (!proxy) proxy = TYPE_PROXIES[h.type] || 'VTI';

    // Only use proxy if we actually have data for it
    if (returnsData.returns[proxy]) {
      return { ...h, proxyTicker: proxy };
    }

    return h;
  });
}
