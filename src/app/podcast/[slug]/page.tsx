import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import episodes from '@/data/episodes.json';

/* ── types ────────────────────────────────────────────── */

type Episode = (typeof episodes)[number];

interface Props {
  params: Promise<{ slug: string }>;
}

/* ── helpers ──────────────────────────────────────────── */

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

const SPOTIFY_SHOW = 'https://open.spotify.com/show/1TJpgOAqctOCnjij9KTxNS';

function findEpisode(slug: string): Episode | undefined {
  return episodes.find((ep) => ep.slug === slug);
}

/* ── static params for all 94 episodes ────────────────── */

export async function generateStaticParams() {
  return episodes.map((ep) => ({ slug: ep.slug }));
}

/* ── SEO metadata ─────────────────────────────────────── */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ep = findEpisode(slug);
  if (!ep) return { title: 'Episode Not Found' };

  const plainDesc = stripHtml(ep.description).slice(0, 160);

  return {
    title: `${ep.guest} — ${ep.company} | Behind the Ticker`,
    description: plainDesc,
    openGraph: {
      title: `${ep.guest} — ${ep.company} | Behind the Ticker`,
      description: plainDesc,
      type: 'article',
      images: [`https://img.youtube.com/vi/${ep.youtubeId}/maxresdefault.jpg`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${ep.guest} — ${ep.company}`,
      description: plainDesc,
      images: [`https://img.youtube.com/vi/${ep.youtubeId}/maxresdefault.jpg`],
    },
  };
}

/* ── page ─────────────────────────────────────────────── */

export default async function EpisodePage({ params }: Props) {
  const { slug } = await params;
  const ep = findEpisode(slug);
  if (!ep) notFound();

  // Determine previous/next for navigation
  const sorted = [...episodes].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const idx = sorted.findIndex((e) => e.slug === ep.slug);
  const prev = idx < sorted.length - 1 ? sorted[idx + 1] : null;
  const next = idx > 0 ? sorted[idx - 1] : null;

  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-16 md:py-20">
        <div className="container-max mx-auto px-4 md:px-8">
          {/* Back link */}
          <Link
            href="/podcast"
            className="inline-flex items-center gap-1 text-white/60 hover:text-white mb-8 text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Episodes
          </Link>

          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 bg-gold-500 text-navy-900 rounded-full text-xs font-semibold mb-4">
              Behind the Ticker
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">
              {ep.guest}
            </h1>
            {ep.company && (
              <p className="text-xl text-gold-400 font-medium mb-4">
                {ep.company}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
              <time dateTime={ep.date}>{fmtDate(ep.date)}</time>
              <span>&middot;</span>
              <span>{ep.duration}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-max mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            {/* YouTube embed */}
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl mb-8">
              <iframe
                src={`https://www.youtube.com/embed/${ep.youtubeId}`}
                title={ep.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href={SPOTIFY_SHOW}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                Listen on Spotify
              </a>
              <a
                href={`https://youtube.com/watch?v=${ep.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center justify-center gap-2 px-6 py-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Watch on YouTube
              </a>
            </div>

            {/* Episode description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-10">
              <h2 className="text-2xl font-bold text-navy-800 mb-4">About This Episode</h2>
              <div
                className="prose prose-lg max-w-none text-gray-700 prose-headings:text-navy-800 prose-a:text-gold-600 prose-strong:text-navy-800"
                dangerouslySetInnerHTML={{ __html: ep.description }}
              />
            </div>

            {/* Prev / Next navigation */}
            <div className="grid sm:grid-cols-2 gap-4">
              {prev ? (
                <Link
                  href={`/podcast/${prev.slug}`}
                  className="card-hover group p-4 flex items-center gap-3"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-gold-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <div className="min-w-0">
                    <span className="text-xs text-gray-500">Previous</span>
                    <p className="text-sm font-medium text-navy-800 truncate">{prev.guest}</p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/podcast/${next.slug}`}
                  className="card-hover group p-4 flex items-center justify-end gap-3 text-right"
                >
                  <div className="min-w-0">
                    <span className="text-xs text-gray-500">Next</span>
                    <p className="text-sm font-medium text-navy-800 truncate">{next.guest}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-gold-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
