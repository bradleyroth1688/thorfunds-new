import Link from "next/link";
import { Metadata } from "next";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getArticleSchema, getFAQSchema, getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Low Volatility Investing: The Complete Guide | THOR Funds",
  description: "Master low volatility investing strategies. Learn how to reduce portfolio risk, protect capital, and still participate in market growth. Comprehensive guide from ETF experts.",
  keywords: [
    "low volatility investing",
    "low vol ETF",
    "reduce portfolio risk",
    "low volatility strategy",
    "minimum volatility ETF",
    "defensive investing",
    "risk managed investing",
    "SPLV alternative",
    "low vol strategy",
  ],
  openGraph: {
    title: "Low Volatility Investing: The Complete Guide",
    description: "Master low volatility investing strategies. Learn how to reduce portfolio risk while still participating in market growth.",
    type: "article",
    publishedTime: "2024-01-15",
    modifiedTime: "2025-02-05",
    authors: ["Brad Roth"],
  },
};

const faqs = [
  {
    question: "What is low volatility investing?",
    answer: "Low volatility investing is a strategy that focuses on stocks or funds that experience smaller price swings than the broader market. The goal is to achieve competitive returns with less risk and smoother performance over time.",
  },
  {
    question: "Does low volatility mean low returns?",
    answer: "Not necessarily. Research has shown that low volatility stocks have historically delivered returns comparable to or even exceeding the broader market over full market cycles, while experiencing significantly less drawdown during bear markets.",
  },
  {
    question: "What's the difference between low volatility and minimum volatility?",
    answer: "Low volatility strategies typically select stocks with the lowest historical volatility. Minimum volatility strategies optimize for the lowest overall portfolio volatility, considering correlations between stocks. Both aim to reduce risk.",
  },
  {
    question: "How does THLV differ from other low vol ETFs like SPLV?",
    answer: "THLV adds a tactical overlay to its low-volatility approach. While SPLV stays fully invested at all times, THLV can rotate sectors to short-term treasuries when risk signals turn negative, providing an additional layer of downside protection.",
  },
  {
    question: "Who should consider low volatility investing?",
    answer: "Low volatility strategies are ideal for risk-averse investors, those nearing retirement, anyone who loses sleep over market drops, and investors seeking smoother long-term returns with lower drawdowns.",
  },
];

const relatedContent = [
  { title: "Understanding Volatility Drag", href: "/learn/volatility-drag", description: "How volatility erodes returns over time" },
  { title: "Risk Management 101", href: "/learn/risk-management", description: "Fundamentals of portfolio risk management" },
  { title: "Market Cycles Explained", href: "/learn/market-cycles", description: "Understanding bull and bear markets" },
  { title: "Tactical vs Strategic Investing", href: "/learn/tactical-vs-strategic", description: "When to use each approach" },
  { title: "THLV ETF Details", href: "/funds/thlv", description: "Explore our low volatility ETF" },
  { title: "Risk Profile Quiz", href: "/tools/risk-profile", description: "Discover your risk tolerance" },
];

export default function LowVolatilityPillarPage() {
  const articleSchema = getArticleSchema({
    title: "Low Volatility Investing: The Complete Guide",
    description: "Master low volatility investing strategies. Learn how to reduce portfolio risk, protect capital, and still participate in market growth.",
    slug: "investing/low-volatility",
    datePublished: "2024-01-15",
    dateModified: "2025-02-05",
    author: "Brad Roth",
  });

  const faqSchema = getFAQSchema(faqs);

  return (
    <>
      <SchemaScript schema={[articleSchema, faqSchema]} />
      
      {/* Hero Section */}
      <section className="gradient-mesh text-white py-20">
        <div className="container-narrow">
          <Breadcrumbs 
            items={[
              { name: "Investing", url: "/learn" },
              { name: "Low Volatility Investing", url: "/investing/low-volatility" },
            ]} 
            className="mb-8 text-white/70"
          />
          <div className="text-center">
            <span className="badge-gold mb-4">PILLAR GUIDE</span>
            <h1 className="display-2 mb-6">
              Low Volatility Investing
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              The complete guide to reducing portfolio risk while still capturing market growth. 
              Learn the science behind low-vol strategies and how to implement them.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#what-is-low-vol" className="btn-primary">
                Start Learning
              </Link>
              <Link href="/funds/thlv" className="btn-outline border-white text-white hover:bg-white hover:text-navy-800">
                Explore THLV ETF
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 bg-gray-50 dark:bg-navy-800 border-b border-gray-200 dark:border-navy-700 sticky top-20 z-40">
        <div className="container-wide">
          <nav className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="#what-is-low-vol" className="text-navy-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-500">What Is It?</a>
            <a href="#why-it-works" className="text-navy-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-500">Why It Works</a>
            <a href="#benefits" className="text-navy-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-500">Benefits</a>
            <a href="#strategies" className="text-navy-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-500">Strategies</a>
            <a href="#thor-approach" className="text-navy-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-500">THOR's Approach</a>
            <a href="#faq" className="text-navy-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-500">FAQ</a>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <article className="section-padding">
        <div className="container-narrow">
          {/* What Is Low Volatility Investing */}
          <section id="what-is-low-vol" className="mb-16 scroll-mt-32">
            <h2 className="heading-2 text-navy-800 dark:text-white mb-6">
              What Is Low Volatility Investing?
            </h2>
            <div className="prose-content">
              <p>
                Low volatility investing is an investment approach that prioritizes stocks or funds 
                with lower price fluctuations than the overall market. The core premise is simple: 
                by avoiding the wildest price swings, you can achieve competitive long-term returns 
                with significantly less risk and emotional stress.
              </p>
              
              <div className="bg-gold-50 dark:bg-navy-700 border-l-4 border-gold-500 p-6 my-8 rounded-r-lg">
                <h3 className="font-semibold text-navy-800 dark:text-white mb-2">Key Definition</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-0">
                  <strong>Volatility</strong> measures how much an investment's price fluctuates over time. 
                  Low volatility investments have smaller, more predictable price movements compared to 
                  high-flying growth stocks or the broader market.
                </p>
              </div>

              <p>
                Think of it like choosing between two roads to the same destination. One road has 
                hairpin turns and steep drops—exciting but nerve-wracking. The other is smoother, 
                with gentle curves. You might arrive at roughly the same time, but your journey 
                will be far less stressful.
              </p>
            </div>
          </section>

          {/* Why It Works */}
          <section id="why-it-works" className="mb-16 scroll-mt-32">
            <h2 className="heading-2 text-navy-800 dark:text-white mb-6">
              Why Low Volatility Works: The Volatility Paradox
            </h2>
            <div className="prose-content">
              <p>
                Traditional finance theory suggests that higher risk should equal higher returns. 
                But decades of research have uncovered a surprising truth: <strong>low volatility 
                stocks have historically outperformed high volatility stocks on a risk-adjusted basis</strong>.
              </p>

              <p>This "low volatility anomaly" exists for several reasons:</p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="card">
                  <h4 className="font-semibold text-navy-800 dark:text-white mb-2">📉 Volatility Drag</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Big losses require even bigger gains to recover. A 50% loss needs a 100% gain 
                    just to break even. Low-vol stocks avoid these devastating drawdowns.
                  </p>
                  <Link href="/learn/volatility-drag" className="text-gold-600 text-sm hover:underline mt-2 inline-block">
                    Learn more about volatility drag →
                  </Link>
                </div>
                <div className="card">
                  <h4 className="font-semibold text-navy-800 dark:text-white mb-2">🎯 Behavioral Bias</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Investors overpay for exciting, high-vol stocks (like lottery tickets) while 
                    undervaluing "boring" stable companies, creating a persistent edge.
                  </p>
                </div>
                <div className="card">
                  <h4 className="font-semibold text-navy-800 dark:text-white mb-2">💰 Compounding Power</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Steady returns compound more effectively than volatile returns. Consistency 
                    builds wealth faster than occasional home runs.
                  </p>
                </div>
                <div className="card">
                  <h4 className="font-semibold text-navy-800 dark:text-white mb-2">😴 Better Sleep</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Investors in low-vol strategies are less likely to panic sell at the bottom. 
                    Staying invested through cycles is half the battle.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section id="benefits" className="mb-16 scroll-mt-32">
            <h2 className="heading-2 text-navy-800 dark:text-white mb-6">
              Benefits of Low Volatility Investing
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-800 dark:text-white">Reduced Drawdowns</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Low-vol portfolios typically fall 30-50% less than the market during corrections. 
                    This means less capital to recover and more peace of mind.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-800 dark:text-white">Competitive Long-Term Returns</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Despite lower risk, low-vol strategies have historically delivered market-like 
                    returns over full market cycles—sometimes even better.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-800 dark:text-white">Emotional Stability</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Smoother returns mean you're less likely to make panic-driven decisions. 
                    Staying the course is easier when your portfolio isn't lurching up and down.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-100 dark:bg-gold-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-gold-600 dark:text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-800 dark:text-white">Better Risk-Adjusted Returns</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Higher Sharpe ratios mean you're getting more return per unit of risk. 
                    It's not just about returns—it's about efficient risk-taking.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* THOR's Approach */}
          <section id="thor-approach" className="mb-16 scroll-mt-32">
            <h2 className="heading-2 text-navy-800 dark:text-white mb-6">
              THOR's Approach: Low Vol + Tactical
            </h2>
            <div className="prose-content">
              <p>
                Traditional low-vol ETFs like SPLV and USMV are always fully invested in equities. 
                They reduce risk through stock selection but can't protect you when the entire 
                market is falling.
              </p>

              <p>
                <strong>THLV takes a different approach.</strong> We combine low-volatility sector 
                selection with tactical risk management. When our signals detect elevated market risk, 
                we can rotate from equities to short-term treasuries—the same approach used in our 
                flagship THIR fund.
              </p>

              <div className="bg-navy-800 text-white rounded-xl p-8 my-8">
                <h3 className="text-xl font-bold text-gold-500 mb-4">THLV: The Best of Both Worlds</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">📊 Low Volatility Selection</h4>
                    <p className="text-white/80 text-sm">
                      Equal-weight exposure to 10 S&P sectors provides diversification while 
                      avoiding concentration in high-vol names.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">🛡️ Tactical Overlay</h4>
                    <p className="text-white/80 text-sm">
                      When sector signals turn risk-off, that sector rotates to treasuries. 
                      The fund can be 0-100% in treasuries based on conditions.
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link href="/funds/thlv" className="btn-primary">
                    Explore THLV Details
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="mb-16 scroll-mt-32">
            <h2 className="heading-2 text-navy-800 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details 
                  key={index}
                  className="group card cursor-pointer"
                >
                  <summary className="flex items-center justify-between font-semibold text-navy-800 dark:text-white list-none">
                    {faq.question}
                    <svg 
                      className="w-5 h-5 text-gold-500 transition-transform group-open:rotate-180" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </article>

      {/* Related Content */}
      <section className="section-padding bg-gray-50 dark:bg-navy-800">
        <div className="container-wide">
          <h2 className="heading-2 text-navy-800 dark:text-white text-center mb-12">
            Continue Learning
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedContent.map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                className="card-hover group"
              >
                <h3 className="font-semibold text-navy-800 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {item.description}
                </p>
                <span className="text-gold-600 text-sm mt-4 inline-flex items-center">
                  Read more 
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-gold">
        <div className="container-narrow text-center">
          <h2 className="heading-2 text-navy-800 mb-4">
            Ready to Reduce Your Portfolio Risk?
          </h2>
          <p className="text-navy-700/80 text-lg mb-8">
            Discover if THLV is right for your investment goals with our free risk assessment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/tools/risk-profile" className="btn-secondary">
              Take Risk Assessment Quiz
            </Link>
            <Link href="/funds/thlv" className="btn-outline border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white">
              View THLV Fund Page
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
