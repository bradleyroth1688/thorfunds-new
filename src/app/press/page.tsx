import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press & Media',
  description: 'THOR Funds press releases, media mentions, and news. Contact us for media inquiries.',
};

export default function PressPage() {
  return (
    <>
      <section className="gradient-navy text-white py-16 md:py-24">
        <div className="container-max mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Press & Media</h1>
          <p className="text-xl text-white/80">News, press releases, and media resources</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Latest News</h2>
              <div className="space-y-6">
                <div className="card">
                  <span className="text-xs text-gold-600 font-medium">PRESS RELEASE</span>
                  <h3 className="font-semibold text-lg mt-1 mb-2">THOR Funds Surpasses $1 Billion in AUM</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    THOR Financial Technologies announces a significant milestone as total assets under management exceed $1 billion.
                  </p>
                  <span className="text-xs text-gray-500">January 2026</span>
                </div>
                <div className="card">
                  <span className="text-xs text-gold-600 font-medium">PRESS RELEASE</span>
                  <h3 className="font-semibold text-lg mt-1 mb-2">THOR Launches THIR and THLV ETFs</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    THOR Financial Technologies launches two tactical ETFs on NYSE Arca, bringing institutional-quality risk management to all investors.
                  </p>
                  <span className="text-xs text-gray-500">September 2024</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card">
                <h3 className="font-semibold mb-4">Media Contact</h3>
                <p className="text-gray-600 text-sm mb-4">
                  For press inquiries, interview requests, or media resources, please contact:
                </p>
                <p className="text-sm">
                  <strong>Email:</strong> press@thorfunds.com
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold mb-4">Brand Assets</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Download official THOR Funds logos and brand materials.
                </p>
                <button className="btn-outline w-full text-sm">
                  Download Press Kit
                </button>
              </div>

              <div className="card bg-navy-700 text-white">
                <h3 className="font-semibold mb-2">Subscribe to Updates</h3>
                <p className="text-white/80 text-sm mb-4">
                  Get the latest THOR news delivered to your inbox.
                </p>
                <Link href="/newsletter" className="btn-primary w-full text-center text-sm">
                  Subscribe
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
