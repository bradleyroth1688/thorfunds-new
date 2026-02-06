import Link from "next/link";
import { Metadata } from "next";
import FundStats from "@/components/fund/FundStats";

export const metadata: Metadata = {
  title: "Index Rotation Strategy | THIR ETF - Tactical Index Switching",
  description: "THIR rotates between S&P 500, Dow Jones, and Nasdaq based on risk signals. Learn how our index rotation strategy provides tactical equity exposure with downside protection.",
  keywords: ["index rotation", "THIR", "tactical ETF", "SPY", "QQQ", "DIA", "index switching", "rotation strategy"],
  openGraph: {
    title: "Index Rotation Strategy | THIR - THOR Funds",
    description: "Tactical ETF that rotates between major U.S. indexes with the ability to move to 100% treasuries.",
  },
};

export default function IndexRotationStrategyPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-16 lg:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="inline-block bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium mb-4">
              Index Rotation
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Index Rotation: Be in the Right Index at the Right Time
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Not all market selloffs affect all indexes equally. THIR uses signal processing to 
              rotate between the S&P 500, Dow Jones, and Nasdaq—staying where conditions are favorable 
              and avoiding where they&apos;re not.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/funds/thir" className="btn-primary">
                Explore THIR
              </Link>
              <Link href="/learn/index-rotation-explained" className="btn-outline border-white text-white hover:bg-white hover:text-navy-800">
                Learn the Strategy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="bg-white py-8 border-b">
        <div className="container-wide">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-500">Live Data</span>
          </div>
          <FundStats ticker="THIR" showReturns={true} />
        </div>
      </section>

      {/* The Three Indexes */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-4">Three Indexes, One Strategy</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            THIR monitors and rotates between three major U.S. equity indexes based on our signal processing methodology
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <div className="text-4xl font-bold text-navy-800 mb-2">SPY</div>
              <div className="text-lg text-gray-600 mb-4">S&P 500</div>
              <p className="text-sm text-gray-500">
                500 largest U.S. companies by market cap. The benchmark for U.S. large-cap equities.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <div className="text-4xl font-bold text-navy-800 mb-2">DIA</div>
              <div className="text-lg text-gray-600 mb-4">Dow Jones</div>
              <p className="text-sm text-gray-500">
                30 blue-chip industrial companies. Price-weighted with value-oriented characteristics.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <div className="text-4xl font-bold text-navy-800 mb-2">QQQ</div>
              <div className="text-lg text-gray-600 mb-4">Nasdaq 100</div>
              <p className="text-sm text-gray-500">
                100 largest non-financial Nasdaq companies. Technology and growth-oriented.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-12">How Index Rotation Works</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-navy-800 text-white rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">Dynamic Index Allocation</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-navy-600">
                      <th className="text-left py-3 text-gold-400">Indexes On</th>
                      <th className="text-right py-3 text-gold-400">Allocation</th>
                      <th className="text-right py-3 text-gold-400">Treasuries</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-600">
                    <tr>
                      <td className="py-3">3 indexes (all on)</td>
                      <td className="text-right">33.3% each</td>
                      <td className="text-right">0%</td>
                    </tr>
                    <tr>
                      <td className="py-3">2 indexes</td>
                      <td className="text-right">50% each</td>
                      <td className="text-right font-medium text-white">0% (still 100% invested!)</td>
                    </tr>
                    <tr className="text-gold-400">
                      <td className="py-3">1 index</td>
                      <td className="text-right">50%</td>
                      <td className="text-right">50%</td>
                    </tr>
                    <tr className="text-gold-400">
                      <td className="py-3">0 indexes (all off)</td>
                      <td className="text-right">—</td>
                      <td className="text-right">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 bg-gold-500/10 rounded-lg">
                <p className="text-gold-200 text-sm">
                  <strong className="text-gold-400">Key Point:</strong> When the first index goes risk-off, 
                  THIR remains 100% invested in the remaining two indexes (50% each). Cash only enters 
                  when the second index goes risk-off.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Rotation Works */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-4">Why Index Rotation Works</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Different indexes perform differently in various market conditions
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-navy-800 mb-4">Index Characteristics Vary</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-gold-500 mt-1">•</span>
                  S&P 500: Broad market exposure, moderate volatility
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500 mt-1">•</span>
                  Dow: Value-oriented, lower volatility, defensive
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500 mt-1">•</span>
                  Nasdaq: Growth-oriented, higher volatility, tech-heavy
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-navy-800 mb-4">Selloffs Aren&apos;t Equal</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-gold-500 mt-1">•</span>
                  Tech corrections may spare the Dow
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500 mt-1">•</span>
                  Value rotations can favor different indexes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500 mt-1">•</span>
                  Being in the right index at the right time matters
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className="section-padding bg-navy-800 text-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Satellite Exposure, Not Core Replacement</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              THIR is designed as satellite exposure alongside existing long-only equity holdings. 
              It&apos;s not meant to replace your core allocation—it enhances it by adding tactical 
              risk management that can protect during severe drawdowns.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/funds/thir" className="btn-primary">
                View THIR Details
              </Link>
              <Link href="/resources/advisors" className="btn-outline border-white text-white hover:bg-white hover:text-navy-800">
                Advisor Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-gold-400 to-gold-500">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-navy-800 mb-4">Ready to Explore Index Rotation?</h2>
          <p className="text-lg text-navy-700/80 max-w-2xl mx-auto mb-8">
            Learn more about THIR or contact us to discuss how index rotation can fit into your portfolio.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/funds/thir" className="btn-secondary">
              THIR Fund Page
            </Link>
            <Link href="/contact" className="bg-navy-800 text-white hover:bg-navy-700 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
