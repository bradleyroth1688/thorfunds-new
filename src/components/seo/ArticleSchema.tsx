/**
 * Article Schema - JSON-LD for educational content, blog posts, and guides
 * Supports Article, HowTo, and Educational content types
 */

interface ArticleData {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  modifiedAt?: string;
  author?: string;
  authorTitle?: string;
  category?: string;
  keywords?: string[];
  readingTime?: number; // minutes
  wordCount?: number;
  image?: string;
}

interface ArticleSchemaProps {
  article: ArticleData;
  type?: 'Article' | 'HowTo' | 'Guide' | 'Educational';
}

export function ArticleSchema({ article, type = 'Article' }: ArticleSchemaProps) {
  const baseUrl = "https://thorfunds.com";
  
  const schemaType = type === 'HowTo' ? 'HowTo' : 'Article';
  
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "@id": `${baseUrl}/${article.slug}/#article`,
    headline: article.title,
    description: article.description,
    url: `${baseUrl}/${article.slug}/`,
    image: article.image || `${baseUrl}/og-image.jpg`,
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt || article.publishedAt,
    author: {
      "@type": "Person",
      "@id": "https://thorfunds.com/team/#brad-roth",
      name: article.author || "Brad Roth",
      jobTitle: article.authorTitle || "Chief Investment Officer",
      url: "https://thorfunds.com/team/",
      worksFor: {
        "@type": "Organization",
        "@id": "https://thorfunds.com/#organization",
      },
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://thorfunds.com/#organization",
      name: "THOR Funds",
      logo: {
        "@type": "ImageObject",
        url: "https://thorfunds.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/${article.slug}/`,
    },
    ...(article.category && { articleSection: article.category }),
    ...(article.keywords && { keywords: article.keywords.join(", ") }),
    ...(article.wordCount && { wordCount: article.wordCount }),
    ...(article.readingTime && {
      timeRequired: `PT${article.readingTime}M`,
    }),
    inLanguage: "en-US",
    isAccessibleForFree: true,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["article", ".content", "h1", "h2"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  );
}

// Pre-configured article data for Learn pages
export const LEARN_ARTICLES: Record<string, ArticleData> = {
  "what-is-an-etf": {
    title: "What Is an ETF? A Complete Guide for Investors",
    description: "Learn what Exchange-Traded Funds (ETFs) are, how they work, and why they've become the most popular investment vehicle for both individual and institutional investors.",
    slug: "learn/what-is-an-etf",
    publishedAt: "2024-01-15",
    modifiedAt: "2025-01-15",
    category: "ETF Basics",
    keywords: ["ETF", "Exchange-Traded Fund", "investing basics", "portfolio"],
    readingTime: 8,
  },
  "how-etfs-work": {
    title: "How ETFs Work: Creation, Redemption & Trading",
    description: "Understand the mechanics behind ETFs including the creation/redemption process, authorized participants, and how ETF prices stay close to their NAV.",
    slug: "learn/how-etfs-work",
    publishedAt: "2024-01-20",
    modifiedAt: "2025-01-20",
    category: "ETF Basics",
    keywords: ["ETF mechanics", "creation redemption", "authorized participants", "NAV"],
    readingTime: 10,
  },
  "index-rotation-explained": {
    title: "Index Rotation Explained: An Adaptive Investment Strategy",
    description: "Learn how index rotation strategies work, when to rotate between market indices, and how THOR's approach seeks to capture upside while managing downside risk.",
    slug: "learn/index-rotation-explained",
    publishedAt: "2024-02-01",
    modifiedAt: "2025-02-01",
    category: "Investment Strategies",
    keywords: ["index rotation", "adaptive investing", "THIR", "market timing"],
    readingTime: 12,
  },
  "low-volatility-investing": {
    title: "Low Volatility Investing: Building a Smoother Portfolio",
    description: "Discover the low volatility anomaly, why less volatile stocks have historically outperformed, and how to implement a low vol strategy in your portfolio.",
    slug: "learn/low-volatility-investing",
    publishedAt: "2024-02-15",
    modifiedAt: "2025-02-15",
    category: "Investment Strategies",
    keywords: ["low volatility", "THLV", "defensive investing", "volatility anomaly"],
    readingTime: 10,
  },
  "tactical-vs-strategic": {
    title: "Tactical vs Strategic Asset Allocation: Which Approach Is Right?",
    description: "Compare tactical and strategic asset allocation approaches, understand when each works best, and learn how to combine them for optimal portfolio management.",
    slug: "learn/tactical-vs-strategic",
    publishedAt: "2024-03-01",
    modifiedAt: "2025-03-01",
    category: "Portfolio Construction",
    keywords: ["tactical allocation", "strategic allocation", "portfolio management"],
    readingTime: 9,
  },
  "risk-management": {
    title: "Risk Management in Investing: Essential Strategies",
    description: "Master essential risk management techniques including diversification, position sizing, stop losses, and how THOR Funds approach downside protection.",
    slug: "learn/risk-management",
    publishedAt: "2024-03-15",
    modifiedAt: "2025-03-15",
    category: "Risk Management",
    keywords: ["risk management", "downside protection", "portfolio risk", "drawdown"],
    readingTime: 11,
  },
  "going-to-cash": {
    title: "Going to Cash: When and How to Reduce Market Exposure",
    description: "Learn the strategies behind moving to cash during market uncertainty, the signals to watch, and how THOR's go-to-cash capability provides downside protection.",
    slug: "learn/going-to-cash",
    publishedAt: "2024-04-01",
    modifiedAt: "2025-04-01",
    category: "Risk Management",
    keywords: ["go to cash", "market timing", "defensive positioning", "bear market"],
    readingTime: 8,
  },
  "volatility-drag": {
    title: "Volatility Drag: The Hidden Cost of Market Swings",
    description: "Understand how volatility erodes returns over time, the math behind volatility drag, and strategies to minimize its impact on your portfolio.",
    slug: "learn/volatility-drag",
    publishedAt: "2024-04-15",
    modifiedAt: "2025-04-15",
    category: "Investment Concepts",
    keywords: ["volatility drag", "compound returns", "sequence of returns", "CAGR"],
    readingTime: 7,
  },
  "market-cycles": {
    title: "Understanding Market Cycles: Bull, Bear, and Recovery Phases",
    description: "Learn to identify the four phases of market cycles, historical patterns, and how to position your portfolio for each stage of the economic cycle.",
    slug: "learn/market-cycles",
    publishedAt: "2024-05-01",
    modifiedAt: "2025-05-01",
    category: "Market Analysis",
    keywords: ["market cycles", "bull market", "bear market", "economic cycle"],
    readingTime: 12,
  },
  "sector-rotation": {
    title: "Sector Rotation: Investing with the Economic Cycle",
    description: "Master sector rotation strategies, understand which sectors outperform in each economic phase, and learn how to implement rotation in your portfolio.",
    slug: "learn/sector-rotation",
    publishedAt: "2024-05-15",
    modifiedAt: "2025-05-15",
    category: "Investment Strategies",
    keywords: ["sector rotation", "economic cycle", "cyclical stocks", "defensive stocks"],
    readingTime: 10,
  },
};

export default ArticleSchema;
