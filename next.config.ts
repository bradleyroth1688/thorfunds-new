import type { NextConfig } from "next";

/**
 * Next.js Configuration with Security Headers & SEO Optimizations
 */

const securityHeaders = [
  // Prevent clickjacking
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // Prevent MIME type sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // XSS Protection (legacy but still useful)
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // DNS Prefetch Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // Strict Transport Security (HSTS)
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // Referrer Policy
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Permissions Policy (restrict browser features)
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "interest-cohort=()", // Opt out of FLoC/Topics
    ].join(", "),
  },
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://plausible.io",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://www.google-analytics.com https://plausible.io https://api.thorfunds.com https://uauth.ultimusfundsolutions.com https://funddata.ultimusfundsolutions.com",
      "media-src 'self' https://www.buzzsprout.com",
      "frame-src 'self' https://www.youtube.com https://player.vimeo.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Server-side rendering (needed for API routes)
  // output: "export",

  // Image optimization
  images: {
    unoptimized: true,
  },

  // Consistent trailing slashes (important for canonicalization)
  trailingSlash: true,

  // Compress responses
  compress: true,

  // Strict mode for React
  reactStrictMode: true,

  // Power by header removal (security through obscurity)
  poweredByHeader: false,

  // Security headers (applied for server-side, also useful for reference)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      // Cache static assets longer
      {
        source: "/images/:path*",
        headers: [
          ...securityHeaders,
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          ...securityHeaders,
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Shorter cache for HTML
      {
        source: "/:path*.html",
        headers: [
          ...securityHeaders,
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },

  // Redirects for URL consistency
  async redirects() {
    return [
      // Redirect www to non-www (configure in hosting provider too)
      // {
      //   source: '/:path*',
      //   has: [{ type: 'host', value: 'www.thorfunds.com' }],
      //   destination: 'https://thorfunds.com/:path*',
      //   permanent: true,
      // },
      // Common typos/old URLs
      {
        source: "/fund/:path*",
        destination: "/funds/:path*",
        permanent: true,
      },
      {
        source: "/podcast/:path*",
        destination: "/insights/:path*",
        permanent: true,
      },
      {
        source: "/education/:path*",
        destination: "/learn/:path*",
        permanent: true,
      },
      {
        source: "/etf/:ticker",
        destination: "/funds/:ticker/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
