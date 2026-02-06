import Link from 'next/link';
import type { Metadata } from 'next';
import episodes from '@/data/episodes.json';

export const metadata: Metadata = {
  title: 'Behind the Ticker Podcast | THOR Funds',
  description:
    'ETF industry conversations with the people building the funds. Host Brad Roth talks strategy, structure, and the stories behind the ticker.',
};

/* ── tiny helpers ─────────────────────────────────────── */

function fmtDate(iso: string) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
}

function truncate(str: string, max = 140) {
  const clean = stripHtml(str);
  return clean.length <= max ? clean : clean.slice(0, max).trimEnd() + '…';
}

const SPOTIFY_SHOW = 'https://open.spotify.com/show/1TJpgOAqctOCnjij9KTxNS';

/* ── page ─────────────────────────────────────────────── */

export default function PodcastPage() {
  // newest first (already sorted in JSON but be safe)
  const sorted = [...episodes].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-20 md:py-28">
        <div className="container-max mx-auto px-4 md:px-8 text-center">
          <span className="inline-block px-4 py-1 bg-gold-500 text-navy-900 rounded-full text-sm font-semibold mb-6">
            Podcast
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Behind the <span className="text-gold-500">Ticker</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
            Real conversations with the people building today's most innovative
            ETFs — strategy, structure, and the stories behind each fund.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={SPOTIFY_SHOW}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center gap-2"
            >
              {/* Spotify icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Listen on Spotify
            </a>
            <a
              href="https://www.youtube.com/playlist?list=PL6wvA-EH7M41bn5LPaWA9kpZgI5_Pxzyn"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline border-white text-white hover:bg-white hover:text-navy-700 text-lg px-8 py-4 inline-flex items-center justify-center gap-2"
            >
              {/* YouTube icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Watch on YouTube
            </a>
          </div>

          <p className="text-white/50 mt-6 text-sm">
            {sorted.length} episodes &middot; New episodes every week
          </p>
        </div>
      </section>

      {/* Episode grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-max mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">All Episodes</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse every Behind the Ticker conversation — from debut to latest.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((ep) => (
              <Link
                key={ep.slug}
                href={`/podcast/${ep.slug}`}
                className="card-hover group flex flex-col"
              >
                {/* YouTube thumbnail */}
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-navy-100">
                  <img
                    src={`https://img.youtube.com/vi/${ep.youtubeId}/mqdefault.jpg`}
                    alt={ep.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-0.5 rounded">
                    {ep.duration}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-navy-800 group-hover:text-gold-600 transition-colors line-clamp-2 mb-1">
                  {ep.guest}
                </h3>

                {ep.company && (
                  <p className="text-sm text-gold-600 font-medium mb-2">
                    {ep.company}
                  </p>
                )}

                <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
                  {truncate(ep.description, 120)}
                </p>

                <div className="flex items-center gap-3 text-xs text-gray-500 mt-auto pt-2 border-t border-gray-100">
                  <time dateTime={ep.date}>{fmtDate(ep.date)}</time>
                  <span>&middot;</span>
                  <span>{ep.duration}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-max mx-auto">
          <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Never Miss an Episode
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-300">
              Subscribe on your favorite platform and get notified when new
              episodes drop.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={SPOTIFY_SHOW}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                Follow on Spotify
              </a>
              <a
                href="https://www.youtube.com/playlist?list=PL6wvA-EH7M41bn5LPaWA9kpZgI5_Pxzyn"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline border-white text-white hover:bg-white hover:text-navy-700 text-lg px-8 py-4 inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Subscribe on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
