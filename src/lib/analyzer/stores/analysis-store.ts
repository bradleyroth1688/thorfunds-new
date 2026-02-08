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
  fetchedTickers: Set<string>; // Tickers we've already fetched from Yahoo

  setReturnsData: (data: ReturnsData) => void;
  runAnalysis: (holdings: Holding[]) => Promise<void>;
  reset: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set, get) => ({
  metrics: null,
  isLoading: false,
  returnsData: null,
  benchmarks: {},
  fetchedTickers: new Set(),

  setReturnsData: (data) => set({ returnsData: data }),

  runAnalysis: async (holdings) => {
    const returnsData = get().returnsData;
    if (!returnsData) return;

    set({ isLoading: true });

    try {
      // Find tickers missing from our returns matrix
      const missingTickers = holdings
        .map(h => h.ticker.toUpperCase())
        .filter(t => !returnsData.returns[t] && !get().fetchedTickers.has(t));

      // Fetch real data from Yahoo for missing tickers
      if (missingTickers.length > 0) {
        try {
          const resp = await fetch('/api/ticker-returns', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tickers: missingTickers, dates: returnsData.dates }),
          });

          if (resp.ok) {
            const data = await resp.json();
            if (data.returns) {
              // Merge fetched returns into our data
              const newReturns = { ...returnsData.returns };
              for (const [ticker, returns] of Object.entries(data.returns)) {
                newReturns[ticker] = returns as number[];
              }
              const updatedData = { ...returnsData, returns: newReturns };
              set({ returnsData: updatedData });
              
              // Track what we've fetched
              const fetched = new Set(get().fetchedTickers);
              missingTickers.forEach(t => fetched.add(t));
              set({ fetchedTickers: fetched });
              
              // Use updated data for analysis
              runAnalysisSync(holdings, updatedData, set);
              return;
            }
          }
        } catch (e) {
          console.warn('Yahoo fetch failed, falling back to proxies:', e);
        }
      }

      // Run with existing data (proxy fallback for anything still missing)
      runAnalysisSync(holdings, returnsData, set);
    } catch (e) {
      console.error('Analysis error:', e);
      set({ isLoading: false });
    }
  },

  reset: () => set({ metrics: null, isLoading: false, benchmarks: {} }),
}));

function runAnalysisSync(
  holdings: Holding[],
  returnsData: ReturnsData,
  set: (partial: Partial<AnalysisState>) => void
) {
  // Resolve proxies for tickers still not in our data
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
}

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
    // Also check uppercase
    if (returnsData.returns[h.ticker.toUpperCase()]) {
      return { ...h, ticker: h.ticker.toUpperCase() };
    }

    // Check explicit proxy map
    let proxy = PROXY_MAP[h.ticker.toUpperCase()];
    
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
