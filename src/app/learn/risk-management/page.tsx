import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Risk Management",
  description: "Learn why risk management matters more than chasing returns, and how THOR's approach protects portfolios during market downturns.",
};

export default function RiskManagementPage() {
  return (
    <>
      <section className="bg-navy-800 py-12 lg:py-16">
        <div className="container-wide">
          <nav className="flex items-center text-sm text-gray-400 mb-4">
            <Link href="/learn" className="hover:text-gold-500">Learn</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Risk Management</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">Risk Management</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            Why managing downside risk matters more than chasing upside returns.
          </p>
        </div>
      </section>

      <article className="section-padding">
        <div className="container-narrow prose-content">
          <h2>The Math of Losses</h2>
          <p>
            Here&apos;s a truth most investors don&apos;t fully appreciate: losses hurt more than gains help. It&apos;s not psychology—it&apos;s math.
          </p>
          <p>
            If you lose 50% of your portfolio, you need a 100% gain just to get back to even. A 40% loss requires a 67% gain. This asymmetry is why risk management should be the foundation of any investment strategy.
          </p>

          <div className="bg-gray-50 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-semibold text-navy-800 mb-4">The Recovery Math</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 font-semibold text-navy-800">Portfolio Loss</th>
                  <th className="text-left py-3 font-semibold text-navy-800">Gain Required to Recover</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr><td className="py-2 text-red-600">-10%</td><td className="py-2 text-green-600">+11%</td></tr>
                <tr><td className="py-2 text-red-600">-20%</td><td className="py-2 text-green-600">+25%</td></tr>
                <tr><td className="py-2 text-red-600">-30%</td><td className="py-2 text-green-600">+43%</td></tr>
                <tr><td className="py-2 text-red-600">-40%</td><td className="py-2 text-green-600">+67%</td></tr>
                <tr><td className="py-2 text-red-600">-50%</td><td className="py-2 text-green-600">+100%</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Missing Bad Days vs. Missing Good Days</h2>
          <p>
            You&apos;ve probably heard the argument: &quot;If you miss the 10 best days, your returns suffer dramatically.&quot; This is often used to justify staying fully invested at all times.
          </p>
          <p>
            But consider the flip side: over 85 years of S&P 500 data, a $1 investment grew to $80.76 with buy-and-hold. If you missed the 10 worst days, it grew to $256.46. If you missed the 10 best days, it fell to $26.79.
          </p>
          <p>
            <strong>Missing the worst days is three times more valuable than missing the best days.</strong>
          </p>

          <h2>Why Diversification Isn&apos;t Enough</h2>
          <p>
            Modern Portfolio Theory suggests that diversification can reduce risk without sacrificing returns. And it works—most of the time.
          </p>
          <p>
            But during market crises—exactly when you need protection most—correlations spike. Stocks, bonds, real estate, commodities: everything falls together. The 2008 financial crisis and March 2020 demonstrated this painfully.
          </p>
          <p>
            That&apos;s why THOR&apos;s strategies include the ability to go to cash. Sometimes the best diversification is having no market exposure at all.
          </p>

          <h2>THOR&apos;s Approach</h2>
          <p>
            We don&apos;t try to predict the future. We don&apos;t make forecasts. Instead, we:
          </p>
          <ul>
            <li><strong>Monitor real-time signals</strong> using digital signal processing</li>
            <li><strong>React to regime changes</strong> when they happen, not before</li>
            <li><strong>Maintain the ability to go defensive</strong> when conditions warrant</li>
            <li><strong>Stay invested most of the time</strong>—we have a slight long bias</li>
          </ul>
          <p>
            The goal isn&apos;t to time the market perfectly. It&apos;s to avoid the worst of the damage when markets turn.
          </p>

          <h2>Maximum Drawdown: The Real Risk Measure</h2>
          <p>
            Volatility (standard deviation) is the most common risk measure, but it treats up moves and down moves equally. For most investors, what really matters is <strong>maximum drawdown</strong>—the largest peak-to-trough decline.
          </p>
          <p>
            A strategy can have low volatility but still experience devastating drawdowns. THOR focuses on controlling maximum drawdown, not just overall volatility.
          </p>

          <div className="bg-navy-50 rounded-xl p-8 my-8 not-prose">
            <h3 className="text-xl font-semibold text-navy-800 mb-4">See Risk Management in Action</h3>
            <p className="text-gray-600 mb-6">
              Explore how THOR&apos;s ETFs implement these risk management principles.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/funds/thir" className="btn-primary">THIR</Link>
              <Link href="/funds/thlv" className="btn-secondary">THLV</Link>
            </div>
          </div>

          <h2>Related Reading</h2>
          <ul>
            <li><Link href="/learn/going-to-cash">Going to Cash: When and Why</Link></li>
            <li><Link href="/learn/index-rotation-explained">Index Rotation Explained</Link></li>
          </ul>
        </div>
      </article>
    </>
  );
}
