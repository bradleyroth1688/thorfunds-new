import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Philosophy | THOR Funds",
  description: "Learn about THOR's investment philosophy: using science instead of math to react to market changes, focusing on risk management, and protecting against severe drawdowns.",
  openGraph: {
    title: "Investment Philosophy | THOR Funds",
    description: "Science-based investing focused on risk management and drawdown protection.",
  },
};

export default function PhilosophyPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-16 lg:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Investment Philosophy</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              We use science, not math, to react to changes in market cycles in real time. 
              Math is linear. Markets are not.
            </p>
          </div>
        </div>
      </section>

      {/* Core Beliefs */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-12">Core Beliefs</h2>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-navy-800 mb-4">
                1. Missing the Worst Days Matters More
              </h3>
              <p className="text-gray-600 mb-4">
                Over 85 years of market history, $1 invested with buy-and-hold grew to $80.76. 
                But $1 that missed just the 10 worst days? <strong>$256.46.</strong>
              </p>
              <p className="text-gray-600">
                The financial industry obsesses over not missing the best days. We focus on 
                not experiencing the worst. The math strongly favors downside avoidance.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-navy-800 mb-4">
                2. Volatility Destroys Compounding
              </h3>
              <p className="text-gray-600 mb-4">
                Two portfolios with the same average return but different volatility end with 
                dramatically different values. Higher volatility creates a drag on compounding 
                that erodes wealth over time.
              </p>
              <p className="text-gray-600">
                This is why we prioritize reducing volatility—not just for emotional comfort, 
                but because the math of compounding demands it.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-navy-800 mb-4">
                3. Diversification Fails When You Need It Most
              </h3>
              <p className="text-gray-600 mb-4">
                During severe market stress, correlations between asset classes spike toward 1.0. 
                The diversification benefit that works in normal times disappears exactly when 
                you need it most.
              </p>
              <p className="text-gray-600">
                This is why we built strategies that can actively reduce exposure—not just 
                rebalance between assets that are all falling together.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-navy-800 mb-4">
                4. Maximum Drawdown Is the Real Risk
              </h3>
              <p className="text-gray-600 mb-4">
                Standard deviation tells you how much a portfolio bounces around. Maximum drawdown 
                tells you how bad it can get. A 40% loss requires a 67% gain just to break even.
              </p>
              <p className="text-gray-600">
                We design strategies with drawdown control as a primary objective, not an afterthought.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Science */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-4">The Science Behind THOR</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            We borrow from physics and engineering to solve financial problems
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-navy-800 mb-4">All Assets Are Waveforms</h3>
              <p className="text-gray-600">
                Every asset price, when charted, forms a waveform with a defined starting point 
                but no defined ending point. This insight from physics allows us to apply 
                signal processing techniques to financial data.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-navy-800 mb-4">Digital Signal Processing</h3>
              <p className="text-gray-600">
                Just as noise-canceling headphones analyze sound waves to identify and cancel noise, 
                we analyze price data to identify meaningful signals from market noise.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-navy-800 mb-4">Frequency Conversion</h3>
              <p className="text-gray-600">
                Constant noises (like jet engine hums) are easier to cancel than random sounds 
                (like talking). We convert price data to lower frequencies for cleaner signal detection.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-navy-800 mb-4">Regime Detection</h3>
              <p className="text-gray-600">
                Our algorithms identify market regime changes at confirmed turning points—not on 
                every price wiggle. This reduces whipsaw while capturing major moves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Don't Do */}
      <section className="section-padding bg-navy-800 text-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What We Don&apos;t Do</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-red-400 mt-1">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">We Don&apos;t Predict the Future</h3>
                  <p className="text-gray-300 mt-1">
                    We react to current conditions. No crystal balls, no forecasts, no market calls.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-red-400 mt-1">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">We Don&apos;t Use Gut Feelings</h3>
                  <p className="text-gray-300 mt-1">
                    Every decision is rules-based and systematic. No discretionary overrides.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-red-400 mt-1">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">We Don&apos;t Chase Returns</h3>
                  <p className="text-gray-300 mt-1">
                    Our focus is risk-adjusted returns and drawdown management, not beating benchmarks every quarter.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-red-400 mt-1">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">We Don&apos;t Stay Fully Invested</h3>
                  <p className="text-gray-300 mt-1">
                    When conditions warrant, we can move to 100% short-duration treasuries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-gold-400 to-gold-500">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-navy-800 mb-4">See Our Philosophy in Action</h2>
          <p className="text-lg text-navy-700/80 max-w-2xl mx-auto mb-8">
            Explore how our investment philosophy translates into real strategies.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/funds" className="btn-secondary">
              View Our ETFs
            </Link>
            <Link href="/learn" className="bg-navy-800 text-white hover:bg-navy-700 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all">
              Education Hub
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
