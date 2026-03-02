import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare THIR, THLV, and THMR | Which ETF is Right for You?",
  description: "Understand the key differences across THOR's three ETF strategies. Compare investment approach, risk controls, and portfolio role to find the right fit.",
};

export default function ComparePage() {
  return (
    <>
      <section className="bg-navy-800 py-16">
        <div className="container-wide">
          <h1 className="text-4xl lg:text-5xl font-bold text-white">Which THOR ETF is Right for You?</h1>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl">
            Three distinct approaches to risk-managed investing. Same philosophy, different execution.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50 dark:bg-navy-900">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-center mb-8 text-navy-800 dark:text-white">Quick Guide</h2>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-navy-800 rounded-xl p-8 shadow-lg border-t-4 border-gold-500">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-gold-500">THIR</span>
                <p className="text-navy-700 dark:text-gray-300 font-medium mt-1">Index Rotation ETF</p>
              </div>
              <div className="space-y-4 mb-8 text-gray-700 dark:text-gray-200">
                <p>Want exposure to major U.S. indexes.</p>
                <p>Prefer concentrated, high-conviction positioning.</p>
                <p>Comfortable with market-cap weighted ETFs.</p>
                <p>Want adaptive rotation between major equity indexes.</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 italic">
                "I want the strongest index exposure with systematic downside mitigation."
              </p>
              <Link href="/funds/thir" className="btn-primary w-full text-center block">
                Learn More About THIR
              </Link>
            </div>

            <div className="bg-white dark:bg-navy-800 rounded-xl p-8 shadow-lg border-t-4 border-navy-600">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-navy-700 dark:text-white">THLV</span>
                <p className="text-navy-700 dark:text-gray-300 font-medium mt-1">Low Volatility ETF</p>
              </div>
              <div className="space-y-4 mb-8 text-gray-700 dark:text-gray-200">
                <p>Want broad sector diversification.</p>
                <p>Prefer equal-weight allocation.</p>
                <p>Want lower volatility than the broad market.</p>
                <p>Prefer gradual risk reduction sector by sector.</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 italic">
                "I want steadier equity exposure with systematic risk controls."
              </p>
              <Link href="/funds/thlv" className="btn-outline w-full text-center block">
                Learn More About THLV
              </Link>
            </div>

            <div className="relative bg-white dark:bg-navy-800 rounded-xl p-8 shadow-lg border-t-4 border-gold-400 ring-1 ring-gold-200">
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center bg-navy-900 text-gold-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                  COMING SOON
                </span>
              </div>
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-gold-500">THMR</span>
                <p className="text-navy-700 dark:text-gray-300 font-medium mt-1">AdaptiveRisk Dynamic ETF</p>
              </div>
              <div className="space-y-4 mb-8 text-gray-700 dark:text-gray-200">
                <p>Want a multi-asset diversifier in one ETF.</p>
                <p>Prefer dynamic, rules-based allocation across strategies.</p>
                <p>Need flexibility across equities, fixed income, commodities, and alternatives.</p>
                <p>Want an adaptive sleeve that can hold defensive cash when needed.</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 italic">
                "I want one adaptive strategy that can shift across asset classes."
              </p>
              <Link href="/funds/thmr" className="btn-primary w-full text-center block">
                Learn More About THMR
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-center mb-12 text-navy-800 dark:text-white">Side-by-Side Comparison</h2>

          <div className="max-w-6xl mx-auto space-y-8">
            <div className="bg-white dark:bg-navy-800 rounded-xl shadow-md overflow-hidden">
              <div className="bg-navy-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">What They Invest In</h3>
              </div>
              <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-navy-600">
                <div className="p-6">
                  <div className="text-gold-500 font-bold text-lg mb-3">THIR</div>
                  <p className="text-gray-700 dark:text-gray-200">Three major U.S. equity indexes with adaptive rotation and treasury sleeves.</p>
                </div>
                <div className="p-6">
                  <div className="text-navy-700 dark:text-white font-bold text-lg mb-3">THLV</div>
                  <p className="text-gray-700 dark:text-gray-200">Ten S&P 500 sectors with equal-weight construction and adaptive treasury allocation.</p>
                </div>
                <div className="p-6">
                  <div className="text-gold-500 font-bold text-lg mb-3">THMR</div>
                  <p className="text-gray-700 dark:text-gray-200">Multi-asset universe: equities, fixed income, commodities, and alternatives.</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-navy-800 rounded-xl shadow-md overflow-hidden">
              <div className="bg-navy-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">Weighting Approach</h3>
              </div>
              <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-navy-600">
                <div className="p-6">
                  <div className="text-gold-500 font-bold text-lg mb-3">THIR</div>
                  <p className="text-gray-700 dark:text-gray-200">Underlying index exposures remain market-cap weighted.</p>
                </div>
                <div className="p-6">
                  <div className="text-navy-700 dark:text-white font-bold text-lg mb-3">THLV</div>
                  <p className="text-gray-700 dark:text-gray-200">Active sectors are equally weighted to limit concentration risk.</p>
                </div>
                <div className="p-6">
                  <div className="text-gold-500 font-bold text-lg mb-3">THMR</div>
                  <p className="text-gray-700 dark:text-gray-200">Coming Soon: dynamic risk-budgeting across a multi-strategy portfolio.</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-navy-800 rounded-xl shadow-md overflow-hidden">
              <div className="bg-navy-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">Cash and Defensive Mechanism</h3>
              </div>
              <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-navy-600">
                <div className="p-6">
                  <div className="text-gold-500 font-bold text-lg mb-3">THIR</div>
                  <p className="text-gray-700 dark:text-gray-200">Signal-driven equity reduction with ability to move to 100% short-duration treasuries.</p>
                </div>
                <div className="p-6">
                  <div className="text-navy-700 dark:text-white font-bold text-lg mb-3">THLV</div>
                  <p className="text-gray-700 dark:text-gray-200">Progressive sector de-risking and treasury allocation as risk-off signals increase.</p>
                </div>
                <div className="p-6">
                  <div className="text-gold-500 font-bold text-lg mb-3">THMR</div>
                  <p className="text-gray-700 dark:text-gray-200">Coming Soon: can shift from fully invested to 100% defensive cash positioning.</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-navy-800 rounded-xl shadow-md overflow-hidden">
              <div className="bg-navy-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">Best Suited For</h3>
              </div>
              <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-navy-600">
                <div className="p-6">
                  <div className="text-gold-500 font-bold text-lg mb-3">THIR</div>
                  <p className="text-gray-700 dark:text-gray-200">Growth-oriented investors seeking adaptive index exposure.</p>
                </div>
                <div className="p-6">
                  <div className="text-navy-700 dark:text-white font-bold text-lg mb-3">THLV</div>
                  <p className="text-gray-700 dark:text-gray-200">Conservative-to-moderate investors seeking diversified equity risk controls.</p>
                </div>
                <div className="p-6">
                  <div className="text-gold-500 font-bold text-lg mb-3">THMR</div>
                  <p className="text-gray-700 dark:text-gray-200">Moderate investors seeking a multi-asset diversifier and alternative sleeve.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
