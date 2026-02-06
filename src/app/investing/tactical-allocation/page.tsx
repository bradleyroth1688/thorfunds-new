import Link from "next/link";
import { Metadata } from "next";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getArticleSchema, getFAQSchema, getHowToSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Tactical Asset Allocation: The Complete Guide | THOR Funds",
  description: "Master tactical asset allocation strategies. Learn how to dynamically adjust your portfolio based on market conditions to improve returns and reduce risk.",
  keywords: [
    "tactical asset allocation",
    "tactical ETF",
    "dynamic asset allocation",
    "tactical investing",
    "market timing ETF",
    "active asset allocation",
    "tactical allocation strategy",
    "THIR ETF",
  ],
  openGraph: {
    title: "Tactical Asset Allocation: The Complete Guide",
    description: "Learn how tactical asset allocation can improve portfolio returns while managing downside risk.",
    type: "article",
  },
};

const faqs = [
  {
    question: "What is tactical asset allocation?",
    answer: "Tactical asset allocation (TAA) is an investment strategy that actively adjusts portfolio weights based on market conditions. Unlike buy-and-hold, TAA increases exposure when conditions are favorable and reduces exposure (often moving to cash or bonds) when risks rise.",
  },
  {
    question: "How is tactical allocation different from strategic allocation?",
    answer: "Strategic allocation maintains fixed target weights (e.g., 60/40 stocks/bonds) regardless of market conditions. Tactical allocation deviates from these targets based on short to medium-term market signals, potentially going from 100% equities to 100% cash.",
  },
  {
    question: "Does tactical allocation work?",
    answer: "Research shows that avoiding the worst market days has a larger positive impact than capturing the best days. Tactical strategies that can identify and avoid major drawdowns have historically improved risk-adjusted returns. The key is having a systematic, disciplined approach.",
  },
  {
    question: "What signals does THOR use for tactical decisions?",
    answer: "THOR uses proprietary digital signal processing techniques applied to price data. The system identifies trend changes and momentum shifts to generate weekly risk-on/risk-off signals for each index or sector tracked by our funds.",
  },
];

const howToSteps = [
  { name: "Identify Market Regime", text: "Use systematic signals to determine if markets are in a favorable or unfavorable environment." },
  { name: "Adjust Exposure", text: "Increase equity exposure during favorable conditions, decrease during elevated risk periods." },
  { name: "Execute Systematically", text: "Follow rules-based decisions to remove emotion and maintain discipline." },
  { name: "Rotate to Safety", text: "Move to short-term treasuries or cash when signals indicate high risk." },
  { name: "Monitor and Rebalance", text: "Review signals regularly (THOR does this weekly) and rebalance as conditions change." },
];

const relatedContent = [
  { title: "Index Rotation Explained", href: "/learn/index-rotation-explained", description: "How THIR rotates between major indexes" },
  { title: "Tactical vs Strategic", href: "/learn/tactical-vs-strategic", description: "When to use each approach" },
  { title: "Market Cycles", href: "/learn/market-cycles", description: "Understanding bull and bear markets" },
  { title: "THIR ETF Details", href: "/funds/thir", description: "Explore our index rotation ETF" },
  { title: "Going to Cash Strategy", href: "/learn/going-to-cash", description: "When and why funds move to treasuries" },
  { title: "Investment Calculator", href: "/tools/calculator", description: "Project tactical strategy returns" },
];

export default function TacticalAllocationPillarPage() {
  const articleSchema = getArticleSchema({
    title: "Tactical Asset Allocation: The Complete Guide",
    description: "Master tactical asset allocation strategies for improved risk-adjusted returns.",
    slug: "investing/tactical-allocation",
    datePublished: "2024-01-20",
    dateModified: "2025-02-05",
    author: "Brad Roth",
  });

  const faqSchema = getFAQSchema(faqs);
  
  const howToSchema = getHowToSchema({
    name: "How to Implement Tactical Asset Allocation",
    description: "A step-by-step guide to implementing tactical asset allocation in your portfolio.",
    steps: howToSteps,
  });

  return (
    <>
      <SchemaScript schema={[articleSchema, faqSchema, howToSchema]} />
      
      {/* Hero */}
      <section className="gradient-mesh text-white py-20">
        <div className="container-narrow">
          <Breadcrumbs 
            items={[
              { name: "Investing", url: "/learn" },
              { name: "Tactical Allocation", url: "/investing/tactical-allocation" },
            ]}
            className="mb-8 text-white/70"
          />
          <div className="text-center">
            <span className="badge-gold mb-4">PILLAR GUIDE</span>
            <h1 className="display-2 mb-6">
              Tactical Asset Allocation
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              The complete guide to dynamically adjusting your portfolio based on market conditions. 
              Learn how tactical strategies can improve risk-adjusted returns.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#what-is-taa" className="btn-primary">
                Start Learning
              </Link>
              <Link href="/funds/thir" className="btn-outline border-white text-white hover:bg-white hover:text-navy-800">
                Explore THIR ETF
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-8 bg-navy-900 text-white">
        <div className="container-wide">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gold-500">$256</div>
              <div className="text-sm text-gray-400 mt-1">$1 grows to if you miss 10 worst days</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">$81</div>
              <div className="text-sm text-gray-400 mt-1">$1 grows to with buy-and-hold</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-400">$27</div>
              <div className="text-sm text-gray-400 mt-1">$1 grows to if you miss 10 best days</div>
            </div>
          </div>
          <p className="text-center text-gray-500 text-xs mt-4">Based on S&P 500 returns 1937-2023</p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-6 bg-gray-50 dark:bg-navy-800 border-b border-gray-200 dark:border-navy-700 sticky top-20 z-40">
        <div className="container-wide">
          <nav className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="#what-is-taa" className="text-navy-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-500">What Is TAA?</a>
            <a href="#why-tactical" className="text-navy-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-500">Why Tactical</a>
            <a href="#how-it-works" className="text-navy-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-500">How It Works</a>
            <a href="#thor-approach" className="text-navy-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-500">THOR's Approach</a>
            <a href="#faq" className="text-navy-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-500">FAQ</a>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <article className="section-padding">
        <div className="container-narrow">
          {/* What is TAA */}
          <section id="what-is-taa" className="mb-16 scroll-mt-32">
            <h2 className="heading-2 text-navy-800 dark:text-white mb-6">
              What Is Tactical Asset Allocation?
            </h2>
            <div className="prose-content">
              <p>
                Tactical asset allocation (TAA) is an active investment strategy that dynamically 
                adjusts portfolio exposure based on current market conditions. Unlike static 
                buy-and-hold approaches, TAA seeks to increase returns or reduce risk by 
                overweighting favorable assets and underweighting (or completely avoiding) 
                unfavorable ones.
              </p>

              <div className="bg-gold-50 dark:bg-navy-700 border-l-4 border-gold-500 p-6 my-8 rounded-r-lg">
                <h3 className="font-semibold text-navy-800 dark:text-white mb-2">The Core Principle</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-0">
                  <strong>Missing the worst days matters more than catching the best days.</strong> 
                  Historical data shows that a portfolio invested in the S&P 500 from 1937-2023, 
                  but missing just the 10 worst days, would have grown $1 to $256—compared to 
                  only $81 with buy-and-hold.
                </p>
              </div>

              <p>
                The key insight is that market returns are not evenly distributed. A small number 
                of extreme days—both positive and negative—drive most long-term returns. And those 
                extreme negative days tend to cluster during periods of high volatility that can 
                often be identified in advance.
              </p>
            </div>
          </section>

          {/* Why Tactical */}
          <section id="why-tactical" className="mb-16 scroll-mt-32">
            <h2 className="heading-2 text-navy-800 dark:text-white mb-6">
              Why Tactical Beats Buy-and-Hold (Sometimes)
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="card border-l-4 border-green-500">
                <h3 className="font-semibold text-navy-800 dark:text-white mb-3">Tactical Strengths</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    Reduces drawdowns during bear markets
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    Preserves capital when it matters most
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    Better risk-adjusted returns over full cycles
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    Easier to stay invested during volatility
                  </li>
                </ul>
              </div>
              <div className="card border-l-4 border-yellow-500">
                <h3 className="font-semibold text-navy-800 dark:text-white mb-3">Important Caveats</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">!</span>
                    May underperform during strong bull markets
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">!</span>
                    Signals can generate false positives
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">!</span>
                    Higher turnover means more trading costs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">!</span>
                    Requires disciplined, systematic execution
                  </li>
                </ul>
              </div>
            </div>

            <div className="prose-content">
              <p>
                The evidence for tactical allocation is strongest during periods of elevated risk. 
                When markets are trending smoothly upward, staying fully invested (buy-and-hold) 
                typically wins. But when volatility spikes and trends break down, tactical 
                strategies that can sidestep the carnage often come out ahead.
              </p>
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="mb-16 scroll-mt-32">
            <h2 className="heading-2 text-navy-800 dark:text-white mb-6">
              How to Implement Tactical Allocation
            </h2>
            
            <div className="space-y-4">
              {howToSteps.map((step, index) => (
                <div key={index} className="card flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold-500 text-navy-900 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-800 dark:text-white">
                      {step.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* THOR's Approach */}
          <section id="thor-approach" className="mb-16 scroll-mt-32">
            <h2 className="heading-2 text-navy-800 dark:text-white mb-6">
              THOR's Tactical Approach: Signal Processing for Markets
            </h2>
            
            <div className="prose-content">
              <p>
                THOR's tactical ETFs use a unique approach rooted in digital signal processing—the 
                same technology used in telecommunications and audio processing. Instead of relying 
                on fundamental analysis or economic forecasts, we treat price movements as signals 
                to be analyzed.
              </p>
            </div>

            <div className="bg-navy-800 text-white rounded-xl p-8 my-8">
              <h3 className="text-xl font-bold text-gold-500 mb-6">How THIR Works</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="w-12 h-12 bg-gold-500/20 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-2">Track 3 Major Indexes</h4>
                  <p className="text-white/70 text-sm">
                    SPY (S&P 500), DIA (Dow), QQQ (Nasdaq) are monitored with independent signals.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-gold-500/20 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-2">Weekly Signal Updates</h4>
                  <p className="text-white/70 text-sm">
                    Signals are recalculated weekly. Each index gets a risk-on or risk-off signal.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-gold-500/20 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-2">Rotate to Treasuries</h4>
                  <p className="text-white/70 text-sm">
                    Risk-off indexes are replaced with short-term treasuries. Can be 0-100% cash.
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/funds/thir" className="btn-primary">
                  Explore THIR Fund Details →
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mb-16 scroll-mt-32">
            <h2 className="heading-2 text-navy-800 dark:text-white mb-8">
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
                  <p className="mt-4 text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </article>

      {/* Related Content */}
      <section className="section-padding bg-gray-50 dark:bg-navy-800">
        <div className="container-wide">
          <h2 className="heading-2 text-center text-navy-800 dark:text-white mb-12">
            Continue Learning
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedContent.map((item, index) => (
              <Link key={index} href={item.href} className="card-hover group">
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
            Ready to Add Tactical Allocation to Your Portfolio?
          </h2>
          <p className="text-navy-700/80 text-lg mb-8">
            Discover if THIR is right for your investment goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/tools/risk-profile" className="btn-secondary">
              Take Risk Assessment
            </Link>
            <Link href="/funds/thir" className="btn-outline border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white">
              View THIR Fund Page
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
