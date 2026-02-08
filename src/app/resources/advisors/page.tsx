import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Advisors",
  description: "Resources for financial advisors and RIAs implementing THOR's risk-managed ETF strategies. Access model portfolios, due diligence materials, and support.",
};

export default function AdvisorsPage() {
  return (
    <>
      <section className="bg-navy-800 py-16 lg:py-20">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="inline-block bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium mb-4">
              For Financial Professionals
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white">Advisor Resources</h1>
            <p className="mt-4 text-xl text-gray-300">
              Tools, materials, and support to help you implement THOR strategies in your practice.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-navy-800 mb-6">Why Advisors Choose THOR</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Risk-Managed Approach",
                    description: "Our ETFs can go to cash when markets deteriorate—giving your clients protection traditional funds can't offer.",
                  },
                  {
                    title: "Easy Implementation",
                    description: "Available through all major custodians. No paperwork, no K-1s, no complicated structures.",
                  },
                  {
                    title: "Transparent Process",
                    description: "We explain exactly how our signals work. No black boxes, no mysterious algorithms.",
                  },
                  {
                    title: "Dedicated Support",
                    description: "Direct access to our team for questions, due diligence, and portfolio construction guidance.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="bg-gold-100 rounded-full p-2 h-fit">
                      <svg className="h-5 w-5 text-gold-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-800">{item.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-navy-800 mb-6">Request Advisor Access</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Firm Name *</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">AUM Range</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500">
                    <option>Select...</option>
                    <option>Under $50M</option>
                    <option>$50M - $250M</option>
                    <option>$250M - $1B</option>
                    <option>Over $1B</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 resize-none" placeholder="Tell us about your interest in THOR..." />
                </div>
                <button type="submit" className="w-full btn-primary py-3">
                  Request Access
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-navy-800 text-center mb-8">Available Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Fund Fact Sheets", description: "One-page summaries of each ETF strategy" },
              { title: "Due Diligence Questionnaire", description: "Completed DDQ for your compliance review" },
              { title: "Model Portfolio Allocations", description: "Sample portfolios incorporating THOR" },
              { title: "White Papers", description: "Deep dives into our methodology and research" },
              { title: "Performance Reports", description: "Monthly and quarterly performance data" },
              { title: "Training Materials", description: "Educational content for your team" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-navy-800">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy-800">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Schedule a call with our team to discuss how THOR can fit into your practice.
          </p>
          <Link href="/contact" className="mt-8 inline-block btn-primary">
            Schedule a Call
          </Link>
        </div>
      </section>
    </>
  );
}
