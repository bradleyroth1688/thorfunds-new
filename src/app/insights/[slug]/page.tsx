import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import episodes from '@/data/episodes.json';

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

  const metaDescription = episode.summary || episode.description.substring(0, 160);

  return {
    title: `${episode.title} | Behind the Ticker`,
    description: metaDescription,
    openGraph: {
      title: episode.title,
      description: metaDescription,
      type: 'article',
      publishedTime: episode.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: episode.title,
      description: metaDescription,
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

export default async function EpisodePage({ params }: Props) {
  const { slug } = await params;
  const episode = typedEpisodes.find((ep) => ep.slug === slug);

  if (!episode) {
    notFound();
  }

  // Find related episodes (nearby in list)
  const episodeIndex = typedEpisodes.findIndex((ep) => ep.slug === slug);
  const relatedEpisodes = typedEpisodes
    .filter((ep, idx) => ep.slug !== slug && Math.abs(idx - episodeIndex) <= 5)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-12 md:py-16">
        <div className="container-max mx-auto px-4 md:px-8">
          <nav className="text-sm mb-4">
            <Link href="/insights" className="text-white/60 hover:text-white">Insights</Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-white/80">Podcast</span>
          </nav>
          <span className="text-gold-400 text-sm font-medium uppercase tracking-wider">
            Behind the Ticker
          </span>
          <h1 className="text-2xl md:text-4xl font-bold mt-2 mb-4">{episode.title}</h1>
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
              {formatDate(episode.publishedAt)}
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

              {/* Episode Description */}
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold mb-4">Episode Summary</h2>
                <div 
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: episode.descriptionHtml }}
                />
              </div>

              {/* Transcript Section (placeholder for when transcripts are ready) */}
              <div className="mt-12 pt-8 border-t">
                <h2 className="text-2xl font-bold mb-4">Full Transcript</h2>
                <p className="text-gray-600 italic">
                  Transcript coming soon. Subscribe to our newsletter to be notified when transcripts are available.
                </p>
              </div>

              {/* Share */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="font-semibold mb-4">Share This Episode</h3>
                <div className="flex gap-4">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(episode.title)}&url=${encodeURIComponent(`https://thorfunds.com/insights/${episode.slug}`)}`}
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
                  {episode.topic && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Topic</dt>
                      <dd className="font-medium">{episode.topic}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Listen Elsewhere */}
              <div className="card">
                <h3 className="font-semibold mb-4">Listen Elsewhere</h3>
                <div className="space-y-2">
                  <a href="https://podcasts.apple.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-navy-700 hover:text-gold-600">
                    Apple Podcasts
                  </a>
                  <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-navy-700 hover:text-gold-600">
                    Spotify
                  </a>
                  <a href="https://www.youtube.com/@BRoth_THOR" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-navy-700 hover:text-gold-600">
                    YouTube
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
            </div>
          </div>

          {/* Related Episodes */}
          {relatedEpisodes.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">More Episodes</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedEpisodes.map((ep) => (
                  <Link key={ep.slug} href={`/insights/${ep.slug}`} className="card-hover">
                    <span className="text-xs font-medium text-gold-600 uppercase tracking-wider">
                      Podcast
                    </span>
                    <h3 className="font-semibold text-navy-700 mt-2 line-clamp-2">{ep.title}</h3>
                    <p className="text-sm text-gold-600 mt-1">{ep.guest}</p>
                    {ep.company && (
                      <p className="text-sm text-gray-600">{ep.company}</p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-3">
                      <span>{formatDate(ep.publishedAt)}</span>
                      <span>•</span>
                      <span>{ep.durationFormatted}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
