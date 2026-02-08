export const dynamic = "force-dynamic";

import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FUNDS, getHoldings, formatCurrency } from "@/lib/api";

interface HoldingsPageProps {
  params: Promise<{ ticker: string }>;
}

export async function generateStaticParams() {
  return Object.keys(FUNDS).map((ticker) => ({
    ticker: ticker.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: HoldingsPageProps): Promise<Metadata> {
  const { ticker } = await params;
  const fund = FUNDS[ticker.toUpperCase()];
  
  if (!fund) {
    return { title: "Fund Not Found" };
  }

  return {
    title: `${fund.ticker} Holdings`,
    description: `View the complete holdings list for ${fund.name} (${fund.ticker}). See current positions, weights, and sector allocations.`,
  };
}

export default async function HoldingsPage({ params }: HoldingsPageProps) {
  const { ticker } = await params;
  const fund = FUNDS[ticker.toUpperCase()];

  if (!fund) {
    notFound();
  }

  const holdings = await getHoldings(fund.ticker);

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
            <span className="text-white">Holdings</span>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-gold-500">{fund.ticker}</span>
            <h1 className="text-2xl font-semibold text-white">Holdings</h1>
          </div>
          <p className="mt-2 text-gray-300">{fund.name}</p>
        </div>
      </section>

      {/* Holdings Table */}
      <section className="section-padding">
        <div className="container-wide">
          {holdings && holdings.length > 0 ? (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-600">{holdings.length} holdings as of latest report</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-navy-800 text-sm">Ticker</th>
                        <th className="text-left py-4 px-6 font-semibold text-navy-800 text-sm">Name</th>
                        <th className="text-right py-4 px-6 font-semibold text-navy-800 text-sm">Weight</th>
                        <th className="text-right py-4 px-6 font-semibold text-navy-800 text-sm">Shares</th>
                        <th className="text-right py-4 px-6 font-semibold text-navy-800 text-sm">Market Value</th>
                        {holdings[0]?.sector && (
                          <th className="text-left py-4 px-6 font-semibold text-navy-800 text-sm">Sector</th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {holdings.map((holding, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6 font-medium text-navy-800">{holding.ticker}</td>
                          <td className="py-4 px-6 text-gray-600">{holding.name}</td>
                          <td className="py-4 px-6 text-right font-medium text-navy-800">
                            {holding.weight.toFixed(2)}%
                          </td>
                          <td className="py-4 px-6 text-right text-gray-600">
                            {holding.shares.toLocaleString()}
                          </td>
                          <td className="py-4 px-6 text-right text-gray-600">
                            {formatCurrency(holding.marketValue)}
                          </td>
                          {holding.sector && (
                            <td className="py-4 px-6 text-gray-600">{holding.sector}</td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Holdings data is currently unavailable.</p>
              <Link href={`/funds/${ticker}`} className="mt-4 inline-block text-gold-600 hover:text-gold-700">
                Return to Fund Overview
              </Link>
            </div>
          )}

          <p className="mt-6 text-xs text-gray-500">
            Holdings are subject to change without notice. This is not a recommendation to buy or sell any security.
          </p>
        </div>
      </section>

      {/* Back to Fund */}
      <section className="bg-gray-50 py-8">
        <div className="container-wide flex flex-wrap gap-4 justify-center">
          <Link href={`/funds/${ticker}`} className="btn-secondary">
            Back to {fund.ticker} Overview
          </Link>
          <Link href={`/funds/${ticker}/performance`} className="btn-outline">
            View Performance
          </Link>
          <Link href={`/funds/${ticker}/documents`} className="btn-outline">
            View Documents
          </Link>
        </div>
      </section>
    </>
  );
}
