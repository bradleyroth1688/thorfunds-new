import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Investment Tools | Free Calculators & Quizzes",
  description: "Free investment tools including risk profile assessment and fund comparison. Make smarter investment decisions with THOR Funds.",
};

const tools = [
  {
    name: "Risk Profile Quiz",
    description: "Discover your investment risk tolerance in 5 minutes and get personalized fund recommendations.",
    href: "/tools/risk-profile",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    badge: "Popular",
    time: "5 min",
  },
  {
    name: "Fund Comparison",
    description: "Compare THIR and THLV side-by-side. See performance, strategy, and find the right fit for your portfolio.",
    href: "/funds/compare",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    time: "Quick look",
  },
];

export default function ToolsPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-16">
        <div className="container-wide">
          <Breadcrumbs 
            items={[{ name: "Tools", url: "/tools" }]}
            className="mb-6 text-white/70"
          />
          <h1 className="display-2 mb-4">Investment Tools</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Free tools to help you make smarter investment decisions. No sign-up required.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <Link
                key={index}
                href={tool.href}
                className="card-interactive group relative"
              >
                {tool.badge && (
                  <span className="absolute top-4 right-4 badge-gold">
                    {tool.badge}
                  </span>
                )}
                <div className="w-14 h-14 bg-gold-100 dark:bg-gold-500/20 rounded-xl flex items-center justify-center text-gold-600 dark:text-gold-400 mb-4 group-hover:scale-110 transition-transform">
                  {tool.icon}
                </div>
                <h2 className="text-xl font-semibold text-navy-800 dark:text-white mb-2 group-hover:text-gold-600 dark:group-hover:text-gold-500 transition-colors">
                  {tool.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {tool.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {tool.time}
                </div>
                <div className="mt-4 text-gold-600 dark:text-gold-500 font-medium flex items-center">
                  Get Started
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Educational CTA */}
      <section className="section-padding bg-gray-50 dark:bg-navy-800">
        <div className="container-narrow text-center">
          <h2 className="heading-2 text-navy-800 dark:text-white mb-4">
            New to Investing?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Start with our educational content to understand the basics of ETFs, risk management, and adaptive investing.
          </p>
          <Link href="/learn" className="btn-primary">
            Visit Learning Center
          </Link>
        </div>
      </section>
    </>
  );
}
