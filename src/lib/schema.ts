// Schema.org Structured Data Utilities for THOR Funds
// Comprehensive SEO markup for all page types

export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "FinancialService";
  "@id"?: string;
  name: string;
  alternateName?: string;
  description: string;
  url: string;
  logo: string;
  founder: {
    "@type": "Person";
    "@id"?: string;
    name: string;
    jobTitle: string;
    url?: string;
    sameAs?: string[];
  };
  foundingDate: string;
  areaServed: string;
  knowsAbout: string[];
  sameAs: string[];
  contactPoint: {
    "@type": "ContactPoint";
    contactType: string;
    email: string;
  };
}

export interface FinancialProductSchema {
  "@context": "https://schema.org";
  "@type": "FinancialProduct";
  name: string;
  description: string;
  url: string;
  provider: {
    "@type": "FinancialService";
    name: string;
  };
  category: string;
  additionalProperty: Array<{
    "@type": "PropertyValue";
    name: string;
    value: string;
  }>;
}

export interface PodcastEpisodeSchema {
  "@context": "https://schema.org";
  "@type": "PodcastEpisode";
  name: string;
  description: string;
  url: string;
  datePublished: string;
  duration?: string;
  partOfSeries: {
    "@type": "PodcastSeries";
    name: string;
    url: string;
  };
  associatedMedia?: {
    "@type": "AudioObject";
    contentUrl: string;
  };
  guest?: Array<{
    "@type": "Person";
    name: string;
  }>;
}

export interface FAQPageSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

export interface BreadcrumbSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

export interface ArticleSchema {
  "@context": "https://schema.org";
  "@type": "Article";
  headline: string;
  description: string;
  author: {
    "@type": "Person";
    name: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  image: string;
  url: string;
}

export interface HowToSchema {
  "@context": "https://schema.org";
  "@type": "HowTo";
  name: string;
  description: string;
  step: Array<{
    "@type": "HowToStep";
    name: string;
    text: string;
    position: number;
  }>;
}

export interface PersonSchema {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  jobTitle?: string;
  worksFor?: {
    "@type": "Organization";
    name: string;
  };
  description?: string;
  image?: string;
  sameAs?: string[];
}

// Organization schema for site-wide use
export function getOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": "https://thorfunds.com/#organization",
    name: "THOR Financial Technologies",
    alternateName: "THOR Funds",
    description: "THOR Funds offers risk-managed ETFs designed to participate in market upside while protecting against significant drawdowns. NYSE Arca listed.",
    url: "https://thorfunds.com",
    logo: "https://thorfunds.com/images/thor-funds-logo-gold.png",
    founder: {
      "@type": "Person",
      "@id": "https://thorft.com/brad-roth/#person",
      name: "Brad Roth",
      jobTitle: "Founder & Chief Investment Officer",
      url: "https://thorft.com/brad-roth/",
      sameAs: [
        "https://www.wikidata.org/wiki/Q138413241",
        "https://www.linkedin.com/in/brad-roth-thor/",
        "https://x.com/Bradr_thor",
      ],
    },
    foundingDate: "2020",
    areaServed: "United States",
    knowsAbout: [
      "Exchange Traded Funds (ETFs)",
      "Low Volatility Investing",
      "Index Rotation Strategy",
      "Risk Management",
      "Dynamic Asset Allocation",
      "Market Cycle Analysis",
      "Digital Signal Processing in Finance"
    ],
    sameAs: [
      "https://x.com/Bradr_thor",
      "https://www.linkedin.com/in/brad-roth-thor/",
      "https://www.wikidata.org/wiki/Q138413241",
      "https://thorft.com",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "welcome@thoranalytics.com"
    }
  };
}

// Fund-specific schema
export function getFundSchema(fund: {
  ticker: string;
  name: string;
  description: string;
  expenseRatio: string;
  inceptionDate: string;
  exchange: string;
}): FinancialProductSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: `${fund.ticker} - ${fund.name}`,
    description: fund.description,
    url: `https://thorfunds.com/funds/${fund.ticker.toLowerCase()}`,
    provider: {
      "@type": "FinancialService",
      name: "THOR Financial Technologies"
    },
    category: "Exchange Traded Fund",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Ticker Symbol",
        value: fund.ticker
      },
      {
        "@type": "PropertyValue",
        name: "Expense Ratio",
        value: fund.expenseRatio
      },
      {
        "@type": "PropertyValue",
        name: "Inception Date",
        value: fund.inceptionDate
      },
      {
        "@type": "PropertyValue",
        name: "Exchange",
        value: fund.exchange
      }
    ]
  };
}

// Podcast episode schema
export function getPodcastEpisodeSchema(episode: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  duration?: string;
  audioUrl?: string;
  guests?: string[];
}): PodcastEpisodeSchema {
  const schema: PodcastEpisodeSchema = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: episode.title,
    description: episode.description,
    url: `https://thorfunds.com/insights/${episode.slug}`,
    datePublished: episode.datePublished,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "Thor's Insights Podcast",
      url: "https://thorfunds.com/insights"
    }
  };
  
  if (episode.duration) {
    schema.duration = episode.duration;
  }
  
  if (episode.audioUrl) {
    schema.associatedMedia = {
      "@type": "AudioObject",
      contentUrl: episode.audioUrl
    };
  }
  
  if (episode.guests && episode.guests.length > 0) {
    schema.guest = episode.guests.map(name => ({
      "@type": "Person",
      name
    }));
  }
  
  return schema;
}

// FAQ page schema
export function getFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

// Breadcrumb schema
export function getBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://thorfunds.com${item.url}`
    }))
  };
}

// Article schema for educational content
export function getArticleSchema(article: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  author?: string;
}): ArticleSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Person",
      name: article.author || "Brad Roth"
    },
    publisher: {
      "@type": "Organization",
      name: "THOR Financial Technologies",
      logo: {
        "@type": "ImageObject",
        url: "https://thorfunds.com/images/thor-funds-logo-gold.png"
      }
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    image: article.image || "https://thorfunds.com/og-image.jpg",
    url: `https://thorfunds.com/learn/${article.slug}`
  };
}

// HowTo schema for educational guides
export function getHowToSchema(howTo: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
}): HowToSchema {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howTo.name,
    description: howTo.description,
    step: howTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      name: step.name,
      text: step.text,
      position: index + 1
    }))
  };
}

// Person schema
export function getPersonSchema(person: {
  name: string;
  jobTitle?: string;
  company?: string;
  description?: string;
  image?: string;
  socialLinks?: string[];
}): PersonSchema {
  const schema: PersonSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name
  };
  
  if (person.jobTitle) schema.jobTitle = person.jobTitle;
  if (person.company) {
    schema.worksFor = {
      "@type": "Organization",
      name: person.company
    };
  }
  if (person.description) schema.description = person.description;
  if (person.image) schema.image = person.image;
  if (person.socialLinks) schema.sameAs = person.socialLinks;
  
  return schema;
}

// Helper to render schema as JSON-LD script
export function renderSchema(schema: object): string {
  return JSON.stringify(schema);
}
