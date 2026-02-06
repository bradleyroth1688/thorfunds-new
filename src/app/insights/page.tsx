import Link from 'next/link';
import { Metadata } from 'next';
import episodes from '@/data/episodes-enhanced.json';

export const metadata: Metadata = {
  title: 'Behind the Ticker - ETF Podcast | THOR Funds',
  description: 'Join Brad Roth as he interviews entrepreneurs and experts in the wealth management industry. Discover what drives ETF professionals and learn about opportunities for disruption in the ETF space.',
  keywords: ['ETF podcast', 'investing podcast', 'Behind the Ticker', 'wealth management', 'Brad Roth', 'THOR Funds', 'ETF strategy'],
  openGraph: {
    title: 'Behind the Ticker - ETF Podcast',
    description: 'Weekly interviews with ETF entrepreneurs and wealth management experts.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://thorfunds.com/insights',
  },
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
  relatedEpisodes: { slug: string; title: string; guest: string; company: string | null }[];
};

const typedEpisodes = episodes as Episode[];

// Get unique categories and their counts
const categoryStats = typedEpisodes.reduce((acc, ep) => {
  ep.categories.forEach(cat => {
    acc[cat] = (acc[cat] || 0) + 1;
  });
  return acc;
}, {} as Record<string, number>);

const sortedCategories = Object.entries(categoryStats)
  .sort((a, b) => b[1] - a[1])
  .map(([cat, count]) => ({ name: cat, count }));

// Category colors
const categoryColors: Record<string, string> = {
  'ETF Strategy': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  'Fixed Income': 'bg-green-100 text-green-800 hover:bg-green-200',
  'Alternatives': 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  'Growth Investing': 'bg-orange-100 text-orange-800 hover:bg-orange-200',
  'Value Investing': 'bg-amber-100 text-amber-800 hover:bg-amber-200',
  'Risk Management': 'bg-red-100 text-red-800 hover:bg-red-200',
  'Market Analysis': 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
  'Energy & Commodities': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  'International': 'bg-teal-100 text-teal-800 hover:bg-teal-200',
  'Small & Mid Cap': 'bg-pink-100 text-pink-800 hover:bg-pink-200',
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Schema.org for podcast series
const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'PodcastSeries',
  name: 'Behind the Ticker',
  description: 'Join Brad Roth as he interviews entrepreneurs and experts in the wealth management industry.',
  url: 'https://thorfunds.com/insights',
  author: {
    '@type': 'Person',
    name: 'Brad Roth',
  },
  publisher: {
    '@type': 'Organization',
    name: 'THOR Funds',
    url: 'https://thorfunds.com',
  },
  numberOfEpisodes: typedEpisodes.length,
};

export default function InsightsPage() {
  const latestEpisode = typedEpisodes[0];
  const featuredEpisodes = typedEpisodes.slice(1, 4);
  const otherEpisodes = typedEpisodes.slice(4);

  return (
    <>
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* Hero */}
      <section className="gradient-navy text-white py-16 md:py-24">
        <div className="container-max mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Behind the Ticker</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Join Brad Roth as he interviews entrepreneurs and experts in the wealth management industry. 
            Discover what drives ETF professionals and learn about opportunities for disruption.
          </p>
          <p className="text-white/60 mt-4">
            <span className="font-bold text-gold-400">{typedEpisodes.length}</span> episodes featuring industry leaders
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <a href="https://podcasts.apple.com/us/podcast/behind-the-ticker/id1681873507" target="_blank" rel="noopener noreferrer" className="btn-outline border-white text-white hover:bg-white hover:text-navy-700 text-sm">
              🍎 Apple Podcasts
            </a>
            <a href="https://open.spotify.com/show/3yNvWVwxFJLDMrEhKmqDpA" target="_blank" rel="noopener noreferrer" className="btn-outline border-white text-white hover:bg-white hover:text-navy-700 text-sm">
              🎵 Spotify
            </a>
            <a href="https://www.youtube.com/@BRoth_THOR" target="_blank" rel="noopener noreferrer" className="btn-outline border-white text-white hover:bg-white hover:text-navy-700 text-sm">
              ▶️ YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Topic Categories */}
      <section className="py-8 bg-white border-b">
        <div className="container-max mx-auto px-4 md:px-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Browse by Topic</h2>
          <div className="flex flex-wrap gap-2">
            {sortedCategories.map(({ name, count }) => (
              <Link
                key={name}
                href={`/insights/category/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and'))}`}
                className={`text-sm font-medium px-3 py-1.5 rounded-full transition ${categoryColors[name] || 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                {name} <span className="opacity-60">({count})</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Episode Feature */}
      {latestEpisode && (
        <section className="section-padding bg-white">
          <div className="container-max mx-auto">
            <h2 className="text-2xl font-bold text-navy-700 mb-8">Latest Episode</h2>
            <Link
              href={`/insights/${latestEpisode.slug}`}
              className="group block bg-navy-700 rounded-2xl p-8 lg:p-12 hover:bg-navy-600 transition-colors"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium">
                  New Episode
                </span>
                {latestEpisode.ticker && (
                  <span className="inline-block bg-white/20 text-white px-3 py-1 rounded text-sm font-bold">
                    ${latestEpisode.ticker}
                  </span>
                )}
                {latestEpisode.categories.slice(0, 2).map(cat => (
                  <span key={cat} className="inline-block bg-white/10 text-white/80 px-3 py-1 rounded text-sm">
                    {cat}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-gold-400 transition-colors">
                {latestEpisode.seo.title}
              </h3>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-gold-400 text-sm">
                <span>{latestEpisode.guest}</span>
                {latestEpisode.company && (
                  <>
                    <span>•</span>
                    <span>{latestEpisode.company}</span>
                  </>
                )}
              </div>
              <p className="mt-4 text-gray-300 line-clamp-3">
                {latestEpisode.seo.metaDescription}
              </p>
              <div className="mt-6 flex items-center gap-4 text-sm text-gray-400">
                <span>{formatDate(latestEpisode.publishedAt)}</span>
                <span>•</span>
                <span>{latestEpisode.durationFormatted}</span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Featured Episodes */}
      {featuredEpisodes.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-max mx-auto">
            <h2 className="text-2xl font-bold text-navy-700 mb-8">Featured Episodes</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredEpisodes.map((episode) => (
                <Link
                  key={episode.id}
                  href={`/insights/${episode.slug}`}
                  className="card-hover group"
                >
                  <div className="flex flex-wrap gap-1 mb-2">
                    {episode.ticker && (
                      <span className="text-xs font-bold text-gold-600">${episode.ticker}</span>
                    )}
                    <span className="text-xs font-medium text-gray-500">• Podcast</span>
                  </div>
                  <h3 className="font-semibold text-navy-700 mt-2 group-hover:text-gold-600 transition-colors line-clamp-2">
                    {episode.seo.title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gold-600">{episode.guest}</p>
                    {episode.company && (
                      <p className="text-sm text-gray-600">{episode.company}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {episode.categories.slice(0, 2).map(cat => (
                      <span key={cat} className={`text-xs px-2 py-0.5 rounded ${categoryColors[cat] || 'bg-gray-100 text-gray-700'}`}>
                        {cat}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
                    <span>{formatDate(episode.publishedAt)}</span>
                    <span>•</span>
                    <span>{episode.durationFormatted}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Episodes */}
      <section className="section-padding bg-white">
        <div className="container-max mx-auto">
          <h2 className="text-2xl font-bold text-navy-700 mb-8">All Episodes ({typedEpisodes.length})</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherEpisodes.map((episode) => (
              <Link
                key={episode.id}
                href={`/insights/${episode.slug}`}
                className="card-hover group"
              >
                <div className="flex items-center gap-2 mb-2">
                  {episode.ticker && (
                    <span className="text-xs font-bold bg-gold-100 text-gold-800 px-2 py-0.5 rounded">
                      ${episode.ticker}
                    </span>
                  )}
                  <span className="text-xs font-medium text-gold-600 uppercase tracking-wider">
                    Podcast
                  </span>
                </div>
                <h3 className="font-semibold text-navy-700 mt-2 group-hover:text-gold-600 transition-colors line-clamp-2">
                  {episode.title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gold-600">{episode.guest}</p>
                  {episode.company && (
                    <p className="text-sm text-gray-600">{episode.company}</p>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                  {episode.seo.metaDescription}
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {episode.categories.slice(0, 2).map(cat => (
                    <span key={cat} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                      {cat}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
                  <span>{formatDate(episode.publishedAt)}</span>
                  <span>•</span>
                  <span>{episode.durationFormatted}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Guests Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max mx-auto">
          <h2 className="text-2xl font-bold text-navy-700 mb-8">Notable Guests</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {typedEpisodes.slice(0, 12).map((episode) => (
              <Link
                key={episode.id}
                href={`/insights/${episode.slug}`}
                className="text-center p-4 bg-white rounded-lg hover:shadow-md transition group"
              >
                <div className="w-16 h-16 mx-auto bg-navy-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-navy-700">
                    {episode.guest.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </span>
                </div>
                <p className="font-medium text-navy-700 text-sm group-hover:text-gold-600 transition line-clamp-1">
                  {episode.guest}
                </p>
                <p className="text-xs text-gray-500 line-clamp-1">{episode.company}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="section-padding bg-navy-700 text-white">
        <div className="container-max mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Never Miss an Episode</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter to get new episodes delivered to your inbox, 
            plus weekly market insights and signal updates.
          </p>
          <Link href="/newsletter" className="btn-primary">
            Subscribe to Newsletter
          </Link>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-8 bg-gray-100">
        <div className="container-max mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/funds" className="text-navy-700 hover:text-gold-600 font-medium">
              Explore THOR Fund Strategies →
            </Link>
            <Link href="/about" className="text-navy-700 hover:text-gold-600 font-medium">
              About THOR Funds →
            </Link>
            <Link href="/contact" className="text-navy-700 hover:text-gold-600 font-medium">
              Contact Us →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
