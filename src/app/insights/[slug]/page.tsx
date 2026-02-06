import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import episodes from "@/data/episodes.json";

interface Episode {
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
}

const typedEpisodes = episodes as unknown as Episode[];

interface EpisodePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return typedEpisodes.map((episode) => ({
    slug: episode.slug,
  }));
}

export async function generateMetadata({ params }: EpisodePageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = typedEpisodes.find((ep) => ep.slug === slug);

  if (!episode) {
    return { title: "Episode Not Found" };
  }

  const description = episode.summary || episode.description?.substring(0, 160);

  return {
    title: `${episode.guest}${episode.company ? ` - ${episode.company}` : ''} | Behind the Ticker`,
    description,
    openGraph: {
      title: `${episode.guest}${episode.company ? ` - ${episode.company}` : ''}`,
      description,
      type: "article",
      publishedTime: episode.publishedAt,
      authors: ["Brad Roth"],
    },
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { slug } = await params;
  const episode = typedEpisodes.find((ep) => ep.slug === slug);

  if (!episode) {
    notFound();
  }

  const relatedEpisodes = typedEpisodes
    .filter((ep) => ep.slug !== slug)
    .slice(0, 4);

  return (
    <>
      <section className="bg-navy-800 py-12 lg:py-16">
        <div className="container-wide">
          <nav className="flex items-center text-sm text-gray-400 mb-4">
            <Link href="/insights" className="hover:text-gold-500">Insights</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{episode.guest}</span>
          </nav>
          
          <div className="max-w-4xl">
            <span className="inline-block bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium mb-4">
              Behind the Ticker
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-white">{episode.guest}</h1>
            {episode.company && (
              <p className="mt-2 text-xl text-gold-500">{episode.company}</p>
            )}
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
              <span>{formatDate(episode.publishedAt)}</span>
              {episode.durationFormatted && (
                <>
                  <span>•</span>
                  <span>{episode.durationFormatted}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {episode.mp3Url && (
        <section className="bg-navy-700 py-6">
          <div className="container-wide">
            <div className="max-w-4xl">
              <audio controls className="w-full" preload="metadata">
                <source src={episode.mp3Url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </section>
      )}

      <article className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="prose-content">
                <h2>Episode Summary</h2>
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: episode.descriptionHtml || `<p>${episode.description}</p>` 
                  }} 
                />
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-navy-800 mb-4">Share this episode</h3>
                <div className="flex gap-4">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this episode of Behind the Ticker: ${episode.guest}`)}&url=${encodeURIComponent(`https://thorfunds.com/insights/${episode.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-navy-800 transition-colors"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://thorfunds.com/insights/${episode.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-navy-800 transition-colors"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="card bg-navy-800 text-white">
                <h3 className="text-lg font-semibold mb-2">Guest</h3>
                <p className="text-xl font-bold text-gold-500">{episode.guest}</p>
                {episode.company && (
                  <p className="text-gray-300 mt-1">{episode.company}</p>
                )}
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-navy-800 mb-4">Subscribe</h3>
                <div className="space-y-3">
                  <a href="https://podcasts.apple.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-gold-600">
                    Apple Podcasts
                  </a>
                  <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-gold-600">
                    Spotify
                  </a>
                </div>
              </div>

              {relatedEpisodes.length > 0 && (
                <div className="card">
                  <h3 className="text-lg font-semibold text-navy-800 mb-4">More Episodes</h3>
                  <div className="space-y-4">
                    {relatedEpisodes.map((ep) => (
                      <Link
                        key={ep.id}
                        href={`/insights/${ep.slug}`}
                        className="block hover:text-gold-600 transition-colors"
                      >
                        <p className="font-medium text-navy-800">{ep.guest}</p>
                        {ep.company && (
                          <p className="text-sm text-gray-500">{ep.company}</p>
                        )}
                      </Link>
                    ))}
                  </div>
                  <Link href="/insights" className="mt-4 inline-flex items-center text-gold-600 font-medium text-sm">
                    View All Episodes
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>

      <section className="section-padding bg-gold-500">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-navy-900">Get Weekly Insights</h2>
          <p className="mt-4 text-lg text-navy-800 max-w-2xl mx-auto">
            Episode summaries, market commentary, and educational content delivered to your inbox.
          </p>
          <Link href="/newsletter" className="mt-8 inline-block btn-secondary">
            Subscribe to Newsletter
          </Link>
        </div>
      </section>
    </>
  );
}
