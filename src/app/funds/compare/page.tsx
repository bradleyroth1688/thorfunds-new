export const dynamic = "force-dynamic";

import Link from "next/link";
import { Metadata } from "next";
import { FUNDS, getNavData, formatCurrency, formatPercent, formatNav } from "@/lib/api";

export const metadata: Metadata = {
  title: "Compare THIR vs THLV",
  description: "Compare THOR's two ETF strategies side-by-side: THIR (Index Rotation) and THLV (Low Volatility). See performance, holdings, and strategy differences.",
};

export default async function ComparePage() {
  const [thirNav, thlvNav] = await Promise.all([
    getNavData("THIR"),
    getNavData("THLV"),
  ]);

  return (
    <>
      <section className="bg-navy-800 py-16">
        <div className="container-wide">
          <h1 className="text-4xl lg:text-5xl font-bold text-white">Compare Our ETFs</h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl">
            Two distinct strategies, one shared philosophy: manage risk while capturing opportunity.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-navy-800 min-w-[200px]">Feature</th>
                  <th className="text-center py-4 px-4 min-w-[200px]">
                    <div className="bg-navy-800 text-white rounded-lg p-4">
                      <span className="text-2xl font-bold text-gold-500">THIR</span>
                      <div className="text-sm mt-1">Index Rotation</div>
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 min-w-[200px]">
                    <div className="bg-navy-800 text-white rounded-lg p-4">
                      <span className="text-2xl font-bold text-gold-500">THLV</span>
                      <div className="text-sm mt-1">Low Volatility</div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="bg-gray-50">
                  <td className="py-4 px-4 font-medium text-navy-800">Strategy</td>
                  <td className="py-4 px-4 text-center text-gray-600">{FUNDS.THIR.strategy}</td>
                  <td className="py-4 px-4 text-center text-gray-600">{FUNDS.THLV.strategy}</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-navy-800">Investment Universe</td>
                  <td className="py-4 px-4 text-center text-gray-600">SPY, DIA, QQQ<br/>(3 Major Indexes)</td>
                  <td className="py-4 px-4 text-center text-gray-600">10 S&P 500 Sectors<br/>(Sector SPDRs)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-4 font-medium text-navy-800">NAV</td>
                  <td className="py-4 px-4 text-center font-semibold text-navy-800">
                    {thirNav ? formatNav(thirNav.nav) : "—"}
                  </td>
                  <td className="py-4 px-4 text-center font-semibold text-navy-800">
                    {thlvNav ? formatNav(thlvNav.nav) : "—"}
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-navy-800">AUM</td>
                  <td className="py-4 px-4 text-center font-semibold text-navy-800">
                    {thirNav ? formatCurrency(thirNav.aum) : "—"}
                  </td>
                  <td className="py-4 px-4 text-center font-semibold text-navy-800">
                    {thlvNav ? formatCurrency(thlvNav.aum) : "—"}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="py-6 px-4 text-lg font-semibold text-navy-800 border-t-2 border-gray-200">
                    Performance
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-navy-800">YTD</td>
                  <td className={`py-4 px-4 text-center font-semibold ${thirNav && thirNav.returns.ytd >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {thirNav ? formatPercent(thirNav.returns.ytd) : "—"}
                  </td>
                  <td className={`py-4 px-4 text-center font-semibold ${thlvNav && thlvNav.returns.ytd >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {thlvNav ? formatPercent(thlvNav.returns.ytd) : "—"}
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-4 font-medium text-navy-800">1 Year</td>
                  <td className={`py-4 px-4 text-center font-semibold ${thirNav && thirNav.returns.oneYear >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {thirNav ? formatPercent(thirNav.returns.oneYear) : "—"}
                  </td>
                  <td className={`py-4 px-4 text-center font-semibold ${thlvNav && thlvNav.returns.oneYear >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {thlvNav ? formatPercent(thlvNav.returns.oneYear) : "—"}
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-navy-800">Since Inception</td>
                  <td className={`py-4 px-4 text-center font-semibold ${thirNav && thirNav.returns.sinceInception >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {thirNav ? formatPercent(thirNav.returns.sinceInception) : "—"}
                  </td>
                  <td className={`py-4 px-4 text-center font-semibold ${thlvNav && thlvNav.returns.sinceInception >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {thlvNav ? formatPercent(thlvNav.returns.sinceInception) : "—"}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="py-6 px-4 text-lg font-semibold text-navy-800 border-t-2 border-gray-200">
                    Strategy Details
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-navy-800">Cash Range</td>
                  <td className="py-4 px-4 text-center text-gray-600">0% to 100%</td>
                  <td className="py-4 px-4 text-center text-gray-600">0% to 100%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-4 font-medium text-navy-800">Weighting</td>
                  <td className="py-4 px-4 text-center text-gray-600">Dynamic (33%/50%/100%)</td>
                  <td className="py-4 px-4 text-center text-gray-600">Equal Weight</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-navy-800">Best For</td>
                  <td className="py-4 px-4 text-center text-gray-600">Satellite equity exposure</td>
                  <td className="py-4 px-4 text-center text-gray-600">Core equity replacement</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <Link href="/funds/thir" className="btn-primary">Explore THIR</Link>
            <Link href="/funds/thlv" className="btn-secondary">Explore THLV</Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-12">Which Fund Is Right for You?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <span className="text-2xl font-bold text-gold-500">THIR</span>
              <h3 className="text-xl font-semibold text-navy-800 mt-2 mb-4">Consider THIR if you want:</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  Tactical exposure to major U.S. equity indexes
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  A satellite position alongside existing long-only equity
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  Protection during severe drawdowns
                </li>
              </ul>
              <Link href="/funds/thir" className="mt-6 inline-flex items-center text-gold-600 font-medium hover:text-gold-700">
                Learn more about THIR →
              </Link>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <span className="text-2xl font-bold text-gold-500">THLV</span>
              <h3 className="text-xl font-semibold text-navy-800 mt-2 mb-4">Consider THLV if you want:</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  Broad sector diversification with risk management
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  A core equity holding (not just a satellite)
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  A low-vol alternative that can also go to cash
                </li>
              </ul>
              <Link href="/funds/thlv" className="mt-6 inline-flex items-center text-gold-600 font-medium hover:text-gold-700">
                Learn more about THLV →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="container-wide">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong>Important Information:</strong> Past performance is not indicative of future results. The funds have different investment objectives, risks, and strategies. Please read each fund&apos;s prospectus carefully before investing.
          </p>
        </div>
      </section>
    </>
  );
}
