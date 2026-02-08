import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description: "Access THOR Funds resources including advisor materials, fund documents, FAQ, and educational content for financial professionals.",
};

const resources = [
  {
    title: "For Advisors",
    description: "Model portfolios, due diligence materials, and resources designed specifically for RIAs and financial advisors.",
    href: "/resources/advisors",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: "Fund Documents",
    description: "Prospectuses, fact sheets, SAIs, annual reports, and other regulatory documents for our ETFs.",
    href: "/resources/documents",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: "FAQ",
    description: "Answers to frequently asked questions about our strategies, ETFs, and investment process.",
    href: "/resources/faq",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-navy-800 py-16 lg:py-20">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">Resources</h1>
            <p className="mt-4 text-xl text-gray-300">
              Access documents, tools, and materials to help you understand and implement THOR&apos;s strategies.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center text-gold-600 mb-6">
                  {resource.icon}
                </div>
                <h2 className="text-xl font-semibold text-navy-800 group-hover:text-gold-600 transition-colors">
                  {resource.title}
                </h2>
                <p className="mt-3 text-gray-600">{resource.description}</p>
                <span className="mt-4 inline-flex items-center text-gold-600 font-medium">
                  Explore
                  <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-bold text-navy-800">Need Something Specific?</h2>
          <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            Can&apos;t find what you&apos;re looking for? Contact us and we&apos;ll help you find the right resources.
          </p>
          <Link href="/contact" className="mt-6 inline-block btn-primary">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
