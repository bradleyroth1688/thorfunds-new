import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sector Rotation Strategies | THOR Funds Education",
  description: "Learn how sector rotation strategies work and how THLV dynamically allocates across S&P 500 sectors based on risk signals.",
  keywords: ["sector rotation", "sector ETF", "THLV", "sector allocation", "defensive sectors"],
};

export default function SectorRotationPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-12 lg:py-16">
        <div className="container-wide">
          <nav className="text-sm mb-4">
            <Link href="/learn" className="text-white/60 hover:text-white">Learn</Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-white/80">Sector Rotation</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Sector Rotation Strategies</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            How rotating between market sectors based on risk signals can provide 
            both opportunity and protection.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-narrow prose-content">
          <h2>What Is Sector Rotation?</h2>
          <p>
            Sector rotation is an investment strategy that moves money between different 
            industry sectors of the economy based on various factors like economic cycles, 
            valuations, or technical signals.
          </p>
          <p>
            The basic premise is that different sectors perform better at different times. 
            By identifying which sectors are likely to outperform (or underperform), investors 
            can potentially improve returns or reduce risk.
          </p>

          <h2>The S&P 500 Sectors</h2>
          <p>
            The S&P 500 is divided into 11 sectors, each representing a different part of the economy:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8">
            {[
              { name: "Technology (XLK)", type: "Growth" },
              { name: "Healthcare (XLV)", type: "Defensive" },
              { name: "Financials (XLF)", type: "Cyclical" },
              { name: "Consumer Disc. (XLY)", type: "Cyclical" },
              { name: "Consumer Staples (XLP)", type: "Defensive" },
              { name: "Industrials (XLI)", type: "Cyclical" },
              { name: "Energy (XLE)", type: "Cyclical" },
              { name: "Utilities (XLU)", type: "Defensive" },
              { name: "Materials (XLB)", type: "Cyclical" },
              { name: "Real Estate (XLRE)", type: "Interest-Sensitive" },
              { name: "Communications (XLC)", type: "Growth" },
            ].map((sector, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="font-medium text-navy-800 text-sm">{sector.name}</div>
                <div className="text-xs text-gray-500">{sector.type}</div>
              </div>
            ))}
          </div>

          <h2>Sector Characteristics</h2>
          <p>
            Sectors behave differently based on economic conditions:
          </p>
          <ul>
            <li>
              <strong>Cyclical sectors</strong> (Financials, Industrials, Consumer Discretionary) 
              tend to do well when the economy is growing
            </li>
            <li>
              <strong>Defensive sectors</strong> (Utilities, Consumer Staples, Healthcare) 
              tend to hold up better during economic downturns
            </li>
            <li>
              <strong>Growth sectors</strong> (Technology, Communications) are sensitive to 
              interest rates and investor sentiment
            </li>
          </ul>

          <h2>Traditional vs. Signal-Based Rotation</h2>
          <p>
            Traditional sector rotation relies on economic forecasts—trying to predict which 
            sectors will outperform based on where we are in the business cycle. The challenge 
            is that economic forecasting is notoriously difficult.
          </p>
          <p>
            <strong>Signal-based rotation</strong> takes a different approach. Instead of predicting 
            which sectors will do well, it monitors price data to detect when sectors are trending 
            favorably or unfavorably. This reactive approach doesn&apos;t require forecasting—just 
            systematic response to observed conditions.
          </p>

          <h2>How THLV Approaches Sector Rotation</h2>
          <p>
            THLV monitors 10 of the 11 S&P 500 sectors (excluding Communications) using our 
            signal processing methodology. Here&apos;s how it works:
          </p>
          <ol>
            <li>
              <strong>Equal-weight foundation.</strong> When all sectors are risk-on, each gets 
              roughly 10% weight, avoiding concentration.
            </li>
            <li>
              <strong>Dynamic reallocation.</strong> When a sector goes risk-off, it&apos;s sold and 
              weight is redistributed equally among remaining sectors.
            </li>
            <li>
              <strong>Cash trigger.</strong> Once only 5 sectors remain risk-on (20% each), 
              additional risk-off signals trigger allocation to treasuries.
            </li>
            <li>
              <strong>Full protection.</strong> If all sectors go risk-off, THLV can be 100% 
              in short-duration treasuries.
            </li>
          </ol>

          <h2>Benefits of This Approach</h2>
          <ul>
            <li>
              <strong>No forecasting required.</strong> We react to signals, not predictions.
            </li>
            <li>
              <strong>Diversification maintained.</strong> Equal-weighting prevents concentration 
              that plagues cap-weighted approaches.
            </li>
            <li>
              <strong>Defensive capability.</strong> Unlike passive sector funds, THLV can 
              raise cash when conditions deteriorate.
            </li>
            <li>
              <strong>Systematic execution.</strong> Rules-based approach removes emotional 
              decision-making.
            </li>
          </ul>

          <div className="bg-navy-800 text-white rounded-xl p-6 my-8">
            <h3 className="text-gold-400 font-semibold mb-2">THLV&apos;s Edge</h3>
            <p className="text-gray-300 mb-0">
              Most sector rotation strategies stay fully invested, just shifting between sectors. 
              THLV can rotate all the way to cash—providing true defensive capability that 
              traditional approaches lack.
            </p>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-navy-800 mb-8">Related Topics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/funds/thlv" className="card-hover">
              <h3 className="font-semibold text-navy-700">THLV Fund Page</h3>
              <p className="text-sm text-gray-600 mt-2">Live data, holdings, and performance for THLV.</p>
            </Link>
            <Link href="/learn/low-volatility-investing" className="card-hover">
              <h3 className="font-semibold text-navy-700">Low Volatility Investing</h3>
              <p className="text-sm text-gray-600 mt-2">Why lower volatility leads to better outcomes.</p>
            </Link>
            <Link href="/low-volatility-etf" className="card-hover">
              <h3 className="font-semibold text-navy-700">Low Volatility ETF</h3>
              <p className="text-sm text-gray-600 mt-2">A smarter approach to defensive equity.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
