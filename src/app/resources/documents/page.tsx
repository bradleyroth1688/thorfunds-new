import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documents Library - Prospectuses & Reports',
  description: 'Download THOR Funds documents including prospectuses, fact sheets, annual reports, and regulatory filings.',
};

const documents = {
  thir: [
    { name: 'Prospectus', type: 'PDF' },
    { name: 'Summary Prospectus', type: 'PDF' },
    { name: 'SAI', type: 'PDF' },
    { name: 'Fact Sheet', type: 'PDF' },
    { name: 'Annual Report', type: 'PDF' },
  ],
  thlv: [
    { name: 'Prospectus', type: 'PDF' },
    { name: 'Summary Prospectus', type: 'PDF' },
    { name: 'SAI', type: 'PDF' },
    { name: 'Fact Sheet', type: 'PDF' },
    { name: 'Annual Report', type: 'PDF' },
  ],
};

export default function DocumentsPage() {
  return (
    <>
      <section className="gradient-navy text-white py-12">
        <div className="container-max mx-auto px-4 md:px-8">
          <nav className="text-sm mb-4">
            <Link href="/resources" className="text-white/60 hover:text-white">Resources</Link>
            <span className="mx-2 text-white/40">/</span>
            <span>Documents</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold">Documents Library</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max mx-auto">
          <div className="bg-gold-50 border border-gold-200 rounded-xl p-6 mb-8">
            <p className="text-sm text-gray-700">
              <strong>Important:</strong> Before investing, carefully consider the fund's investment objectives, 
              risks, charges, and expenses. This information is available in the prospectus.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* THIR Documents */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">THIR - Index Rotation ETF</h2>
              <div className="space-y-3">
                {documents.thir.map((doc) => (
                  <div key={doc.name} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">{doc.name}</span>
                    </div>
                    <button className="text-sm text-navy-700 hover:text-gold-600 font-medium">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* THLV Documents */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">THLV - Low Volatility ETF</h2>
              <div className="space-y-3">
                {documents.thlv.map((doc) => (
                  <div key={doc.name} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">{doc.name}</span>
                    </div>
                    <button className="text-sm text-navy-700 hover:text-gold-600 font-medium">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/resources" className="btn-outline">
              ← Back to Resources
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
