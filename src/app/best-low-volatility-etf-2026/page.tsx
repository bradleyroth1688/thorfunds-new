import Link from "next/link";
import { Metadata } from "next";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getArticleSchema, getFAQSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Best Low Volatility ETF 2026: THLV vs SPLV vs USMV Compared",
  description: "Looking for the best low volatility ETF in 2026? Compare THLV, SPLV, USMV and other low-vol options. Expert analysis on which ETF offers the best risk-adjusted returns.",
  keywords: [
    "best low volatility ETF 2026",
    "best low vol ETF",
    "THLV ETF",
    "SPLV alternative",
    "USMV vs SPLV",
    "low volatility ETF comparison",
    "minimum volatility ETF 2026",
    "low vol ETF for retirees",
  ],
  openGraph: {
    title: "Best Low Volatility ETF 2026: Complete Comparison Guide",
    description: "Expert comparison of THLV, SPLV, USMV and other low volatility ETFs. Find the best option for your portfolio.",
    type: "article",
    publishedTime: "2025-01-15",
    modifiedTime: "2025-02-05",
  },
};

const comparisonData = [
  {
    ticker: "THLV",
    name: "THOR Low Volatility ETF",
    expenseRatio: "0.68%",
    strategy: "Sector rotation + treasuries",
    canGotoCash: "Yes (0-100%)",
    holding: "10 sector ETFs / Treasuries",
    highlight: true,
  },
  {
    ticker: "SPLV",
    name: "Invesco S&P 500 Low Vol",
    expenseRatio: "0.25%",
    strategy: "100 lowest vol S&P 500 stocks",
    canGotoCash: "No",
    holding: "100 stocks",
    highlight: false,
  },
  {
    ticker: "USMV",
    name: "iShares MSCI USA Min Vol",
    expenseRatio: "0.15%",
    strategy: "Optimized min volatility",
    canGotoCash: "No",
    holding: "~180 stocks",
    highlight: false,
  },
  {
    ticker: "LVHD",
    name: "Franklin Low Vol High Div",
    expenseRatio: "0.27%",
    strategy: "Low vol + high dividend",
    canGotoCash: "No",
    holding: "~100 stocks",
    highlight: false,
  },
];

const faqs = [
  {
    question: "What is the best low volatility ETF to buy in 2026?",
    answer: "The best low volatility ETF depends on your specific needs. THLV offers a unique adaptive overlay that can move to treasuries during downturns. USMV has the lowest expense ratio. SPLV focuses on the 100 lowest volatility S&P 500 stocks. For investors wanting downside protection beyond just stock selection, THLV's ability to go to cash makes it stand out.",
  },
  {
    question: "Is SPLV or USMV better?",
    answer: "SPLV simply selects the 100 lowest volatility stocks from the S&P 500, while USMV uses optimization to minimize portfolio volatility considering correlations. USMV typically holds more stocks (~180) and has a lower expense ratio (0.15% vs 0.25%). USMV may provide better diversification but both stay fully invested in equities at all times.",
  },
  {
    question: "What makes THLV different from other low vol ETFs?",
    answer: "THLV is the only low volatility ETF that can dynamically rotate to short-term treasuries when market conditions deteriorate. Traditional low-vol ETFs like SPLV and USMV are always 100% invested in equities. THLV's defensive mechanism means it can protect capital during severe downturns, not just moderate volatility.",
  },
  {
    question: "Are low volatility ETFs good for retirees?",
    answer: "Low volatility ETFs can be excellent for retirees who need to preserve capital while maintaining equity exposure. They typically experience smaller drawdowns during market corrections, which is critical when you're withdrawing from your portfolio. THLV's ability to move to treasuries provides an additional layer of protection for those who can't afford major losses.",
  },
  {
    question: "Do low volatility ETFs outperform the S&P 500?",
    answer: "Low volatility ETFs often underperform during strong bull markets but tend to outperform during corrections and bear markets. Over full market cycles, research shows they can deliver comparable returns to the broad market with significantly less risk. The key advantage is better risk-adjusted returns and smaller drawdowns.",
  },
];

export default function BestLowVolETF2026Page() {
  const articleSchema = getArticleSchema({
    title: "Best Low Volatility ETF 2026: THLV vs SPLV vs USMV Compared",
    description: "Expert comparison of the best low volatility ETFs for 2026 including THLV, SPLV, USMV and other options.",
    slug: "best-low-volatility-etf-2026",
    datePublished: "2025-01-15",
    dateModified: "2025-02-05",
    author: "Brad Roth",
  });

  const faqSchema = getFAQSchema(faqs);

  return (
    <>
      <SchemaScript schema={[articleSchema, faqSchema]} />
      
      {/* Hero */}
      <section className="gradient-mesh text-white py-16">
        <div className="container-narrow">
          <Breadcrumbs 
            items={[
              { name: "Investing", url: "/learn" },
              { name: "Best Low Volatility ETF 2026", url: "/best-low-volatility-etf-2026" },
            ]}
            className="mb-6 text-white/70"
          />
          <div className="text-center">
            <span className="badge bg-gold-500 text-navy-900 mb-4">2026 GUIDE</span>
            <h1 className="display-2 mb-6">
              Best Low Volatility ETF 2026
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Comprehensive comparison of THLV, SPLV, USMV and other low-vol options. 
              Find the right ETF for your risk tolerance.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="section-padding-sm bg-gold-50 dark:bg-navy-800">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-gold-600 dark:text-gold-500">THLV</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Best for Downside Protection</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-navy-700 dark:text-white">USMV</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Lowest Expense Ratio</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-navy-700 dark:text-white">SPLV</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Most Straightforward</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="section-padding">
        <div className="container-narrow">
          <div className="prose-content">
            <p className="text-lg">
              With market volatility expected to continue through 2026, many investors are seeking 
              low volatility ETFs to reduce portfolio risk while maintaining equity exposure. 
              But which low-vol ETF is truly the best choice?
            </p>

            <p>
              In this guide, we'll compare the major players—THLV, SPLV, USMV, and others—to help 
              you make an informed decision based on your specific investment goals.
            </p>

            <h2 className="text-2xl font-bold text-navy-800 dark:text-white mt-12 mb-6">
              Low Volatility ETF Comparison Table
            </h2>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto mb-12">
            <table className="table-modern w-full">
              <thead>
                <tr>
                  <th>ETF</th>
                  <th>Expense Ratio</th>
                  <th>Strategy</th>
                  <th>Can Go to Cash?</th>
                  <th>Holdings</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((fund) => (
                  <tr 
                    key={fund.ticker}
                    className={fund.highlight ? "bg-gold-50 dark:bg-gold-500/10" : ""}
                  >
                    <td className="font-bold">
                      {fund.ticker}
                      {fund.highlight && (
                        <span className="ml-2 badge-gold text-xs">Our Pick</span>
                      )}
                      <div className="text-xs font-normal text-gray-500 mt-1">{fund.name}</div>
                    </td>
                    <td>{fund.expenseRatio}</td>
                    <td className="text-sm">{fund.strategy}</td>
                    <td>
                      {fund.canGotoCash === "Yes (0-100%)" ? (
                        <span className="text-green-600 font-medium">✓ Yes (0-100%)</span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                    <td className="text-sm">{fund.holding}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="prose-content">
            <h2 className="text-2xl font-bold text-navy-800 dark:text-white mt-12 mb-6">
              Why THLV Stands Out in 2026
            </h2>

            <p>
              While traditional low-vol ETFs like SPLV and USMV reduce volatility through stock 
              selection, they remain 100% invested in equities at all times. This means during 
              major market corrections, they still fall—just less than the broader market.
            </p>

            <div className="bg-navy-800 text-white rounded-xl p-8 my-8">
              <h3 className="text-xl font-bold text-gold-500 mb-4">THLV's Unique Edge</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Tactical Overlay:</strong> Can rotate sectors to short-term treasuries when signals turn negative</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Sector Diversification:</strong> Equal-weight exposure across all 10 S&P sectors</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Maximum Flexibility:</strong> 0-100% cash based on market conditions</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-navy-800 dark:text-white mt-12 mb-6">
              When to Choose Each ETF
            </h2>

            <h3 className="text-xl font-semibold text-navy-800 dark:text-white mt-8 mb-4">
              Choose THLV If You:
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Want protection during severe bear markets, not just moderate corrections</li>
              <li>Prefer active risk management over passive low-vol selection</li>
              <li>Are approaching or in retirement and can't afford major drawdowns</li>
              <li>Want exposure to sectors but with a safety valve</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy-800 dark:text-white mt-8 mb-4">
              Choose SPLV or USMV If You:
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Want the lowest possible expense ratio</li>
              <li>Prefer passive, rules-based strategies</li>
              <li>Are comfortable staying fully invested through all market conditions</li>
              <li>Have a long time horizon and can ride out volatility</li>
            </ul>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-navy-800 dark:text-white mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="card group">
                  <summary className="flex items-center justify-between font-semibold text-navy-800 dark:text-white cursor-pointer list-none">
                    {faq.question}
                    <svg className="w-5 h-5 text-gold-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-br from-gold-400 to-gold-500 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-navy-800 mb-4">
              Ready to Explore THLV?
            </h2>
            <p className="text-navy-700/80 mb-6">
              Learn more about our low volatility ETF with adaptive risk management.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/funds/thlv" className="btn-secondary">
                View THLV Details
              </Link>
              <Link href="/tools/risk-profile" className="btn-outline border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white">
                Take Risk Quiz
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related Pages */}
      <section className="section-padding bg-gray-50 dark:bg-navy-800">
        <div className="container-wide">
          <h2 className="heading-2 text-center text-navy-800 dark:text-white mb-12">
            Related Guides
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/investing/low-volatility" className="card-hover group">
              <h3 className="font-semibold text-navy-800 dark:text-white group-hover:text-gold-600 transition-colors">
                Low Volatility Investing Guide
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Complete guide to low-vol strategies
              </p>
            </Link>
            <Link href="/funds/compare" className="card-hover group">
              <h3 className="font-semibold text-navy-800 dark:text-white group-hover:text-gold-600 transition-colors">
                Compare THIR vs THLV
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Side-by-side THOR fund comparison
              </p>
            </Link>
            <Link href="/learn/volatility-drag" className="card-hover group">
              <h3 className="font-semibold text-navy-800 dark:text-white group-hover:text-gold-600 transition-colors">
                Understanding Volatility Drag
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                How volatility erodes returns
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
