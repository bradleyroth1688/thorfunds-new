import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import episodes from '@/data/episodes-enhanced.json';

type RelatedEpisode = {
  slug: string;
  title: string;
  guest: string;
  company: string | null;
};

type Episode = {
  id: string;
  slug: string;
  title: string;
  guest: string;
  company: string | null;
  topic: string | null;
  description: string;
  descriptionHtml: string;
  summary: string;
  pubDate: string;
  publishedAt: string;
  mp3Url: string;
  duration: number;
  durationFormatted: string;
  seo: {
    title: string;
    metaDescription: string;
    keywords: string[];
  };
  ticker: string | null;
  categories: string[];
  keyTakeaways: string[];
  notableQuotes: string[];
  relatedEpisodes: RelatedEpisode[];
};

type Props = {
  params: Promise<{ slug: string }>;
};

const typedEpisodes = episodes as Episode[];

export async function generateStaticParams() {
  return typedEpisodes.map((episode) => ({
    slug: episode.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const episode = typedEpisodes.find((ep) => ep.slug === slug);
  
  if (!episode) {
    return { title: 'Episode Not Found' };
  }

  return {
    title: episode.seo.title,
    description: episode.seo.metaDescription,
    keywords: episode.seo.keywords,
    openGraph: {
      title: episode.seo.title,
      description: episode.seo.metaDescription,
      type: 'article',
      publishedTime: episode.publishedAt,
      authors: ['Brad Roth'],
      tags: episode.categories,
    },
    twitter: {
      card: 'summary_large_image',
      title: episode.seo.title,
      description: episode.seo.metaDescription,
    },
    alternates: {
      canonical: `https://thorfunds.com/insights/${episode.slug}`,
    },
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Schema.org structured data for podcast episode
function generateSchemaOrg(episode: Episode) {
  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: episode.title,
    description: episode.seo.metaDescription,
    datePublished: episode.publishedAt,
    duration: `PT${Math.floor(episode.duration / 60)}M${episode.duration % 60}S`,
    url: `https://thorfunds.com/insights/${episode.slug}`,
    associatedMedia: {
      '@type': 'AudioObject',
      contentUrl: episode.mp3Url,
      duration: `PT${Math.floor(episode.duration / 60)}M${episode.duration % 60}S`,
      encodingFormat: 'audio/mpeg',
    },
    partOfSeries: {
      '@type': 'PodcastSeries',
      name: 'Behind the Ticker',
      url: 'https://thorfunds.com/insights',
    },
    author: {
      '@type': 'Person',
      name: 'Brad Roth',
      url: 'https://thorfunds.com/about',
    },
    contributor: {
      '@type': 'Person',
      name: episode.guest,
      worksFor: episode.company ? {
        '@type': 'Organization',
        name: episode.company,
      } : undefined,
    },
    keywords: episode.seo.keywords.join(', '),
  };
}

// Category badge colors
const categoryColors: Record<string, string> = {
  'ETF Strategy': 'bg-blue-100 text-blue-800',
  'Fixed Income': 'bg-green-100 text-green-800',
  'Alternatives': 'bg-purple-100 text-purple-800',
  'Growth Investing': 'bg-orange-100 text-orange-800',
  'Value Investing': 'bg-amber-100 text-amber-800',
  'Risk Management': 'bg-red-100 text-red-800',
  'Market Analysis': 'bg-indigo-100 text-indigo-800',
  'Energy & Commodities': 'bg-yellow-100 text-yellow-800',
  'International': 'bg-teal-100 text-teal-800',
  'Small & Mid Cap': 'bg-pink-100 text-pink-800',
};

export default async function EpisodePage({ params }: Props) {
  const { slug } = await params;
  const episode = typedEpisodes.find((ep) => ep.slug === slug);

  if (!episode) {
    notFound();
  }

  const schemaOrg = generateSchemaOrg(episode);

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* Hero */}
      <section className="gradient-navy text-white py-12 md:py-16">
        <div className="container-max mx-auto px-4 md:px-8">
          <nav className="text-sm mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/insights" className="text-white/60 hover:text-white">Insights</Link>
              </li>
              <li className="text-white/40">/</li>
              <li className="text-white/80">Podcast</li>
            </ol>
          </nav>
          
          {/* Category Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {episode.categories.slice(0, 3).map((category) => (
              <span
                key={category}
                className={`text-xs font-medium px-2 py-1 rounded ${categoryColors[category] || 'bg-gray-100 text-gray-800'}`}
              >
                {category}
              </span>
            ))}
            {episode.ticker && (
              <span className="text-xs font-bold px-2 py-1 rounded bg-gold-500 text-navy-900">
                ${episode.ticker}
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-4xl font-bold mt-2 mb-4">{episode.seo.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {episode.guest}
            </span>
            {episode.company && (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {episode.company}
              </span>
            )}
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time dateTime={episode.publishedAt}>{formatDate(episode.publishedAt)}</time>
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {episode.durationFormatted}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-max mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Audio Player */}
              <div className="bg-navy-700 rounded-xl p-6 mb-8">
                <h2 className="text-white font-semibold mb-4">Listen to Episode</h2>
                <audio 
                  controls 
                  className="w-full"
                  preload="metadata"
                >
                  <source src={episode.mp3Url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <div className="flex gap-4 mt-4">
                  <a 
                    href={episode.mp3Url} 
                    download
                    className="text-gold-400 text-sm hover:text-gold-300 flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download MP3
                  </a>
                </div>
              </div>

              {/* Episode Summary */}
              <article className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold mb-4">Episode Summary</h2>
                <div 
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: episode.descriptionHtml }}
                />
              </article>

              {/* Key Takeaways */}
              {episode.keyTakeaways.length > 0 && (
                <div className="mt-10 bg-gray-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <svg className="w-6 h-6 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Key Takeaways
                  </h2>
                  <ul className="space-y-3">
                    {episode.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-gold-500 text-navy-900 rounded-full flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-gray-700">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Notable Quotes */}
              {episode.notableQuotes.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-2xl font-bold mb-6">Notable Quotes</h2>
                  <div className="space-y-4">
                    {episode.notableQuotes.map((quote, idx) => (
                      <blockquote 
                        key={idx} 
                        className="border-l-4 border-gold-500 pl-4 py-2 bg-gray-50 rounded-r-lg"
                      >
                        <p className="text-gray-700 italic">&ldquo;{quote}&rdquo;</p>
                        <cite className="text-sm text-gray-500 not-italic">— {episode.guest}</cite>
                      </blockquote>
                    ))}
                  </div>
                </div>
              )}

              {/* About the Guest */}
              <div className="mt-10 bg-navy-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-4">About {episode.guest}</h2>
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-navy-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-navy-700">
                      {episode.guest.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-navy-700">{episode.guest}</h3>
                    {episode.company && (
                      <p className="text-gold-600 font-medium">{episode.company}</p>
                    )}
                    {episode.ticker && (
                      <p className="text-sm text-gray-600 mt-1">
                        Discussed ETF: <span className="font-bold">${episode.ticker}</span>
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {episode.categories.map((cat) => (
                        <span 
                          key={cat}
                          className="text-xs px-2 py-1 bg-navy-100 text-navy-700 rounded"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Transcript Section */}
              <div className="mt-12 pt-8 border-t">
                <h2 className="text-2xl font-bold mb-4">Full Transcript</h2>
                <p className="text-gray-600 italic">
                  Transcript coming soon. Subscribe to our newsletter to be notified when transcripts are available.
                </p>
              </div>

              {/* Share */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="font-semibold mb-4">Share This Episode</h3>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(episode.seo.title)}&url=${encodeURIComponent(`https://thorfunds.com/insights/${episode.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-sm"
                  >
                    Share on X
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://thorfunds.com/insights/${episode.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-sm"
                  >
                    Share on LinkedIn
                  </a>
{/* Copy link functionality requires client component */}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Guest Card */}
              <div className="card">
                <h3 className="font-semibold mb-4">Featured Guest</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-navy-700">
                      {episode.guest.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-navy-700">{episode.guest}</div>
                    {episode.company && (
                      <div className="text-sm text-gray-600">{episode.company}</div>
                    )}
                    {episode.ticker && (
                      <div className="text-sm font-bold text-gold-600">${episode.ticker}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Episode Details */}
              <div className="card">
                <h3 className="font-semibold mb-4">Episode Details</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Published</dt>
                    <dd className="font-medium">{formatDate(episode.publishedAt)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Duration</dt>
                    <dd className="font-medium">{episode.durationFormatted}</dd>
                  </div>
                  {episode.ticker && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">ETF Ticker</dt>
                      <dd className="font-bold text-gold-600">${episode.ticker}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Topics */}
              <div className="card">
                <h3 className="font-semibold mb-4">Topics Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {episode.categories.map((category) => (
                    <Link
                      key={category}
                      href={`/insights?category=${encodeURIComponent(category)}`}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full hover:opacity-80 transition ${categoryColors[category] || 'bg-gray-100 text-gray-800'}`}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Listen Elsewhere */}
              <div className="card">
                <h3 className="font-semibold mb-4">Listen Elsewhere</h3>
                <div className="space-y-2">
                  <a href="https://podcasts.apple.com/us/podcast/behind-the-ticker/id1681873507" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-navy-700 hover:text-gold-600">
                    🍎 Apple Podcasts
                  </a>
                  <a href="https://open.spotify.com/show/3yNvWVwxFJLDMrEhKmqDpA" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-navy-700 hover:text-gold-600">
                    🎵 Spotify
                  </a>
                  <a href="https://www.youtube.com/@BRoth_THOR" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-navy-700 hover:text-gold-600">
                    ▶️ YouTube
                  </a>
                </div>
              </div>

              {/* Subscribe CTA */}
              <div className="card bg-navy-700 text-white">
                <h3 className="font-semibold mb-2">Never Miss an Episode</h3>
                <p className="text-white/80 text-sm mb-4">
                  Subscribe to our newsletter for new episodes and market insights.
                </p>
                <Link href="/newsletter" className="btn-primary w-full text-center">
                  Subscribe
                </Link>
              </div>

              {/* Keywords for SEO transparency */}
              <div className="card bg-gray-50">
                <h3 className="font-semibold mb-3 text-sm text-gray-600">Related Keywords</h3>
                <div className="flex flex-wrap gap-1">
                  {episode.seo.keywords.slice(0, 6).map((keyword) => (
                    <span 
                      key={keyword}
                      className="text-xs px-2 py-1 bg-white border border-gray-200 rounded text-gray-600"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Episodes */}
          {episode.relatedEpisodes.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">Related Episodes</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {episode.relatedEpisodes.map((ep) => (
                  <Link 
                    key={ep.slug} 
                    href={`/insights/${ep.slug}`} 
                    className="card-hover group"
                  >
                    <span className="text-xs font-medium text-gold-600 uppercase tracking-wider">
                      Podcast
                    </span>
                    <h3 className="font-semibold text-navy-700 mt-2 line-clamp-2 group-hover:text-gold-600 transition">
                      {ep.title}
                    </h3>
                    <p className="text-sm text-gold-600 mt-1">{ep.guest}</p>
                    {ep.company && (
                      <p className="text-sm text-gray-600">{ep.company}</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Internal Links to Key Pages */}
          <div className="mt-16 p-8 bg-gray-50 rounded-2xl">
            <h2 className="text-xl font-bold mb-4">Explore More</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/insights" className="flex items-center gap-2 text-navy-700 hover:text-gold-600 font-medium">
                <span>→</span> All Podcast Episodes
              </Link>
              <Link href="/funds" className="flex items-center gap-2 text-navy-700 hover:text-gold-600 font-medium">
                <span>→</span> THOR Fund Strategies
              </Link>
              <Link href="/about" className="flex items-center gap-2 text-navy-700 hover:text-gold-600 font-medium">
                <span>→</span> About THOR Funds
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
