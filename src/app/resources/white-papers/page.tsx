"use client";

import Link from "next/link";
import { useState } from "react";

export default function WhitePapersPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In production, send to your email service/CRM
    console.log("Lead captured for whitepaper:", email);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-16 lg:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">White Papers & Research</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              In-depth research on adaptive investing, risk management, and our methodology. 
              These papers explain the science and data behind THOR strategies.
            </p>
          </div>
        </div>
      </section>

      {/* Featured White Paper */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-navy-50 to-gold-50 rounded-2xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="inline-block px-3 py-1 bg-gold-500 text-navy-900 rounded-full text-sm font-semibold mb-4">
                    Featured Research
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-bold text-navy-800 mb-4">
                    Signal Processing 101: A New Framework for Risk Management
                  </h2>
                  <p className="text-gray-700 text-lg mb-6">
                    Learn how THOR applies signal processing principles from electrical engineering 
                    to filter market noise and detect structural regime changes. This institutional 
                    white paper explains our systematic approach to risk management.
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li className="flex items-center gap-2">
                      <svg className="h-5 w-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      The noise-canceling headphones analogy for investing
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="h-5 w-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Why &quot;detect, don&apos;t predict&quot; outperforms forecasting
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="h-5 w-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      How systematic rules remove emotional bias
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="h-5 w-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Real-world application to THIR and THLV strategies
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
                  {!submitted ? (
                    <>
                      <h3 className="text-xl font-bold text-navy-800 mb-2">
                        Download Free White Paper
                      </h3>
                      <p className="text-gray-600 text-sm mb-6">
                        Enter your email to receive the full PDF instantly.
                      </p>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-navy-800"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full btn-primary py-3 disabled:opacity-50"
                        >
                          {loading ? "Processing..." : "Download White Paper"}
                        </button>
                        <p className="text-xs text-gray-500 text-center">
                          We respect your privacy. Unsubscribe anytime.
                        </p>
                      </form>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-navy-800 mb-2">Thank You!</h3>
                      <p className="text-gray-600 mb-6">Click below to download your white paper.</p>
                      <a
                        href="/documents/signal-processing-101-whitepaper.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-flex items-center gap-2"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Download PDF
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional White Papers */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-800 mb-8">More Research</h2>
            <div className="space-y-6">
              {[
                {
                  title: "The Case for Adaptive ETFs",
                  description: "An examination of how adaptive strategies can complement traditional buy-and-hold portfolios, with historical analysis of drawdown protection.",
                  category: "Strategy",
                  comingSoon: true,
                },
                {
                  title: "Equal-Weight vs. Cap-Weight Low Volatility",
                  description: "Comparing the performance characteristics of equal-weight and cap-weight approaches to low volatility investing.",
                  category: "Research",
                  comingSoon: true,
                },
                {
                  title: "The Mathematics of Drawdowns",
                  description: "Why maximum drawdown matters more than volatility for long-term wealth accumulation.",
                  category: "Education",
                  comingSoon: true,
                },
              ].map((paper, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-medium text-gold-600 uppercase tracking-wider">
                        {paper.category}
                      </span>
                      <h3 className="text-xl font-semibold text-navy-800 mt-1">{paper.title}</h3>
                      <p className="text-gray-600 mt-2">{paper.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded text-sm font-medium whitespace-nowrap">
                      Coming Soon
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For Advisors CTA */}
      <section className="section-padding bg-navy-800 text-white">
        <div className="container-wide text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Custom Research?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Financial advisors can request custom analysis and research support. 
            Contact us to discuss your needs.
          </p>
          <Link href="/contact" className="btn-primary">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
