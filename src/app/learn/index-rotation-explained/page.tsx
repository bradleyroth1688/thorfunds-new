import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Index Rotation Explained",
  description: "Deep dive into THOR's index rotation strategy. Learn how THIR navigates between S&P 500, Dow Jones, and Nasdaq 100 based on risk signals.",
};

export default function IndexRotationPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 py-12 lg:py-16">
        <div className="container-wide">
          <nav className="flex items-center text-sm text-gray-400 mb-4">
            <Link href="/learn" className="hover:text-gold-500">Learn</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Index Rotation Explained</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">Index Rotation Explained</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            How THOR&apos;s flagship THIR strategy rotates between major U.S. equity indexes based on real-time risk signals.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="section-padding">
        <div className="container-narrow prose-content">
          <h2>What is Index Rotation?</h2>
          <p>
            Index rotation is an adaptive investment strategy that shifts allocation between different market indexes based on their relative strength and risk characteristics. Unlike static index investing where you buy and hold a single benchmark, index rotation actively adjusts which indexes you own—and how much of each—based on changing market conditions.
          </p>
          <p>
            THOR&apos;s THIR ETF implements a specific version of this approach: it monitors three major U.S. equity indexes—the S&P 500, Dow Jones Industrial Average, and Nasdaq 100—and dynamically allocates between them based on proprietary risk signals.
          </p>

          <h2>The THIR Approach</h2>
          <p>
            THIR tracks the THOR SDQ Rotation Index, which uses digital signal processing to identify market regime changes. The strategy operates on a simple but powerful principle: when all three indexes show positive risk signals, the portfolio is equally divided among them. As indexes turn negative, allocation shifts to the remaining positive indexes—or to short-term treasuries if all signals turn negative.
          </p>

          <h3>Allocation Rules</h3>
          <div className="bg-gray-50 rounded-xl p-6 my-8 not-prose">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 font-semibold text-navy-800">Indexes Risk-On</th>
                  <th className="text-left py-3 font-semibold text-navy-800">Portfolio Allocation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 text-gray-600">3 of 3</td>
                  <td className="py-3 text-navy-800">33.3% each across all three indexes</td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-600">2 of 3</td>
                  <td className="py-3 text-navy-800">50% each (remaining two indexes, still 100% invested)</td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-600">1 of 3</td>
                  <td className="py-3 text-navy-800">50% remaining index + 50% short-term treasuries</td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-600 font-medium">0 of 3</td>
                  <td className="py-3 text-navy-800 font-medium">100% short-term treasuries (BIL)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            A critical design feature: when the first index goes risk-off, THIR doesn&apos;t immediately raise cash. Instead, the two remaining indexes are reweighted to 50% each—keeping you 100% invested. Cash only enters the portfolio when the second index goes negative.
          </p>
          <p>
            This avoids the classic mistake of selling too early in shallow pullbacks while still providing protection during sustained downturns.
          </p>

          <h2>The Science Behind It</h2>
          <p>
            THOR&apos;s risk signals are powered by digital signal processing—the same science used in noise-canceling headphones. The process works in three steps:
          </p>
          <ol>
            <li>
              <strong>Convert price data to a smooth waveform</strong>—Raw price data is noisy. We apply filters to isolate the underlying trend from day-to-day fluctuations.
            </li>
            <li>
              <strong>Apply signal processing algorithms</strong>—Using proprietary momentum and cycle-detection techniques, we identify both trend direction and cyclical movements in the data.
            </li>
            <li>
              <strong>Generate risk-on/risk-off signals</strong>—When the combined signal shows increasing trend with positive momentum, we&apos;re risk-on. When it shows decreasing trend with negative momentum, we&apos;re risk-off.
            </li>
          </ol>

          <h2>Portfolio Positioning</h2>
          <p>
            THIR is designed as a <strong>satellite allocation</strong>, not a core equity replacement. It works best alongside traditional long-only equity exposure, providing adaptive protection when markets turn.
          </p>
          <p>
            Typical use cases include:
          </p>
          <ul>
            <li>5-20% of equity allocation for investors seeking drawdown protection</li>
            <li>Part of a risk-managed sleeve in model portfolios</li>
            <li>Complement to passive index exposure</li>
          </ul>

          <div className="bg-navy-50 rounded-xl p-8 my-8 not-prose">
            <h3 className="text-xl font-semibold text-navy-800 mb-4">Ready to Explore THIR?</h3>
            <p className="text-gray-600 mb-6">
              See current positioning, performance data, and holdings for the THOR SDQ Index Rotation ETF.
            </p>
            <Link href="/funds/thir" className="btn-primary">
              View THIR Details
            </Link>
          </div>

          <h2>Related Reading</h2>
          <ul>
            <li><Link href="/learn/risk-management">Risk Management: Why It Matters More Than Returns</Link></li>
            <li><Link href="/learn/going-to-cash">Going to Cash: When and Why</Link></li>
            <li><Link href="/learn/tactical-vs-strategic">Tactical vs. Strategic Asset Allocation</Link></li>
          </ul>
        </div>
      </article>
    </>
  );
}
