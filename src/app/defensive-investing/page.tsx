import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Defensive Investing | Risk-Managed ETFs for Market Protection",
  description: "Defensive investing strategies that can reduce exposure during downturns. Learn how THOR's adaptive ETFs protect portfolios while maintaining upside participation.",
  keywords: ["defensive investing", "risk management", "market protection", "drawdown protection", "bear market ETF"],
  openGraph: {
    title: "Defensive Investing | THOR Funds",
    description: "Risk-managed ETFs designed to protect portfolios during market downturns while participating in upside.",
  },
};

export default function DefensiveInvestingPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-16 lg:py-24">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium mb-4">
                Risk Management
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Defensive Investing for the Modern Era
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                A 40% loss requires a 67% gain just to break even. The math of drawdowns is brutal. 
                Defensive strategies that can protect during severe downturns don&apos;t just feel better—
                they compound better.
              </p>
              <Link href="/funds" className="btn-primary">
                Explore Our Defensive ETFs
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-red-400">-40%</div>
                <div className="text-sm text-gray-300 mt-1">Drawdown</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-gold-400">+67%</div>
                <div className="text-sm text-gray-300 mt-1">To Break Even</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-red-400">-50%</div>
                <div className="text-sm text-gray-300 mt-1">Drawdown</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-gold-400">+100%</div>
                <div className="text-sm text-gray-300 mt-1">To Break Even</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Defense Matters */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-12">Why Missing the Worst Days Matters More</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8">
              <p className="text-gray-700 mb-6">
                Over 85 years of market history (1937-2022), here&apos;s what $1 invested would have become:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-4xl font-bold text-navy-800">$80.76</div>
                  <div className="text-sm text-gray-600 mt-1">Buy & Hold</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm ring-2 ring-gold-500">
                  <div className="text-4xl font-bold text-gold-600">$256.46</div>
                  <div className="text-sm text-gray-600 mt-1">Miss 10 Worst Days</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-4xl font-bold text-red-500">$26.79</div>
                  <div className="text-sm text-gray-600 mt-1">Miss 10 Best Days</div>
                </div>
              </div>

              <p className="text-gray-700">
                <strong>The key insight:</strong> Missing the worst days produces dramatically better outcomes 
                than buy-and-hold. While it&apos;s impossible to perfectly time the market, strategies that can 
                reduce exposure during deteriorating conditions have a structural advantage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Traditional Defense Fails */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-4">Why Traditional Diversification Fails</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            &ldquo;Diversification works most of the time, except when you need it most.&rdquo;
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-navy-800 mb-3">Correlation Spikes in Crisis</h3>
              <p className="text-gray-600">
                During severe market stress, correlations between asset classes spike toward 1.0. 
                The diversification benefit disappears exactly when you need it most.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-navy-800 mb-3">Past Volatility ≠ Future</h3>
              <p className="text-gray-600">
                Traditional low-vol strategies use backward-looking metrics. What was low volatility 
                yesterday may become high volatility tomorrow.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-navy-800 mb-3">Can&apos;t Go to Cash</h3>
              <p className="text-gray-600">
                Passive funds must stay fully invested by mandate. They can&apos;t raise cash even when 
                all signals point to danger.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THOR's Defensive Approach */}
      <section className="section-padding bg-navy-800 text-white">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-center mb-12">THOR&apos;s Defensive Approach</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-gold-500 rounded-full p-2 mt-1">
                  <svg className="w-4 h-4 text-navy-900" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Forward-Looking Signals</h3>
                  <p className="text-gray-300 mt-1">
                    Our digital signal processing detects regime changes as they develop, not after the damage is done.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gold-500 rounded-full p-2 mt-1">
                  <svg className="w-4 h-4 text-navy-900" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Can Move to 100% Cash</h3>
                  <p className="text-gray-300 mt-1">
                    Unlike passive funds, our strategies can allocate entirely to short-duration treasuries when conditions warrant.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gold-500 rounded-full p-2 mt-1">
                  <svg className="w-4 h-4 text-navy-900" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Systematic Execution</h3>
                  <p className="text-gray-300 mt-1">
                    Rules-based signals remove emotional decision-making—the enemy of good investing during volatile times.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-4">Where THOR Excels</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-gold-400">•</span>
                  Extreme, quick drawdowns after sustained rallies (Q4 2018, 2020, 2008)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold-400">•</span>
                  Upside reversals near bear market capitulation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold-400">•</span>
                  Drawdowns exceeding 15%
                </li>
              </ul>

              <h3 className="font-semibold text-lg mt-6 mb-4">Where It&apos;s Challenging</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-gray-500">•</span>
                  Staircasing markets (up 10-15%, down 8-10%, repeat)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-500">•</span>
                  Medium-sized channels with whipsaw potential
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-gold-400 to-gold-500">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-navy-800 mb-4">Add Defense to Your Portfolio</h2>
          <p className="text-lg text-navy-700/80 max-w-2xl mx-auto mb-8">
            Explore how THOR&apos;s defensive ETFs can help protect your portfolio while maintaining upside participation.
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
