"use client";

import Link from "next/link";

function BackButton() {
  return (
    <button 
      onClick={() => window.history.back()}
      className="btn-outline"
    >
      Go Back
    </button>
  );
}

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Fun Thor's Hammer Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            <svg 
              className="w-32 h-32 text-gold-500 mx-auto animate-float"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              {/* Mjolnir / Thor's Hammer SVG */}
              <rect x="42" y="10" width="16" height="40" rx="2" />
              <rect x="25" y="50" width="50" height="30" rx="3" />
              <rect x="30" y="55" width="40" height="20" rx="2" opacity="0.7" />
              <rect x="45" y="80" width="10" height="15" rx="1" />
              <circle cx="35" cy="65" r="3" opacity="0.5" />
              <circle cx="65" cy="65" r="3" opacity="0.5" />
              {/* Lightning bolts */}
              <path 
                d="M15 30 L25 45 L20 45 L30 60" 
                stroke="currentColor" 
                fill="none" 
                strokeWidth="2"
                className="opacity-50"
              />
              <path 
                d="M85 30 L75 45 L80 45 L70 60" 
                stroke="currentColor" 
                fill="none" 
                strokeWidth="2"
                className="opacity-50"
              />
            </svg>
          </div>
        </div>

        {/* 404 Display */}
        <h1 className="text-7xl md:text-9xl font-extrabold text-navy-800 dark:text-white mb-4">
          4<span className="text-gold-500">0</span>4
        </h1>
        
        {/* Thor-themed message */}
        <h2 className="text-2xl md:text-3xl font-bold text-navy-700 dark:text-gray-200 mb-4">
          By Odin's beard! This page has vanished.
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
          The page you're looking for might have been moved, deleted, or perhaps 
          it's hiding in another realm. Let's get you back on track.
        </p>

        {/* Search Bar */}
        <form 
          action="/search" 
          method="GET" 
          className="mb-8 max-w-md mx-auto"
        >
          <div className="flex gap-2">
            <input
              type="search"
              name="q"
              placeholder="Search for a page..."
              className="input-base flex-1"
              aria-label="Search the site"
            />
            <button type="submit" className="btn-primary">
              Search
            </button>
          </div>
        </form>

        {/* Quick Links */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
            Popular Pages
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-ghost btn-sm">
              Home
            </Link>
            <Link href="/funds" className="btn-ghost btn-sm">
              Our Funds
            </Link>
            <Link href="/funds/thir" className="btn-ghost btn-sm">
              THIR ETF
            </Link>
            <Link href="/funds/thlv" className="btn-ghost btn-sm">
              THLV ETF
            </Link>
            <Link href="/learn" className="btn-ghost btn-sm">
              Education
            </Link>
            <Link href="/insights" className="btn-ghost btn-sm">
              Podcast
            </Link>
            <Link href="/contact" className="btn-ghost btn-sm">
              Contact
            </Link>
          </div>
        </div>

        {/* Back button */}
        <div className="flex justify-center gap-4">
          <Link href="/" className="btn-primary">
            Return to Asgard (Home)
          </Link>
          <BackButton />
        </div>

        {/* Help text */}
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          Still can't find what you need?{" "}
          <Link href="/contact" className="text-gold-600 hover:text-gold-700 dark:text-gold-500">
            Contact us
          </Link>
          {" "}and we'll help you out.
        </p>
      </div>
    </div>
  );
}
