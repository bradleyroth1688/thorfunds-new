import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

interface ChapterPageProps {
  params: Promise<{ slug: string }>;
}

interface ChapterData {
  slug: string;
  number: number;
  title: string;
  content: string;
}

function getChapters(): ChapterData[] {
  const chaptersDir = path.join(process.cwd(), "content/book/chapters");
  
  try {
    const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith(".md"));
    
    return files.map(file => {
      const content = fs.readFileSync(path.join(chaptersDir, file), "utf-8");
      const lines = content.split("\n");
      const title = lines[0]?.replace(/^#\s*/, "").trim() || "Untitled";
      const number = parseInt(file.split("-")[0]) || 0;
      const slug = file.replace(".md", "");
      
      return {
        slug,
        number,
        title,
        content: lines.slice(2).join("\n").trim(), // Skip title and blank line
      };
    }).sort((a, b) => a.number - b.number);
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const chapters = getChapters();
  return chapters.map(chapter => ({
    slug: chapter.slug,
  }));
}

export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const chapters = getChapters();
  const chapter = chapters.find(c => c.slug === slug);
  
  if (!chapter) {
    return { title: "Chapter Not Found" };
  }

  return {
    title: `${chapter.title} | The Book`,
    description: `Chapter ${chapter.number}: ${chapter.title}. Part of the THOR Funds investment philosophy book.`,
  };
}

// Simple markdown to HTML converter
function markdownToHtml(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-navy-800 mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-navy-800 mt-10 mb-4">$1</h2>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Lists
    .replace(/^- (.*$)/gm, '<li class="ml-6 text-gray-700">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="my-4 space-y-2 list-disc">$&</ul>')
    // Numbered lists
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-6 text-gray-700">$1</li>')
    // Paragraphs
    .replace(/^(?!<[hul])(.*[^\n])\n?$/gm, (match, content) => {
      if (content.trim() && !content.startsWith('<')) {
        return `<p class="text-gray-700 leading-relaxed mb-4">${content}</p>`;
      }
      return match;
    })
    // Clean up empty paragraphs
    .replace(/<p class="[^"]*"><\/p>/g, '');
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params;
  const chapters = getChapters();
  const chapter = chapters.find(c => c.slug === slug);

  if (!chapter) {
    notFound();
  }

  const currentIndex = chapters.findIndex(c => c.slug === slug);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  const htmlContent = markdownToHtml(chapter.content);

  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-12 lg:py-16">
        <div className="container-wide">
          <nav className="text-sm mb-4">
            <Link href="/book" className="text-white/60 hover:text-white">The Book</Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-white/80">Chapter {chapter.number}</span>
          </nav>
          <span className="text-gold-400 text-sm font-medium uppercase tracking-wider">
            Chapter {chapter.number}
          </span>
          <h1 className="text-3xl lg:text-4xl font-bold mt-2">{chapter.title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <article 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-gray-50 border-t">
        <div className="container-wide">
          <div className="flex justify-between items-center">
            {prevChapter ? (
              <Link 
                href={`/book/chapters/${prevChapter.slug}`}
                className="flex items-center gap-2 text-navy-700 hover:text-gold-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <span className="hidden sm:inline">Chapter {prevChapter.number}:</span> {prevChapter.title}
              </Link>
            ) : <div />}
            
            <Link href="/book" className="text-sm text-gray-500 hover:text-gold-600">
              All Chapters
            </Link>
            
            {nextChapter ? (
              <Link 
                href={`/book/chapters/${nextChapter.slug}`}
                className="flex items-center gap-2 text-navy-700 hover:text-gold-600 transition-colors"
              >
                <span className="hidden sm:inline">Chapter {nextChapter.number}:</span> {nextChapter.title}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy-800 text-white">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to See These Ideas in Action?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Explore how THOR&apos;s ETFs put these investment principles into practice.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/funds" className="btn-primary">
              Explore Our ETFs
            </Link>
            <Link href="/book" className="btn-outline border-white text-white hover:bg-white hover:text-navy-800">
              Back to Book
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
