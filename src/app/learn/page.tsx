import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn",
  description: "Educational resources about ETFs, risk management, and THOR's investment strategies. Understand index rotation, low volatility investing, and tactical asset allocation.",
};

const articles = [
  {
    title: "What is an ETF?",
    description: "Learn the basics of exchange-traded funds, how they work, and why they've become a preferred investment vehicle.",
    href: "/learn/what-is-an-etf",
    category: "ETF Basics",
  },
  {
    title: "How ETFs Work",
    description: "Understand the mechanics of ETFs including creation/redemption, market making, and tax efficiency.",
    href: "/learn/how-etfs-work",
    category: "ETF Basics",
  },
  {
    title: "Index Rotation Explained",
    description: "Deep dive into THOR's index rotation strategy and how THIR navigates between major U.S. equity indexes.",
    href: "/learn/index-rotation-explained",
    category: "THOR Strategies",
  },
  {
    title: "Low Volatility Investing",
    description: "Understand the low volatility anomaly and how THLV delivers sector diversification with downside protection.",
    href: "/learn/low-volatility-investing",
    category: "THOR Strategies",
  },
  {
    title: "Tactical vs. Strategic",
    description: "Compare tactical and strategic asset allocation approaches and when each makes sense in a portfolio.",
    href: "/learn/tactical-vs-strategic",
    category: "Investment Concepts",
  },
  {
    title: "Risk Management",
    description: "Learn why risk management matters more than return chasing and how THOR approaches portfolio protection.",
    href: "/learn/risk-management",
    category: "Investment Concepts",
  },
  {
    title: "Going to Cash",
    description: "When and why moving to cash makes sense, and how THOR's strategies implement defensive positioning.",
    href: "/learn/going-to-cash",
    category: "THOR Strategies",
  },
  {
    title: "Glossary",
    description: "Key terms and definitions for understanding ETFs, risk management, and THOR's investment approach.",
    href: "/learn/glossary",
    category: "Reference",
  },
];

const categories = Array.from(new Set(articles.map((a) => a.category)));

export default function LearnPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 py-16 lg:py-20">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">Learn</h1>
            <p className="mt-4 text-xl text-gray-300">
              Educational resources to help you understand ETFs, risk management, and THOR&apos;s investment strategies.
            </p>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-navy-800 mb-8">Featured</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Link
              href="/learn/index-rotation-explained"
              className="group bg-navy-800 rounded-2xl p-8 hover:bg-navy-700 transition-colors"
            >
              <span className="inline-block bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium mb-4">
                THIR Strategy
              </span>
              <h3 className="text-2xl font-bold text-white group-hover:text-gold-500 transition-colors">
                Index Rotation Explained
              </h3>
              <p className="mt-4 text-gray-300">
                Understand how THOR&apos;s flagship strategy rotates between major U.S. equity indexes based on risk signals.
              </p>
              <span className="mt-6 inline-flex items-center text-gold-500 font-medium">
                Read Article
                <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>

            <Link
              href="/learn/low-volatility-investing"
              className="group bg-navy-800 rounded-2xl p-8 hover:bg-navy-700 transition-colors"
            >
              <span className="inline-block bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium mb-4">
                THLV Strategy
              </span>
              <h3 className="text-2xl font-bold text-white group-hover:text-gold-500 transition-colors">
                Low Volatility Investing
              </h3>
              <p className="mt-4 text-gray-300">
                Learn about the low volatility anomaly and how THLV delivers equal-weight sector exposure with risk management.
              </p>
              <span className="mt-6 inline-flex items-center text-gold-500 font-medium">
                Read Article
                <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          {categories.map((category) => (
            <div key={category} className="mb-12 last:mb-0">
              <h2 className="text-xl font-bold text-navy-800 mb-6">{category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles
                  .filter((a) => a.category === category)
                  .map((article) => (
                    <Link
                      key={article.href}
                      href={article.href}
                      className="group card hover:shadow-lg transition-all"
                    >
                      <h3 className="text-lg font-semibold text-navy-800 group-hover:text-gold-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="mt-2 text-gray-600 text-sm">{article.description}</p>
                      <span className="mt-4 inline-flex items-center text-gold-600 font-medium text-sm">
                        Read More
                        <svg className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy-800">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-white">Ready to See It in Action?</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Explore our ETFs and see how THOR&apos;s risk-managed strategies can fit into your portfolio.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/funds" className="btn-primary">
              Explore Our ETFs
            </Link>
            <Link href="/resources/faq" className="btn-outline border-white text-white hover:bg-white hover:text-navy-800">
              View FAQ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
