import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Risk-Managed ETFs | Active Drawdown Protection Strategies",
  description: "THOR's risk-managed ETFs use digital signal processing to reduce exposure during market downturns. Systematic risk management for better compounding.",
  keywords: ["risk managed ETF", "drawdown protection", "risk management", "active ETF", "volatility management"],
  openGraph: {
    title: "Risk-Managed ETFs | THOR Funds",
    description: "Tactical ETFs with built-in drawdown protection through systematic signal processing.",
  },
};

export default function RiskManagedETFPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-16 lg:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="inline-block bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium mb-4">
              Risk Management
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Risk-Managed ETFs: Because Volatility Destroys Compounding
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Two portfolios with the same average return but different volatility end up with 
              dramatically different ending values. Risk management isn&apos;t about avoiding loss—
              it&apos;s about protecting the math that makes long-term wealth possible.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/funds" className="btn-primary">
                View Our ETFs
              </Link>
              <Link href="/why-thor" className="btn-outline border-white text-white hover:bg-white hover:text-navy-800">
                Why Risk Management Matters
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Math Problem */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-12">The Volatility Tax on Returns</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8">
              <p className="text-gray-700 mb-8">
                Consider four portfolios, all with the same average return of 6% over 10 years, 
                but with different volatility profiles:
              </p>
              
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-sm text-gray-600 mb-2">Portfolio A</div>
                  <div className="text-sm text-gray-500 mb-4">0% Volatility</div>
                  <div className="text-3xl font-bold text-green-600">$179</div>
                  <div className="text-xs text-gray-500 mt-1">Ending Value</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-sm text-gray-600 mb-2">Portfolio B</div>
                  <div className="text-sm text-gray-500 mb-4">10% Volatility</div>
                  <div className="text-3xl font-bold text-green-500">$170</div>
                  <div className="text-xs text-gray-500 mt-1">Ending Value</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-sm text-gray-600 mb-2">Portfolio C</div>
                  <div className="text-sm text-gray-500 mb-4">20% Volatility</div>
                  <div className="text-3xl font-bold text-yellow-600">$147</div>
                  <div className="text-xs text-gray-500 mt-1">Ending Value</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-sm text-gray-600 mb-2">Portfolio D</div>
                  <div className="text-sm text-gray-500 mb-4">30% Volatility</div>
                  <div className="text-3xl font-bold text-red-500">$113</div>
                  <div className="text-xs text-gray-500 mt-1">Ending Value</div>
                </div>
              </div>

              <p className="text-gray-700">
                <strong>Same average return. Wildly different outcomes.</strong> Higher volatility 
                creates a drag on compounding that erodes wealth over time. This is why risk 
                management matters—it&apos;s about preserving the math that builds wealth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-4">How THOR Manages Risk</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Systematic risk management through digital signal processing
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-gold-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Convert & Analyze</h3>
              <p className="text-gray-600 text-sm">
                Convert price data to smooth waveforms using signal processing—the same science 
                behind noise-canceling headphones.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-gold-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Detect Regime Changes</h3>
              <p className="text-gray-600 text-sm">
                Identify when market conditions shift from favorable to unfavorable—at 
                confirmed turning points, not on every wiggle.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-gold-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Adjust Positioning</h3>
              <p className="text-gray-600 text-sm">
                Systematically reduce equity exposure and allocate to short-duration treasuries 
                when signals turn risk-off.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Maximum Drawdown Focus */}
      <section className="section-padding bg-navy-800 text-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Maximum Drawdown: The Real Risk Measure</h2>
            
            <div className="bg-white/10 rounded-xl p-6 mb-8">
              <p className="text-gray-300">
                Standard deviation tells you how much a portfolio bounces around. 
                <strong className="text-white"> Maximum drawdown tells you how bad it can get.</strong>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gold-400 mb-4">Recovery Requirements</h3>
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-navy-600">
                    <tr>
                      <td className="py-2 text-gray-300">10% loss</td>
                      <td className="py-2 text-right text-white">11% gain to recover</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-300">20% loss</td>
                      <td className="py-2 text-right text-white">25% gain to recover</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gold-400">30% loss</td>
                      <td className="py-2 text-right text-gold-400">43% gain to recover</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gold-400">40% loss</td>
                      <td className="py-2 text-right text-gold-400">67% gain to recover</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-red-400">50% loss</td>
                      <td className="py-2 text-right text-red-400">100% gain to recover</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gold-400 mb-4">Why THOR Focuses on Drawdowns</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-gold-400 mt-1">•</span>
                    Drawdowns are asymmetric—the deeper you fall, the harder to recover
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-400 mt-1">•</span>
                    Severe drawdowns destroy long-term compounding
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-400 mt-1">•</span>
                    Clients who panic-sell at the bottom lock in losses
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Approaches */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-12">Two Risk-Managed ETFs</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-8">
              <span className="inline-block bg-navy-800 text-white px-3 py-1 rounded text-sm font-medium mb-4">
                Index Rotation
              </span>
              <h3 className="text-2xl font-bold text-navy-800 mb-2">THIR</h3>
              <p className="text-gray-600 mb-6">
                Rotates between S&P 500, Dow, and Nasdaq based on signal strength. 
                Can move to 100% treasuries when all indexes turn risk-off.
              </p>
              <Link href="/funds/thir" className="text-gold-600 font-medium hover:text-gold-700">
                Learn About THIR →
              </Link>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <span className="inline-block bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium mb-4">
                Low Volatility
              </span>
              <h3 className="text-2xl font-bold text-navy-800 mb-2">THLV</h3>
              <p className="text-gray-600 mb-6">
                Equal-weight sector exposure with dynamic risk management. 
                Sectors going risk-off rotate to treasuries progressively.
              </p>
              <Link href="/funds/thlv" className="text-gold-600 font-medium hover:text-gold-700">
                Learn About THLV →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-gold-400 to-gold-500">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-navy-800 mb-4">Ready for Better Risk Management?</h2>
          <p className="text-lg text-navy-700/80 max-w-2xl mx-auto mb-8">
            Explore how THOR&apos;s risk-managed ETFs can help protect your portfolio 
            while maintaining upside participation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/funds" className="btn-secondary">
              View Our ETFs
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
