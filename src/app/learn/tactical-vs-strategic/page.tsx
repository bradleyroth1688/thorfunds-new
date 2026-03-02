import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adaptive vs. Strategic Asset Allocation",
  description: "Compare adaptive and strategic asset allocation approaches and understand when each makes sense in a portfolio.",
};

export default function TacticalVsStrategicPage() {
  return (
    <>
      <section className="bg-navy-800 py-12 lg:py-16">
        <div className="container-wide">
          <nav className="flex items-center text-sm text-gray-400 mb-4">
            <Link href="/learn" className="hover:text-gold-500">Learn</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Tactical vs. Strategic</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">Adaptive vs. Strategic Asset Allocation</h1>
        </div>
      </section>

      <article className="section-padding">
        <div className="container-narrow prose-content">
          <h2>Strategic Asset Allocation</h2>
          <p>
            Strategic asset allocation is the traditional buy-and-hold approach. You set target weights for different asset classes based on your risk tolerance and time horizon, then periodically rebalance back to those targets. The allocation doesn&apos;t change based on market conditions.
          </p>
          <p>
            <strong>Pros:</strong> Simple, low turnover, disciplined<br />
            <strong>Cons:</strong> No protection during market downturns, relies on diversification that may fail during crises
          </p>

          <h2>Adaptive Asset Allocation</h2>
          <p>
            Adaptive asset allocation actively adjusts portfolio weights based on observable market conditions and systematic rules. The goal is to shift exposure as risk regimes evolve.
          </p>
          <p>
            <strong>Pros:</strong> Potential to reduce drawdowns, can capture opportunities<br />
            <strong>Cons:</strong> Requires skill, higher costs, risk of mistiming
          </p>

          <h2>THOR&apos;s Approach: Rules-Based Adaptive</h2>
          <p>
            THOR combines elements of both approaches. Our strategies use systematic, rules-based signals to adjust allocation while removing emotional and subjective decision-making. We are not predicting where markets will go; we react to regime changes as they happen.
          </p>
          <p>
            This adaptive, disciplined approach aims to capture market upside while improving downside mitigation during significant downturns.
          </p>

          <div className="bg-navy-50 rounded-xl p-8 my-8 not-prose">
            <h3 className="text-xl font-semibold text-navy-800 mb-4">See Adaptive Allocation in Action</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/funds/thir" className="btn-primary">THIR Strategy</Link>
              <Link href="/funds/thlv" className="btn-secondary">THLV Strategy</Link>
              <Link href="/funds/thmr" className="btn-outline">THMR (Coming Soon)</Link>
            </div>
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
