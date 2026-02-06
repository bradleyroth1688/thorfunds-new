import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Key terms and definitions for understanding ETFs, risk management, and THOR's investment approach.",
};

const terms = [
  { term: "Active Management", definition: "An investment approach where portfolio managers make decisions about which securities to buy and sell, as opposed to passively tracking an index." },
  { term: "Alpha", definition: "The excess return of an investment relative to its benchmark. Positive alpha means outperformance; negative alpha means underperformance." },
  { term: "AUM (Assets Under Management)", definition: "The total market value of assets that an investment company manages on behalf of clients." },
  { term: "Beta", definition: "A measure of an investment's volatility relative to a benchmark. A beta of 1 means the investment moves in line with the market." },
  { term: "Correlation", definition: "A measure of how two investments move in relation to each other. High correlation means they tend to move together." },
  { term: "Drawdown", definition: "The peak-to-trough decline during a specific period. Maximum drawdown measures the largest such decline." },
  { term: "ETF (Exchange-Traded Fund)", definition: "A type of investment fund that trades on stock exchanges like a stock, holding assets like stocks, bonds, or commodities." },
  { term: "Index Rotation", definition: "A strategy that shifts allocation between different market indexes based on relative strength or risk signals." },
  { term: "Low Volatility", definition: "An investment approach that seeks to reduce portfolio risk by focusing on securities with historically lower price fluctuations." },
  { term: "NAV (Net Asset Value)", definition: "The per-share value of a fund calculated by dividing total assets minus liabilities by the number of shares outstanding." },
  { term: "Passive Management", definition: "An investment approach that seeks to replicate the performance of a market index rather than beat it." },
  { term: "Premium/Discount", definition: "The difference between an ETF's market price and its NAV. Trading above NAV is a premium; below is a discount." },
  { term: "Rebalancing", definition: "The process of realigning portfolio weights back to target allocations by buying or selling assets." },
  { term: "Risk-Adjusted Return", definition: "A measure of investment performance that accounts for the amount of risk taken. Sharpe ratio is a common example." },
  { term: "Risk-On/Risk-Off", definition: "Market environments where investors either seek risky assets (risk-on) or safe havens (risk-off)." },
  { term: "Sharpe Ratio", definition: "A measure of risk-adjusted return calculated by dividing excess return over the risk-free rate by standard deviation." },
  { term: "Signal Processing", definition: "In THOR's context, the application of engineering techniques to analyze market data and identify regime changes." },
  { term: "Standard Deviation", definition: "A statistical measure of how spread out returns are around their average. Higher values indicate more volatility." },
  { term: "Tactical Allocation", definition: "An investment strategy that actively adjusts portfolio weights based on short-term market conditions." },
  { term: "Volatility", definition: "A measure of how much an investment's price fluctuates over time. Higher volatility means larger price swings." },
];

export default function GlossaryPage() {
  return (
    <>
      <section className="bg-navy-800 py-12 lg:py-16">
        <div className="container-wide">
          <nav className="flex items-center text-sm text-gray-400 mb-4">
            <Link href="/learn" className="hover:text-gold-500">Learn</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Glossary</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">Glossary</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            Key terms and definitions for understanding ETFs, risk management, and THOR&apos;s investment approach.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide max-w-4xl">
          <div className="space-y-6">
            {terms.map(({ term, definition }) => (
              <div key={term} className="border-b border-gray-100 pb-6">
                <dt className="text-lg font-semibold text-navy-800">{term}</dt>
                <dd className="mt-2 text-gray-600">{definition}</dd>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-bold text-navy-800">Have Questions?</h2>
          <p className="mt-2 text-gray-600">
            Check our FAQ or contact us for more information.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <Link href="/resources/faq" className="btn-primary">View FAQ</Link>
            <Link href="/contact" className="btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
