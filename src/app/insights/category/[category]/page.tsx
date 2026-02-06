import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import episodes from '@/data/episodes-enhanced.json';

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

type Props = {
  params: Promise<{ category: string }>;
};

const typedEpisodes = episodes as Episode[];

// Category slug to display name mapping
const categoryMap: Record<string, string> = {
  'etf-strategy': 'ETF Strategy',
  'fixed-income': 'Fixed Income',
  'alternatives': 'Alternatives',
  'growth-investing': 'Growth Investing',
  'value-investing': 'Value Investing',
  'risk-management': 'Risk Management',
  'market-analysis': 'Market Analysis',
  'energy-and-commodities': 'Energy & Commodities',
  'international': 'International',
  'small-and-mid-cap': 'Small & Mid Cap',
};

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

export async function generateStaticParams() {
  return Object.keys(categoryMap).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categoryName = categoryMap[category];
  
  if (!categoryName) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${categoryName} ETF Podcast Episodes | Behind the Ticker`,
    description: `Listen to Behind the Ticker podcast episodes focused on ${categoryName}. Expert interviews on ETF strategies, investing insights, and wealth management.`,
    openGraph: {
      title: `${categoryName} Episodes | Behind the Ticker`,
      description: `ETF podcast episodes about ${categoryName}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://thorfunds.com/insights/category/${category}`,
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

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const categoryName = categoryMap[category];

  if (!categoryName) {
    notFound();
  }

  const categoryEpisodes = typedEpisodes.filter(ep => 
    ep.categories.includes(categoryName)
  );

  // Get all categories with counts for sidebar
  const allCategories = Object.entries(categoryMap).map(([slug, name]) => ({
    slug,
    name,
    count: typedEpisodes.filter(ep => ep.categories.includes(name)).length,
  })).sort((a, b) => b.count - a.count);

  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-12 md:py-16">
        <div className="container-max mx-auto px-4 md:px-8">
          <nav className="text-sm mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/insights" className="text-white/60 hover:text-white">Insights</Link>
              </li>
              <li className="text-white/40">/</li>
              <li className="text-white/80">Category</li>
            </ol>
          </nav>
          
          <span className={`inline-block px-3 py-1 rounded text-sm font-medium mb-4 ${categoryColors[categoryName] || 'bg-gray-100 text-gray-800'}`}>
            {categoryName}
          </span>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {categoryName} Episodes
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            {categoryEpisodes.length} podcast episodes covering {categoryName.toLowerCase()} strategies and insights.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-max mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <h2 className="font-semibold text-navy-700 mb-4">All Categories</h2>
                <nav className="space-y-2">
                  {allCategories.map(({ slug, name, count }) => (
                    <Link
                      key={slug}
                      href={`/insights/category/${slug}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition ${
                        name === categoryName
                          ? 'bg-navy-700 text-white font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {name} <span className="opacity-60">({count})</span>
                    </Link>
                  ))}
                </nav>
                
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-sm mb-2">All Episodes</h3>
                  <Link 
                    href="/insights" 
                    className="text-gold-600 hover:text-gold-700 text-sm font-medium"
                  >
                    ← Back to all episodes
                  </Link>
                </div>
              </div>
            </div>

            {/* Episodes Grid */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-6">
                {categoryEpisodes.map((episode) => (
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
                      {episode.seo.title}
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
                      {episode.categories.filter(c => c !== categoryName).slice(0, 2).map(cat => (
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

              {categoryEpisodes.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">No episodes found in this category.</p>
                  <Link href="/insights" className="text-gold-600 hover:text-gold-700 mt-4 inline-block">
                    Browse all episodes →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="section-padding bg-navy-700 text-white">
        <div className="container-max mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Want More {categoryName} Insights?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter for new episodes and curated market insights.
          </p>
          <Link href="/newsletter" className="btn-primary">
            Subscribe to Newsletter
          </Link>
        </div>
      </section>
    </>
  );
}
