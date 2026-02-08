const fs = require('fs');
const path = require('path');

// Read the raw episodes data (one JSON per line)
const rawData = fs.readFileSync(path.join(__dirname, '../podcasts/episodes.json'), 'utf8');
const lines = rawData.trim().split('\n');

const episodes = lines.map(line => {
  const ep = JSON.parse(line);
  // Create slug from title
  const slug = ep.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60);
  
  // Extract guest name (usually before the first dash or at the start)
  const titleParts = ep.title.split(' - ');
  const guest = titleParts[0] || 'Brad Roth';
  
  return {
    id: ep.id,
    slug,
    title: ep.title,
    description: ep.description || '',
    duration: ep.duration_string || '',
    durationSeconds: ep.duration || 0,
    url: ep.url,
    youtubeId: ep.id,
    thumbnail: ep.thumbnails && ep.thumbnails.length > 0 
      ? ep.thumbnails[ep.thumbnails.length - 1].url 
      : null,
    guest,
    views: ep.view_count || 0,
    category: 'Podcast'
  };
});

// Write processed episodes
fs.writeFileSync(
  path.join(__dirname, '../src/data/episodes.json'),
  JSON.stringify(episodes, null, 2)
);

console.log(`Processed ${episodes.length} episodes`);
