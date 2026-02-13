import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
  keywords: ["ETF", "risk management", "low volatility", "adaptive ETF", "THIR", "THLV", "index rotation", "defensive investing"],
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EY5JJGCQVH"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EY5JJGCQVH');
          `}
        </Script>
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
        <meta name="theme-color" content="#1a365d" />
        {/* Organization Schema - Site Wide */}
        <SchemaScript schema={organizationSchema} />
      </head>
      <body className={`${inter.className} antialiased bg-white text-navy-800`}>
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
{/* Light mode only - dark mode toggle removed */}
      </body>
    </html>
  );
}
