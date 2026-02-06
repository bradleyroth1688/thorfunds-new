import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "What is an ETF?",
  description: "Learn the basics of exchange-traded funds (ETFs), how they work, and why they've become a preferred investment vehicle for advisors and investors.",
};

export default function WhatIsAnETFPage() {
  return (
    <>
      <section className="bg-navy-800 py-12 lg:py-16">
        <div className="container-wide">
          <nav className="flex items-center text-sm text-gray-400 mb-4">
            <Link href="/learn" className="hover:text-gold-500">Learn</Link>
            <span className="mx-2">/</span>
            <span className="text-white">What is an ETF?</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">What is an ETF?</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            Understanding the basics of exchange-traded funds and why they&apos;ve revolutionized investing.
          </p>
        </div>
      </section>

      <article className="section-padding">
        <div className="container-narrow prose-content">
          <h2>Exchange-Traded Funds Explained</h2>
          <p>
            An exchange-traded fund (ETF) is an investment fund that trades on stock exchanges, much like individual stocks. ETFs hold assets such as stocks, bonds, commodities, or a mix of investment types, and their shares can be bought and sold throughout the trading day at market prices.
          </p>

          <h2>Key Characteristics</h2>
          <ul>
            <li><strong>Intraday trading:</strong> Unlike mutual funds that only trade once per day, ETFs can be bought and sold anytime the market is open</li>
            <li><strong>Transparency:</strong> Most ETFs disclose their holdings daily</li>
            <li><strong>Tax efficiency:</strong> The creation/redemption mechanism typically results in fewer taxable events</li>
            <li><strong>Lower costs:</strong> ETFs generally have lower expense ratios than comparable mutual funds</li>
            <li><strong>Flexibility:</strong> Can be used for long-term investing, trading, or sophisticated strategies</li>
          </ul>

          <h2>ETFs vs. Mutual Funds</h2>
          <div className="bg-gray-50 rounded-xl p-6 my-8 not-prose">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 font-semibold text-navy-800">Feature</th>
                  <th className="text-left py-3 font-semibold text-navy-800">ETFs</th>
                  <th className="text-left py-3 font-semibold text-navy-800">Mutual Funds</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 text-gray-600">Trading</td>
                  <td className="py-3 text-navy-800">Throughout the day</td>
                  <td className="py-3 text-navy-800">End of day only</td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-600">Pricing</td>
                  <td className="py-3 text-navy-800">Market price</td>
                  <td className="py-3 text-navy-800">NAV</td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-600">Minimum Investment</td>
                  <td className="py-3 text-navy-800">One share</td>
                  <td className="py-3 text-navy-800">Often $1,000+</td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-600">Tax Efficiency</td>
                  <td className="py-3 text-navy-800">Generally higher</td>
                  <td className="py-3 text-navy-800">Generally lower</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Types of ETFs</h2>
          <ul>
            <li><strong>Index ETFs:</strong> Track a market index like the S&P 500</li>
            <li><strong>Active ETFs:</strong> Managed by portfolio managers making investment decisions</li>
            <li><strong>Sector ETFs:</strong> Focus on specific industries</li>
            <li><strong>Bond ETFs:</strong> Hold fixed income securities</li>
            <li><strong>Commodity ETFs:</strong> Track commodity prices</li>
            <li><strong>Thematic ETFs:</strong> Focus on specific trends or themes</li>
          </ul>

          <h2>THOR&apos;s Active ETFs</h2>
          <p>
            THOR&apos;s ETFs are <strong>actively managed</strong>, meaning our investment team makes decisions about positioning based on our proprietary signals. This allows us to adjust allocations dynamically—including moving to cash when conditions warrant—something passive index ETFs cannot do.
          </p>

          <div className="bg-navy-50 rounded-xl p-8 my-8 not-prose">
            <h3 className="text-xl font-semibold text-navy-800 mb-4">Explore THOR&apos;s ETFs</h3>
            <p className="text-gray-600 mb-6">
              Learn more about our risk-managed ETF strategies.
            </p>
            <Link href="/funds" className="btn-primary">
              View Our ETFs
            </Link>
          </div>

          <h2>Related Reading</h2>
          <ul>
            <li><Link href="/learn/how-etfs-work">How ETFs Work</Link></li>
            <li><Link href="/learn/tactical-vs-strategic">Tactical vs. Strategic Investing</Link></li>
          </ul>
        </div>
      </article>
    </>
  );
}
