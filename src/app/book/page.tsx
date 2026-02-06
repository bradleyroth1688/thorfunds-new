import Link from "next/link";
import { Metadata } from "next";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "The Book | Investment Wisdom from THOR Funds",
  description: "Discover the investment mistakes that destroy wealth and learn what actually works. A guide to the THOR Funds investment philosophy.",
  openGraph: {
    title: "The Book | THOR Funds",
    description: "Investment insights and strategies from the team behind THOR Funds.",
  },
};

interface ChapterInfo {
  slug: string;
  number: number;
  title: string;
  excerpt: string;
}

function getChapters(): ChapterInfo[] {
  const chaptersDir = path.join(process.cwd(), "content/book/chapters");
  
  try {
    const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith(".md"));
    
    return files.map(file => {
      const content = fs.readFileSync(path.join(chaptersDir, file), "utf-8");
      const lines = content.split("\n");
      const title = lines[0]?.replace(/^#\s*/, "").trim() || "Untitled";
      const number = parseInt(file.split("-")[0]) || 0;
      const slug = file.replace(".md", "");
      
      // Get first paragraph as excerpt
      const contentLines = lines.slice(2);
      let excerpt = "";
      for (const line of contentLines) {
        if (line.trim() && !line.startsWith("#") && !line.startsWith("-")) {
          excerpt = line.trim().substring(0, 200);
          if (line.trim().length > 200) excerpt += "...";
          break;
        }
      }
      
      return { slug, number, title, excerpt };
    }).sort((a, b) => a.number - b.number);
  } catch {
    return [];
  }
}

export default function BookPage() {
  const chapters = getChapters();

  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-16 lg:py-24">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium mb-4">
                The Book
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                What They Don&apos;t Teach You About Investing
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                The investment industry wants you to believe that success is complicated. 
                It isn&apos;t. This book exposes the mistakes that destroy wealth and reveals 
                what actually works—rules that anyone can follow.
              </p>
              <div className="flex flex-wrap gap-4">
                {chapters.length > 0 && (
                  <Link href={`/book/chapters/${chapters[0].slug}`} className="btn-primary">
                    Start Reading
                  </Link>
                )}
                <Link href="/newsletter" className="btn-outline border-white text-white hover:bg-white hover:text-navy-800">
                  Get Updates
                </Link>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">📖</div>
              <h2 className="text-2xl font-bold mb-2">{chapters.length} Chapters</h2>
              <p className="text-gray-300">
                Read free online or subscribe for updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Insights */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-12">What You&apos;ll Learn</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-navy-800 mb-3">
                The Mistakes That Matter
              </h3>
              <p className="text-gray-600">
                From buy-and-hold myths to emotion-driven decisions, discover the errors 
                that destroy more wealth than any market crash.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-navy-800 mb-3">
                Why Rules Beat Intelligence
              </h3>
              <p className="text-gray-600">
                Smart people make dumb investment decisions. Learn why systematic 
                approaches outperform intuition every time.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold text-navy-800 mb-3">
                What Actually Works
              </h3>
              <p className="text-gray-600">
                Cut through the noise. Discover the simple principles that 
                protect wealth and let it compound over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section id="chapters" className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-4">Chapters</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Each chapter stands alone, but together they build a complete framework for 
            understanding investment success and failure.
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {chapters.map((chapter) => (
                <Link
                  key={chapter.slug}
                  href={`/book/chapters/${chapter.slug}`}
                  className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-navy-800 rounded-lg flex items-center justify-center text-gold-400 font-bold flex-shrink-0">
                      {chapter.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-navy-800 group-hover:text-gold-600">
                        {chapter.title}
                      </h3>
                      {chapter.excerpt && (
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{chapter.excerpt}</p>
                      )}
                    </div>
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About the Author */}
      <section className="section-padding bg-navy-800 text-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About the Author</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Brad Roth is the founder and CIO of THOR Financial Technologies. With over 
              two decades of experience in quantitative finance and signal processing, 
              he developed THOR&apos;s proprietary methodology for detecting market regime changes.
              He hosts the &ldquo;Behind the Ticker&rdquo; podcast with 90+ episodes interviewing 
              ETF industry leaders.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/team" className="btn-primary">
                Meet the Team
              </Link>
              <Link href="/insights" className="btn-outline border-white text-white hover:bg-white hover:text-navy-800">
                Listen to Podcast
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-gradient-to-br from-gold-400 to-gold-500">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-navy-800 mb-4">Get Investment Insights Weekly</h2>
          <p className="text-lg text-navy-700/80 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter for new content, market commentary, and signal updates.
          </p>
          <Link href="/newsletter" className="btn-secondary">
            Subscribe to Newsletter
          </Link>
        </div>
      </section>
    </>
  );
}
