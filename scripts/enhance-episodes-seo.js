#!/usr/bin/env node
/**
 * SEO Enhancement Script for Behind the Ticker Episodes
 * Transforms raw episode data into SEO-optimized content
 */

const fs = require('fs');
const path = require('path');

const episodes = require('../src/data/episodes.json');

// Topic categories for internal linking
const TOPIC_CATEGORIES = {
  'ETF Strategy': ['etf', 'strategy', 'portfolio', 'allocation', 'active management', 'passive', 'index'],
  'Fixed Income': ['bond', 'fixed income', 'yield', 'income', 'credit', 'treasury', 'debt'],
  'Alternatives': ['hedge fund', 'alternative', 'managed futures', 'commodity', 'private', 'cta'],
  'Growth Investing': ['growth', 'innovation', 'tech', 'disrupt', 'r&d'],
  'Value Investing': ['value', 'undervalued', 'contrarian', 'dividend'],
  'Risk Management': ['risk', 'volatility', 'hedg', 'downside', 'protection', 'drawdown'],
  'Market Analysis': ['macro', 'sentiment', 'market', 'economic', 'trend'],
  'Energy & Commodities': ['energy', 'oil', 'gas', 'commodity', 'infrastructure'],
  'International': ['international', 'global', 'emerging', 'currency', 'foreign'],
  'Small & Mid Cap': ['small cap', 'mid cap', 'smid', 'micro'],
};

// ETF ticker extraction patterns
const ETF_PATTERNS = [
  /\b([A-Z]{2,5})\b(?:\s+ETF|\s+Fund|,\s+the)/gi,
  /ticker[:\s]+([A-Z]{2,5})/gi,
  /\(([A-Z]{2,5})\)/g,
];

function extractETFTicker(text) {
  const tickers = new Set();
  for (const pattern of ETF_PATTERNS) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const ticker = match[1].toUpperCase();
      // Filter out common words that aren't tickers
      if (!['THE', 'ETF', 'AND', 'FOR', 'WITH', 'CEO', 'CIO', 'CFO', 'CTO'].includes(ticker) && ticker.length <= 5) {
        tickers.add(ticker);
      }
    }
  }
  return Array.from(tickers)[0] || null;
}

function categorizeEpisode(description) {
  const lowerDesc = description.toLowerCase();
  const categories = [];
  
  for (const [category, keywords] of Object.entries(TOPIC_CATEGORIES)) {
    for (const keyword of keywords) {
      if (lowerDesc.includes(keyword)) {
        categories.push(category);
        break;
      }
    }
  }
  
  return categories.length > 0 ? categories : ['ETF Strategy'];
}

function extractKeyTakeaways(description) {
  const takeaways = [];
  const sentences = description.split(/[.!?]+/).filter(s => s.trim().length > 20);
  
  // Look for key insight patterns
  const insightPatterns = [
    /emphasiz/i,
    /explain/i,
    /position/i,
    /focus/i,
    /approach/i,
    /strategy/i,
    /key\s/i,
    /unique/i,
    /different/i,
    /advantage/i,
    /benefit/i,
  ];
  
  for (const sentence of sentences) {
    for (const pattern of insightPatterns) {
      if (pattern.test(sentence) && takeaways.length < 7) {
        const cleaned = sentence.trim().replace(/^\s*[-–—•]\s*/, '');
        if (cleaned.length > 30 && cleaned.length < 200) {
          takeaways.push(cleaned);
          break;
        }
      }
    }
  }
  
  // If we don't have enough, take first few substantive sentences
  if (takeaways.length < 5) {
    for (const sentence of sentences.slice(0, 10)) {
      const cleaned = sentence.trim();
      if (cleaned.length > 40 && cleaned.length < 200 && !takeaways.includes(cleaned)) {
        takeaways.push(cleaned);
        if (takeaways.length >= 5) break;
      }
    }
  }
  
  return takeaways.slice(0, 7);
}

function extractNotableQuotes(description) {
  const quotes = [];
  
  // Look for quoted content
  const quotePattern = /"([^"]+)"/g;
  let match;
  while ((match = quotePattern.exec(description)) !== null) {
    if (match[1].length > 20 && match[1].length < 200) {
      quotes.push(match[1]);
    }
  }
  
  // Also look for strong statement patterns that could be quotable
  const statements = description.split(/[.!?]+/).filter(s => {
    const trimmed = s.trim();
    return trimmed.length > 40 && trimmed.length < 150 && 
           (trimmed.includes('believe') || 
            trimmed.includes('most important') ||
            trimmed.includes('key') ||
            trimmed.includes('critical') ||
            trimmed.includes('essential'));
  });
  
  for (const stmt of statements.slice(0, 2)) {
    if (!quotes.some(q => q.includes(stmt.trim()))) {
      quotes.push(stmt.trim());
    }
  }
  
  return quotes.slice(0, 3);
}

function generateSEOTitle(episode) {
  const { guest, company, topic } = episode;
  const ticker = extractETFTicker(episode.description);
  
  // Build SEO-optimized title under 60 chars
  if (ticker && topic) {
    const title = `${guest} on ${ticker} ETF | ${topic}`;
    if (title.length <= 60) return title;
  }
  
  if (ticker) {
    const title = `${guest} on ${ticker} ETF Strategy`;
    if (title.length <= 60) return title;
  }
  
  if (company && company.length < 20) {
    const title = `${guest} - ${company} | Behind the Ticker`;
    if (title.length <= 60) return title;
  }
  
  // Fallback
  return `${guest} Interview | Behind the Ticker`.substring(0, 60);
}

function generateMetaDescription(episode) {
  const { guest, company, description } = episode;
  const ticker = extractETFTicker(description);
  
  // Extract first substantive point
  const firstPoint = description.split('.').slice(0, 2).join('.').trim();
  
  let meta = '';
  if (ticker) {
    meta = `${guest} discusses the ${ticker} ETF strategy. `;
  } else if (company) {
    meta = `${guest} from ${company} shares insights on `;
  } else {
    meta = `${guest} joins Behind the Ticker to discuss `;
  }
  
  // Add substantive content
  const remaining = 160 - meta.length - 30;
  if (remaining > 20) {
    const snippet = firstPoint.substring(0, remaining);
    meta += snippet + '...';
  }
  
  // Ensure within bounds
  if (meta.length > 160) {
    meta = meta.substring(0, 157) + '...';
  }
  
  return meta;
}

function generateKeywords(episode) {
  const keywords = new Set();
  const { guest, company, description, topic } = episode;
  
  // Guest name
  keywords.add(guest.toLowerCase());
  keywords.add(`${guest.toLowerCase()} interview`);
  
  // Company
  if (company) {
    keywords.add(company.toLowerCase());
  }
  
  // ETF ticker
  const ticker = extractETFTicker(description);
  if (ticker) {
    keywords.add(ticker.toLowerCase());
    keywords.add(`${ticker.toLowerCase()} etf`);
    keywords.add(`${ticker.toLowerCase()} etf strategy`);
  }
  
  // Topic
  if (topic) {
    keywords.add(topic.toLowerCase());
  }
  
  // Common ETF keywords from description
  const etfKeywords = ['active', 'passive', 'growth', 'value', 'income', 'dividend', 
                       'fixed income', 'equity', 'alternatives', 'hedge fund'];
  const lowerDesc = description.toLowerCase();
  for (const kw of etfKeywords) {
    if (lowerDesc.includes(kw)) {
      keywords.add(`${kw} etf`);
    }
  }
  
  return Array.from(keywords).slice(0, 8);
}

function findRelatedEpisodes(currentEpisode, allEpisodes) {
  const currentCategories = categorizeEpisode(currentEpisode.description);
  const related = [];
  
  for (const ep of allEpisodes) {
    if (ep.id === currentEpisode.id) continue;
    
    const epCategories = categorizeEpisode(ep.description);
    const overlap = currentCategories.filter(c => epCategories.includes(c));
    
    if (overlap.length > 0) {
      related.push({
        slug: ep.slug,
        title: ep.title,
        guest: ep.guest,
        company: ep.company,
        overlap: overlap.length,
        categories: overlap,
      });
    }
  }
  
  // Sort by overlap and return top 4
  return related
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 4)
    .map(r => ({ slug: r.slug, title: r.title, guest: r.guest, company: r.company }));
}

// Process all episodes
const enhancedEpisodes = episodes.map((episode, idx) => {
  console.log(`Processing ${idx + 1}/${episodes.length}: ${episode.guest}`);
  
  const ticker = extractETFTicker(episode.description);
  const categories = categorizeEpisode(episode.description);
  const keyTakeaways = extractKeyTakeaways(episode.description);
  const notableQuotes = extractNotableQuotes(episode.description);
  const seoTitle = generateSEOTitle(episode);
  const metaDescription = generateMetaDescription(episode);
  const keywords = generateKeywords(episode);
  
  return {
    ...episode,
    seo: {
      title: seoTitle,
      metaDescription: metaDescription,
      keywords: keywords,
    },
    ticker: ticker,
    categories: categories,
    keyTakeaways: keyTakeaways,
    notableQuotes: notableQuotes,
    // Related episodes will be filled in second pass
    relatedEpisodes: [],
  };
});

// Second pass: add related episodes
for (const episode of enhancedEpisodes) {
  episode.relatedEpisodes = findRelatedEpisodes(episode, enhancedEpisodes);
}

// Write enhanced data
const outputPath = path.join(__dirname, '../src/data/episodes-enhanced.json');
fs.writeFileSync(outputPath, JSON.stringify(enhancedEpisodes, null, 2));

console.log(`\n✅ Enhanced ${enhancedEpisodes.length} episodes`);
console.log(`📁 Output: ${outputPath}`);

// Print summary stats
const withTickers = enhancedEpisodes.filter(e => e.ticker).length;
const categoryStats = {};
for (const ep of enhancedEpisodes) {
  for (const cat of ep.categories) {
    categoryStats[cat] = (categoryStats[cat] || 0) + 1;
  }
}

console.log(`\n📊 Stats:`);
console.log(`   Episodes with tickers: ${withTickers}`);
console.log(`   Category distribution:`);
for (const [cat, count] of Object.entries(categoryStats).sort((a, b) => b[1] - a[1])) {
  console.log(`     - ${cat}: ${count}`);
}
