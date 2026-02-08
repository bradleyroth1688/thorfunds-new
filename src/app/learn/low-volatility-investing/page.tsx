import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Low Volatility Investing - How THLV Works',
  description: 'Learn how THLV provides equal-weight low volatility exposure across 10 sectors with the ability to move to cash. The only equal-weight low vol ETF.',
};

export default function LowVolatilityPage() {
  return (
    <>
      <section className="gradient-navy text-white py-12">
        <div className="container-max mx-auto px-4 md:px-8">
          <nav className="text-sm mb-4">
            <Link href="/learn" className="text-white/60 hover:text-white">Learn</Link>
            <span className="mx-2 text-white/40">/</span>
            <span>Low Volatility Investing</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold">Low Volatility Investing</h1>
          <p className="text-white/80 mt-2">How THLV delivers equal-weight low vol exposure with the ability to go to cash</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-8">
              THLV (THOR Low Volatility ETF) takes a fundamentally different approach to low volatility investing. 
              While traditional low vol ETFs use backward-looking beta and must stay fully invested, THLV uses 
              forward-looking signals and equal-weight sector allocation with the ability to move to 100% cash.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">The Problem with Traditional Low Vol ETFs</h2>
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="card border-l-4 border-red-500">
                <h3 className="font-semibold mb-2">Traditional Approach</h3>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Use backward-looking beta</li>
                  <li>Cap-weighted (concentration risk)</li>
                  <li>Must stay fully invested</li>
                  <li>Still exposed during market stress</li>
                </ul>
              </div>
              <div className="card border-l-4 border-green-500">
                <h3 className="font-semibold mb-2">THLV Approach</h3>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Forward-looking signals</li>
                  <li>Equal-weight (diversified)</li>
                  <li>Can go 100% to cash</li>
                  <li>Designed to reduce volatility drag</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">The 10-Sector Universe</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 my-8">
              {[
                { ticker: 'XLB', name: 'Materials' },
                { ticker: 'XLE', name: 'Energy' },
                { ticker: 'XLF', name: 'Financials' },
                { ticker: 'XLI', name: 'Industrials' },
                { ticker: 'XLK', name: 'Technology' },
                { ticker: 'XLP', name: 'Staples' },
                { ticker: 'XLV', name: 'Health Care' },
                { ticker: 'XLU', name: 'Utilities' },
                { ticker: 'XLY', name: 'Discretionary' },
                { ticker: 'XLRE', name: 'Real Estate' },
              ].map((sector) => (
                <div key={sector.ticker} className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="font-bold text-navy-700">{sector.ticker}</div>
                  <div className="text-xs text-gray-600">{sector.name}</div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">How Equal-Weight Rotation Works</h2>
            <div className="overflow-x-auto my-8">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Sectors On</th>
                    <th>Per-Sector Weight</th>
                    <th>Cash</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>10</td><td>10% each</td><td>0%</td></tr>
                  <tr><td>7-9</td><td>Redistributed equally</td><td>0%</td></tr>
                  <tr><td>5 (threshold)</td><td>20% each</td><td>0%</td></tr>
                  <tr><td>4</td><td>20% each</td><td>20%</td></tr>
                  <tr><td>3</td><td>20% each</td><td>40%</td></tr>
                  <tr><td>2</td><td>20% each</td><td>60%</td></tr>
                  <tr><td>1</td><td>20%</td><td>80%</td></tr>
                  <tr><td>0</td><td>—</td><td>100%</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gold-50 rounded-xl p-6 my-8">
              <h3 className="font-semibold text-navy-700 mb-2">The 5-Sector Threshold</h3>
              <p className="text-gray-700">
                When sectors go risk-off above the threshold, weight redistributes to remaining sectors (max 20% each). 
                Once you drop below 5 sectors, each additional sector going off adds a 20% cash tranche. 
                This prevents over-concentration while providing meaningful downside protection.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">The Academic Case for Low Volatility</h2>
            <p className="text-gray-700 mb-6">
              The low volatility anomaly is one of the most well-documented findings in academic finance. 
              Lower-risk stocks have historically delivered comparable or better returns than higher-risk stocks — 
              the opposite of what traditional theory predicts.
            </p>
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="card">
                <h3 className="font-semibold text-navy-700 mb-2">Compounding Benefits</h3>
                <p className="text-sm text-gray-600">
                  Lower standard deviation leads to less volatility drag on compounding. A portfolio that 
                  loses 10% needs an 11% gain to recover. One that loses 30% needs a 43% gain. By reducing 
                  the magnitude of drawdowns, low volatility strategies allow compounding to work more efficiently over time.
                </p>
              </div>
              <div className="card">
                <h3 className="font-semibold text-navy-700 mb-2">Volatility Drag</h3>
                <p className="text-sm text-gray-600">
                  Arithmetic returns overstate what investors actually earn. The geometric (compounded) return 
                  is always lower, and the gap grows with volatility. Reducing standard deviation narrows this gap, 
                  meaning more of your returns translate into actual wealth accumulation.
                </p>
              </div>
            </div>
            <div className="bg-navy-50 rounded-xl p-6 my-8">
              <h3 className="font-semibold text-navy-700 mb-2">The Math of Recovery</h3>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="font-bold text-red-600">-10%</div>
                  <div className="text-gray-500">needs +11% to recover</div>
                </div>
                <div>
                  <div className="font-bold text-red-600">-20%</div>
                  <div className="text-gray-500">needs +25% to recover</div>
                </div>
                <div>
                  <div className="font-bold text-red-600">-50%</div>
                  <div className="text-gray-500">needs +100% to recover</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                This is why managing downside volatility is mathematically more important than chasing upside returns. 
                Less variance in returns leads to better long-term compounding outcomes.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/funds/thlv" className="btn-primary">
              View THLV Fund Details
            </Link>
            <Link href="/learn/risk-management" className="btn-outline">
              Learn About Risk Management →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
