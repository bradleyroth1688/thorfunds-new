import Link from 'next/link';
import FundStats from '@/components/fund/FundStats';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="gradient-navy text-white py-20 md:py-32">
        <div className="container-max mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              ETFs That <span className="text-gold-500">Adapt</span> — So You Don't Have To
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              Systematic risk management through every market environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/funds" className="btn-primary text-lg px-8 py-4">
                Explore Our Funds
              </Link>
              <Link href="/learn" className="btn-outline border-white text-white hover:bg-white hover:text-navy-700 text-lg px-8 py-4">
                Learn How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-gold-500 py-4">
        <div className="container-max mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12" style={{ color: '#0e1f36' }}>
            <div className="text-center">
              <span className="font-bold text-2xl md:text-3xl">2</span>
              <span className="ml-2">Risk-Managed ETFs</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-navy-900/30"></div>
            <div className="text-center">
              <span className="font-bold text-2xl md:text-3xl">15+</span>
              <span className="ml-2">Years of Research</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-navy-900/30"></div>
            <div className="text-center">
              <span className="font-bold text-lg md:text-xl">Robust model offerings</span>
              <span className="ml-2">and growing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Funds Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our ETFs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Two distinct adaptive strategies designed with risk management as a core principle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* THIR Card */}
            <div className="card-hover">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-navy-700 dark:text-gold-500">THIR</h3>
                  <p className="text-gray-600 dark:text-gray-300">THOR SDQ Index Rotation ETF</p>
                </div>
                <span className="bg-navy-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Index Rotation
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-200 mb-6">
                Rotates between major U.S. indices (S&P 500, Dow Jones, Nasdaq) based on proprietary signals. 
                Can move to 100% short-duration treasuries when all signals turn risk-off.
              </p>
              <FundStats ticker="THIR" />
              <div className="mt-6 flex gap-4">
                <Link href="/funds/thir" className="btn-primary flex-1 text-center">
                  Fund Details
                </Link>
                <Link href="/funds/thir/holdings" className="btn-outline flex-1 text-center">
                  View Holdings
                </Link>
              </div>
            </div>

            {/* THLV Card */}
            <div className="card-hover">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-navy-700 dark:text-gold-500">THLV</h3>
                  <p className="text-gray-600 dark:text-gray-300">THOR Low Volatility ETF</p>
                </div>
                <span className="bg-gold-500 text-navy-900 px-3 py-1 rounded-full text-sm font-medium">
                  Low Volatility
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-200 mb-6">
                Equal-weight exposure across 10 S&P sectors with dynamic risk management. 
                Sectors going risk-off are replaced with short-duration treasuries.
              </p>
              <FundStats ticker="THLV" />
              <div className="mt-6 flex gap-4">
                <Link href="/funds/thlv" className="btn-primary flex-1 text-center">
                  Fund Details
                </Link>
                <Link href="/funds/thlv/holdings" className="btn-outline flex-1 text-center">
                  View Holdings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding">
        <div className="container-max mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How THOR Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our systematic approach uses digital signal processing to detect market regime changes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-navy-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Monitor</h3>
              <p className="text-gray-600">
                Continuously analyze market data to identify trends and turning points.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-navy-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Signal</h3>
              <p className="text-gray-600">
                Generate clear risk-on or risk-off signals weekly, executed systematically.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-navy-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Protect</h3>
              <p className="text-gray-600">
                Systematically reduce exposure during downturns by rotating to treasuries.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/learn" className="btn-secondary">
              Learn More About Our Process
            </Link>
          </div>
        </div>
      </section>

      {/* Why THOR Section */}
      <section className="section-padding bg-navy-700 text-white">
        <div className="container-max mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Why Missing the Worst Days Matters More
              </h2>
              <p className="text-white/80 mb-6 text-lg">
                Over 85 years of market history, $1 invested with buy-and-hold grew to $80.76. 
                But missing just the 10 worst days? <span className="text-gold-400 font-bold">$256.46</span>.
              </p>
              <Link href="/why-thor" className="btn-primary">
                See What Makes Us Different
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-gold-400">$256</div>
                <div className="text-white/70 text-sm mt-1">Miss 10 Worst Days</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-white/90">$81</div>
                <div className="text-white/70 text-sm mt-1">Buy & Hold</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-red-400">$27</div>
                <div className="text-white/70 text-sm mt-1">Miss 10 Best Days</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-gold-400">85</div>
                <div className="text-white/70 text-sm mt-1">Years of Data</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-gradient-to-br from-gold-400 to-gold-500">
        <div className="container-max mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0e1f36' }}>
            Stay Informed
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'rgba(14, 31, 54, 0.85)' }}>
            Get weekly market insights and signal updates delivered to your inbox.
          </p>
          <Link href="/newsletter" className="btn-secondary">
            Subscribe to Newsletter
          </Link>
        </div>
      </section>

      {/* For Advisors CTA */}
      <section className="section-padding bg-gray-50 dark:bg-navy-900">
        <div className="container-max mx-auto">
          <div className="bg-white dark:bg-navy-800 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-navy-800 dark:text-white">For Financial Advisors</h2>
              <p className="text-gray-700 dark:text-gray-200 mb-6">
                Access institutional-quality research and learn how THOR can complement your client portfolios.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/resources/advisors" className="btn-primary">
                  Advisor Resources
                </Link>
                <Link href="/contact" className="btn-outline">
                  Schedule a Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
