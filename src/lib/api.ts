const API_BASE = "https://filepoint.live";

export interface FundInfo {
  ticker: string;
  name: string;
  fullName: string;
  fundId: string;
  description: string;
  benchmark: string;
  strategy: string;
}

export const FUNDS: Record<string, FundInfo> = {
  THIR: {
    ticker: "THIR",
    name: "THOR SDQ Index Rotation ETF",
    fullName: "THOR SDQ Index Rotation ETF",
    fundId: "1469",
    description: "A tactical ETF that rotates between major U.S. equity indexes (S&P 500, Dow Jones, Nasdaq 100) based on risk signals, with the ability to move to 100% short-term treasuries.",
    benchmark: "SPDR S&P 500 ETF Trust (SPY)",
    strategy: "Index Rotation",
  },
  THLV: {
    ticker: "THLV",
    name: "THOR Low Volatility ETF",
    fullName: "THOR U.S. Sector Low Volatility ETF",
    fundId: "1468",
    description: "An equal-weight low volatility ETF that dynamically allocates across 10 S&P 500 sectors based on risk signals, with the ability to move to cash when markets deteriorate.",
    benchmark: "iShares MSCI USA Min Vol Factor ETF (USMV)",
    strategy: "Low Volatility",
  },
};

export interface NavData {
  nav: number;
  navDate: string;
  aum: number;
  shares: number;
  returns: {
    oneMonth: number;
    threeMonth: number;
    ytd: number;
    oneYear: number;
    threeYear: number;
    fiveYear: number;
    sinceInception: number;
  };
}

export interface Holding {
  ticker: string;
  name: string;
  weight: number;
  shares: number;
  marketValue: number;
  sector?: string;
}

export interface PerformanceData {
  period: string;
  fundReturn: number;
  benchmarkReturn: number;
  date: string;
}

async function fetchApi(endpoint: string, fundId: string) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `fundID=${fundId}`,
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint} for fund ${fundId}:`, error);
    return null;
  }
}

export async function getNavData(ticker: string): Promise<NavData | null> {
  const fund = FUNDS[ticker.toUpperCase()];
  if (!fund) return null;

  const data = await fetchApi("/thor_getnav_cached4.php", fund.fundId);
  if (!data) return null;

  // Transform API response to our interface
  return {
    nav: parseFloat(data.nav) || 0,
    navDate: data.navDate || "",
    aum: parseFloat(data.aum) || 0,
    shares: parseFloat(data.shares) || 0,
    returns: {
      oneMonth: parseFloat(data.oneMonth) || 0,
      threeMonth: parseFloat(data.threeMonth) || 0,
      ytd: parseFloat(data.ytd) || 0,
      oneYear: parseFloat(data.oneYear) || 0,
      threeYear: parseFloat(data.threeYear) || 0,
      fiveYear: parseFloat(data.fiveYear) || 0,
      sinceInception: parseFloat(data.sinceInception) || 0,
    },
  };
}

export async function getHoldings(ticker: string): Promise<Holding[] | null> {
  const fund = FUNDS[ticker.toUpperCase()];
  if (!fund) return null;

  const data = await fetchApi("/thor_getholdings_cached4.php", fund.fundId);
  if (!data || !Array.isArray(data)) return null;

  return data.map((h: Record<string, unknown>) => ({
    ticker: String(h.ticker || ""),
    name: String(h.name || ""),
    weight: parseFloat(String(h.weight)) || 0,
    shares: parseFloat(String(h.shares)) || 0,
    marketValue: parseFloat(String(h.marketValue)) || 0,
    sector: h.sector ? String(h.sector) : undefined,
  }));
}

export async function getQuarterlyPerformance(ticker: string): Promise<PerformanceData[] | null> {
  const fund = FUNDS[ticker.toUpperCase()];
  if (!fund) return null;

  const data = await fetchApi("/thor_get_q_performance_cached4.php", fund.fundId);
  if (!data || !Array.isArray(data)) return null;

  return data.map((p: Record<string, unknown>) => ({
    period: String(p.period || ""),
    fundReturn: parseFloat(String(p.fundReturn)) || 0,
    benchmarkReturn: parseFloat(String(p.benchmarkReturn)) || 0,
    date: String(p.date || ""),
  }));
}

export async function getMonthlyPerformance(ticker: string): Promise<PerformanceData[] | null> {
  const fund = FUNDS[ticker.toUpperCase()];
  if (!fund) return null;

  const data = await fetchApi("/thor_get_m_performance_cached4.php", fund.fundId);
  if (!data || !Array.isArray(data)) return null;

  return data.map((p: Record<string, unknown>) => ({
    period: String(p.period || ""),
    fundReturn: parseFloat(String(p.fundReturn)) || 0,
    benchmarkReturn: parseFloat(String(p.benchmarkReturn)) || 0,
    date: String(p.date || ""),
  }));
}

export async function getPremiumDiscount(ticker: string) {
  const fund = FUNDS[ticker.toUpperCase()];
  if (!fund) return null;

  return fetchApi("/thor_getpremium_cached4.php", fund.fundId);
}

// Utility functions
export function formatCurrency(value: number): string {
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  }
  if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  }
  return `$${value.toLocaleString()}`;
}

export function formatPercent(value: number, decimals = 2): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
}

export function formatNav(value: number): string {
  return `$${value.toFixed(2)}`;
}
