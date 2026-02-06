"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

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
    <header className="bg-navy-800 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/thor-funds-logo-white.png"
                alt="THOR Funds"
                width={180}
                height={48}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-white hover:text-gold-500 transition-colors py-2"
                >
                  {item.name}
                  {item.children && (
                    <svg
                      className="ml-1 inline-block h-4 w-4"
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
                  <div className="absolute left-0 top-full pt-2 w-56">
                    <div className="bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-navy-800 hover:bg-navy-50 hover:text-gold-600"
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

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/newsletter"
              className="inline-flex items-center rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-900 hover:bg-gold-400 transition-colors"
            >
              Subscribe to Newsletter
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              className="text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
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
          <div className="lg:hidden py-4 border-t border-navy-700">
            <div className="space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-2 text-base font-medium text-white hover:text-gold-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block py-1 text-sm text-gray-300 hover:text-gold-500"
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
                className="block w-full text-center rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-900"
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
