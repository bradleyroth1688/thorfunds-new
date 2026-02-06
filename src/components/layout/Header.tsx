"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { DarkModeToggle } from "@/components/ui/DarkModeToggle";

const navigation = [
  {
    name: "Funds",
    href: "/funds",
    children: [
      { name: "All Funds", href: "/funds" },
      { name: "THIR - Index Rotation", href: "/funds/thir" },
      { name: "THLV - Low Volatility", href: "/funds/thlv" },
      { name: "Compare Funds", href: "/funds/compare" },
    ],
  },
  {
    name: "Learn",
    href: "/learn",
    children: [
      { name: "Education Hub", href: "/learn" },
      { name: "What is an ETF?", href: "/learn/what-is-an-etf" },
      { name: "Index Rotation Explained", href: "/learn/index-rotation-explained" },
      { name: "Low Volatility Investing", href: "/learn/low-volatility-investing" },
      { name: "Risk Management", href: "/learn/risk-management" },
      { name: "Glossary", href: "/learn/glossary" },
    ],
  },
  {
    name: "Insights",
    href: "/insights",
    children: [
      { name: "Podcast Episodes", href: "/insights" },
      { name: "The Book", href: "/book" },
    ],
  },
  {
    name: "Tools",
    href: "/tools",
    children: [
      { name: "Fund Comparison", href: "/funds/compare" },
      { name: "Risk Profile Quiz", href: "/tools/risk-profile" },
      { name: "Investment Calculator", href: "/tools/calculator" },
    ],
  },
  {
    name: "Resources",
    href: "/resources",
    children: [
      { name: "For Advisors", href: "/resources/advisors" },
      { name: "Documents", href: "/resources/documents" },
      { name: "FAQ", href: "/resources/faq" },
    ],
  },
  {
    name: "About",
    href: "/about",
    children: [
      { name: "Our Story", href: "/about" },
      { name: "Investment Philosophy", href: "/about/philosophy" },
      { name: "Team", href: "/team" },
      { name: "Press", href: "/about/press" },
      { name: "Careers", href: "/about/careers" },
    ],
  },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="bg-navy-800 dark:bg-navy-900 sticky top-0 z-50 transition-colors duration-200">
      {/* Live ticker bar */}
      <div className="bg-navy-900 dark:bg-navy-950 py-1 px-4 text-center text-xs text-gray-400 hidden lg:block">
        <span className="inline-flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="font-semibold text-gold-500">THIR</span>
            <span>$27.43</span>
            <span className="text-green-400">+0.52%</span>
          </span>
          <span className="text-navy-600">|</span>
          <span className="flex items-center gap-1">
            <span className="font-semibold text-gold-500">THLV</span>
            <span>$31.18</span>
            <span className="text-green-400">+0.34%</span>
          </span>
          <span className="text-navy-600">|</span>
          <span className="text-gray-500">Data delayed 15 min</span>
        </span>
      </div>
      
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <Image
                src="/images/thor-funds-logo-white.png"
                alt="THOR Funds"
                width={180}
                height={48}
                className="h-12 w-auto transition-transform duration-200 group-hover:scale-105"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-6">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-white hover:text-gold-500 transition-colors py-2 flex items-center gap-1"
                >
                  {item.name}
                  {item.children && (
                    <svg
                      className={`h-4 w-4 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.children && openDropdown === item.name && (
                  <div className="absolute left-0 top-full pt-2 w-56 animate-fade-in-down">
                    <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg ring-1 ring-black/5 dark:ring-white/10 py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-navy-800 dark:text-gray-200 hover:bg-navy-50 dark:hover:bg-navy-700 hover:text-gold-600 dark:hover:text-gold-500 transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <DarkModeToggle />
            <Link
              href="/newsletter"
              className="btn-primary btn-sm"
            >
              Subscribe
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <DarkModeToggle />
            <button
              type="button"
              className="text-white p-2 hover:bg-navy-700 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-navy-700 animate-fade-in-down">
            <div className="space-y-1 max-h-[70vh] overflow-y-auto">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-2 text-base font-medium text-white hover:text-gold-500 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-4 space-y-1 pb-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block py-1.5 text-sm text-gray-300 hover:text-gold-500 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-navy-700">
              <Link
                href="/newsletter"
                className="btn-primary w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
