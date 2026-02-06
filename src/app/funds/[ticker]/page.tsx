import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FUNDS, getNavData, getHoldings, getPremiumDiscount, getDistributions, formatCurrency, formatPercent, formatNav, formatNumber } from "@/lib/api";

interface FundPageProps {
  params: Promise<{ ticker: string }>;
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return Object.keys(FUNDS).map((ticker) => ({
    ticker: ticker.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: FundPageProps): Promise<Metadata> {
  const { ticker } = await params;
  const fund = FUNDS[ticker.toUpperCase()];
  
  if (!fund) {
    return { title: "Fund Not Found" };
  }

  return {
    title: `${fund.ticker} - ${fund.name}`,
    description: fund.description,
    openGraph: {
      title: `${fund.ticker} - ${fund.name} | THOR Funds`,
      description: fund.description,
    },
  };
}

export default async function FundPage({ params }: FundPageProps) {
  const { ticker } = await params;
  const fund = FUNDS[ticker.toUpperCase()];

  if (!fund) {
    notFound();
  }

  const [navData, holdings, premiumDiscountData, distributionsRaw] = await Promise.all([
    getNavData(fund.ticker),
    getHoldings(fund.ticker),
    getPremiumDiscount(fund.ticker),
    getDistributions(fund.ticker),
  ]);

  // Process premium/discount data into calendar year summaries
  const premiumDiscountSummary: { year: string; daysAtPremium: number; daysAtNav: number; daysAtDiscount: number }[] = [];
  if (premiumDiscountData && premiumDiscountData.length > 0) {
    const yearMap: Record<string, { premium: number; nav: number; discount: number }> = {};
    for (const quarter of premiumDiscountData) {
      for (const day of quarter.premiumDiscounts) {
        const year = new Date(day.asOfDate).getFullYear().toString();
        if (!yearMap[year]) yearMap[year] = { premium: 0, nav: 0, discount: 0 };
        if (day.premiumDiscount > 0) yearMap[year].premium++;
        else if (day.premiumDiscount < 0) yearMap[year].discount++;
        else yearMap[year].nav++;
      }
    }
    const currentYear = new Date().getFullYear().toString();
    const sortedYears = Object.keys(yearMap).sort((a, b) => parseInt(b) - parseInt(a));
    for (const year of sortedYears) {
      premiumDiscountSummary.push({
        year: year === currentYear ? `${year} YTD` : year,
        daysAtPremium: yearMap[year].premium,
        daysAtNav: yearMap[year].nav,
        daysAtDiscount: yearMap[year].discount,
      });
    }
  }

  // Process distributions
  interface Distribution {
    exDate: string;
    recordDate: string;
    payDate: string;
    income: number | null;
    shortTermGains: number | null;
    longTermGains: number | null;
    totalDistribution: number | null;
  }
  const distributions: Distribution[] = [];
  if (distributionsRaw && Array.isArray(distributionsRaw)) {
    for (const d of distributionsRaw) {
      const parseDistDate = (s: string) => {
        if (!s) return "—";
        // Handle "MM/DD/YYYY HH:MM:SS" format
        const parts = s.split(" ")[0];
        if (!parts) return s;
        const [mm, dd, yyyy] = parts.split("/");
        if (!mm || !dd || !yyyy) return s;
        return new Date(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd)).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      };
      distributions.push({
        exDate: parseDistDate(d.exDate),
        recordDate: parseDistDate(d.recordDate),
        payDate: parseDistDate(d.payDate),
        income: d.income != null ? parseFloat(d.income) : null,
        shortTermGains: d.shortTermGains != null ? parseFloat(d.shortTermGains) : null,
        longTermGains: d.longTermGains != null ? parseFloat(d.longTermGains) : null,
        totalDistribution: d.totalDistribution != null ? parseFloat(d.totalDistribution) : null,
      });
    }
  }

  const topHoldings = holdings?.slice(0, 10) || [];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy-800 py-10 lg:py-14">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-4xl lg:text-5xl font-bold text-gold-500">{fund.ticker}</span>
                <span className="bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium">
                  {fund.strategy}
                </span>
              </div>
              <h1 className="text-xl lg:text-2xl font-semibold text-white">{fund.name}</h1>
              <p className="mt-3 text-gray-300 max-w-2xl text-sm lg:text-base">{fund.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={`/funds/${ticker}/holdings`} className="btn-outline border-white text-white hover:bg-white hover:text-navy-800 text-xs px-3 py-2">
                  Holdings
                </Link>
                <Link href={`/funds/${ticker}/performance`} className="btn-outline border-white text-white hover:bg-white hover:text-navy-800 text-xs px-3 py-2">
                  Performance
                </Link>
                <Link href={`/funds/${ticker}/documents`} className="btn-outline border-white text-white hover:bg-white hover:text-navy-800 text-xs px-3 py-2">
                  Documents
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - THE KEY DATA */}
      <section className="bg-white dark:bg-navy-900 py-8 border-b border-gray-200 dark:border-navy-700">
        <div className="container-wide">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              As of {navData?.navDate || "—"}
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {/* NAV */}
            <div className="bg-gray-50 dark:bg-navy-800 rounded-xl p-5">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">NAV</div>
              <div className="text-3xl font-bold text-navy-800 dark:text-white">
                {navData ? formatNav(navData.nav) : "—"}
              </div>
              {navData && (
                <div className={`text-sm mt-1 font-medium ${navData.navDailyChangePct >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {navData.navDailyChange >= 0 ? '+' : ''}{navData.navDailyChange.toFixed(2)} ({formatPercent(navData.navDailyChangePct)})
                </div>
              )}
            </div>
            
            {/* Market Price */}
            <div className="bg-gray-50 dark:bg-navy-800 rounded-xl p-5">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Market Price</div>
              <div className="text-3xl font-bold text-navy-800 dark:text-white">
                {navData ? formatNav(navData.marketPrice) : "—"}
              </div>
              {navData && (
                <div className={`text-sm mt-1 font-medium ${navData.marketDailyChangePct >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {navData.marketDailyChange >= 0 ? '+' : ''}{navData.marketDailyChange.toFixed(2)} ({formatPercent(navData.marketDailyChangePct)})
                </div>
              )}
            </div>

            {/* Premium/Discount */}
            <div className="bg-gray-50 dark:bg-navy-800 rounded-xl p-5">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Premium/Discount</div>
              {navData && (
                <>
                  <div className={`text-3xl font-bold ${navData.premiumDiscountPct >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {navData.premiumDiscountPct >= 0 ? '+' : ''}{navData.premiumDiscountPct.toFixed(2)}%
                  </div>
                  <div className={`text-sm mt-1 ${navData.premiumDiscount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${Math.abs(navData.premiumDiscount).toFixed(2)} {navData.premiumDiscountPct >= 0 ? 'premium' : 'discount'}
                  </div>
                </>
              )}
              {!navData && <div className="text-3xl font-bold text-navy-800 dark:text-white">—</div>}
            </div>

            {/* Volume */}
            <div className="bg-gray-50 dark:bg-navy-800 rounded-xl p-5">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Volume</div>
              <div className="text-3xl font-bold text-navy-800 dark:text-white">
                {navData ? formatNumber(navData.volume) : "—"}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                shares traded
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats Bar */}
      <section className="bg-navy-900 py-5">
        <div className="container-wide">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-white">
                {navData ? formatCurrency(navData.aum) : "—"}
              </div>
              <div className="text-xs text-gray-400">Total Net Assets</div>
            </div>
            <div>
              <div className={`text-lg font-bold ${navData && navData.returns.ytd >= 0 ? "text-green-400" : "text-red-400"}`}>
                {navData ? formatPercent(navData.returns.ytd) : "—"}
              </div>
              <div className="text-xs text-gray-400">YTD Return</div>
            </div>
            <div>
              <div className={`text-lg font-bold ${navData && navData.returns.oneYear >= 0 ? "text-green-400" : "text-red-400"}`}>
                {navData ? formatPercent(navData.returns.oneYear) : "—"}
              </div>
              <div className="text-xs text-gray-400">1-Year Return</div>
            </div>
            <div>
              <div className={`text-lg font-bold ${navData && navData.returns.sinceInception >= 0 ? "text-green-400" : "text-red-400"}`}>
                {navData ? formatPercent(navData.returns.sinceInception) : "—"}
              </div>
              <div className="text-xs text-gray-400">Since Inception (Ann.)</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                {navData ? formatNumber(navData.shares) : "—"}
              </div>
              <div className="text-xs text-gray-400">Shares Outstanding</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gold-400">
                {fund.expenseRatio.toFixed(2)}%
              </div>
              <div className="text-xs text-gray-400">Expense Ratio</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-wide py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Performance Table - Comprehensive */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-navy-800 dark:text-white">Performance</h2>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  As of {navData?.navDate || "—"}
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200 dark:border-gray-600">
                      <th className="text-left py-3 font-semibold text-navy-800 dark:text-white">Period</th>
                      <th className="text-right py-3 font-semibold text-navy-800 dark:text-white">NAV Return</th>
                      <th className="text-right py-3 font-semibold text-navy-800 dark:text-white">Market Price Return</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {/* Short-term */}
                    <tr className="bg-gray-50/50 dark:bg-navy-800/50">
                      <td colSpan={3} className="py-2 px-0 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Short-Term</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-700 dark:text-gray-300">1 Day</td>
                      <td className={`py-3 text-right font-medium ${navData && navData.returns.oneDay >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.returns.oneDay) : "—"}
                      </td>
                      <td className={`py-3 text-right font-medium ${navData && navData.marketReturns.oneDay >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.marketReturns.oneDay) : "—"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-700 dark:text-gray-300">5 Day</td>
                      <td className={`py-3 text-right font-medium ${navData && navData.returns.fiveDay >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.returns.fiveDay) : "—"}
                      </td>
                      <td className={`py-3 text-right font-medium ${navData && navData.marketReturns.fiveDay >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.marketReturns.fiveDay) : "—"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-700 dark:text-gray-300">7 Day</td>
                      <td className={`py-3 text-right font-medium ${navData && navData.returns.sevenDay >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.returns.sevenDay) : "—"}
                      </td>
                      <td className={`py-3 text-right font-medium ${navData && navData.marketReturns.sevenDay >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.marketReturns.sevenDay) : "—"}
                      </td>
                    </tr>
                    
                    {/* Monthly */}
                    <tr className="bg-gray-50/50 dark:bg-navy-800/50">
                      <td colSpan={3} className="py-2 px-0 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Monthly</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-700 dark:text-gray-300">MTD (Month-to-Date)</td>
                      <td className={`py-3 text-right font-medium ${navData && navData.returns.monthToDate >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.returns.monthToDate) : "—"}
                      </td>
                      <td className={`py-3 text-right font-medium ${navData && navData.marketReturns.monthToDate >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.marketReturns.monthToDate) : "—"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-700 dark:text-gray-300">1 Month</td>
                      <td className={`py-3 text-right font-medium ${navData && navData.returns.oneMonth >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.returns.oneMonth) : "—"}
                      </td>
                      <td className={`py-3 text-right font-medium ${navData && navData.marketReturns.oneMonth >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.marketReturns.oneMonth) : "—"}
                      </td>
                    </tr>

                    {/* Quarterly */}
                    <tr className="bg-gray-50/50 dark:bg-navy-800/50">
                      <td colSpan={3} className="py-2 px-0 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quarterly</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-700 dark:text-gray-300">QTD (Quarter-to-Date)</td>
                      <td className={`py-3 text-right font-medium ${navData && navData.returns.quarterToDate >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.returns.quarterToDate) : "—"}
                      </td>
                      <td className={`py-3 text-right font-medium ${navData && navData.marketReturns.quarterToDate >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.marketReturns.quarterToDate) : "—"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-700 dark:text-gray-300">3 Month</td>
                      <td className={`py-3 text-right font-medium ${navData && navData.returns.threeMonth >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.returns.threeMonth) : "—"}
                      </td>
                      <td className={`py-3 text-right font-medium ${navData && navData.marketReturns.threeMonth >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.marketReturns.threeMonth) : "—"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-700 dark:text-gray-300">6 Month</td>
                      <td className={`py-3 text-right font-medium ${navData && navData.returns.sixMonth >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.returns.sixMonth) : "—"}
                      </td>
                      <td className={`py-3 text-right font-medium ${navData && navData.marketReturns.sixMonth >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.marketReturns.sixMonth) : "—"}
                      </td>
                    </tr>

                    {/* Annual */}
                    <tr className="bg-gray-50/50 dark:bg-navy-800/50">
                      <td colSpan={3} className="py-2 px-0 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Annual</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-700 dark:text-gray-300">YTD (Year-to-Date)</td>
                      <td className={`py-3 text-right font-medium ${navData && navData.returns.ytd >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.returns.ytd) : "—"}
                      </td>
                      <td className={`py-3 text-right font-medium ${navData && navData.marketReturns.ytd >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.marketReturns.ytd) : "—"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-700 dark:text-gray-300">1 Year</td>
                      <td className={`py-3 text-right font-medium ${navData && navData.returns.oneYear >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.returns.oneYear) : "—"}
                      </td>
                      <td className={`py-3 text-right font-medium ${navData && navData.marketReturns.oneYear >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.marketReturns.oneYear) : "—"}
                      </td>
                    </tr>
                    {navData && navData.returns.threeYear !== null && (
                      <tr>
                        <td className="py-3 text-gray-700 dark:text-gray-300">3 Year (Annualized)</td>
                        <td className={`py-3 text-right font-medium ${navData.returns.threeYear >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {formatPercent(navData.returns.threeYear)}
                        </td>
                        <td className={`py-3 text-right font-medium ${navData.marketReturns.threeYear && navData.marketReturns.threeYear >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {formatPercent(navData.marketReturns.threeYear)}
                        </td>
                      </tr>
                    )}
                    {navData && navData.returns.fiveYear !== null && (
                      <tr>
                        <td className="py-3 text-gray-700 dark:text-gray-300">5 Year (Annualized)</td>
                        <td className={`py-3 text-right font-medium ${navData.returns.fiveYear >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {formatPercent(navData.returns.fiveYear)}
                        </td>
                        <td className={`py-3 text-right font-medium ${navData.marketReturns.fiveYear && navData.marketReturns.fiveYear >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {formatPercent(navData.marketReturns.fiveYear)}
                        </td>
                      </tr>
                    )}

                    {/* Since Inception */}
                    <tr className="bg-gold-50 dark:bg-gold-900/20 border-t-2 border-gold-200 dark:border-gold-800">
                      <td className="py-4 font-semibold text-navy-800 dark:text-white">
                        Since Inception (Annualized)
                        <div className="text-xs font-normal text-gray-500 dark:text-gray-400 mt-0.5">
                          Inception: {navData?.inceptionDate || "—"}
                        </div>
                      </td>
                      <td className={`py-4 text-right font-bold text-lg ${navData && navData.returns.sinceInception >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.returns.sinceInception) : "—"}
                      </td>
                      <td className={`py-4 text-right font-bold text-lg ${navData && navData.marketReturns.sinceInception >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.marketReturns.sinceInception) : "—"}
                      </td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-navy-700">
                      <td className="py-3 text-gray-700 dark:text-gray-300">Cumulative Return (Since Inception)</td>
                      <td className={`py-3 text-right font-semibold ${navData && navData.returns.cummSinceInception >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.returns.cummSinceInception) : "—"}
                      </td>
                      <td className={`py-3 text-right font-semibold ${navData && navData.marketReturns.cummSinceInception >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.marketReturns.cummSinceInception) : "—"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 dark:bg-navy-800 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  <strong>Performance Disclosure:</strong> Performance data quoted represents past performance and does not guarantee future results. Investment return and principal value will fluctuate. Current performance may be lower or higher than performance quoted. Returns for periods less than one year are not annualized. Market price returns are based upon the midpoint of the bid/ask spread at 4:00 PM Eastern time.
                </p>
              </div>
              
              <Link href={`/funds/${ticker}/performance`} className="mt-4 inline-flex items-center text-gold-600 font-medium text-sm hover:text-gold-700">
                View Monthly & Quarterly Performance →
              </Link>
            </div>

            {/* Historical Premium/Discount */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-navy-800 dark:text-white">Premium/Discount History</h2>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Historical data showing the difference between the fund&apos;s market price and NAV over time.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200 dark:border-gray-600">
                      <th className="text-left py-3 font-semibold text-navy-800 dark:text-white">Calendar Year</th>
                      <th className="text-center py-3 font-semibold text-navy-800 dark:text-white">Days at Premium</th>
                      <th className="text-center py-3 font-semibold text-navy-800 dark:text-white">Days at NAV</th>
                      <th className="text-center py-3 font-semibold text-navy-800 dark:text-white">Days at Discount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {premiumDiscountSummary.length > 0 ? (
                      premiumDiscountSummary.map((row, i) => (
                        <tr key={i}>
                          <td className="py-3 text-gray-700 dark:text-gray-300 font-medium">{row.year}</td>
                          <td className="py-3 text-center text-green-600 font-medium">{row.daysAtPremium}</td>
                          <td className="py-3 text-center text-gray-600 dark:text-gray-300 font-medium">{row.daysAtNav}</td>
                          <td className="py-3 text-center text-red-600 font-medium">{row.daysAtDiscount}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-gray-500 dark:text-gray-400">
                          Premium/discount history data unavailable
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 dark:bg-navy-800 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Premium/discount data shows the number of days the fund traded above (premium), at, or below (discount) its net asset value.
                </p>
              </div>
            </div>

            {/* Distribution History */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-navy-800 dark:text-white">Distribution History</h2>
              </div>
              
              {distributions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200 dark:border-gray-600">
                        <th className="text-left py-3 font-semibold text-navy-800 dark:text-white">Ex-Date</th>
                        <th className="text-left py-3 font-semibold text-navy-800 dark:text-white">Record Date</th>
                        <th className="text-left py-3 font-semibold text-navy-800 dark:text-white">Pay Date</th>
                        <th className="text-right py-3 font-semibold text-navy-800 dark:text-white">Income</th>
                        <th className="text-right py-3 font-semibold text-navy-800 dark:text-white">ST Gains</th>
                        <th className="text-right py-3 font-semibold text-navy-800 dark:text-white">LT Gains</th>
                        <th className="text-right py-3 font-semibold text-navy-800 dark:text-white">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {distributions.map((dist, i) => (
                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-navy-700/50">
                          <td className="py-3 text-gray-700 dark:text-gray-300">{dist.exDate}</td>
                          <td className="py-3 text-gray-700 dark:text-gray-300">{dist.recordDate}</td>
                          <td className="py-3 text-gray-700 dark:text-gray-300">{dist.payDate}</td>
                          <td className="py-3 text-right font-mono text-gray-700 dark:text-gray-300">
                            {dist.income != null ? `$${dist.income.toFixed(4)}` : "—"}
                          </td>
                          <td className="py-3 text-right font-mono text-gray-700 dark:text-gray-300">
                            {dist.shortTermGains != null ? `$${dist.shortTermGains.toFixed(4)}` : "—"}
                          </td>
                          <td className="py-3 text-right font-mono text-gray-700 dark:text-gray-300">
                            {dist.longTermGains != null ? `$${dist.longTermGains.toFixed(4)}` : "—"}
                          </td>
                          <td className="py-3 text-right font-mono font-semibold text-navy-800 dark:text-white">
                            {dist.totalDistribution != null ? `$${dist.totalDistribution.toFixed(4)}` : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 py-8 text-center">No distribution history available</p>
              )}
              
              <div className="mt-6 p-4 bg-gray-50 dark:bg-navy-800 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Past distributions are not indicative of future distributions. The fund may pay distributions of income and/or capital gains to shareholders.
                </p>
              </div>
            </div>

            {/* Holdings */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-navy-800 dark:text-white">Current Holdings</h2>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {topHoldings.length > 0 ? `As of ${navData?.navDate || "—"}` : ""}
                </span>
              </div>
              
              {topHoldings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200 dark:border-gray-600">
                        <th className="text-left py-3 font-semibold text-navy-800 dark:text-white">Holding</th>
                        <th className="text-right py-3 font-semibold text-navy-800 dark:text-white">Shares</th>
                        <th className="text-right py-3 font-semibold text-navy-800 dark:text-white">Market Value</th>
                        <th className="text-right py-3 font-semibold text-navy-800 dark:text-white">Weight</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {topHoldings.map((holding, i) => (
                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-navy-700/50">
                          <td className="py-3">
                            <div className="font-semibold text-navy-800 dark:text-white">{holding.ticker}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]">{holding.name}</div>
                          </td>
                          <td className="py-3 text-right text-gray-700 dark:text-gray-300 font-mono text-xs">
                            {holding.shares ? holding.shares.toLocaleString() : "—"}
                          </td>
                          <td className="py-3 text-right text-gray-700 dark:text-gray-300">
                            {holding.marketValue ? formatCurrency(holding.marketValue) : "—"}
                          </td>
                          <td className="py-3 text-right">
                            <span className="font-semibold text-navy-800 dark:text-white">
                              {holding.weight.toFixed(2)}%
                            </span>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                              <div 
                                className="bg-gold-500 h-1.5 rounded-full" 
                                style={{ width: `${Math.min(holding.weight * 5, 100)}%` }}
                              ></div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-navy-800">
                        <td className="py-3 font-semibold text-navy-800 dark:text-white">Total (Top {topHoldings.length})</td>
                        <td className="py-3 text-right text-gray-700 dark:text-gray-300">—</td>
                        <td className="py-3 text-right text-gray-700 dark:text-gray-300">—</td>
                        <td className="py-3 text-right font-bold text-navy-800 dark:text-white">
                          {topHoldings.reduce((sum, h) => sum + h.weight, 0).toFixed(2)}%
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 py-8 text-center">Holdings data unavailable</p>
              )}
              
              <div className="mt-6 flex items-center justify-between">
                <Link href={`/funds/${ticker}/holdings`} className="inline-flex items-center text-gold-600 font-medium text-sm hover:text-gold-700">
                  View All Holdings & Sector Breakdown →
                </Link>
                <Link href={`/funds/${ticker}/holdings`} className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                  Download CSV
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            
            {/* Fund Facts - Complete */}
            <div className="card">
              <h3 className="text-lg font-semibold text-navy-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                Fund Facts
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Ticker</dt>
                  <dd className="font-bold text-navy-800 dark:text-white">{fund.ticker}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">CUSIP</dt>
                  <dd className="font-medium text-navy-800 dark:text-white font-mono">{navData?.cusip || "—"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Exchange</dt>
                  <dd className="font-medium text-navy-800 dark:text-white">NYSE Arca</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Inception Date</dt>
                  <dd className="font-medium text-navy-800 dark:text-white">{navData?.inceptionDate || "—"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Expense Ratio</dt>
                  <dd className="font-bold text-gold-600">{fund.expenseRatio.toFixed(2)}%</dd>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700 pt-3 mt-3">
                  <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Total Net Assets</dt>
                    <dd className="font-medium text-navy-800 dark:text-white">{navData ? formatCurrency(navData.aum) : "—"}</dd>
                  </div>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Shares Outstanding</dt>
                  <dd className="font-medium text-navy-800 dark:text-white">{navData ? formatNumber(navData.shares) : "—"}</dd>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700 pt-3 mt-3">
                  <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Strategy</dt>
                    <dd className="font-medium text-navy-800 dark:text-white">{fund.strategy}</dd>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <dt className="text-gray-500 dark:text-gray-400">Benchmark</dt>
                  <dd className="font-medium text-navy-800 dark:text-white text-right max-w-[160px] text-xs">{fund.benchmark}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Distributor</dt>
                  <dd className="font-medium text-navy-800 dark:text-white">PINE Distributors</dd>
                </div>
              </dl>
            </div>

            {/* Distribution Info */}
            <div className="card">
              <h3 className="text-lg font-semibold text-navy-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                Distribution Info
              </h3>
              {navData && (navData.dividendPerShare > 0 || navData.exDate) ? (
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Dividend/Share</dt>
                    <dd className="font-medium text-navy-800 dark:text-white">
                      ${navData.dividendPerShare.toFixed(4)}
                    </dd>
                  </div>
                  {navData.exDate && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500 dark:text-gray-400">Ex-Date</dt>
                      <dd className="font-medium text-navy-800 dark:text-white">{navData.exDate}</dd>
                    </div>
                  )}
                  {navData.recordDate && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500 dark:text-gray-400">Record Date</dt>
                      <dd className="font-medium text-navy-800 dark:text-white">{navData.recordDate}</dd>
                    </div>
                  )}
                  {navData.paymentDate && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500 dark:text-gray-400">Payment Date</dt>
                      <dd className="font-medium text-navy-800 dark:text-white">{navData.paymentDate}</dd>
                    </div>
                  )}
                </dl>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No distributions to date
                </p>
              )}
            </div>

            {/* Documents */}
            <div className="card">
              <h3 className="text-lg font-semibold text-navy-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                Fund Documents
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="/documents/thor-funds-prospectus.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-gold-600 hover:text-gold-700 font-medium">
                    <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    Prospectus
                  </a>
                </li>
                <li>
                  <a href={`/documents/${fund.ticker.toLowerCase()}-summary-prospectus.pdf`} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-gold-600 hover:text-gold-700 font-medium">
                    <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    Summary Prospectus
                  </a>
                </li>
                <li>
                  <a href={`/documents/${fund.ticker.toLowerCase()}-annual-report.pdf`} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-gold-600 hover:text-gold-700 font-medium">
                    <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5" />
                    </svg>
                    Annual Report
                  </a>
                </li>
                <li>
                  <a href={`/documents/${fund.ticker.toLowerCase()}-semi-annual-report.pdf`} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-gold-600 hover:text-gold-700 font-medium">
                    <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5" />
                    </svg>
                    Semi-Annual Report
                  </a>
                </li>
                {fund.ticker === "THLV" && (
                  <li>
                    <a href="/documents/thlv-q1-holdings.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-gold-600 hover:text-gold-700 font-medium">
                      <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5" />
                      </svg>
                      Q1 Holdings Report
                    </a>
                  </li>
                )}
                <li>
                  <a href="/documents/thor-funds-sai.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-gold-600 hover:text-gold-700 font-medium">
                    <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    Statement of Additional Information (SAI)
                  </a>
                </li>
                <li>
                  <a href="/documents/thor-n-px.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-gold-600 hover:text-gold-700 font-medium">
                    <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
                    </svg>
                    Proxy Voting Record (N-PX)
                  </a>
                </li>
              </ul>
            </div>

            {/* Learn More */}
            <div className="card bg-navy-800 text-white">
              <h3 className="text-lg font-semibold mb-2">Understand the Strategy</h3>
              <p className="text-gray-300 text-sm mb-4">
                Learn how {fund.ticker}&apos;s {fund.strategy.toLowerCase()} approach works and how it fits in portfolios.
              </p>
              <Link
                href={fund.ticker === "THIR" ? "/learn/index-rotation-explained" : "/learn/low-volatility-investing"}
                className="inline-flex items-center text-gold-500 font-medium text-sm hover:text-gold-400"
              >
                Read Strategy Guide →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer Footer */}
      <section className="bg-gray-100 dark:bg-navy-800 py-8">
        <div className="container-wide">
          <div className="prose prose-sm max-w-none">
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
              <strong>Important Risk Information:</strong> Investing involves risk, including possible loss of principal. The fund&apos;s strategy may not accurately identify market turning points, and the fund may be fully invested in declining markets or in cash during rising markets. ETF shares are bought and sold at market price (not NAV) and are not individually redeemed from the fund.
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Investors should consider the investment objectives, risks, charges, and expenses carefully before investing. The prospectus contains this and other information about the fund. Please read the prospectus carefully before investing. Distributed by PINE Distributors LLC.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
