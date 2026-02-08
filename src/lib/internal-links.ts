/**
 * Internal Linking System - SEO-optimized internal link suggestions
 * Maps keywords to relevant pages for contextual linking
 */

export interface InternalLink {
  url: string;
  title: string;
  description: string;
  keywords: string[];
  anchorVariants: string[];
  priority: number; // 1-10, higher = more important
  category: 'fund' | 'learn' | 'about' | 'resource' | 'podcast' | 'landing';
}

export const INTERNAL_LINKS: InternalLink[] = [
  // Fund Pages - Highest Priority
  {
    url: '/funds/thir/',
    title: 'THIR - THOR Index Rotation ETF',
    description: 'Adaptive ETF that rotates between indices and cash',
    keywords: ['thir', 'index rotation', 'adaptive etf', 'rotation strategy', 'go to cash'],
    anchorVariants: ['THIR', 'THIR ETF', 'Index Rotation ETF', 'THOR Index Rotation ETF', 'our rotation strategy'],
    priority: 10,
    category: 'fund',
  },
  {
    url: '/funds/thlv/',
    title: 'THLV - THOR Low Volatility ETF',
    description: 'Low volatility ETF with adaptive cash capability',
    keywords: ['thlv', 'low volatility', 'low vol', 'defensive', 'conservative'],
    anchorVariants: ['THLV', 'THLV ETF', 'Low Volatility ETF', 'THOR Low Volatility ETF', 'our low vol strategy'],
    priority: 10,
    category: 'fund',
  },
  {
    url: '/funds/',
    title: 'Our ETFs',
    description: 'Overview of THOR Fund offerings',
    keywords: ['etf lineup', 'our funds', 'fund overview', 'products'],
    anchorVariants: ['our ETFs', 'THOR ETFs', 'our funds', 'fund offerings'],
    priority: 9,
    category: 'fund',
  },
  {
    url: '/funds/compare/',
    title: 'Compare THOR Funds',
    description: 'Side-by-side comparison of THIR and THLV',
    keywords: ['compare funds', 'thir vs thlv', 'fund comparison'],
    anchorVariants: ['compare our funds', 'THIR vs THLV', 'fund comparison'],
    priority: 8,
    category: 'fund',
  },

  // Learning Center - Educational Authority
  {
    url: '/learn/',
    title: 'Learning Center',
    description: 'Educational resources for investors',
    keywords: ['learn', 'education', 'investing education', 'etf basics'],
    anchorVariants: ['Learning Center', 'learn more', 'educational resources', 'investor education'],
    priority: 8,
    category: 'learn',
  },
  {
    url: '/learn/what-is-an-etf/',
    title: 'What Is an ETF?',
    description: 'Complete guide to Exchange-Traded Funds',
    keywords: ['etf basics', 'what is etf', 'etf definition', 'etf explained'],
    anchorVariants: ['what is an ETF', 'ETF basics', 'exchange-traded fund', 'learn about ETFs'],
    priority: 7,
    category: 'learn',
  },
  {
    url: '/learn/index-rotation-explained/',
    title: 'Index Rotation Explained',
    description: 'How index rotation strategies work',
    keywords: ['index rotation', 'rotation strategy', 'dynamic rotation'],
    anchorVariants: ['index rotation', 'rotation strategy', 'how rotation works'],
    priority: 8,
    category: 'learn',
  },
  {
    url: '/learn/low-volatility-investing/',
    title: 'Low Volatility Investing',
    description: 'Guide to low vol investing strategies',
    keywords: ['low volatility', 'low vol', 'volatility anomaly', 'defensive stocks'],
    anchorVariants: ['low volatility investing', 'low vol strategy', 'volatility anomaly'],
    priority: 8,
    category: 'learn',
  },
  {
    url: '/learn/going-to-cash/',
    title: 'Going to Cash',
    description: 'When and how to reduce market exposure',
    keywords: ['go to cash', 'cash position', 'reduce exposure', 'defensive positioning'],
    anchorVariants: ['going to cash', 'move to cash', 'cash position', 'reduce market exposure'],
    priority: 7,
    category: 'learn',
  },
  {
    url: '/learn/risk-management/',
    title: 'Risk Management in Investing',
    description: 'Essential risk management strategies',
    keywords: ['risk management', 'downside protection', 'drawdown', 'portfolio risk'],
    anchorVariants: ['risk management', 'manage risk', 'downside protection', 'protect your portfolio'],
    priority: 8,
    category: 'learn',
  },
  {
    url: '/learn/volatility-drag/',
    title: 'Volatility Drag',
    description: 'How volatility erodes long-term returns',
    keywords: ['volatility drag', 'sequence of returns', 'compound returns'],
    anchorVariants: ['volatility drag', 'sequence of returns risk', 'compounding'],
    priority: 6,
    category: 'learn',
  },
  {
    url: '/learn/tactical-vs-strategic/',
    title: 'Tactical vs Strategic Allocation',
    description: 'Comparing allocation approaches',
    keywords: ['tactical allocation', 'strategic allocation', 'asset allocation'],
    anchorVariants: ['tactical vs strategic', 'asset allocation', 'allocation approach'],
    priority: 7,
    category: 'learn',
  },
  {
    url: '/learn/market-cycles/',
    title: 'Understanding Market Cycles',
    description: 'Bull, bear, and recovery phases',
    keywords: ['market cycles', 'bull market', 'bear market', 'economic cycle'],
    anchorVariants: ['market cycles', 'bull and bear markets', 'economic cycles'],
    priority: 7,
    category: 'learn',
  },
  {
    url: '/learn/sector-rotation/',
    title: 'Sector Rotation',
    description: 'Investing with the economic cycle',
    keywords: ['sector rotation', 'cyclical', 'defensive sectors'],
    anchorVariants: ['sector rotation', 'rotate sectors', 'cyclical investing'],
    priority: 6,
    category: 'learn',
  },
  {
    url: '/learn/glossary/',
    title: 'Investment Glossary',
    description: 'Definitions of key investing terms',
    keywords: ['glossary', 'definitions', 'terms', 'vocabulary'],
    anchorVariants: ['glossary', 'investment terms', 'definitions'],
    priority: 5,
    category: 'learn',
  },

  // About & Team
  {
    url: '/about/',
    title: 'About THOR Funds',
    description: 'Our story and mission',
    keywords: ['about', 'company', 'our story', 'mission'],
    anchorVariants: ['about us', 'our story', 'about THOR Funds'],
    priority: 7,
    category: 'about',
  },
  {
    url: '/team/',
    title: 'Our Team',
    description: 'Meet the THOR Funds team',
    keywords: ['team', 'leadership', 'brad roth', 'management'],
    anchorVariants: ['our team', 'leadership', 'meet the team', 'Brad Roth'],
    priority: 7,
    category: 'about',
  },
  {
    url: '/about/philosophy/',
    title: 'Investment Philosophy',
    description: 'How we think about investing',
    keywords: ['philosophy', 'investment approach', 'strategy'],
    anchorVariants: ['investment philosophy', 'our approach', 'how we invest'],
    priority: 7,
    category: 'about',
  },
  {
    url: '/why-thor/',
    title: 'Why THOR Funds',
    description: 'Why choose our risk-managed ETFs',
    keywords: ['why thor', 'differentiators', 'advantages'],
    anchorVariants: ['why THOR', 'why choose us', 'our advantage'],
    priority: 8,
    category: 'about',
  },

  // Resources
  {
    url: '/resources/',
    title: 'Resources',
    description: 'Tools and resources for investors',
    keywords: ['resources', 'tools', 'materials'],
    anchorVariants: ['resources', 'investor resources', 'tools'],
    priority: 6,
    category: 'resource',
  },
  {
    url: '/resources/advisors/',
    title: 'For Financial Advisors',
    description: 'Resources for RIAs and advisors',
    keywords: ['advisors', 'ria', 'financial advisor', 'institutional'],
    anchorVariants: ['for advisors', 'advisor resources', 'RIA resources'],
    priority: 7,
    category: 'resource',
  },
  {
    url: '/resources/faq/',
    title: 'Frequently Asked Questions',
    description: 'Common questions about THOR Funds',
    keywords: ['faq', 'questions', 'help'],
    anchorVariants: ['FAQ', 'frequently asked questions', 'common questions'],
    priority: 6,
    category: 'resource',
  },
  {
    url: '/resources/white-papers/',
    title: 'White Papers',
    description: 'Research and analysis',
    keywords: ['white papers', 'research', 'analysis'],
    anchorVariants: ['white papers', 'research', 'our research'],
    priority: 6,
    category: 'resource',
  },

  // Podcast
  {
    url: '/insights/',
    title: 'Behind the Ticker Podcast',
    description: 'ETF manager interviews and insights',
    keywords: ['podcast', 'behind the ticker', 'interviews', 'insights'],
    anchorVariants: ['Behind the Ticker', 'our podcast', 'ETF insights', 'listen to our podcast'],
    priority: 8,
    category: 'podcast',
  },
  {
    url: '/insights/guests/',
    title: 'Podcast Guests',
    description: 'Featured guests on Behind the Ticker',
    keywords: ['guests', 'podcast guests', 'interviews'],
    anchorVariants: ['podcast guests', 'our guests', 'featured guests'],
    priority: 5,
    category: 'podcast',
  },

  // SEO Landing Pages
  {
    url: '/low-volatility-etf/',
    title: 'Low Volatility ETF',
    description: 'Learn about low volatility ETF investing',
    keywords: ['low volatility etf', 'low vol etf', 'defensive etf'],
    anchorVariants: ['low volatility ETF', 'low vol ETF', 'defensive ETF'],
    priority: 7,
    category: 'landing',
  },
  {
    url: '/tactical-etf-strategy/',
    title: 'Adaptive ETF Strategy',
    description: 'Adaptive ETF investment approach',
    keywords: ['adaptive etf', 'adaptive strategy', 'active etf'],
    anchorVariants: ['adaptive ETF', 'adaptive strategy', 'adaptive approach'],
    priority: 7,
    category: 'landing',
  },
  {
    url: '/defensive-investing/',
    title: 'Defensive Investing',
    description: 'Protect your portfolio with defensive strategies',
    keywords: ['defensive investing', 'defensive strategy', 'portfolio protection'],
    anchorVariants: ['defensive investing', 'defensive strategy', 'protect your portfolio'],
    priority: 7,
    category: 'landing',
  },
  {
    url: '/risk-managed-etf/',
    title: 'Risk-Managed ETF',
    description: 'ETFs with built-in risk management',
    keywords: ['risk managed etf', 'risk management', 'managed risk'],
    anchorVariants: ['risk-managed ETF', 'managed risk ETF', 'risk management'],
    priority: 7,
    category: 'landing',
  },
  {
    url: '/go-to-cash-etf/',
    title: 'Go-to-Cash ETF',
    description: 'ETF that can move to cash',
    keywords: ['go to cash', 'cash etf', 'defensive etf'],
    anchorVariants: ['go-to-cash ETF', 'cash capability', 'defensive positioning'],
    priority: 7,
    category: 'landing',
  },
  {
    url: '/index-rotation-strategy/',
    title: 'Index Rotation Strategy',
    description: 'Rotate between market indices',
    keywords: ['index rotation strategy', 'rotation', 'adaptive'],
    anchorVariants: ['index rotation strategy', 'rotation strategy', 'adaptive rotation'],
    priority: 7,
    category: 'landing',
  },
  {
    url: '/etf-for-advisors/',
    title: 'ETFs for Financial Advisors',
    description: 'Institutional-quality ETFs for advisors',
    keywords: ['etf for advisors', 'advisor etf', 'institutional'],
    anchorVariants: ['ETFs for advisors', 'advisor solutions', 'institutional ETFs'],
    priority: 7,
    category: 'landing',
  },

  // Contact & Newsletter
  {
    url: '/contact/',
    title: 'Contact Us',
    description: 'Get in touch with THOR Funds',
    keywords: ['contact', 'reach out', 'get in touch'],
    anchorVariants: ['contact us', 'get in touch', 'reach out'],
    priority: 6,
    category: 'about',
  },
  {
    url: '/newsletter/',
    title: 'Newsletter',
    description: 'Subscribe to market insights',
    keywords: ['newsletter', 'subscribe', 'market insights'],
    anchorVariants: ['newsletter', 'subscribe', 'market updates'],
    priority: 6,
    category: 'resource',
  },

  // Book
  {
    url: '/book/',
    title: 'The Book',
    description: 'THOR Funds book on adaptive investing',
    keywords: ['book', 'adaptive investing book'],
    anchorVariants: ['the book', 'our book', 'adaptive investing book'],
    priority: 6,
    category: 'resource',
  },
];

/**
 * Find relevant internal links based on content keywords
 */
export function findRelevantLinks(
  content: string,
  excludeUrls: string[] = [],
  maxLinks: number = 5
): InternalLink[] {
  const contentLower = content.toLowerCase();
  const scoredLinks: Array<{ link: InternalLink; score: number }> = [];

  for (const link of INTERNAL_LINKS) {
    if (excludeUrls.includes(link.url)) continue;

    let score = 0;
    
    // Check keyword matches
    for (const keyword of link.keywords) {
      if (contentLower.includes(keyword.toLowerCase())) {
        score += 3;
      }
    }

    // Check anchor variant matches
    for (const anchor of link.anchorVariants) {
      if (contentLower.includes(anchor.toLowerCase())) {
        score += 2;
      }
    }

    // Add priority weight
    score += link.priority * 0.5;

    if (score > 0) {
      scoredLinks.push({ link, score });
    }
  }

  return scoredLinks
    .sort((a, b) => b.score - a.score)
    .slice(0, maxLinks)
    .map(item => item.link);
}

/**
 * Get related links by category
 */
export function getRelatedLinks(
  category: InternalLink['category'],
  excludeUrls: string[] = [],
  maxLinks: number = 4
): InternalLink[] {
  return INTERNAL_LINKS
    .filter(link => link.category === category && !excludeUrls.includes(link.url))
    .sort((a, b) => b.priority - a.priority)
    .slice(0, maxLinks);
}

/**
 * Get suggested anchor text for a link
 */
export function getSuggestedAnchorText(url: string): string | null {
  const link = INTERNAL_LINKS.find(l => l.url === url);
  if (!link) return null;
  return link.anchorVariants[0];
}

/**
 * Validate internal links in HTML content
 */
export function validateInternalLinks(html: string): {
  valid: string[];
  invalid: string[];
} {
  const linkRegex = /href=["'](\/[^"']+)["']/g;
  const validUrls = new Set(INTERNAL_LINKS.map(l => l.url.replace(/\/$/, '')));
  
  const valid: string[] = [];
  const invalid: string[] = [];
  
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const url = match[1].replace(/\/$/, '');
    if (validUrls.has(url)) {
      valid.push(url);
    } else {
      invalid.push(url);
    }
  }

  return { valid, invalid };
}

export default INTERNAL_LINKS;
