import { NextResponse } from 'next/server';
import episodesFallback from '@/data/episodes-enhanced.json';

const RSS_URL = 'https://feeds.buzzsprout.com/2162961.rss';
const REVALIDATE_SECONDS = 1800; // 30 minutes

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
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

interface ParsedEpisode {
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

function parseItem(itemXml: string, episodeNumber: number): ParsedEpisode | null {
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

  const slug = cleanTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);

  const durationSec = parseInt(durationStr) || 0;
  const mins = Math.floor(durationSec / 60);
  const secs = durationSec % 60;
  const durationFormatted = `${mins}:${secs.toString().padStart(2, '0')}`;

  const plainDescription = decodeEntities(stripHtml(contentEncoded || description));
  const summaryText = summary
    ? decodeEntities(summary)
    : plainDescription.substring(0, 300) + (plainDescription.length > 300 ? '...' : '');

  return {
    id,
    slug,
    title: cleanTitle,
    guest,
    company,
    topic,
    description: plainDescription,
    descriptionHtml: contentEncoded || description,
    summary: summaryText,
    pubDate,
    publishedAt: pubDate ? new Date(pubDate).toISOString() : null,
    mp3Url,
    duration: durationSec,
    durationFormatted,
    episodeNumber,
  };
}

async function fetchAndParseRSS(): Promise<ParsedEpisode[]> {
  const response = await fetch(RSS_URL, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`RSS fetch failed: ${response.status}`);
  }

  const rss = await response.text();

  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const items: string[] = [];
  let match;
  while ((match = itemRegex.exec(rss)) !== null) {
    items.push(match[1]);
  }

  const episodes = items
    .map((item, index) => parseItem(item, items.length - index))
    .filter((e): e is ParsedEpisode => e !== null);

  // Sort newest first
  episodes.sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });

  // Re-number after sort
  episodes.forEach((ep, i) => {
    ep.episodeNumber = episodes.length - i;
  });

  return episodes;
}

export async function GET() {
  try {
    const episodes = await fetchAndParseRSS();
    return NextResponse.json(
      { episodes, source: 'rss', count: episodes.length },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=${REVALIDATE_SECONDS * 2}`,
        },
      }
    );
  } catch (error) {
    console.error('RSS fetch failed, using fallback:', error);
    // Fallback to static data
    const fallback = (episodesFallback as unknown as ParsedEpisode[]).map((ep, i) => ({
      ...ep,
      episodeNumber: (episodesFallback as unknown as ParsedEpisode[]).length - i,
    }));
    return NextResponse.json(
      { episodes: fallback, source: 'fallback', count: fallback.length },
      { status: 200 }
    );
  }
}
