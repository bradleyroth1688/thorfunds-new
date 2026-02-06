import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tactical ETF Strategy | Active Risk Management for Advisors",
  description: "THOR's tactical ETF strategies use digital signal processing to detect market regime changes. Learn how our risk-managed approach helps protect portfolios during downturns.",
  keywords: ["tactical ETF", "risk management", "active ETF", "market timing", "defensive strategy", "signal processing"],
  openGraph: {
    title: "Tactical ETF Strategy | THOR Funds",
    description: "Active risk management using digital signal processing. Strategies that can move to cash when conditions deteriorate.",
  },
};

export default function TacticalETFStrategyPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-16 lg:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="inline-block bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium mb-4">
              Tactical Investing
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Tactical ETF Strategies That React, Not Predict
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Most tactical strategies try to predict the future. We don&apos;t. Our signal processing 
              technology detects market regime changes as they happen, allowing systematic 
              adjustments to portfolio positioning.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/funds" className="btn-primary">
                Explore Our ETFs
              </Link>
              <Link href="/learn/tactical-vs-strategic" className="btn-outline border-white text-white hover:bg-white hover:text-navy-800">
                Tactical vs Strategic
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Differentiator */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy-800 mb-6">Science, Not Predictions</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-12">
              &ldquo;We use science not math to react to changes in market cycles in real time.&rdquo; 
              Math is linear. Markets are not. Our methodology borrows from physics and engineering 
              to solve the market timing problem in a fundamentally different way.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-2">Digital Signal Processing</h3>
              <p className="text-gray-600">
                The same science that powers noise-canceling headphones, applied to market data
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-2">Regime Detection</h3>
              <p className="text-gray-600">
                Identify market turning points systematically, not through gut feelings
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-2">Systematic Execution</h3>
              <p className="text-gray-600">
                Rules-based trading removes emotion from the investment process
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tactical vs Traditional */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-12">Tactical vs. Traditional Approaches</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-navy-800 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-medium">Approach</th>
                    <th className="px-6 py-4 text-left font-medium">Traditional Index</th>
                    <th className="px-6 py-4 text-left font-medium">THOR Tactical</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-6 py-4 font-medium text-navy-800">Market Exposure</td>
                    <td className="px-6 py-4 text-gray-600">Always 100%</td>
                    <td className="px-6 py-4 text-gold-600 font-medium">Adjustable 0-100%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-navy-800">In Bear Markets</td>
                    <td className="px-6 py-4 text-gray-600">Ride it out</td>
                    <td className="px-6 py-4 text-gold-600 font-medium">Can reduce exposure</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-navy-800">Risk Management</td>
                    <td className="px-6 py-4 text-gray-600">Diversification only</td>
                    <td className="px-6 py-4 text-gold-600 font-medium">Active + diversification</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-navy-800">Decision Making</td>
                    <td className="px-6 py-4 text-gray-600">N/A (passive)</td>
                    <td className="px-6 py-4 text-gold-600 font-medium">Rules-based signals</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-navy-800">Drawdown Protection</td>
                    <td className="px-6 py-4 text-gray-600">None</td>
                    <td className="px-6 py-4 text-gold-600 font-medium">Built-in</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-4">Our Tactical Process</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            A systematic approach that monitors markets continuously and adjusts positioning based on signal strength
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gold-200 hidden md:block" />

              {[
                {
                  step: "1",
                  title: "Monitor",
                  description: "Continuous analysis of price data across indexes and sectors, converting raw data into analyzable waveforms",
                },
                {
                  step: "2",
                  title: "Process",
                  description: "Digital signal processing algorithms identify signal from noise, separating meaningful trends from random fluctuations",
                },
                {
                  step: "3",
                  title: "Signal",
                  description: "Generate clear risk-on or risk-off signals for each component (sectors for THLV, indexes for THIR)",
                },
                {
                  step: "4",
                  title: "Execute",
                  description: "Weekly evaluation with systematic rebalancing—evaluated Monday, executed Wednesday",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6 mb-8 last:mb-0">
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-navy-800 rounded-full flex items-center justify-center text-gold-400 font-bold text-xl">
                      {item.step}
                    </div>
                  </div>
                  <div className="pt-3">
                    <h3 className="text-xl font-semibold text-navy-800">{item.title}</h3>
                    <p className="mt-2 text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Two Funds */}
      <section className="section-padding bg-navy-800 text-white">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-center mb-4">Two Tactical ETF Strategies</h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
            Different approaches, same philosophy: participate in upside, protect against downside
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 rounded-xl p-8">
              <span className="inline-block bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium mb-4">
                Index Rotation
              </span>
              <h3 className="text-2xl font-bold mb-2">THIR</h3>
              <p className="text-gray-300 mb-6">
                Rotates between S&P 500, Dow Jones, and Nasdaq 100. Can move to 100% treasuries 
                when all indexes turn risk-off.
              </p>
              <Link href="/funds/thir" className="inline-flex items-center text-gold-400 hover:text-gold-300">
                Learn About THIR
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            <div className="bg-white/10 rounded-xl p-8">
              <span className="inline-block bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium mb-4">
                Low Volatility
              </span>
              <h3 className="text-2xl font-bold mb-2">THLV</h3>
              <p className="text-gray-300 mb-6">
                Equal-weight exposure across 10 S&P sectors. Sectors going risk-off are rotated 
                to treasuries progressively.
              </p>
              <Link href="/funds/thlv" className="inline-flex items-center text-gold-400 hover:text-gold-300">
                Learn About THLV
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-gold-400 to-gold-500">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-navy-800 mb-4">Ready to Add Tactical Exposure?</h2>
          <p className="text-lg text-navy-700/80 max-w-2xl mx-auto mb-8">
            Contact us to learn how THOR&apos;s tactical ETF strategies can complement your portfolio.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/resources/advisors" className="btn-secondary">
              For Advisors
            </Link>
            <Link href="/contact" className="bg-navy-800 text-white hover:bg-navy-700 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all">
              Schedule a Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
