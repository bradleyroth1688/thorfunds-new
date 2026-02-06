import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { getOrganizationSchema } from "@/lib/schema";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thorfunds.com"),
  title: {
    default: "THOR Funds | Risk-Managed ETFs for Advisors",
    template: "%s | THOR Funds",
  },
  description: "THOR Funds offers innovative, risk-managed ETFs designed to participate in market upside while protecting against significant drawdowns. $1.1B AUM.",
  keywords: ["ETF", "risk management", "low volatility", "tactical ETF", "THIR", "THLV", "index rotation", "defensive investing"],
  authors: [{ name: "THOR Financial Technologies" }],
  creator: "THOR Financial Technologies",
  publisher: "THOR Financial Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thorfunds.com",
    siteName: "THOR Funds",
    title: "THOR Funds | Risk-Managed ETFs",
    description: "Risk-managed ETFs designed to participate in market upside while protecting against significant drawdowns.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "THOR Funds - Risk-Managed ETFs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Bradr_thor",
    creator: "@Bradr_thor",
    title: "THOR Funds | Risk-Managed ETFs",
    description: "Risk-managed ETFs designed to participate in market upside while protecting against significant drawdowns.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "https://thorfunds.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = getOrganizationSchema();

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#1a365d" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0d1b2e" media="(prefers-color-scheme: dark)" />
        {/* Organization Schema - Site Wide */}
        <SchemaScript schema={organizationSchema} />
      </head>
      <body className={`${inter.className} antialiased bg-white dark:bg-navy-900 text-navy-800 dark:text-white transition-colors duration-200`}>
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold-500 focus:text-navy-900 focus:rounded-lg"
        >
          Skip to main content
        </a>
        
        <Header />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
        
        {/* Dark mode initialization script - runs before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
