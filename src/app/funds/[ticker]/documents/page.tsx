export const dynamic = "force-dynamic";

import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FUNDS } from "@/lib/api";

interface DocumentsPageProps {
  params: Promise<{ ticker: string }>;
}

export async function generateStaticParams() {
  return Object.keys(FUNDS).map((ticker) => ({
    ticker: ticker.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: DocumentsPageProps): Promise<Metadata> {
  const { ticker } = await params;
  const fund = FUNDS[ticker.toUpperCase()];
  
  if (!fund) {
    return { title: "Fund Not Found" };
  }

  return {
    title: `${fund.ticker} Documents`,
    description: `Download prospectus, fact sheets, SAI, and other regulatory documents for ${fund.name} (${fund.ticker}).`,
  };
}

const documents = [
  {
    name: "Prospectus",
    description: "Complete information about the fund's investment objectives, strategies, risks, and fees.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    name: "Statement of Additional Information (SAI)",
    description: "Supplementary information about the fund's operations, policies, and practices.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    name: "Fact Sheet",
    description: "A concise summary of the fund's key characteristics, performance, and holdings.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    name: "Annual Report",
    description: "Comprehensive review of the fund's performance, holdings, and financial statements.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
  },
  {
    name: "Semi-Annual Report",
    description: "Mid-year update on fund performance, holdings, and financial condition.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
  },
];

export default async function DocumentsPage({ params }: DocumentsPageProps) {
  const { ticker } = await params;
  const fund = FUNDS[ticker.toUpperCase()];

  if (!fund) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 py-12">
        <div className="container-wide">
          <nav className="flex items-center text-sm text-gray-400 mb-4">
            <Link href="/funds" className="hover:text-gold-500">Funds</Link>
            <span className="mx-2">/</span>
            <Link href={`/funds/${ticker}`} className="hover:text-gold-500">{fund.ticker}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Documents</span>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-gold-500">{fund.ticker}</span>
            <h1 className="text-2xl font-semibold text-white">Documents</h1>
          </div>
          <p className="mt-2 text-gray-300">{fund.name}</p>
        </div>
      </section>

      {/* Documents Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <p className="text-gray-600 mb-8">
            Please read the prospectus carefully before investing. The prospectus contains important information about fees, risks, and investment objectives.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <div key={doc.name} className="card hover:shadow-lg transition-shadow">
                <div className="text-gold-600 mb-4">{doc.icon}</div>
                <h3 className="text-lg font-semibold text-navy-800">{doc.name}</h3>
                <p className="mt-2 text-sm text-gray-600">{doc.description}</p>
                <button className="mt-4 inline-flex items-center text-gold-600 font-medium text-sm hover:text-gold-700">
                  <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download PDF
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-navy-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-navy-800 mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If you have questions about any of these documents or need additional information, please contact us.
            </p>
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Back to Fund */}
      <section className="bg-gray-50 py-8">
        <div className="container-wide flex flex-wrap gap-4 justify-center">
          <Link href={`/funds/${ticker}`} className="btn-secondary">
            Back to {fund.ticker} Overview
          </Link>
          <Link href={`/funds/${ticker}/holdings`} className="btn-outline">
            View Holdings
          </Link>
          <Link href={`/funds/${ticker}/performance`} className="btn-outline">
            View Performance
          </Link>
        </div>
      </section>
    </>
  );
}
