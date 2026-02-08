/**
 * SEO Metadata Utilities - Centralized metadata generation
 * Ensures consistent meta tags across all pages
 */

import { Metadata } from 'next';

const BASE_URL = 'https://thorfunds.com';
const SITE_NAME = 'THOR Funds';
const DEFAULT_IMAGE = '/og-image.jpg';
const TWITTER_HANDLE = '@Bradr_thor';

export interface PageSEO {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
  noIndex?: boolean;
}

/**
 * Generate complete metadata for a page
 */
export function generateMetadata(seo: PageSEO): Metadata {
  const url = `${BASE_URL}${seo.path}`;
  const image = seo.image || DEFAULT_IMAGE;
  const fullImageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: seo.author ? [{ name: seo.author }] : [{ name: 'THOR Financial Technologies' }],
    
    // Canonical URL
    alternates: {
      canonical: url,
    },

    // Open Graph
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: SITE_NAME,
      type: seo.type || 'website',
      locale: 'en_US',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
      ...(seo.publishedTime && { publishedTime: seo.publishedTime }),
      ...(seo.modifiedTime && { modifiedTime: seo.modifiedTime }),
      ...(seo.author && { authors: [seo.author] }),
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: seo.title,
      description: seo.description,
      images: [fullImageUrl],
    },

    // Robots
    robots: seo.noIndex ? {
      index: false,
      follow: false,
    } : {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Meta title templates by page type
 */
export const TITLE_TEMPLATES = {
  homepage: 'THOR Funds | Adaptive ETFs for Downside Protection',
  fund: (ticker: string, name: string) => `${ticker} - ${name} | THOR Funds`,
  fundPerformance: (ticker: string) => `${ticker} Performance & Returns | THOR Funds`,
  fundHoldings: (ticker: string) => `${ticker} Holdings & Composition | THOR Funds`,
  fundDocuments: (ticker: string) => `${ticker} Prospectus & Documents | THOR Funds`,
  fundFaq: (ticker: string) => `${ticker} FAQ | THOR Funds`,
  episode: (guest: string, topic?: string) => 
    topic ? `${guest} on ${topic} | Behind the Ticker` : `${guest} | Behind the Ticker`,
  learn: (topic: string) => `${topic} | THOR Funds Education`,
  about: (section: string) => `${section} | THOR Funds`,
  resource: (name: string) => `${name} | THOR Funds Resources`,
};

/**
 * Meta description templates
 */
export const DESCRIPTION_TEMPLATES = {
  fund: (ticker: string, name: string, strategy: string) => 
    `${name} (${ticker}) - ${strategy}. Learn about holdings, performance, and how to invest. Listed on NYSE Arca.`,
  fundPerformance: (ticker: string) =>
    `View ${ticker} historical performance, returns, and comparison to benchmark. Track daily NAV, price, and total returns over time.`,
  fundHoldings: (ticker: string) =>
    `See ${ticker}'s current portfolio holdings, sector allocation, and top positions. Updated daily with full transparency.`,
  episode: (guest: string, company: string, topic?: string) =>
    topic 
      ? `${guest} from ${company} discusses ${topic} on Behind the Ticker. Insights on ETF strategy and portfolio management.`
      : `${guest} from ${company} joins Brad Roth on Behind the Ticker to discuss investment strategies and ETF innovation.`,
  learn: (topic: string, summary: string) =>
    `${summary} Learn from THOR Funds' educational guides designed for investors.`,
};

/**
 * Generate fund page metadata
 */
export function generateFundMetadata(
  ticker: string,
  name: string,
  strategy: string,
  subpage?: 'performance' | 'holdings' | 'documents' | 'faq'
): Metadata {
  const tickerUpper = ticker.toUpperCase();
  const tickerLower = ticker.toLowerCase();
  
  const paths: Record<string, string> = {
    main: `/funds/${tickerLower}/`,
    performance: `/funds/${tickerLower}/performance/`,
    holdings: `/funds/${tickerLower}/holdings/`,
    documents: `/funds/${tickerLower}/documents/`,
    faq: `/funds/${tickerLower}/faq/`,
  };

  const titles: Record<string, string> = {
    main: TITLE_TEMPLATES.fund(tickerUpper, name),
    performance: TITLE_TEMPLATES.fundPerformance(tickerUpper),
    holdings: TITLE_TEMPLATES.fundHoldings(tickerUpper),
    documents: TITLE_TEMPLATES.fundDocuments(tickerUpper),
    faq: TITLE_TEMPLATES.fundFaq(tickerUpper),
  };

  const descriptions: Record<string, string> = {
    main: DESCRIPTION_TEMPLATES.fund(tickerUpper, name, strategy),
    performance: DESCRIPTION_TEMPLATES.fundPerformance(tickerUpper),
    holdings: DESCRIPTION_TEMPLATES.fundHoldings(tickerUpper),
    documents: `Download ${tickerUpper} prospectus, fact sheet, annual reports, and regulatory documents. Everything you need to evaluate the fund.`,
    faq: `Common questions about ${tickerUpper} - ${name}. Learn about strategy, fees, risks, and how to invest.`,
  };

  const page = subpage || 'main';
  
  return generateMetadata({
    title: titles[page],
    description: descriptions[page],
    path: paths[page],
    type: 'website', // Use website for fund pages (product not valid in OG)
    keywords: [tickerUpper, name, 'ETF', 'risk management', 'adaptive investing'],
  });
}

/**
 * Generate episode metadata
 */
export function generateEpisodeMetadata(
  slug: string,
  title: string,
  guest: string,
  company: string,
  description: string,
  publishedAt: string,
  topic?: string
): Metadata {
  return generateMetadata({
    title: TITLE_TEMPLATES.episode(guest, topic),
    description: DESCRIPTION_TEMPLATES.episode(guest, company, topic).slice(0, 160),
    path: `/insights/${slug}/`,
    type: 'article',
    publishedTime: publishedAt,
    author: 'Brad Roth',
    keywords: [guest, company, 'podcast', 'ETF', 'investing', topic].filter(Boolean) as string[],
  });
}

/**
 * Generate learn page metadata
 */
export function generateLearnMetadata(
  slug: string,
  title: string,
  description: string,
  publishedAt?: string,
  modifiedAt?: string
): Metadata {
  return generateMetadata({
    title: TITLE_TEMPLATES.learn(title),
    description: description.slice(0, 160),
    path: `/learn/${slug}/`,
    type: 'article',
    publishedTime: publishedAt,
    modifiedTime: modifiedAt,
    author: 'Brad Roth',
    keywords: [title.toLowerCase(), 'investing', 'education', 'guide', 'etf'],
  });
}

export default generateMetadata;
