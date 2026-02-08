import Link from "next/link";
import { Metadata } from "next";
import FundStats from "@/components/fund/FundStats";

export const metadata: Metadata = {
  title: "Low Volatility ETF | THLV - Defensive Equity Investing",
  description: "THLV is an equal-weight low volatility ETF that dynamically manages sector exposure to reduce drawdowns while capturing upside. Unlike passive low-vol funds, THLV can go to 100% cash.",
  keywords: ["low volatility ETF", "defensive investing", "THLV", "risk managed ETF", "sector rotation", "low vol fund"],
  openGraph: {
    title: "Low Volatility ETF | THLV - THOR Funds",
    description: "An equal-weight low volatility ETF that dynamically manages sector exposure. Can move to 100% treasuries when all sectors turn risk-off.",
  },
};

export default function LowVolatilityETFPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-16 lg:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="inline-block bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium mb-4">
              Low Volatility Strategy
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              A Smarter Approach to Low Volatility Investing
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Traditional low volatility ETFs are passively managed and must stay fully invested. 
              THLV is different—it actively manages sector exposure and can move to 100% cash 
              when market conditions deteriorate.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/funds/thlv" className="btn-primary">
                Explore THLV
              </Link>
              <Link href="/learn/low-volatility-investing" className="btn-outline border-white text-white hover:bg-white hover:text-navy-800">
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
          <FundStats ticker="THLV" showReturns={true} />
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-navy-800 mb-6">The Problem with Traditional Low-Vol</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-red-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <strong>Cap-weighted concentration:</strong> Most low-vol funds are cap-weighted, 
                    leading to concentration in sectors that happened to be less volatile recently
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-red-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <strong>Backward-looking:</strong> Traditional funds use historical beta, 
                    which is backward-looking and doesn&apos;t anticipate future volatility
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-red-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <strong>Always fully invested:</strong> Passive low-vol funds can&apos;t move to cash, 
                    leaving investors exposed during severe market downturns
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-navy-800 mb-6">The THLV Solution</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-green-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <strong>Equal-weight sectors:</strong> Each sector gets equal representation, 
                    avoiding concentration and providing true diversification
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-green-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <strong>Forward-looking signals:</strong> Digital signal processing detects 
                    regime changes as they happen, not after the fact
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-green-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <strong>Can go 100% to cash:</strong> When multiple sectors turn risk-off, 
                    THLV allocates to short-duration treasuries for protection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-12">How THLV Works</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-navy-800 text-white rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">Dynamic Sector Allocation</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-navy-600">
                      <th className="text-left py-3 text-gold-400">Sectors On</th>
                      <th className="text-right py-3 text-gold-400">Per Sector</th>
                      <th className="text-right py-3 text-gold-400">Cash</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-600">
                    <tr>
                      <td className="py-2">10 sectors</td>
                      <td className="text-right">10% each</td>
                      <td className="text-right">0%</td>
                    </tr>
                    <tr>
                      <td className="py-2">8 sectors</td>
                      <td className="text-right">12.5% each</td>
                      <td className="text-right">0%</td>
                    </tr>
                    <tr>
                      <td className="py-2">5 sectors (threshold)</td>
                      <td className="text-right">20% each</td>
                      <td className="text-right">0%</td>
                    </tr>
                    <tr className="text-gold-400">
                      <td className="py-2">4 sectors</td>
                      <td className="text-right">20% each</td>
                      <td className="text-right">20%</td>
                    </tr>
                    <tr className="text-gold-400">
                      <td className="py-2">2 sectors</td>
                      <td className="text-right">20% each</td>
                      <td className="text-right">60%</td>
                    </tr>
                    <tr className="text-gold-400">
                      <td className="py-2">0 sectors</td>
                      <td className="text-right">—</td>
                      <td className="text-right">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p className="mt-6 text-gray-300 text-sm">
                Sectors going risk-off are sold and weight redistributed—until 5 sectors remain at 20% each. 
                After that, each additional sector going off raises a 20% tranche into short-duration treasuries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Covered */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-4">10 Sectors Monitored</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            THLV monitors 10 of the 11 S&P 500 sectors, using sector SPDRs for precise exposure
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { ticker: "XLB", name: "Materials" },
              { ticker: "XLE", name: "Energy" },
              { ticker: "XLF", name: "Financials" },
              { ticker: "XLI", name: "Industrials" },
              { ticker: "XLK", name: "Technology" },
              { ticker: "XLP", name: "Consumer Staples" },
              { ticker: "XLV", name: "Healthcare" },
              { ticker: "XLU", name: "Utilities" },
              { ticker: "XLY", name: "Consumer Disc." },
              { ticker: "XLRE", name: "Real Estate" },
            ].map((sector) => (
              <div key={sector.ticker} className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="font-bold text-navy-800">{sector.ticker}</div>
                <div className="text-sm text-gray-600">{sector.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy-800">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Learn More About THLV?</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Explore the fund details, view current holdings, or contact us to discuss 
            how THLV can fit into your portfolio.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/funds/thlv" className="btn-primary">
              THLV Fund Page
            </Link>
            <Link href="/funds/thlv/holdings" className="btn-outline border-white text-white hover:bg-white hover:text-navy-800">
              View Holdings
            </Link>
            <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-navy-800">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
