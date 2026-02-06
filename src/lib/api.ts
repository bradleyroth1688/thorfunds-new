const API_BASE = "https://filepoint.live";

export interface FundInfo {
  ticker: string;
  name: string;
  fullName: string;
  fundId: string;
  description: string;
  benchmark: string;
  strategy: string;
  expenseRatio: number;
}

export const FUNDS: Record<string, FundInfo> = {
  THIR: {
    ticker: "THIR",
    name: "THOR SDQ Index Rotation ETF",
    fullName: "THOR SDQ Index Rotation ETF",
    fundId: "1469",
    description: "A risk-managed ETF that rotates between major U.S. equity indexes (S&P 500, Dow Jones, Nasdaq 100) based on risk signals, with the ability to move to 100% short-term treasuries.",
    benchmark: "SPDR S&P 500 ETF Trust (SPY)",
    strategy: "Index Rotation",
    expenseRatio: 0.99,
  },
  THLV: {
    ticker: "THLV",
    name: "THOR Low Volatility ETF",
    fullName: "THOR U.S. Sector Low Volatility ETF",
    fundId: "1468",
    description: "An equal-weight low volatility ETF that dynamically allocates across 10 S&P 500 sectors based on risk signals, with the ability to move to cash when markets deteriorate.",
    benchmark: "iShares MSCI USA Min Vol Factor ETF (USMV)",
    strategy: "Low Volatility",
    expenseRatio: 0.99,
  },
};

export interface NavData {
  // Core NAV data
  nav: number;
  navDate: string;
  navDailyChange: number;
  navDailyChangePct: number;
  
  // Market data
  marketPrice: number;
  marketDailyChange: number;
  marketDailyChangePct: number;
  
  // Premium/discount
  premiumDiscount: number;
  premiumDiscountPct: number;
  
  // Fund info
  aum: number;
  shares: number;
  cusip: string;
  inceptionDate: string;
  fundName: string;
  
  // NAV-based returns (all periods)
  returns: {
    oneDay: number;
    fiveDay: number;
    sevenDay: number;
    monthToDate: number;
    oneMonth: number;
    quarterToDate: number;
    threeMonth: number;
    sixMonth: number;
    ytd: number;
    oneYear: number;
    threeYear: number | null;
    fiveYear: number | null;
    sinceInception: number;
    cummSinceInception: number;
  };
  
  // Market price returns
  marketReturns: {
    oneDay: number;
    fiveDay: number;
    sevenDay: number;
    monthToDate: number;
    oneMonth: number;
    quarterToDate: number;
    threeMonth: number;
    sixMonth: number;
    ytd: number;
    oneYear: number;
    threeYear: number | null;
    fiveYear: number | null;
    sinceInception: number;
    cummSinceInception: number;
  };
  
  // Dividend info
  dividendPerShare: number;
  distributionFactor: number;
  exDate: string;
  recordDate: string;
  paymentDate: string;
  
  // Volume
  volume: number;
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

export interface PremiumDiscountRecord {
  asOfDate: string;
  marketPrice: number;
  nav: number;
  premiumDiscount: number;
  premiumDiscountPercent: number;
}

export interface QuarterlyPremiumDiscount {
  quarterStartDate: string;
  quarterEndDate: string;
  premiumDiscounts: PremiumDiscountRecord[];
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
  if (!data || !Array.isArray(data) || data.length === 0) return null;

  const d = data[0];
  
  // Parse date from ISO format
  const performDate = d.performDate ? new Date(d.performDate).toLocaleDateString('en-US', { 
    month: 'short', day: 'numeric', year: 'numeric' 
  }) : "";
  
  const inceptionDate = d.fundInceptionDate ? new Date(d.fundInceptionDate).toLocaleDateString('en-US', { 
    month: 'short', day: 'numeric', year: 'numeric' 
  }) : "";

  return {
    // Core NAV data
    nav: parseFloat(d.naV_NoLoad) || 0,
    navDate: performDate,
    navDailyChange: parseFloat(d.navDailyChange) || 0,
    navDailyChangePct: parseFloat(d.oneDay_NoLoad) || 0,
    
    // Market data
    marketPrice: parseFloat(d.marketPrice) || 0,
    marketDailyChange: parseFloat(d.marketDailyChange) || 0,
    marketDailyChangePct: parseFloat(d.marketOneDay) || 0,
    
    // Premium/discount
    premiumDiscount: parseFloat(d.premiumDiscount) || 0,
    premiumDiscountPct: parseFloat(d.premiumDiscountPct) || 0,
    
    // Fund info
    aum: parseFloat(d.totalNetAssets) || 0,
    shares: parseFloat(d.sharesOutstanding) || 0,
    cusip: String(d.cusip || ""),
    inceptionDate: inceptionDate,
    fundName: String(d.fundName || ""),
    
    // NAV-based returns
    returns: {
      oneDay: parseFloat(d.oneDay_NoLoad) || 0,
      fiveDay: parseFloat(d.fiveDay_NoLoad) || 0,
      sevenDay: parseFloat(d.sevenDay_NoLoad) || 0,
      monthToDate: parseFloat(d.monthToDate_NoLoad) || 0,
      oneMonth: parseFloat(d.oneMonth_NoLoad) || 0,
      quarterToDate: parseFloat(d.quarterEndToDate_NoLoad) || 0,
      threeMonth: parseFloat(d.threeMonth_NoLoad) || 0,
      sixMonth: parseFloat(d.sixMonth_NoLoad) || 0,
      ytd: parseFloat(d.yearToDate_NoLoad) || 0,
      oneYear: parseFloat(d.oneYear_NoLoad) || 0,
      threeYear: d.threeYear_NoLoad != null ? parseFloat(d.threeYear_NoLoad) : null,
      fiveYear: d.fiveYear_NoLoad != null ? parseFloat(d.fiveYear_NoLoad) : null,
      sinceInception: parseFloat(d.sinceInception_NoLoad) || 0,
      cummSinceInception: parseFloat(d.cummSinceInception_NoLoad) || 0,
    },
    
    // Market price returns
    marketReturns: {
      oneDay: parseFloat(d.marketOneDay) || 0,
      fiveDay: parseFloat(d.marketFiveDay) || 0,
      sevenDay: parseFloat(d.marketSevenDay) || 0,
      monthToDate: parseFloat(d.marketMonthToDate) || 0,
      oneMonth: parseFloat(d.marketOneMonth) || 0,
      quarterToDate: parseFloat(d.marketQuarterEndToDate) || 0,
      threeMonth: parseFloat(d.marketThreeMonth) || 0,
      sixMonth: parseFloat(d.marketSixMonth) || 0,
      ytd: parseFloat(d.marketYearToDate) || 0,
      oneYear: parseFloat(d.marketYear) || 0,
      threeYear: d.marketThreeYear != null ? parseFloat(d.marketThreeYear) : null,
      fiveYear: d.marketFiveYear != null ? parseFloat(d.marketFiveYear) : null,
      sinceInception: parseFloat(d.marketInception) || 0,
      cummSinceInception: parseFloat(d.marketCummSinceInception) || 0,
    },
    
    // Dividend info
    dividendPerShare: parseFloat(d.dividendPerShare) || 0,
    distributionFactor: parseFloat(d.distributionFactor) || 0,
    exDate: d.exDate || "",
    recordDate: d.recordDate || "",
    paymentDate: d.paymentDate || "",
    
    // Volume
    volume: parseFloat(d.volume) || 0,
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

export async function getPremiumDiscount(ticker: string): Promise<QuarterlyPremiumDiscount[] | null> {
  const fund = FUNDS[ticker.toUpperCase()];
  if (!fund) return null;

  const data = await fetchApi("/thor_getpremium_cached4.php", fund.fundId);
  if (!data || !Array.isArray(data)) return null;

  return data.map((q: Record<string, unknown>) => ({
    quarterStartDate: String(q.quarterStartDate || ""),
    quarterEndDate: String(q.quarterEndDate || ""),
    premiumDiscounts: Array.isArray(q.premiumDiscounts) 
      ? q.premiumDiscounts.map((pd: Record<string, unknown>) => ({
          asOfDate: String(pd.asOfDate || ""),
          marketPrice: parseFloat(String(pd.marketPrice)) || 0,
          nav: parseFloat(String(pd.nav)) || 0,
          premiumDiscount: parseFloat(String(pd.premiumDiscount)) || 0,
          premiumDiscountPercent: parseFloat(String(pd.premiumDiscountPercent)) || 0,
        }))
      : [],
  }));
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

export function formatPercent(value: number | null, decimals = 2): string {
  if (value === null) return "—";
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
}

export function formatNav(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString();
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}
