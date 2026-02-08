import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ETFs That Can Go to Cash | Active Risk Management During Downturns",
  description: "Unlike passive index funds, THOR ETFs can move to 100% short-duration treasuries when market conditions deteriorate. True defensive capability for uncertain markets.",
  keywords: ["go to cash ETF", "cash ETF", "defensive ETF", "risk-off ETF", "treasury rotation", "market protection"],
  openGraph: {
    title: "ETFs That Can Go to Cash | THOR Funds",
    description: "Adaptive ETFs with the ability to move to 100% treasuries when all signals turn risk-off.",
  },
};

export default function GoToCashETFPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-16 lg:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="inline-block bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium mb-4">
              Defensive Capability
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              ETFs With the Power to Step Aside
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Most ETFs must stay fully invested by mandate. They ride markets down and hope to ride 
              them back up. THOR ETFs are different—they can move to 100% short-duration treasuries 
              when conditions warrant, providing true defensive capability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/funds" className="btn-primary">
                Explore Our ETFs
              </Link>
              <Link href="/why-thor" className="btn-outline border-white text-white hover:bg-white hover:text-navy-800">
                Why This Matters
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-800 text-center mb-12">The Forced Investment Problem</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                <h3 className="text-xl font-semibold text-red-800 mb-4">Traditional Index Funds</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-red-700">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>Must stay fully invested at all times</span>
                  </li>
                  <li className="flex items-start gap-2 text-red-700">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>No ability to reduce exposure in downturns</span>
                  </li>
                  <li className="flex items-start gap-2 text-red-700">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>Ride market crashes all the way down</span>
                  </li>
                  <li className="flex items-start gap-2 text-red-700">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>Rely on diversification (which fails in crises)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <h3 className="text-xl font-semibold text-green-800 mb-4">THOR Tactical ETFs</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-green-700">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Can move to 100% short-duration treasuries</span>
                  </li>
                  <li className="flex items-start gap-2 text-green-700">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Systematically reduce exposure when signals deteriorate</span>
                  </li>
                  <li className="flex items-start gap-2 text-green-700">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Step aside during severe downturns</span>
                  </li>
                  <li className="flex items-start gap-2 text-green-700">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Re-enter when conditions improve</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-4">Progressive Risk-Off Mechanism</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Cash allocation isn&apos;t all-or-nothing—it scales based on the number of risk-off signals
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* THIR */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-navy-800 mb-4">THIR (Index Rotation)</h3>
              <ul className="space-y-2 text-gray-600">
                <li>3 indexes on → 0% treasuries</li>
                <li>2 indexes on → 0% treasuries (still 100% equity)</li>
                <li className="text-gold-600 font-medium">1 index on → 50% treasuries</li>
                <li className="text-gold-600 font-medium">0 indexes on → 100% treasuries</li>
              </ul>
            </div>

            {/* THLV */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-navy-800 mb-4">THLV (Low Volatility)</h3>
              <ul className="space-y-2 text-gray-600">
                <li>10-5 sectors on → 0% treasuries</li>
                <li className="text-gold-600 font-medium">4 sectors on → 20% treasuries</li>
                <li className="text-gold-600 font-medium">3 sectors on → 40% treasuries</li>
                <li className="text-gold-600 font-medium">0 sectors on → 100% treasuries</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Short-Duration Treasuries */}
      <section className="section-padding bg-navy-800 text-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Why Short-Duration Treasuries?</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-gold-500 rounded-full p-2 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4 text-navy-900" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Minimal Interest Rate Risk</h3>
                  <p className="text-gray-300 mt-1">
                    Short-duration treasuries (like BIL) have minimal sensitivity to interest rate changes, 
                    unlike longer-duration bonds that can lose value when rates rise.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gold-500 rounded-full p-2 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4 text-navy-900" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">High Liquidity</h3>
                  <p className="text-gray-300 mt-1">
                    U.S. Treasuries are among the most liquid securities in the world, allowing 
                    seamless transitions when signals change.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gold-500 rounded-full p-2 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4 text-navy-900" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Capital Preservation</h3>
                  <p className="text-gray-300 mt-1">
                    The goal during risk-off periods is preserving capital, not generating returns. 
                    Short-term treasuries accomplish this reliably.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gold-500 rounded-full p-2 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4 text-navy-900" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Earning While Waiting</h3>
                  <p className="text-gray-300 mt-1">
                    Unlike sitting in pure cash, short-duration treasuries generate some yield while 
                    waiting for conditions to improve.
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
          <h2 className="text-3xl font-bold text-navy-800 mb-4">Ready for True Defensive Capability?</h2>
          <p className="text-lg text-navy-700/80 max-w-2xl mx-auto mb-8">
            Explore how THOR ETFs can add real protection to your portfolio—not just diversification.
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
