import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Understanding Market Cycles | THOR Funds Education",
  description: "Learn about market cycles, regime changes, and how adaptive strategies can respond to changing market conditions.",
  keywords: ["market cycles", "regime change", "bull market", "bear market", "adaptive investing"],
};

export default function MarketCyclesPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-12 lg:py-16">
        <div className="container-wide">
          <nav className="text-sm mb-4">
            <Link href="/learn" className="text-white/60 hover:text-white">Learn</Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-white/80">Market Cycles</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Understanding Market Cycles</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Markets move in cycles. Understanding these cycles—and when they change—is fundamental 
            to adaptive investing.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-narrow prose-content">
          <h2>What Are Market Cycles?</h2>
          <p>
            Market cycles are recurring patterns of growth (expansion) and contraction in financial 
            markets. These cycles are driven by economic conditions, investor psychology, and 
            fundamental factors like earnings growth and interest rates.
          </p>
          <p>
            While the timing and magnitude of cycles vary, the pattern of expansion followed by 
            contraction has repeated throughout market history.
          </p>

          <h2>The Four Phases of a Market Cycle</h2>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-green-800 font-semibold mb-2">1. Accumulation</h3>
              <p className="text-green-700 text-sm">
                After a market bottom, smart money begins buying. Pessimism is still high, 
                but prices have stopped falling. Technical indicators begin to improve.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-blue-800 font-semibold mb-2">2. Markup (Bull Market)</h3>
              <p className="text-blue-700 text-sm">
                Prices rise as more investors enter. Economic data improves, sentiment turns positive, 
                and momentum builds. This is typically the longest phase.
              </p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-6">
              <h3 className="text-yellow-800 font-semibold mb-2">3. Distribution</h3>
              <p className="text-yellow-700 text-sm">
                At market peaks, smart money begins selling. Euphoria is high, but prices struggle 
                to make new highs. Volatility increases.
              </p>
            </div>
            <div className="bg-red-50 rounded-xl p-6">
              <h3 className="text-red-800 font-semibold mb-2">4. Markdown (Bear Market)</h3>
              <p className="text-red-700 text-sm">
                Prices decline as selling accelerates. Fear dominates, economic data deteriorates, 
                and many investors panic-sell at lows.
              </p>
            </div>
          </div>

          <h2>Why Cycles Matter for Investors</h2>
          <p>
            Understanding market cycles matters because different investment approaches work better 
            in different cycle phases:
          </p>
          <ul>
            <li>
              <strong>Buy-and-hold</strong> works well during extended markup phases but suffers 
              during markdowns
            </li>
            <li>
              <strong>Defensive strategies</strong> protect during markdowns but may lag during 
              strong rallies
            </li>
            <li>
              <strong>Tactical strategies</strong> attempt to adapt positioning based on the 
              current cycle phase
            </li>
          </ul>

          <h2>Regime Detection: Identifying Cycle Changes</h2>
          <p>
            The challenge isn&apos;t knowing that cycles exist—it&apos;s identifying when they change. 
            Traditional approaches include:
          </p>
          <ul>
            <li>Moving average crossovers</li>
            <li>Economic indicators</li>
            <li>Sentiment surveys</li>
            <li>Technical analysis patterns</li>
          </ul>
          <p>
            THOR uses <strong>digital signal processing</strong>—the same science behind noise-canceling 
            headphones—to detect regime changes. By converting price data to waveforms and applying 
            signal processing algorithms, we can identify meaningful trend changes while filtering 
            out noise.
          </p>

          <h2>The Difficulty of Timing</h2>
          <p>
            It&apos;s important to acknowledge that no one can perfectly time market cycles. Cycle tops 
            and bottoms are only clear in hindsight. This is why:
          </p>
          <ul>
            <li>
              We don&apos;t try to <em>predict</em> cycles—we <em>react</em> to signals as they develop
            </li>
            <li>
              Our systems generate risk-on or risk-off signals systematically, not through 
              discretionary judgment
            </li>
            <li>
              We accept that signals will sometimes be early or late—perfection isn&apos;t the goal
            </li>
          </ul>

          <h2>Historical Market Cycles</h2>
          <p>
            Looking at U.S. stock market history, we see numerous complete cycles:
          </p>
          <ul>
            <li>2020-2022: COVID crash and recovery, followed by inflation-driven decline</li>
            <li>2008-2009: Global Financial Crisis</li>
            <li>2000-2002: Dot-com bubble burst</li>
            <li>1987: Black Monday crash</li>
            <li>1973-1974: Oil crisis bear market</li>
          </ul>
          <p>
            Each cycle had unique characteristics, but all followed the same basic pattern of 
            expansion and contraction.
          </p>

          <div className="bg-navy-800 text-white rounded-xl p-6 my-8">
            <h3 className="text-gold-400 font-semibold mb-2">THOR&apos;s Approach</h3>
            <p className="text-gray-300 mb-0">
              We use signal processing to detect cycle changes systematically. When signals 
              deteriorate, we reduce exposure. When signals improve, we re-enter. The goal 
              is to avoid the worst of markdowns while participating in markups.
            </p>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-navy-800 mb-8">Related Topics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/learn/index-rotation-explained" className="card-hover">
              <h3 className="font-semibold text-navy-700">Index Rotation</h3>
              <p className="text-sm text-gray-600 mt-2">How THIR rotates between indexes based on signals.</p>
            </Link>
            <Link href="/learn/tactical-vs-strategic" className="card-hover">
              <h3 className="font-semibold text-navy-700">Tactical vs Strategic</h3>
              <p className="text-sm text-gray-600 mt-2">Different approaches to adapting to markets.</p>
            </Link>
            <Link href="/about/philosophy" className="card-hover">
              <h3 className="font-semibold text-navy-700">Investment Philosophy</h3>
              <p className="text-sm text-gray-600 mt-2">The science behind THOR&apos;s methodology.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
