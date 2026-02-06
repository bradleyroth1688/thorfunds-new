import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "THOR Funds | Risk-Managed ETFs for Advisors",
    template: "%s | THOR Funds",
  },
  description: "THOR Funds offers innovative, risk-managed ETFs designed to participate in market upside while protecting against significant drawdowns. $1.1B AUM.",
  keywords: ["ETF", "risk management", "low volatility", "tactical ETF", "THIR", "THLV", "index rotation", "defensive investing"],
  authors: [{ name: "THOR Financial Technologies" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thorfunds.com",
    siteName: "THOR Funds",
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
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
