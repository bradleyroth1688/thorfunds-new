const fs = require('fs');
const path = require('path');

function extractBetween(str, start, end) {
  const startIdx = str.indexOf(start);
  if (startIdx === -1) return null;
  const contentStart = startIdx + start.length;
  const endIdx = str.indexOf(end, contentStart);
  if (endIdx === -1) return null;
  return str.substring(contentStart, endIdx);
}

function parseItem(itemXml) {
  const title = extractBetween(itemXml, '<title>', '</title>') || '';
  
  // Try different description formats
  let description = extractBetween(itemXml, '<description><![CDATA[', ']]></description>');
  if (!description) description = extractBetween(itemXml, '<description>', '</description>') || '';
  
  let contentEncoded = extractBetween(itemXml, '<content:encoded><![CDATA[', ']]></content:encoded>');
  if (!contentEncoded) contentEncoded = description;
  
  const summary = extractBetween(itemXml, '<itunes:summary><![CDATA[', ']]></itunes:summary>') || '';
  const pubDate = extractBetween(itemXml, '<pubDate>', '</pubDate>') || '';
  const duration = extractBetween(itemXml, '<itunes:duration>', '</itunes:duration>') || '0';
  const guid = extractBetween(itemXml, '<guid isPermaLink="false">', '</guid>') || '';
  
  // Extract enclosure URL
  const enclosureMatch = itemXml.match(/enclosure url="([^"]+)"/);
  const mp3Url = enclosureMatch ? enclosureMatch[1] : null;
  
  // Extract ID from guid (Buzzsprout-XXXXX)
  const id = guid.replace('Buzzsprout-', '');
  
  // Parse title for guest and company
  const cleanTitle = title.replace(/&amp;/g, '&').replace(/&apos;/g, "'");
  const titleParts = cleanTitle.split(' - ');
  const guest = titleParts[0] ? titleParts[0].trim() : 'Brad Roth';
  const company = titleParts[1] ? titleParts[1].trim() : null;
  const topic = titleParts[2] ? titleParts[2].trim() : null;
  
  // Create slug from title
  const slug = cleanTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);
  
  // Format duration
  const durationSec = parseInt(duration) || 0;
  const mins = Math.floor(durationSec / 60);
  const secs = durationSec % 60;
  const durationFormatted = `${mins}:${secs.toString().padStart(2, '0')}`;
  
  // Strip HTML from description for plain text
  const plainDescription = (contentEncoded || description)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
  
  return {
    id,
    slug,
    title: cleanTitle,
    guest,
    company,
    topic,
    description: plainDescription,
    descriptionHtml: contentEncoded || description,
    summary: summary.replace(/&amp;/g, '&').replace(/&apos;/g, "'"),
    pubDate,
    publishedAt: pubDate ? new Date(pubDate).toISOString() : null,
    mp3Url,
    duration: durationSec,
    durationFormatted
  };
}

function main() {
  console.log('Reading RSS feed from file...');
  const feedPath = path.join(__dirname, '../podcasts/feed.xml');
  const rss = fs.readFileSync(feedPath, 'utf8');
  
  // Split by </item> to get individual items
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const items = [];
  let match;
  while ((match = itemRegex.exec(rss)) !== null) {
    items.push(match[1]);
  }
  
  console.log(`Found ${items.length} episodes`);
  
  const episodes = items.map(item => parseItem(item)).filter(e => e.id);
  
  // Sort by date (newest first)
  episodes.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  
  // Save to file
  const outputPath = path.join(__dirname, '../src/data/episodes.json');
  fs.writeFileSync(outputPath, JSON.stringify(episodes, null, 2));
  
  console.log(`Saved ${episodes.length} episodes to ${outputPath}`);
  
  // Also save MP3 URLs for downloading
  const mp3List = episodes.map(e => ({
    id: e.id,
    slug: e.slug,
    url: e.mp3Url,
    guest: e.guest
  }));
  
  const mp3Path = path.join(__dirname, '../podcasts/mp3-list.json');
  fs.writeFileSync(mp3Path, JSON.stringify(mp3List, null, 2));
  
  console.log(`Saved MP3 list to ${mp3Path}`);
  
  // Print first episode for verification
  console.log('\nFirst episode:');
  console.log(JSON.stringify(episodes[0], null, 2));
}

main();
