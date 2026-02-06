import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers at THOR Funds',
  description: 'Join the THOR Funds team. We are looking for talented individuals who share our passion for systematic investing and helping advisors build better portfolios.',
};

export default function CareersPage() {
  return (
    <>
      <section className="gradient-navy text-white py-16 md:py-24">
        <div className="container-max mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Help us build the future of tactical investing. We're looking for talented individuals 
            who want to make a real impact.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Why Work at THOR?</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="card">
                <h3 className="font-semibold mb-2">🚀 Make an Impact</h3>
                <p className="text-sm text-gray-600">Work on products that help advisors and investors manage risk better.</p>
              </div>
              <div className="card">
                <h3 className="font-semibold mb-2">🔬 Science-Driven</h3>
                <p className="text-sm text-gray-600">Apply cutting-edge signal processing and quantitative methods.</p>
              </div>
              <div className="card">
                <h3 className="font-semibold mb-2">📈 Growth Stage</h3>
                <p className="text-sm text-gray-600">$1.1B AUM and growing. Join during an exciting expansion phase.</p>
              </div>
              <div className="card">
                <h3 className="font-semibold mb-2">🤝 Great Culture</h3>
                <p className="text-sm text-gray-600">Collaborative team with a no-nonsense, results-oriented approach.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
            <div className="space-y-4 mb-12">
              <div className="card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-navy-700">ETF Sales Specialist</h3>
                    <p className="text-sm text-gray-600 mt-1">Pittsburgh, PA • Full-time</p>
                  </div>
                  <span className="bg-gold-100 text-gold-700 px-3 py-1 rounded-full text-xs font-medium">Now Hiring</span>
                </div>
                <p className="text-gray-600 text-sm mt-3">
                  Join our distribution team to help bring THOR's tactical ETF strategies to financial advisors nationwide.
                </p>
                <Link href="/contact" className="text-navy-700 font-medium text-sm mt-3 inline-block hover:text-gold-600">
                  Apply Now →
                </Link>
              </div>
            </div>

            <div className="card bg-gray-50">
              <h2 className="text-xl font-bold mb-4">Don't See Your Role?</h2>
              <p className="text-gray-600 mb-4">
                We're always looking for exceptional talent. If you're passionate about systematic investing 
                and think you could contribute to our mission, we'd love to hear from you.
              </p>
              <Link href="/contact" className="btn-primary">
                Send Us Your Resume
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
