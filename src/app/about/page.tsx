import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About THOR Funds",
  description: "Learn about THOR Financial Technologies' mission to deliver risk-managed investing through innovative ETF strategies. Founded by market experts, PhDs, and engineers.",
};

const timeline = [
  { year: "2000s", event: "THOR Analytics founded, focusing on private hedge funds and accredited investors" },
  { year: "2010s", event: "Developed and refined digital signal processing methodology for markets" },
  { year: "2020", event: "Launched SMA strategy for index rotation" },
  { year: "2024", event: "Launched THIR and THLV ETFs for broader investor access" },
  { year: "Today", event: "Robust model offerings across two ETFs and growing" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 py-16 lg:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">About THOR Funds</h1>
            <p className="mt-6 text-xl text-gray-300 leading-relaxed">
              We use science, not math, to react to changes in market cycles in real time. Adaptive ETFs where managing risk is top of mind.
            </p>
            <p className="mt-4 text-2xl text-gold-500 font-medium">
              Participate. Protect. Prosper.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy-800">Our Philosophy</h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                Traditional finance relies on Modern Portfolio Theory—a framework from 1952 that assumes markets are efficient and diversification solves all problems. But we&apos;ve seen time and again that diversification fails exactly when you need it most: during market crises.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                THOR was built on a different premise: math is linear, but markets are not. We use principles from physics and engineering—specifically digital signal processing—to analyze market data the same way noise-canceling headphones analyze sound waves.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                The result: strategies that can detect market regime changes and adjust positioning accordingly. When signals deteriorate, we can move to cash. When conditions improve, we re-enter. It&apos;s not about predicting the future—it&apos;s about reacting intelligently to the present.
              </p>
            </div>
            <div className="bg-navy-800 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-6">The THOR Difference</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-gold-500 rounded-full p-1 mr-3 mt-1">
                    <svg className="h-4 w-4 text-navy-900" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Dynamic Risk Management</span>
                    <p className="text-gray-400 text-sm mt-1">We react to changing conditions, not just rebalance on a schedule</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-gold-500 rounded-full p-1 mr-3 mt-1">
                    <svg className="h-4 w-4 text-navy-900" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Can Go to Cash</span>
                    <p className="text-gray-400 text-sm mt-1">Unlike index funds, we can move to 100% treasuries when all signals turn risk-off</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-gold-500 rounded-full p-1 mr-3 mt-1">
                    <svg className="h-4 w-4 text-navy-900" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Science-Based Process</span>
                    <p className="text-gray-400 text-sm mt-1">Digital signal processing, not gut feelings or predictions</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-gold-500 rounded-full p-1 mr-3 mt-1">
                    <svg className="h-4 w-4 text-navy-900" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Advisor-Focused</span>
                    <p className="text-gray-400 text-sm mt-1">Built to fit within diversified portfolios as an adaptive allocation</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Science */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-4">The Science</h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Our methodology borrows from engineering and physics to solve the market timing problem
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center text-gold-600 mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-navy-800">Signal Processing</h3>
              <p className="mt-2 text-gray-600 text-sm">
                Just as noise-canceling headphones analyze sound waves to cancel noise, we analyze price data to identify signal from noise in markets.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center text-gold-600 mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-navy-800">Waveform Analysis</h3>
              <p className="mt-2 text-gray-600 text-sm">
                All asset prices are waveforms with defined starting points but undefined endings. We convert price data to smooth waveforms for analysis.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center text-gold-600 mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-navy-800">Regime Detection</h3>
              <p className="mt-2 text-gray-600 text-sm">
                Our algorithms detect market regime changes—flipping to risk-off at confirmed turning points, not on every price wiggle.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/learn/index-rotation-explained" className="btn-primary">
              Learn More About Our Process
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-12">Our Journey</h2>
          
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-gold-500 rounded-full" />
                  {i < timeline.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-2" />}
                </div>
                <div className="pb-8">
                  <span className="text-gold-600 font-semibold">{item.year}</span>
                  <p className="mt-1 text-gray-600">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy-800">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Learn More?</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Explore our ETFs, meet our team, or get in touch to discuss how THOR can fit into your investment strategy.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/funds" className="btn-primary">
              Explore Our ETFs
            </Link>
            <Link href="/team" className="btn-outline border-white text-white hover:bg-white hover:text-navy-800">
              Meet the Team
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
