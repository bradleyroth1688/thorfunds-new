import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why THOR? - What Makes Us Different',
  description: 'Discover what makes THOR Funds different from traditional ETFs. Science-based risk management, ability to go to cash, and 20+ years of research.',
};

export default function WhyTHORPage() {
  return (
    <>
      <section className="gradient-navy text-white py-16 md:py-24">
        <div className="container-max mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Why THOR?</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Every other industry has evolved. Investment management was stuck in 1952. Until now.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max mx-auto">
          {/* The Problem */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">The Problem with Traditional Investing</h2>
            <p className="text-gray-700 text-lg">
              Modern Portfolio Theory was born in 1952 and won a Nobel Prize in 1990. Meanwhile, 
              every other industry — phones, shopping, navigation — has been completely transformed. 
              Financial services rejected outside thinking and relied on group think for decades.
            </p>
          </div>

          {/* Key Differences */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="card border-l-4 border-red-500">
              <h3 className="font-semibold text-xl mb-4">Traditional Approach</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  Must stay fully invested at all times
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  Uses backward-looking risk metrics
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  Based on 70-year-old theory
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  Diversification fails when you need it most
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  Focuses on volatility, not drawdowns
                </li>
              </ul>
            </div>
            <div className="card border-l-4 border-green-500">
              <h3 className="font-semibold text-xl mb-4">THOR Approach</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  Can go 100% to cash when needed
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  Uses forward-looking signals
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  Based on digital signal processing science
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  Systematic, rules-based execution
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  Focuses on maximum drawdown
                </li>
              </ul>
            </div>
          </div>

          {/* The Numbers */}
          <div className="bg-navy-700 text-white rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">The Numbers Don't Lie</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-gold-400">$256</div>
                <div className="text-white/70 mt-2">Value of $1 missing 10 worst days (85 years)</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white">$81</div>
                <div className="text-white/70 mt-2">Value of $1 with buy & hold</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-red-400">$27</div>
                <div className="text-white/70 mt-2">Value of $1 missing 10 best days</div>
              </div>
            </div>
            <p className="text-center text-white/60 text-sm mt-8">
              Missing the worst days is 3x more valuable than catching all days. Missing the best days is devastating.
            </p>
          </div>

          {/* Our Edge */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Edge</h2>
            <div className="space-y-6">
              <div className="card">
                <h3 className="font-semibold text-lg mb-2">🔬 Science, Not Math</h3>
                <p className="text-gray-600">
                  We use digital signal processing — the same technology in noise-canceling headphones — 
                  to analyze market waveforms and detect regime changes.
                </p>
              </div>
              <div className="card">
                <h3 className="font-semibold text-lg mb-2">💰 Cash is a Position</h3>
                <p className="text-gray-600">
                  When our signals turn risk-off, we can move to short-duration treasuries. 
                  Traditional funds must stay invested no matter what.
                </p>
              </div>
              <div className="card">
                <h3 className="font-semibold text-lg mb-2">🤖 Systematic Execution</h3>
                <p className="text-gray-600">
                  No emotions, no market timing guesses. Our rules-based approach removes human 
                  bias from investment decisions.
                </p>
              </div>
              <div className="card">
                <h3 className="font-semibold text-lg mb-2">📊 Drawdown Focus</h3>
                <p className="text-gray-600">
                  A 40% loss requires 67% to recover. We focus on maximum drawdown — the metric 
                  that actually hurts investors — not just volatility.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Learn More?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/funds" className="btn-primary">
                Explore Our Funds
              </Link>
              <Link href="/learn" className="btn-outline">
                Learn How It Works
              </Link>
              <Link href="/contact" className="btn-outline">
                Talk to Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
