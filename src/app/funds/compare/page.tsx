import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare THIR vs THLV | Which ETF is Right for You?",
  description: "Understand the key differences between THOR's two ETF strategies. Compare investment approach, holdings, and risk management to find the right fit.",
};

export default function ComparePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 py-16">
        <div className="container-wide">
          <h1 className="text-4xl lg:text-5xl font-bold text-white">Which THOR ETF is Right for You?</h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl">
            Two distinct approaches to risk-managed investing. Same philosophy, different execution.
          </p>
        </div>
      </section>

      {/* Quick Chooser */}
      <section className="section-padding bg-gray-50 dark:bg-navy-900">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-center mb-8 text-navy-800 dark:text-white">Quick Guide</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* THIR Card */}
            <div className="bg-white dark:bg-navy-800 rounded-xl p-8 shadow-lg border-t-4 border-gold-500">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-gold-500">THIR</span>
                <p className="text-navy-700 dark:text-gray-300 font-medium mt-1">Index Rotation ETF</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200">Want exposure to major U.S. indexes</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200">Prefer concentrated, high-conviction positions</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200">Comfortable with market-cap weighting</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200">Want adaptive rotation between indexes</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 italic">
                "I want to be in the strongest index at any given time, with full downside protection."
              </p>

              <Link href="/funds/thir" className="btn-primary w-full text-center block">
                Learn More About THIR
              </Link>
            </div>

            {/* THLV Card */}
            <div className="bg-white dark:bg-navy-800 rounded-xl p-8 shadow-lg border-t-4 border-navy-600">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-navy-700 dark:text-white">THLV</span>
                <p className="text-navy-700 dark:text-gray-300 font-medium mt-1">Low Volatility ETF</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-navy-600 dark:text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200">Want broad sector diversification</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-navy-600 dark:text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200">Prefer equal-weight allocation</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-navy-600 dark:text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200">Want lower volatility than the market</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-navy-600 dark:text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200">Gradual risk reduction sector by sector</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 italic">
                "I want steady, diversified exposure with systematic risk management."
              </p>

              <Link href="/funds/thlv" className="btn-outline w-full text-center block">
                Learn More About THLV
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Comparison */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-center mb-12 text-navy-800 dark:text-white">Side-by-Side Comparison</h2>

          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Investment Universe */}
            <div className="bg-white dark:bg-navy-800 rounded-xl shadow-md overflow-hidden">
              <div className="bg-navy-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">What They Invest In</h3>
              </div>
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-navy-600">
                <div className="p-6">
                  <div className="text-gold-500 font-bold text-lg mb-3">THIR</div>
                  <p className="text-gray-700 dark:text-gray-200 mb-4">Rotates between 3 major U.S. equity indexes:</p>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-gold-500 rounded-full"></span>
                      <strong>S&P 500</strong> — Large Cap Broad Market
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-gold-500 rounded-full"></span>
                      <strong>Dow Jones</strong> — Industrial Average
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-gold-500 rounded-full"></span>
                      <strong>Nasdaq 100</strong> — Growth &amp; Technology
                    </li>
                  </ul>
                </div>
                <div className="p-6">
                  <div className="text-navy-700 dark:text-white font-bold text-lg mb-3">THLV</div>
                  <p className="text-gray-700 dark:text-gray-200 mb-4">Equal-weight across 10 S&P 500 sectors:</p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span>• Technology (XLK)</span>
                    <span>• Healthcare (XLV)</span>
                    <span>• Financials (XLF)</span>
                    <span>• Consumer Disc. (XLY)</span>
                    <span>• Industrials (XLI)</span>
                    <span>• Consumer Staples (XLP)</span>
                    <span>• Energy (XLE)</span>
                    <span>• Utilities (XLU)</span>
                    <span>• Materials (XLB)</span>
                    <span>• Real Estate (XLRE)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Weighting Approach */}
            <div className="bg-white dark:bg-navy-800 rounded-xl shadow-md overflow-hidden">
              <div className="bg-navy-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">Weighting Approach</h3>
              </div>
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-navy-600">
                <div className="p-6">
                  <div className="text-gold-500 font-bold text-lg mb-3">THIR — Market-Cap Weighted</div>
                  <p className="text-gray-700 dark:text-gray-200 mb-4">
                    Invests in index ETFs that are market-cap weighted. Larger companies have bigger positions.
                  </p>
                  <div className="bg-gray-50 dark:bg-navy-700/50 rounded-lg p-4 text-sm text-gray-600 dark:text-gray-300">
                    <strong>Example:</strong> In the S&P 500, Apple and Microsoft alone can represent 10%+ of the fund.
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-navy-700 dark:text-white font-bold text-lg mb-3">THLV — Equal Weight</div>
                  <p className="text-gray-700 dark:text-gray-200 mb-4">
                    Each sector receives equal allocation (~10% each when fully invested). No single sector dominates.
                  </p>
                  <div className="bg-gray-50 dark:bg-navy-700/50 rounded-lg p-4 text-sm text-gray-600 dark:text-gray-300">
                    <strong>Benefit:</strong> Reduces concentration risk. Tech bubble won't sink the whole portfolio.
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Management */}
            <div className="bg-white dark:bg-navy-800 rounded-xl shadow-md overflow-hidden">
              <div className="bg-navy-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">How Risk is Managed</h3>
              </div>
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-navy-600">
                <div className="p-6">
                  <div className="text-gold-500 font-bold text-lg mb-3">THIR — All-or-Nothing</div>
                  <p className="text-gray-700 dark:text-gray-200 mb-4">
                    Each index gets its own signal. When an index turns risk-off, that allocation moves to short-term treasuries.
                  </p>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                    <div className="flex justify-between">
                      <span>Minimum equity exposure:</span>
                      <span className="font-semibold">0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maximum cash position:</span>
                      <span className="font-semibold">100%</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Can go fully defensive when all signals turn risk-off.
                  </p>
                </div>
                <div className="p-6">
                  <div className="text-navy-700 dark:text-white font-bold text-lg mb-3">THLV — Gradual</div>
                  <p className="text-gray-700 dark:text-gray-200 mb-4">
                    Each sector has its own signal. Sectors turn off individually, creating a gradual de-risking.
                  </p>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                    <div className="flex justify-between">
                      <span>Minimum equity exposure:</span>
                      <span className="font-semibold">0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Typical risk-off:</span>
                      <span className="font-semibold">3-5 sectors</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Smoother transitions as individual sectors rotate to treasuries.
                  </p>
                </div>
              </div>
            </div>

            {/* Best For */}
            <div className="bg-white dark:bg-navy-800 rounded-xl shadow-md overflow-hidden">
              <div className="bg-navy-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">Best Suited For</h3>
              </div>
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-navy-600">
                <div className="p-6">
                  <div className="text-gold-500 font-bold text-lg mb-3">THIR</div>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                    <li className="flex items-start gap-2">
                      <span className="text-gold-500">→</span>
                      Growth-oriented investors
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-500">→</span>
                      Those who want adaptive index selection
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-500">→</span>
                      Investors comfortable with concentrated bets
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-500">→</span>
                      Higher risk tolerance
                    </li>
                  </ul>
                </div>
                <div className="p-6">
                  <div className="text-navy-700 dark:text-white font-bold text-lg mb-3">THLV</div>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                    <li className="flex items-start gap-2">
                      <span className="text-navy-600 dark:text-gray-400">→</span>
                      Conservative or moderate investors
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-navy-600 dark:text-gray-400">→</span>
                      Those seeking lower volatility
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-navy-600 dark:text-gray-400">→</span>
                      Investors wanting broad diversification
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-navy-600 dark:text-gray-400">→</span>
                      Smoother ride preference
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-800 py-16">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Our team can help you understand which strategy aligns with your investment goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
            <Link href="/resources/faq" className="btn-outline border-white text-white hover:bg-white hover:text-navy-800">
              View FAQ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
