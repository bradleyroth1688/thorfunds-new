import { MetadataRoute } from "next";
import episodesData from "@/data/episodes.json";
import fs from "fs";
import path from "path";

/**
 * Advanced Sitemap Generation
 * 
 * This creates a comprehensive sitemap with:
 * - Accurate lastmod dates
 * - Appropriate changefreq based on content type
 * - Priority weighting by page importance
 * - Image sitemap support where applicable
 */

interface Episode {
  slug: string;
  date: string;
  guest?: string;
  company?: string;
  [key: string]: unknown;
}

const episodes = episodesData as unknown as Episode[];

function getBookChapterSlugs(): string[] {
  try {
    const chaptersDir = path.join(process.cwd(), "content/book/chapters");
    return fs.readdirSync(chaptersDir)
      .filter(f => f.endsWith(".md"))
      .map(f => f.replace(".md", ""));
  } catch {
    return [];
  }
}

// Static dates for lastmod (update these when content changes)
const CONTENT_DATES = {
  homepage: "2026-02-22",
  funds: "2026-02-22",
  fundThir: "2026-02-22",
  fundThlv: "2026-02-22",
  about: "2026-02-22",
  learn: "2026-02-22",
  legal: "2025-06-01",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thorfunds.com";

  // ===================
  // CORE PAGES (Priority 1.0 - 0.9)
  // ===================
  const corePages: MetadataRoute.Sitemap = [
    { 
      url: baseUrl, 
      lastModified: new Date(CONTENT_DATES.homepage), 
      changeFrequency: "weekly", 
      priority: 1.0 
    },
    { 
      url: `${baseUrl}/funds/`, 
      lastModified: new Date(CONTENT_DATES.funds), 
      changeFrequency: "weekly", 
      priority: 0.95 
    },
  ];

  // ===================
  // FUND PAGES (Priority 0.9 - 0.7)
  // ===================
  const fundPages: MetadataRoute.Sitemap = [
    // THIR Fund
    { url: `${baseUrl}/funds/thir/`, lastModified: new Date(CONTENT_DATES.fundThir), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/funds/thir/holdings/`, lastModified: new Date(), changeFrequency: "daily", priority: 0.85 },
    { url: `${baseUrl}/funds/thir/performance/`, lastModified: new Date(), changeFrequency: "daily", priority: 0.85 },
    { url: `${baseUrl}/funds/thir/documents/`, lastModified: new Date(CONTENT_DATES.fundThir), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/funds/thir/faq/`, lastModified: new Date(CONTENT_DATES.fundThir), changeFrequency: "monthly", priority: 0.7 },
    
    // THLV Fund
    { url: `${baseUrl}/funds/thlv/`, lastModified: new Date(CONTENT_DATES.fundThlv), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/funds/thlv/holdings/`, lastModified: new Date(), changeFrequency: "daily", priority: 0.85 },
    { url: `${baseUrl}/funds/thlv/performance/`, lastModified: new Date(), changeFrequency: "daily", priority: 0.85 },
    { url: `${baseUrl}/funds/thlv/documents/`, lastModified: new Date(CONTENT_DATES.fundThlv), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/funds/thlv/faq/`, lastModified: new Date(CONTENT_DATES.fundThlv), changeFrequency: "monthly", priority: 0.7 },
    
    // Compare
    { url: `${baseUrl}/funds/compare/`, lastModified: new Date(CONTENT_DATES.funds), changeFrequency: "weekly", priority: 0.8 },
  ];

  // ===================
  // PODCAST/INSIGHTS (Priority 0.8 - 0.6)
  // ===================
  const podcastIndexPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/insights/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/insights/guests/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/insights/category/etf-strategy/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.65 },
    { url: `${baseUrl}/insights/category/fixed-income/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.65 },
    { url: `${baseUrl}/insights/category/alternatives/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.65 },
  ];

  const episodePages: MetadataRoute.Sitemap = episodes.map((episode) => {
    let lastModified: Date;
    try {
      lastModified = new Date(episode.date);
      if (isNaN(lastModified.getTime())) {
        lastModified = new Date();
      }
    } catch {
      lastModified = new Date();
    }
    return {
      url: `${baseUrl}/insights/${episode.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    };
  });

  // ===================
  // LEARNING CENTER (Priority 0.8 - 0.65)
  // ===================
  const learnPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/learn/`, lastModified: new Date(CONTENT_DATES.learn), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/learn/what-is-an-etf/`, lastModified: new Date(CONTENT_DATES.learn), changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/learn/how-etfs-work/`, lastModified: new Date(CONTENT_DATES.learn), changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/learn/index-rotation-explained/`, lastModified: new Date(CONTENT_DATES.learn), changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/learn/low-volatility-investing/`, lastModified: new Date(CONTENT_DATES.learn), changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/learn/tactical-vs-strategic/`, lastModified: new Date(CONTENT_DATES.learn), changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/learn/risk-management/`, lastModified: new Date(CONTENT_DATES.learn), changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/learn/going-to-cash/`, lastModified: new Date(CONTENT_DATES.learn), changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/learn/volatility-drag/`, lastModified: new Date(CONTENT_DATES.learn), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/learn/market-cycles/`, lastModified: new Date(CONTENT_DATES.learn), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/learn/sector-rotation/`, lastModified: new Date(CONTENT_DATES.learn), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/learn/glossary/`, lastModified: new Date(CONTENT_DATES.learn), changeFrequency: "monthly", priority: 0.65 },
  ];

  // ===================
  // ABOUT SECTION (Priority 0.7 - 0.6)
  // ===================
  const aboutPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/about/`, lastModified: new Date(CONTENT_DATES.about), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/about/philosophy/`, lastModified: new Date(CONTENT_DATES.about), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/about/press/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/about/careers/`, lastModified: new Date(CONTENT_DATES.about), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/team/`, lastModified: new Date(CONTENT_DATES.about), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/why-thor/`, lastModified: new Date(CONTENT_DATES.about), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact/`, lastModified: new Date(CONTENT_DATES.about), changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/newsletter/`, lastModified: new Date(CONTENT_DATES.about), changeFrequency: "monthly", priority: 0.6 },
  ];

  // ===================
  // RESOURCES (Priority 0.7 - 0.6)
  // ===================
  const resourcePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/resources/`, lastModified: new Date(CONTENT_DATES.about), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/resources/advisors/`, lastModified: new Date(CONTENT_DATES.about), changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/resources/documents/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/resources/faq/`, lastModified: new Date(CONTENT_DATES.about), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/resources/white-papers/`, lastModified: new Date(CONTENT_DATES.about), changeFrequency: "monthly", priority: 0.7 },
  ];

  // ===================
  // SEO LANDING PAGES (Priority 0.8)
  // ===================
  const landingPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/low-volatility-etf/`, lastModified: new Date(CONTENT_DATES.about), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/tactical-etf-strategy/`, lastModified: new Date(CONTENT_DATES.about), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/defensive-investing/`, lastModified: new Date(CONTENT_DATES.about), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/risk-managed-etf/`, lastModified: new Date(CONTENT_DATES.about), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/etf-for-advisors/`, lastModified: new Date(CONTENT_DATES.about), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/index-rotation-strategy/`, lastModified: new Date(CONTENT_DATES.about), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/go-to-cash-etf/`, lastModified: new Date(CONTENT_DATES.about), changeFrequency: "monthly", priority: 0.8 },
  ];

  // ===================
  // BOOK (Priority 0.7 - 0.6)
  // ===================
  const chapterSlugs = getBookChapterSlugs();
  const bookPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/book/`, lastModified: new Date(CONTENT_DATES.about), changeFrequency: "monthly", priority: 0.7 },
    ...chapterSlugs.map((slug) => ({
      url: `${baseUrl}/book/chapters/${slug}/`,
      lastModified: new Date(CONTENT_DATES.about),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  // ===================
  // LEGAL (Priority 0.3)
  // ===================
  const legalPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/legal/disclosures/`, lastModified: new Date(CONTENT_DATES.legal), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/legal/privacy/`, lastModified: new Date(CONTENT_DATES.legal), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/legal/terms/`, lastModified: new Date(CONTENT_DATES.legal), changeFrequency: "yearly", priority: 0.3 },
  ];

  // ===================
  // COMBINE ALL
  // ===================
  return [
    ...corePages,
    ...fundPages,
    ...podcastIndexPages,
    ...episodePages,
    ...learnPages,
    ...aboutPages,
    ...resourcePages,
    ...landingPages,
    ...bookPages,
    ...legalPages,
  ];
}
