import Link from "next/link";
import Image from "next/image";

const footerNavigation = {
  funds: [
    { name: "All Funds", href: "/funds" },
    { name: "THIR - Index Rotation", href: "/funds/thir" },
    { name: "THLV - Low Volatility", href: "/funds/thlv" },
    { name: "Compare Funds", href: "/funds/compare" },
  ],
  learn: [
    { name: "Free White Paper", href: "/resources/white-papers" },
    { name: "Education Hub", href: "/learn" },
    { name: "Low Volatility Guide", href: "/investing/low-volatility" },
    { name: "Dynamic Allocation", href: "/investing/tactical-allocation" },
    { name: "What is an ETF?", href: "/learn/what-is-an-etf" },
    { name: "Glossary", href: "/learn/glossary" },
    { name: "The Book", href: "/book" },
  ],
  tools: [
    { name: "Risk Profile Quiz", href: "/tools/risk-profile" },
    { name: "Compare Funds", href: "/funds/compare" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Investment Philosophy", href: "/about/philosophy" },
    { name: "Team", href: "/team" },
    { name: "Podcast", href: "/insights" },
    { name: "Press", href: "/about/press" },
    { name: "Careers", href: "/about/careers" },
    { name: "Contact", href: "/contact" },
    { name: "Newsletter", href: "/newsletter" },
  ],
  legal: [
    { name: "Disclosures", href: "/legal/disclosures" },
    { name: "Privacy Policy", href: "/legal/privacy" },
    { name: "Terms of Use", href: "/legal/terms" },
  ],
  social: [
    {
      name: "Twitter",
      href: "https://twitter.com/Bradr_thor",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/thor-funds",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/thor.funds",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo and Description */}
          <div className="space-y-8">
            <Image
              src="/images/thor-funds-logo-white.png"
              alt="THOR Funds"
              width={160}
              height={42}
              className="h-10 w-auto"
            />
            <p className="text-sm text-gray-300 max-w-xs">
              Adaptive ETFs where managing risk is top of mind.
            </p>
            <p className="text-sm text-gold-500 font-medium">
              Participate. Protect. Prosper.
            </p>
            <div className="flex space-x-6">
              {footerNavigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gold-500 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white">Funds</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNavigation.funds.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-gray-400 hover:text-gold-500 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white">Learn</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNavigation.learn.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-gray-400 hover:text-gold-500 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white">Tools</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNavigation.tools.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-gray-400 hover:text-gold-500 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <h3 className="text-sm font-semibold text-white mt-8">Legal</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNavigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-gray-400 hover:text-gold-500 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white">Company</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNavigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-gray-400 hover:text-gold-500 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 border-t border-navy-700 pt-8 space-y-4">
          <p className="text-xs text-gray-400 leading-relaxed">
            An investor should consider the investment objectives, risks, charges, and expenses of the Fund carefully before investing. The prospectus and, if available, the summary prospectus contain this and other information about the Funds. You may obtain a prospectus and, if available, a summary prospectus by visiting thorfunds.com or calling 1-800-974-6964. Please read the prospectus or summary prospectus carefully before investing.
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">
            All investments are subject to risks, including the possible loss of principal. There is no assurance that the objectives of any strategy or fund will be achieved or will be successful.
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">
            ETFs trade like stocks, are subject to investment risk, fluctuate in market value and may trade at prices above or below the ETF&apos;s net asset value. Brokerage commissions and ETF expenses will reduce returns.
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">
            The information provided on this website is for informational purposes only. This site is not a recommendation nor an offer to sell (or solicitation of an offer to buy) securities in the United States or in any other jurisdiction.
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">
            PINE Distributors LLC, Member FINRA is the distributor for the THOR Funds. Learn more at{" "}
            <a href="https://brokercheck.finra.org/" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:text-gold-400 underline">
              FINRA&apos;s BrokerCheck
            </a>.
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">
            THOR Financial Technologies, LLC is the investment adviser to the THOR Funds and is not affiliated with PINE Distributors LLC.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-navy-700 pt-8 md:flex md:items-center md:justify-between">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} THOR Financial Technologies, LLC. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-4 md:mt-0">
            Distributed by PINE Distributors LLC
          </p>
        </div>
      </div>
    </footer>
  );
}
