import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FUNDS, getNavData, getHoldings, formatCurrency, formatPercent, formatNav } from "@/lib/api";

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

  const [navData, holdings] = await Promise.all([
    getNavData(fund.ticker),
    getHoldings(fund.ticker),
  ]);

  const topHoldings = holdings?.slice(0, 10) || [];

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 py-12 lg:py-16">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-4">
                <span className="text-4xl lg:text-5xl font-bold text-gold-500">{fund.ticker}</span>
                <span className="bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium">
                  {fund.strategy}
                </span>
              </div>
              <h1 className="mt-2 text-2xl lg:text-3xl font-semibold text-white">{fund.name}</h1>
              <p className="mt-4 text-gray-300 max-w-2xl">{fund.description}</p>
            </div>
            <div className="flex gap-3">
              <Link href={`/funds/${ticker}/holdings`} className="btn-outline border-white text-white hover:bg-white hover:text-navy-800 text-sm">
                Holdings
              </Link>
              <Link href={`/funds/${ticker}/performance`} className="btn-outline border-white text-white hover:bg-white hover:text-navy-800 text-sm">
                Performance
              </Link>
              <Link href={`/funds/${ticker}/documents`} className="btn-outline border-white text-white hover:bg-white hover:text-navy-800 text-sm">
                Documents
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-navy-800">
                {navData ? formatNav(navData.nav) : "—"}
              </div>
              <div className="text-sm text-gray-600 mt-1">NAV</div>
              <div className="text-xs text-gray-400">
                {navData?.navDate ? `As of ${navData.navDate}` : ""}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-navy-800">
                {navData ? formatCurrency(navData.aum) : "—"}
              </div>
              <div className="text-sm text-gray-600 mt-1">AUM</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl lg:text-3xl font-bold ${navData && navData.returns.ytd >= 0 ? "text-green-600" : "text-red-600"}`}>
                {navData ? formatPercent(navData.returns.ytd) : "—"}
              </div>
              <div className="text-sm text-gray-600 mt-1">YTD Return</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl lg:text-3xl font-bold ${navData && navData.returns.oneYear >= 0 ? "text-green-600" : "text-red-600"}`}>
                {navData ? formatPercent(navData.returns.oneYear) : "—"}
              </div>
              <div className="text-sm text-gray-600 mt-1">1 Year</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl lg:text-3xl font-bold ${navData && navData.returns.sinceInception >= 0 ? "text-green-600" : "text-red-600"}`}>
                {navData ? formatPercent(navData.returns.sinceInception) : "—"}
              </div>
              <div className="text-sm text-gray-600 mt-1">Since Inception</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-wide section-padding">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Performance Table */}
            <div className="card">
              <h2 className="text-xl font-semibold text-navy-800 mb-4">Performance</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 font-medium text-gray-700">Period</th>
                      <th className="text-right py-3 font-medium text-gray-700">{fund.ticker}</th>
                      <th className="text-right py-3 font-medium text-gray-700">Benchmark</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-3 text-gray-600">1 Month</td>
                      <td className={`py-3 text-right font-medium ${navData && navData.returns.oneMonth >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.returns.oneMonth) : "—"}
                      </td>
                      <td className="py-3 text-right text-gray-500">—</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-600">3 Months</td>
                      <td className={`py-3 text-right font-medium ${navData && navData.returns.threeMonth >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.returns.threeMonth) : "—"}
                      </td>
                      <td className="py-3 text-right text-gray-500">—</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-600">YTD</td>
                      <td className={`py-3 text-right font-medium ${navData && navData.returns.ytd >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.returns.ytd) : "—"}
                      </td>
                      <td className="py-3 text-right text-gray-500">—</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-600">1 Year</td>
                      <td className={`py-3 text-right font-medium ${navData && navData.returns.oneYear >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.returns.oneYear) : "—"}
                      </td>
                      <td className="py-3 text-right text-gray-500">—</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-600">3 Years (Ann.)</td>
                      <td className={`py-3 text-right font-medium ${navData && navData.returns.threeYear >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.returns.threeYear) : "—"}
                      </td>
                      <td className="py-3 text-right text-gray-500">—</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-600">Since Inception</td>
                      <td className={`py-3 text-right font-medium ${navData && navData.returns.sinceInception >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {navData ? formatPercent(navData.returns.sinceInception) : "—"}
                      </td>
                      <td className="py-3 text-right text-gray-500">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                Performance data is historical and does not guarantee future results. Current performance may be higher or lower.
              </p>
              <Link href={`/funds/${ticker}/performance`} className="mt-4 inline-flex items-center text-gold-600 font-medium text-sm hover:text-gold-700">
                View Full Performance
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Top Holdings */}
            <div className="card">
              <h2 className="text-xl font-semibold text-navy-800 mb-4">Top Holdings</h2>
              {topHoldings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 font-medium text-gray-700">Holding</th>
                        <th className="text-right py-3 font-medium text-gray-700">Weight</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {topHoldings.map((holding, i) => (
                        <tr key={i}>
                          <td className="py-3">
                            <span className="font-medium text-navy-800">{holding.ticker}</span>
                            <span className="text-gray-500 ml-2">{holding.name}</span>
                          </td>
                          <td className="py-3 text-right font-medium text-navy-800">
                            {holding.weight.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">Holdings data unavailable</p>
              )}
              <Link href={`/funds/${ticker}/holdings`} className="mt-4 inline-flex items-center text-gold-600 font-medium text-sm hover:text-gold-700">
                View All Holdings
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Fund Details */}
            <div className="card">
              <h3 className="text-lg font-semibold text-navy-800 mb-4">Fund Details</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Ticker</dt>
                  <dd className="font-medium text-navy-800">{fund.ticker}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Strategy</dt>
                  <dd className="font-medium text-navy-800">{fund.strategy}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Benchmark</dt>
                  <dd className="font-medium text-navy-800 text-right max-w-[180px]">{fund.benchmark}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Distributor</dt>
                  <dd className="font-medium text-navy-800">PINE Distributors</dd>
                </div>
              </dl>
            </div>

            {/* Documents */}
            <div className="card">
              <h3 className="text-lg font-semibold text-navy-800 mb-4">Documents</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={`/funds/${ticker}/documents`} className="flex items-center text-sm text-gold-600 hover:text-gold-700">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    Prospectus
                  </Link>
                </li>
                <li>
                  <Link href={`/funds/${ticker}/documents`} className="flex items-center text-sm text-gold-600 hover:text-gold-700">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    Fact Sheet
                  </Link>
                </li>
                <li>
                  <Link href={`/funds/${ticker}/documents`} className="flex items-center text-sm text-gold-600 hover:text-gold-700">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    SAI
                  </Link>
                </li>
              </ul>
            </div>

            {/* Learn More */}
            <div className="card bg-navy-800 text-white">
              <h3 className="text-lg font-semibold mb-2">Learn the Strategy</h3>
              <p className="text-gray-300 text-sm mb-4">
                Understand how {fund.ticker}&apos;s {fund.strategy.toLowerCase()} approach works.
              </p>
              <Link
                href={fund.ticker === "THIR" ? "/learn/index-rotation-explained" : "/learn/low-volatility-investing"}
                className="inline-flex items-center text-gold-500 font-medium text-sm hover:text-gold-400"
              >
                Read More
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <section className="bg-gray-50 py-8">
        <div className="container-wide">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong>Important Information:</strong> Investors should consider the investment objectives, risks, charges, and expenses carefully before investing. The prospectus contains this and other information about the fund. Please read the prospectus carefully before investing. Investing involves risk, including the possible loss of principal. Past performance does not guarantee future results. ETF shares are bought and sold at market price (not NAV) and are not individually redeemed from the fund.
          </p>
        </div>
      </section>
    </>
  );
}
