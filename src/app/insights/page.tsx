import { Metadata } from 'next';
import { PodcastSeriesSchema } from '@/components/seo/PodcastSchema';

export const metadata: Metadata = {
  title: 'Behind the Ticker Podcast | THOR Funds',
  description:
    'Behind the Ticker features in-depth conversations with ETF managers, portfolio strategists, and investment thought leaders. Hosted by Brad Roth, CIO of THOR Funds.',
  alternates: { canonical: 'https://thorfunds.com/insights/' },
  openGraph: {
    title: 'Behind the Ticker Podcast | THOR Funds',
    description:
      'In-depth conversations with ETF managers and investment thought leaders.',
    url: 'https://thorfunds.com/insights/',
    type: 'website',
  },
};

const RSS_URL = 'https://feeds.buzzsprout.com/2162961.rss';
const REVALIDATE = 1800;

// Reuse the same parsing logic server-side for SSR
function extractBetween(str: string, start: string, end: string): string | null {
  const startIdx = str.indexOf(start);
  if (startIdx === -1) return null;
  const contentStart = startIdx + start.length;
  const endIdx = str.indexOf(end, contentStart);
  if (endIdx === -1) return null;
  return str.substring(contentStart, endIdx);
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'");
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

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
  publishedAt: string | null;
  mp3Url: string | null;
  duration: number;
  durationFormatted: string;
  episodeNumber: number;
}

async function getEpisodes(): Promise<Episode[]> {
  try {
    const response = await fetch(RSS_URL, { next: { revalidate: REVALIDATE } });
    if (!response.ok) throw new Error(`RSS fetch failed: ${response.status}`);
    const rss = await response.text();

    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const items: string[] = [];
    let match;
    while ((match = itemRegex.exec(rss)) !== null) {
      items.push(match[1]);
    }

    const episodes = items
      .map((itemXml, _index) => {
        const title = extractBetween(itemXml, '<title>', '</title>') || '';
        let description = extractBetween(itemXml, '<description><![CDATA[', ']]></description>');
        if (!description) description = extractBetween(itemXml, '<description>', '</description>') || '';
        let contentEncoded = extractBetween(itemXml, '<content:encoded><![CDATA[', ']]></content:encoded>');
        if (!contentEncoded) contentEncoded = description;
        const summary = extractBetween(itemXml, '<itunes:summary><![CDATA[', ']]></itunes:summary>') || '';
        const pubDate = extractBetween(itemXml, '<pubDate>', '</pubDate>') || '';
        const durationStr = extractBetween(itemXml, '<itunes:duration>', '</itunes:duration>') || '0';
        const guid = extractBetween(itemXml, '<guid isPermaLink="false">', '</guid>') || '';
        const enclosureMatch = itemXml.match(/enclosure url="([^"]+)"/);
        const mp3Url = enclosureMatch ? enclosureMatch[1] : null;
        const id = guid.replace('Buzzsprout-', '');
        if (!id) return null;

        const cleanTitle = decodeEntities(title);
        const titleParts = cleanTitle.split(' - ');
        const guest = titleParts[0]?.trim() || 'Brad Roth';
        const company = titleParts[1]?.trim() || null;
        const topic = titleParts[2]?.trim() || null;
        const slug = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').substring(0, 80);
        const durationSec = parseInt(durationStr) || 0;
        const mins = Math.floor(durationSec / 60);
        const secs = durationSec % 60;
        const plainDescription = decodeEntities(stripHtml(contentEncoded || description));
        const summaryText = summary ? decodeEntities(summary) : plainDescription.substring(0, 300) + (plainDescription.length > 300 ? '...' : '');

        return {
          id, slug, title: cleanTitle, guest, company, topic,
          description: plainDescription,
          descriptionHtml: contentEncoded || description,
          summary: summaryText, pubDate,
          publishedAt: pubDate ? new Date(pubDate).toISOString() : null,
          mp3Url, duration: durationSec,
          durationFormatted: `${mins}:${secs.toString().padStart(2, '0')}`,
          episodeNumber: 0,
        } as Episode;
      })
      .filter((e): e is Episode => e !== null);

    episodes.sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    });
    episodes.forEach((ep, i) => { ep.episodeNumber = episodes.length - i; });
    return episodes;
  } catch (error) {
    console.error('RSS fetch failed, using fallback:', error);
    const fallback = await import('@/data/episodes-enhanced.json');
    const data = (fallback.default as unknown as Episode[]);
    return data.map((ep, i) => ({ ...ep, episodeNumber: data.length - i }));
  }
}

export default async function InsightsPage() {
  const episodes = await getEpisodes();

  return (
    <main className="min-h-screen bg-white">
      <PodcastSeriesSchema
        totalEpisodes={episodes.length}
        latestEpisodeDate={episodes[0]?.publishedAt || undefined}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Behind the Ticker</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Real conversations with the people building some of today&apos;s most innovative ETFs — strategy, structure, and the stories behind each fund.
            Hosted by Brad Roth, CIO of THOR Funds.
          </p>
          <div className="mt-6 flex gap-4">
            <a href="https://feeds.buzzsprout.com/2162961.rss" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors">
              RSS Feed
            </a>
            <a href="https://open.spotify.com/show/behindtheticker" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
              Spotify
            </a>
            <a href="https://podcasts.apple.com/us/podcast/behind-the-ticker/id1682702118" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
              Apple Podcasts
            </a>
          </div>
        </div>
      </section>

      {/* Episodes */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">
          All Episodes <span className="text-slate-400 font-normal text-lg">({episodes.length})</span>
        </h2>
        <div className="space-y-6">
          {episodes.map((episode) => (
            <article
              key={episode.id}
              className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      Ep {episode.episodeNumber}
                    </span>
                    <span className="text-xs text-slate-400">
                      {episode.publishedAt
                        ? new Date(episode.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'short', day: 'numeric',
                          })
                        : ''}
                    </span>
                    <span className="text-xs text-slate-400">{episode.durationFormatted}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    {episode.guest}
                  </h3>
                  {episode.company && (
                    <p className="text-sm text-slate-500 mb-2">
                      {episode.company}{episode.topic ? ` · ${episode.topic}` : ''}
                    </p>
                  )}
                  <p className="text-sm text-slate-600 line-clamp-3">
                    {episode.summary}
                  </p>
                </div>
              </div>
              {episode.mp3Url && (
                <div className="mt-4">
                  <audio controls preload="none" className="w-full h-10">
                    <source src={episode.mp3Url} type="audio/mpeg" />
                  </audio>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
