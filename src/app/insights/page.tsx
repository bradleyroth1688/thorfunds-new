import Link from 'next/link';
import { Metadata } from 'next';
import episodes from '@/data/episodes.json';

export const metadata: Metadata = {
  title: 'Behind the Ticker - ETF Podcast',
  description: 'Join Brad Roth as he interviews entrepreneurs and experts in the wealth management industry. Discover what drives ETF professionals and learn about opportunities for disruption.',
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
};

const typedEpisodes = episodes as Episode[];

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function InsightsPage() {
  const latestEpisode = typedEpisodes[0];
  const otherEpisodes = typedEpisodes.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-16 md:py-24">
        <div className="container-max mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Behind the Ticker</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Join Brad Roth as he interviews entrepreneurs and experts in the wealth management industry. 
            Discover what drives ETF professionals and learn about opportunities for disruption.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <a href="https://podcasts.apple.com" target="_blank" rel="noopener noreferrer" className="btn-outline border-white text-white hover:bg-white hover:text-navy-700 text-sm">
              Apple Podcasts
            </a>
            <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="btn-outline border-white text-white hover:bg-white hover:text-navy-700 text-sm">
              Spotify
            </a>
            <a href="https://www.youtube.com/@BRoth_THOR" target="_blank" rel="noopener noreferrer" className="btn-outline border-white text-white hover:bg-white hover:text-navy-700 text-sm">
              YouTube
            </a>
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
              <span className="inline-block bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium mb-4">
                New Episode
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-gold-400 transition-colors">
                {latestEpisode.title}
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
                {latestEpisode.summary || latestEpisode.description.substring(0, 300) + '...'}
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

      {/* All Episodes */}
      <section className="section-padding bg-gray-50">
        <div className="container-max mx-auto">
          <h2 className="text-2xl font-bold text-navy-700 mb-8">All Episodes ({typedEpisodes.length})</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherEpisodes.map((episode) => (
              <Link
                key={episode.id}
                href={`/insights/${episode.slug}`}
                className="card-hover group"
              >
                <span className="text-xs font-medium text-gold-600 uppercase tracking-wider">
                  Podcast
                </span>
                <h3 className="font-semibold text-navy-700 mt-2 group-hover:text-gold-600 transition-colors line-clamp-2">
                  {episode.title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gold-600">{episode.guest}</p>
                  {episode.company && (
                    <p className="text-sm text-gray-600">{episode.company}</p>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                  {episode.summary || episode.description.substring(0, 150) + '...'}
                </p>
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
    </>
  );
}
