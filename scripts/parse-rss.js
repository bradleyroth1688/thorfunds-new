const https = require('https');
const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');

const RSS_URL = 'https://feeds.buzzsprout.com/2162961.rss';

function fetchRSS(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // Handle redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        fetchRSS(res.headers.location).then(resolve).catch(reject);
        return;
      }
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 60);
}

function stripHtml(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .trim();
}

function extractGuestInfo(title) {
  // Pattern: "Guest Name - Company" or "Guest Name - Company - Topic"
  const parts = title.split(' - ');
  if (parts.length >= 2) {
    return {
      guest: parts[0].trim(),
      company: parts[1].trim(),
      topic: parts.slice(2).join(' - ').trim() || null
    };
  }
  return { guest: title, company: null, topic: null };
}

async function main() {
  console.log('Fetching RSS feed...');
  const xml = await fetchRSS(RSS_URL);
  
  console.log('Parsing RSS...');
  const parser = new xml2js.Parser({ explicitArray: false });
  const result = await parser.parseStringPromise(xml);
  
  const channel = result.rss.channel;
  const items = Array.isArray(channel.item) ? channel.item : [channel.item];
  
  console.log(`Found ${items.length} episodes`);
  
  const episodes = items.map((item, index) => {
    const title = item.title || item['itunes:title'] || '';
    const description = item['content:encoded'] || item.description || '';
    const summary = item['itunes:summary'] || '';
    const pubDate = item.pubDate || '';
    const guid = item.guid?._ || item.guid || '';
    const enclosure = item.enclosure || {};
    const duration = item['itunes:duration'] || 0;
    
    const { guest, company, topic } = extractGuestInfo(title);
    const slug = slugify(guest || title);
    const buzzsproutId = guid.replace('Buzzsprout-', '');
    
    return {
      id: buzzsproutId,
      slug,
      title,
      guest,
      company,
      topic,
      description: stripHtml(description),
      descriptionHtml: description,
      summary: stripHtml(summary),
      pubDate,
      publishedAt: new Date(pubDate).toISOString(),
      mp3Url: enclosure.$ ? enclosure.$.url : enclosure.url,
      duration: parseInt(duration) || 0,
      durationFormatted: formatDuration(parseInt(duration) || 0),
    };
  });
  
  // Sort by date (newest first)
  episodes.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  
  // Save to JSON
  const dataDir = path.join(__dirname, '..', 'src', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(dataDir, 'episodes.json'),
    JSON.stringify(episodes, null, 2)
  );
  
  console.log(`Saved ${episodes.length} episodes to src/data/episodes.json`);
  
  // Print first few for verification
  console.log('\nFirst 5 episodes:');
  episodes.slice(0, 5).forEach(ep => {
    console.log(`- ${ep.slug}: ${ep.guest} (${ep.company})`);
  });
}

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

main().catch(console.error);
