import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "White Papers & Research | THOR Funds",
  description: "In-depth research and white papers on adaptive investing, risk management, and our signal-based methodology.",
  openGraph: {
    title: "White Papers & Research | THOR Funds",
    description: "Research papers and in-depth analysis from THOR Funds.",
  },
};

const whitePapers = [
  {
    title: "The Case for Adaptive ETFs",
    description: "An examination of how adaptive strategies can complement traditional buy-and-hold portfolios, with historical analysis of drawdown protection.",
    category: "Strategy",
    date: "2024",
    comingSoon: true,
  },
  {
    title: "Digital Signal Processing in Finance",
    description: "A technical overview of how signal processing techniques from engineering can be applied to market data analysis.",
    category: "Methodology",
    date: "2024",
    comingSoon: true,
  },
  {
    title: "Equal-Weight vs. Cap-Weight Low Volatility",
    description: "Comparing the performance characteristics of equal-weight and cap-weight approaches to low volatility investing.",
    category: "Research",
    date: "2024",
    comingSoon: true,
  },
  {
    title: "The Mathematics of Drawdowns",
    description: "Why maximum drawdown matters more than volatility for long-term wealth accumulation.",
    category: "Education",
    date: "2024",
    comingSoon: true,
  },
  {
    title: "Index Rotation: A Framework for Adaptive Equity",
    description: "How rotating between major indexes based on risk signals can provide both participation and protection.",
    category: "Strategy",
    date: "2024",
    comingSoon: true,
  },
];

export default function WhitePapersPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-16 lg:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">White Papers & Research</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              In-depth research on adaptive investing, risk management, and our methodology. 
              These papers explain the science and data behind THOR strategies.
            </p>
          </div>
        </div>
      </section>

      {/* White Papers List */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-4xl">
            <div className="space-y-6">
              {whitePapers.map((paper, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-gold-600 uppercase tracking-wider">
                          {paper.category}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-500">{paper.date}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-navy-800">{paper.title}</h3>
                      <p className="text-gray-600 mt-2">{paper.description}</p>
                    </div>
                    {paper.comingSoon ? (
                      <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded text-sm font-medium whitespace-nowrap">
                        Coming Soon
                      </span>
                    ) : (
                      <button className="btn-primary text-sm whitespace-nowrap">
                        Download PDF
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe for Updates */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy-800 mb-4">Get Research Updates</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter to be notified when new research papers are published.
            </p>
            <Link href="/newsletter" className="btn-primary">
              Subscribe to Newsletter
            </Link>
          </div>
        </div>
      </section>

      {/* For Advisors CTA */}
      <section className="section-padding bg-navy-800 text-white">
        <div className="container-wide text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Custom Research?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Financial advisors can request custom analysis and research support. 
            Contact us to discuss your needs.
          </p>
          <Link href="/contact" className="btn-primary">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
