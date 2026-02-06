import Link from 'next/link';
import { Metadata } from 'next';
import episodes from '@/data/episodes.json';

export const metadata: Metadata = {
  title: 'Insights - Podcast & Market Commentary',
  description: 'Behind the Ticker podcast episodes featuring interviews with ETF industry leaders, portfolio managers, and investment experts.',
};

export default function InsightsPage() {
  return (
    <>
      <section className="gradient-navy text-white py-16 md:py-24">
        <div className="container-max mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Behind the Ticker</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Join Brad Roth as he interviews entrepreneurs and experts in the wealth management industry. 
            Discover what drives these professionals and learn about opportunities in the ETF space.
          </p>
        </div>
      </section>

      {/* Latest Episode Feature */}
      {episodes[0] && (
        <section className="section-padding bg-white">
          <div className="container-max mx-auto">
            <h2 className="text-2xl font-bold text-navy-700 mb-8">Latest Episode</h2>
            <Link
              href={`/insights/${episodes[0].slug}`}
              className="group block bg-navy-700 rounded-2xl p-8 lg:p-12 hover:bg-navy-600 transition-colors"
            >
              <span className="inline-block bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium mb-4">
                New Episode
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-gold-400 transition-colors">
                {episodes[0].title}
              </h3>
              <p className="mt-2 text-lg text-gold-400">Guest: {episodes[0].guest}</p>
              <p className="mt-4 text-gray-300 line-clamp-3">{episodes[0].description}</p>
              <div className="mt-6 flex items-center gap-4 text-sm text-gray-400">
                <span>{episodes[0].duration}</span>
                {episodes[0].views > 0 && (
                  <>
                    <span>•</span>
                    <span>{episodes[0].views} views</span>
                  </>
                )}
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* All Episodes */}
      <section className="section-padding bg-gray-50">
        <div className="container-max mx-auto">
          <h2 className="text-2xl font-bold text-navy-700 mb-8">All Episodes ({episodes.length})</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes.map((episode) => (
              <Link
                key={episode.id}
                href={`/insights/${episode.slug}`}
                className="card-hover group"
              >
                <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center mb-4 overflow-hidden">
                  {episode.thumbnail ? (
                    <img 
                      src={episode.thumbnail} 
                      alt={episode.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  ) : (
                    <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  )}
                </div>
                <h3 className="font-semibold text-navy-700 group-hover:text-gold-600 transition-colors line-clamp-2">
                  {episode.title}
                </h3>
                <p className="text-sm text-gold-600 mt-1">{episode.guest}</p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{episode.description}</p>
                <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
                  <span>{episode.duration}</span>
                  {episode.views > 0 && (
                    <>
                      <span>•</span>
                      <span>{episode.views} views</span>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Podcast CTA */}
      <section className="section-padding bg-white">
        <div className="container-max mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Listen on Your Favorite Platform</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://www.youtube.com/@BRoth_THOR" target="_blank" rel="noopener noreferrer" className="btn-primary">
              YouTube
            </a>
            <a href="#" className="btn-outline">
              Apple Podcasts
            </a>
            <a href="#" className="btn-outline">
              Spotify
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
