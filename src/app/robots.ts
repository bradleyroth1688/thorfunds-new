import { MetadataRoute } from "next";

/**
 * Robots.txt Configuration
 * 
 * Controls search engine crawler access:
 * - Allows indexing of all public pages
 * - Blocks API routes and Next.js internal paths
 * - Points to sitemap index
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
          "/private/",
          "/*.json$",  // Block direct JSON access
        ],
      },
      {
        // Specific rules for Googlebot
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
        ],
      },
      {
        // Allow Googlebot-Image for image indexing
        userAgent: "Googlebot-Image",
        allow: "/",
      },
    ],
    sitemap: "https://thorfunds.com/sitemap.xml",
    host: "https://thorfunds.com",
  };
}
