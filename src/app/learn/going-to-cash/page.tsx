import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Going to Cash",
  description: "When and why moving to cash makes sense, and how THOR's strategies implement defensive positioning.",
};

export default function GoingToCashPage() {
  return (
    <>
      <section className="bg-navy-800 py-12 lg:py-16">
        <div className="container-wide">
          <nav className="flex items-center text-sm text-gray-400 mb-4">
            <Link href="/learn" className="hover:text-gold-500">Learn</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Going to Cash</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">Going to Cash</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            When and why moving to cash makes sense, and how THOR implements defensive positioning.
          </p>
        </div>
      </section>

      <article className="section-padding">
        <div className="container-narrow prose-content">
          <h2>The Case for Defensive Positioning</h2>
          <p>
            The traditional advice is to stay invested at all times—&quot;time in the market beats timing the market.&quot; And for passive, strategic investors, this makes sense. But it ignores a crucial reality: severe drawdowns can take years to recover from.
          </p>
          <p>
            A 50% loss requires a 100% gain to break even. The S&P 500 took over 5 years to recover from its 2008 peak. For investors near retirement or with shorter time horizons, these drawdowns can be devastating.
          </p>

          <h2>When Does Going to Cash Make Sense?</h2>
          <p>
            Moving to cash isn&apos;t about predicting market tops. It&apos;s about reacting to conditions that have historically preceded significant declines:
          </p>
          <ul>
            <li>Multiple signals turning negative simultaneously</li>
            <li>Market regimes shifting from risk-on to risk-off</li>
            <li>When staying invested means accepting outsized risk for limited expected return</li>
          </ul>

          <h2>How THOR Implements Cash Positioning</h2>
          <p>
            Both THIR and THLV can move to 100% short-term treasuries (BIL) when all signals turn negative. But we don&apos;t jump to cash at the first sign of trouble:
          </p>
          <ul>
            <li><strong>THIR:</strong> Cash only enters when 2+ of 3 indexes go risk-off</li>
            <li><strong>THLV:</strong> Cash only enters when fewer than 5 of 10 sectors are risk-on</li>
          </ul>
          <p>
            This prevents excessive whipsawing while still providing protection during sustained downturns.
          </p>

          <h2>The Cost of Going to Cash</h2>
          <p>
            Going to cash isn&apos;t free. If the market quickly reverses, you may miss some upside. Our strategies are designed to accept this trade-off: we&apos;d rather miss some gains than suffer catastrophic losses.
          </p>

          <div className="bg-navy-50 rounded-xl p-8 my-8 not-prose">
            <h3 className="text-xl font-semibold text-navy-800 mb-4">Explore Our Risk-Managed ETFs</h3>
            <Link href="/funds" className="btn-primary">View Our ETFs</Link>
          </div>

          <h2>Related Reading</h2>
          <ul>
            <li><Link href="/learn/risk-management">Risk Management</Link></li>
            <li><Link href="/learn/index-rotation-explained">Index Rotation Explained</Link></li>
          </ul>
        </div>
      </article>
    </>
  );
}
