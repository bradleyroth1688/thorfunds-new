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
    { name: "What is an ETF?", href: "/learn/what-is-an-etf" },
    { name: "How ETFs Work", href: "/learn/how-etfs-work" },
    { name: "Index Rotation", href: "/learn/index-rotation-explained" },
    { name: "Low Volatility Investing", href: "/learn/low-volatility-investing" },
    { name: "Glossary", href: "/learn/glossary" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Contact", href: "/contact" },
    { name: "Newsletter", href: "/newsletter" },
    { name: "For Advisors", href: "/resources/advisors" },
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
            <p className="text-sm text-gray-400 max-w-xs">
              Risk-managed ETFs designed to participate in market upside while protecting against significant drawdowns.
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
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white">Legal</h3>
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
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 border-t border-navy-700 pt-8">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong>Important Disclosures:</strong> Investors should consider the investment objectives, risks, charges, and expenses carefully before investing. The prospectus contains this and other information about the funds. Please read the prospectus carefully before investing. Investing involves risk, including the possible loss of principal. Past performance does not guarantee future results. ETF shares are bought and sold at market price (not NAV) and are not individually redeemed from the fund. THOR ETFs are distributed by PINE Distributors LLC.
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
