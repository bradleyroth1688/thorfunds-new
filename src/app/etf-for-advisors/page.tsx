import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ETFs for Financial Advisors | Adaptive Strategies for Client Portfolios",
  description: "THOR ETFs are designed for financial advisors seeking risk-managed strategies. Add adaptive allocation to client portfolios with institutional-quality research.",
  keywords: ["ETF for advisors", "RIA ETF", "advisor ETF", "adaptive allocation", "risk management for advisors"],
  openGraph: {
    title: "ETFs for Financial Advisors | THOR Funds",
    description: "Institutional-quality adaptive ETFs designed for advisor use in client portfolios.",
  },
};

export default function ETFForAdvisorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-16 lg:py-24">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium mb-4">
                For Financial Advisors
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Adaptive ETFs Built for Advisors
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Give your clients sophisticated risk management without the complexity. 
                THOR ETFs deliver institutional-quality adaptive strategies in a simple, 
                liquid, tax-efficient wrapper.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/resources/advisors" className="btn-primary">
                  Advisor Resources
                </Link>
                <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-navy-800">
                  Schedule a Call
                </Link>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gold-400">2</div>
                  <div className="text-gray-300 text-sm mt-1">Adaptive ETFs</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gold-400">15+</div>
                  <div className="text-gray-300 text-sm mt-1">Years of Research</div>
                </div>
                <div className="text-center col-span-2">
                  <div className="text-2xl font-bold text-gold-400">Robust Model Offerings</div>
                  <div className="text-gray-300 text-sm mt-1">And Growing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Advisors Choose THOR */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-12">Why Advisors Choose THOR</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-2">Built-In Risk Management</h3>
              <p className="text-gray-600">
                Strategies that can reduce equity exposure during downturns—addressing the #1 client concern without constant rebalancing.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-2">Client Retention</h3>
              <p className="text-gray-600">
                Clients who see adaptive protection during volatile markets are more likely to stay invested and stay with you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-2">Tax Efficiency</h3>
              <p className="text-gray-600">
                ETF structure provides better tax efficiency than mutual funds or SMAs for the same adaptive strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Positioning */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-4">Portfolio Positioning</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            THOR ETFs are designed as satellite allocations, not core replacements
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-navy-800 mb-4">THIR - Satellite Equity</h3>
                <p className="text-gray-600 mb-4">
                  Position alongside existing long-only equity holdings. Provides adaptive overlay 
                  that can protect during severe drawdowns while participating in upside.
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Typical allocation:</strong> 5-20% of equity sleeve
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-navy-800 mb-4">THLV - Defensive Equity</h3>
                <p className="text-gray-600 mb-4">
                  Can serve as a core defensive equity position or complement growth-oriented holdings. 
                  Equal-weight sector exposure with downside protection.
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Typical allocation:</strong> 10-30% of equity sleeve
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-12">Advisor Resources</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/resources/documents" className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-navy-800" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h3 className="font-semibold text-navy-800 mb-2">Fund Documents</h3>
              <p className="text-sm text-gray-600">Prospectuses, fact sheets, SAIs, and more</p>
            </Link>

            <Link href="/resources/faq" className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-navy-800" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
              </div>
              <h3 className="font-semibold text-navy-800 mb-2">FAQ</h3>
              <p className="text-sm text-gray-600">Common questions about our strategies</p>
            </Link>

            <Link href="/learn" className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-navy-800" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <h3 className="font-semibold text-navy-800 mb-2">Education</h3>
              <p className="text-sm text-gray-600">In-depth articles on our methodology</p>
            </Link>

            <Link href="/press" className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-navy-800" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" />
                </svg>
              </div>
              <h3 className="font-semibold text-navy-800 mb-2">Press & Media</h3>
              <p className="text-sm text-gray-600">THOR in the news and industry coverage</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Model Delivery */}
      <section className="section-padding bg-navy-800 text-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Model Delivery Services</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              THOR also delivers model signals directly to financial advisors and RIAs through TAMP partnerships. 
              Work with us to get signals delivered directly to your trading desk.
            </p>
            <Link href="/contact" className="btn-primary">
              Learn About Model Delivery
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-gold-400 to-gold-500">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-navy-800 mb-4">Ready to Learn More?</h2>
          <p className="text-lg text-navy-700/80 max-w-2xl mx-auto mb-8">
            Schedule a call with our team to discuss how THOR ETFs can fit into your client portfolios.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-secondary">
              Schedule a Call
            </Link>
            <Link href="/funds" className="bg-navy-800 text-white hover:bg-navy-700 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all">
              View Our ETFs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
