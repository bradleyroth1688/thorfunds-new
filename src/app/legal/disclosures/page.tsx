import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclosures",
  description: "Important legal disclosures and regulatory information for THOR Funds ETFs.",
};

export default function DisclosuresPage() {
  return (
    <>
      <section className="bg-navy-800 py-12">
        <div className="container-wide">
          <h1 className="text-3xl font-bold text-white">Disclosures</h1>
        </div>
      </section>

      <article className="section-padding">
        <div className="container-narrow prose-content">
          <h2>Important Investment Disclosures</h2>
          <p>
            <strong>Investors should consider the investment objectives, risks, charges, and expenses carefully before investing. The prospectus contains this and other information about the funds and should be read carefully before investing.</strong>
          </p>

          <h3>Risk Considerations</h3>
          <p>
            Investing involves risk, including the possible loss of principal. Past performance does not guarantee future results. The funds&apos; investment objectives, risks, charges, and expenses must be considered carefully before investing.
          </p>

          <h3>ETF Risks</h3>
          <ul>
            <li>ETF shares are not individually redeemable and may only be bought and sold at market prices.</li>
            <li>Market price returns are based on the midpoint of the bid/ask spread at 4:00 p.m. ET and do not represent the returns you would receive if you traded shares at other times.</li>
            <li>ETF shares may trade at a premium or discount to NAV.</li>
            <li>Brokerage commissions will reduce returns.</li>
          </ul>

          <h3>Strategy-Specific Risks</h3>
          <p>
            <strong>THIR (Index Rotation):</strong> The fund uses a tactical rotation strategy that may result in frequent trading, which could increase costs and taxes. The strategy may not accurately identify market turning points, and the fund may be fully invested in declining markets or in cash during rising markets.
          </p>
          <p>
            <strong>THLV (Low Volatility):</strong> Low volatility investing does not guarantee lower risk or positive returns. The fund may underperform in rapidly rising markets. Sector concentration may increase volatility.
          </p>

          <h3>General Risks</h3>
          <ul>
            <li>Equity securities are subject to stock market fluctuations that occur in response to economic and business developments.</li>
            <li>The funds may invest in securities of non-U.S. issuers, which may be more volatile than U.S. securities.</li>
            <li>The value of investments and the income derived from them can go down as well as up.</li>
            <li>Active management risk: The fund&apos;s investment adviser makes investment decisions that may not produce the intended results.</li>
          </ul>

          <h3>Performance Disclosures</h3>
          <p>
            Performance data quoted represents past performance; past performance does not guarantee future results. Current performance may be lower or higher than the performance quoted. Investment return and principal value will fluctuate so that shares, when redeemed, may be worth more or less than their original cost.
          </p>
          <p>
            Hypothetical or simulated performance results have many inherent limitations. Unlike actual performance records, simulated results do not represent actual trading and may not reflect the impact of material economic and market factors on the decision-making process.
          </p>

          <h3>Distribution</h3>
          <p>
            THOR ETFs are distributed by PINE Distributors LLC. PINE Distributors LLC is not affiliated with THOR Financial Technologies, LLC.
          </p>

          <h3>Contact Information</h3>
          <p>
            For more information about THOR Funds, please contact us at info@thorft.com or visit www.thorft.com.
          </p>
        </div>
      </article>
    </>
  );
}
