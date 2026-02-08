import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Understanding Volatility Drag | THOR Funds Education",
  description: "Learn how volatility destroys compounding and why portfolios with lower volatility outperform over time, even with the same average return.",
  keywords: ["volatility drag", "compounding", "risk management", "portfolio volatility", "wealth accumulation"],
};

export default function VolatilityDragPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-12 lg:py-16">
        <div className="container-wide">
          <nav className="text-sm mb-4">
            <Link href="/learn" className="text-white/60 hover:text-white">Learn</Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-white/80">Volatility Drag</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Understanding Volatility Drag</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Why portfolios with the same average return but different volatility end up with 
            dramatically different ending values.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-narrow prose-content">
          <h2>The Hidden Cost of Volatility</h2>
          <p>
            Most investors understand that volatility makes portfolios uncomfortable to own. 
            Fewer understand that volatility actually <strong>destroys</strong> wealth over time—even 
            if the average return stays the same.
          </p>
          <p>
            This phenomenon is called <strong>volatility drag</strong> (or variance drain), and it&apos;s one 
            of the most important concepts in long-term investing.
          </p>

          <h2>A Simple Example</h2>
          <p>
            Consider a portfolio that gains 50% one year and loses 50% the next:
          </p>
          <ul>
            <li>Year 1: $100 × 1.50 = $150</li>
            <li>Year 2: $150 × 0.50 = $75</li>
          </ul>
          <p>
            The <em>average</em> return is 0% (up 50%, down 50%). But the <em>actual</em> result is 
            a 25% loss. That&apos;s volatility drag in action.
          </p>

          <h2>The Mathematical Reality</h2>
          <p>
            The compound return of a portfolio is not the arithmetic average—it&apos;s the geometric average, 
            which is always lower than the arithmetic average when there&apos;s volatility.
          </p>
          <p>
            The relationship is approximately:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg my-6">
            <p className="text-center font-mono">
              Geometric Return ≈ Arithmetic Return - (Variance / 2)
            </p>
          </div>
          <p>
            This means higher volatility (variance) directly reduces your actual compounded returns.
          </p>

          <h2>Four Portfolios, Same Average Return</h2>
          <p>
            Let&apos;s compare four hypothetical portfolios, all with a 6% average annual return over 10 years, 
            but with different volatility:
          </p>

          <div className="overflow-x-auto my-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy-800 text-white">
                  <th className="px-4 py-2 text-left">Portfolio</th>
                  <th className="px-4 py-2 text-right">Volatility</th>
                  <th className="px-4 py-2 text-right">Ending Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2">Portfolio A</td>
                  <td className="px-4 py-2 text-right">0%</td>
                  <td className="px-4 py-2 text-right font-bold text-green-600">$179</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Portfolio B</td>
                  <td className="px-4 py-2 text-right">10%</td>
                  <td className="px-4 py-2 text-right font-bold">$170</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-2">Portfolio C</td>
                  <td className="px-4 py-2 text-right">20%</td>
                  <td className="px-4 py-2 text-right font-bold text-yellow-600">$147</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Portfolio D</td>
                  <td className="px-4 py-2 text-right">30%</td>
                  <td className="px-4 py-2 text-right font-bold text-red-600">$113</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Starting with $100 in each portfolio, the difference is stark. Portfolio A (zero volatility) 
            ends with $179, while Portfolio D (high volatility) ends with only $113—a 37% difference 
            in final wealth despite the same average return.
          </p>

          <h2>Implications for Investors</h2>
          <p>
            This has profound implications for investment strategy:
          </p>
          <ol>
            <li>
              <strong>Risk reduction has value beyond comfort.</strong> Lower volatility portfolios 
              compound wealth more efficiently.
            </li>
            <li>
              <strong>Avoiding large drawdowns matters mathematically.</strong> A 50% loss requires 
              a 100% gain to recover—that&apos;s volatility drag in extreme form.
            </li>
            <li>
              <strong>Consistent returns beat volatile returns.</strong> Two portfolios with the 
              same average return won&apos;t end up in the same place.
            </li>
          </ol>

          <h2>How THOR Addresses Volatility Drag</h2>
          <p>
            Our strategies are designed with volatility drag in mind. By reducing equity exposure 
            during deteriorating market conditions, we aim to:
          </p>
          <ul>
            <li>Avoid the worst days that create severe drawdowns</li>
            <li>Reduce overall portfolio volatility</li>
            <li>Preserve the compounding engine that builds long-term wealth</li>
          </ul>

          <div className="bg-navy-800 text-white rounded-xl p-6 my-8">
            <h3 className="text-gold-400 font-semibold mb-2">Key Takeaway</h3>
            <p className="text-gray-300 mb-0">
              Volatility isn&apos;t just uncomfortable—it&apos;s expensive. Every percentage point of 
              volatility reduction helps preserve your compounding power.
            </p>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-navy-800 mb-8">Related Topics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/learn/risk-management" className="card-hover">
              <h3 className="font-semibold text-navy-700">Risk Management</h3>
              <p className="text-sm text-gray-600 mt-2">Learn about THOR&apos;s approach to managing portfolio risk.</p>
            </Link>
            <Link href="/learn/tactical-vs-strategic" className="card-hover">
              <h3 className="font-semibold text-navy-700">Tactical vs Strategic</h3>
              <p className="text-sm text-gray-600 mt-2">Understanding different approaches to asset allocation.</p>
            </Link>
            <Link href="/why-thor" className="card-hover">
              <h3 className="font-semibold text-navy-700">Why THOR</h3>
              <p className="text-sm text-gray-600 mt-2">Discover what makes THOR different.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
