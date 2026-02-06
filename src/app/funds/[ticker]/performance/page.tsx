export const dynamic = "force-dynamic";

import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FUNDS, getNavData, getQuarterlyPerformance, getMonthlyPerformance, formatPercent } from "@/lib/api";

interface PerformancePageProps {
  params: Promise<{ ticker: string }>;
}

export async function generateStaticParams() {
  return Object.keys(FUNDS).map((ticker) => ({
    ticker: ticker.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: PerformancePageProps): Promise<Metadata> {
  const { ticker } = await params;
  const fund = FUNDS[ticker.toUpperCase()];
  
  if (!fund) {
    return { title: "Fund Not Found" };
  }

  return {
    title: `${fund.ticker} Performance`,
    description: `View historical performance data for ${fund.name} (${fund.ticker}). Compare returns against benchmark.`,
  };
}

export default async function PerformancePage({ params }: PerformancePageProps) {
  const { ticker } = await params;
  const fund = FUNDS[ticker.toUpperCase()];

  if (!fund) {
    notFound();
  }

  const [navData, quarterlyPerf, monthlyPerf] = await Promise.all([
    getNavData(fund.ticker),
    getQuarterlyPerformance(fund.ticker),
    getMonthlyPerformance(fund.ticker),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 py-12">
        <div className="container-wide">
          <nav className="flex items-center text-sm text-gray-400 mb-4">
            <Link href="/funds" className="hover:text-gold-500">Funds</Link>
            <span className="mx-2">/</span>
            <Link href={`/funds/${ticker}`} className="hover:text-gold-500">{fund.ticker}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Performance</span>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-gold-500">{fund.ticker}</span>
            <h1 className="text-2xl font-semibold text-white">Performance</h1>
          </div>
          <p className="mt-2 text-gray-300">{fund.name}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide space-y-12">
          {/* Summary Returns */}
          <div className="card">
            <h2 className="text-xl font-semibold text-navy-800 mb-6">Summary Returns</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 font-semibold text-navy-800">Period</th>
                    <th className="text-right py-3 font-semibold text-navy-800">{fund.ticker}</th>
                    <th className="text-right py-3 font-semibold text-gray-500">Benchmark</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { label: "1 Month", value: navData?.returns.oneMonth },
                    { label: "3 Months", value: navData?.returns.threeMonth },
                    { label: "YTD", value: navData?.returns.ytd },
                    { label: "1 Year", value: navData?.returns.oneYear },
                    { label: "3 Years (Annualized)", value: navData?.returns.threeYear },
                    { label: "5 Years (Annualized)", value: navData?.returns.fiveYear },
                    { label: "Since Inception", value: navData?.returns.sinceInception },
                  ].map((row) => (
                    <tr key={row.label}>
                      <td className="py-4 text-gray-600">{row.label}</td>
                      <td className={`py-4 text-right font-semibold ${row.value !== undefined && row.value >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {row.value !== undefined ? formatPercent(row.value) : "—"}
                      </td>
                      <td className="py-4 text-right text-gray-400">—</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              Performance shown is total return, which includes reinvestment of dividends and capital gains.
            </p>
          </div>

          {/* Quarterly Performance */}
          {quarterlyPerf && quarterlyPerf.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-semibold text-navy-800 mb-6">Quarterly Performance</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 font-semibold text-navy-800">Quarter</th>
                      <th className="text-right py-3 font-semibold text-navy-800">{fund.ticker}</th>
                      <th className="text-right py-3 font-semibold text-gray-500">Benchmark</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {quarterlyPerf.slice(0, 12).map((perf, i) => (
                      <tr key={i}>
                        <td className="py-3 text-gray-600">{perf.period}</td>
                        <td className={`py-3 text-right font-medium ${perf.fundReturn >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {formatPercent(perf.fundReturn)}
                        </td>
                        <td className={`py-3 text-right ${perf.benchmarkReturn >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {formatPercent(perf.benchmarkReturn)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Monthly Performance */}
          {monthlyPerf && monthlyPerf.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-semibold text-navy-800 mb-6">Monthly Performance</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 font-semibold text-navy-800">Month</th>
                      <th className="text-right py-3 font-semibold text-navy-800">{fund.ticker}</th>
                      <th className="text-right py-3 font-semibold text-gray-500">Benchmark</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {monthlyPerf.slice(0, 24).map((perf, i) => (
                      <tr key={i}>
                        <td className="py-3 text-gray-600">{perf.period}</td>
                        <td className={`py-3 text-right font-medium ${perf.fundReturn >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {formatPercent(perf.fundReturn)}
                        </td>
                        <td className={`py-3 text-right ${perf.benchmarkReturn >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {formatPercent(perf.benchmarkReturn)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-gray-50 py-8">
        <div className="container-wide">
          <p className="text-xs text-gray-500 leading-relaxed mb-6">
            <strong>Performance Disclosure:</strong> Past performance is not indicative of future results. Investment return and principal value will fluctuate so that shares, when redeemed, may be worth more or less than their original cost. Current performance may be lower or higher than the performance quoted. Returns for periods greater than one year are annualized.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/funds/${ticker}`} className="btn-secondary">
              Back to {fund.ticker} Overview
            </Link>
            <Link href={`/funds/${ticker}/holdings`} className="btn-outline">
              View Holdings
            </Link>
            <Link href={`/funds/${ticker}/documents`} className="btn-outline">
              View Documents
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
