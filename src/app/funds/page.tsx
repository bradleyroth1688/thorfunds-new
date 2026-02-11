import Link from "next/link";
import { Metadata } from "next";
import { FUNDS } from "@/lib/api";

export const metadata: Metadata = {
  title: "Our ETFs",
  description: "Explore THOR Funds' risk-managed ETFs: THIR (Index Rotation) and THLV (Low Volatility). Designed to participate in market upside while protecting against significant drawdowns.",
};

export default function FundsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 py-16 lg:py-20">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">Our ETFs</h1>
            <p className="mt-4 text-xl text-gray-300">
              Two distinct strategies designed to manage risk while capturing market opportunities. Both can move to 100% cash when conditions deteriorate.
            </p>
          </div>
        </div>
      </section>

      {/* Fund Cards */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* THIR Card */}
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 overflow-hidden">
              <div className="bg-navy-800 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gold-500">THIR</span>
                  <span className="bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium">
                    Index Rotation
                  </span>
                </div>
                <h2 className="mt-2 text-xl font-semibold text-white">{FUNDS.THIR.name}</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600">{FUNDS.THIR.description}</p>
                
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Benchmark</span>
                    <span className="font-medium text-navy-800">{FUNDS.THIR.benchmark}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Universe</span>
                    <span className="font-medium text-navy-800">S&P 500, Dow Jones, Nasdaq 100</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Cash Position</span>
                    <span className="font-medium text-navy-800">0% to 100%</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
                  <Link
                    href="/funds/thir"
                    className="block w-full text-center btn-primary"
                  >
                    View THIR Details
                  </Link>
                  <div className="flex gap-2">
                    <Link
                      href="/funds/thir/holdings"
                      className="flex-1 text-center py-2 text-sm text-navy-800 hover:text-gold-600"
                    >
                      Holdings
                    </Link>
                    <Link
                      href="/funds/thir/performance"
                      className="flex-1 text-center py-2 text-sm text-navy-800 hover:text-gold-600"
                    >
                      Performance
                    </Link>
                    <Link
                      href="/funds/thir/documents"
                      className="flex-1 text-center py-2 text-sm text-navy-800 hover:text-gold-600"
                    >
                      Documents
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* THLV Card */}
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 overflow-hidden">
              <div className="bg-navy-800 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gold-500">THLV</span>
                  <span className="bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium">
                    Low Volatility
                  </span>
                </div>
                <h2 className="mt-2 text-xl font-semibold text-white">{FUNDS.THLV.name}</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600">{FUNDS.THLV.description}</p>
                
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Benchmark</span>
                    <span className="font-medium text-navy-800">{FUNDS.THLV.benchmark}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Universe</span>
                    <span className="font-medium text-navy-800">10 S&P 500 Sectors</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Cash Position</span>
                    <span className="font-medium text-navy-800">0% to 100%</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
                  <Link
                    href="/funds/thlv"
                    className="block w-full text-center btn-primary"
                  >
                    View THLV Details
                  </Link>
                  <div className="flex gap-2">
                    <Link
                      href="/funds/thlv/holdings"
                      className="flex-1 text-center py-2 text-sm text-navy-800 hover:text-gold-600"
                    >
                      Holdings
                    </Link>
                    <Link
                      href="/funds/thlv/performance"
                      className="flex-1 text-center py-2 text-sm text-navy-800 hover:text-gold-600"
                    >
                      Performance
                    </Link>
                    <Link
                      href="/funds/thlv/documents"
                      className="flex-1 text-center py-2 text-sm text-navy-800 hover:text-gold-600"
                    >
                      Documents
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compare CTA */}
          <div className="mt-12 text-center">
            <Link href="/funds/compare" className="btn-secondary">
              Compare THIR vs THLV
            </Link>
          </div>
        </div>
      </section>

      {/* How They Work */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-12">How Our ETFs Work</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* THIR Mechanics */}
            <div>
              <h3 className="text-xl font-semibold text-navy-800 mb-4">THIR: Index Rotation</h3>
              <p className="text-gray-600 mb-6">
                THIR monitors three major U.S. equity indexes—S&P 500, Dow Jones, and Nasdaq 100—and rotates allocation based on risk signals.
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-medium text-gray-700">Indexes Risk-On</th>
                      <th className="text-left py-2 font-medium text-gray-700">Allocation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-2 text-gray-600">3 of 3</td>
                      <td className="py-2 text-navy-800">33.3% each across all three indexes</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-600">2 of 3</td>
                      <td className="py-2 text-navy-800">50% each (still 100% invested)</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-600">1 of 3</td>
                      <td className="py-2 text-navy-800">50% index + 50% treasuries</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-600">0 of 3</td>
                      <td className="py-2 text-navy-800 font-medium">100% short-term treasuries</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* THLV Mechanics */}
            <div>
              <h3 className="text-xl font-semibold text-navy-800 mb-4">THLV: Sector Low Volatility</h3>
              <p className="text-gray-600 mb-6">
                THLV monitors 10 S&P 500 sectors and equally weights those that are risk-on. Below 5 sectors, cash allocation begins.
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-medium text-gray-700">Sectors Risk-On</th>
                      <th className="text-left py-2 font-medium text-gray-700">Allocation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-2 text-gray-600">10 sectors</td>
                      <td className="py-2 text-navy-800">10% each, 0% cash</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-600">5+ sectors</td>
                      <td className="py-2 text-navy-800">Equal weight, 0% cash</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-600">4 sectors</td>
                      <td className="py-2 text-navy-800">20% each + 20% cash</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-600">0 sectors</td>
                      <td className="py-2 text-navy-800 font-medium">100% short-term treasuries</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advisor CTA */}
      <section className="section-padding bg-navy-800">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Add THOR to Your Portfolio?</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Our ETFs are available through most major brokerages and custodians. For advisor-specific resources and model portfolios, visit our advisor center.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/resources/advisors" className="btn-primary">
              Advisor Resources
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
