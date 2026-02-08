import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Join THOR Funds",
  description: "Join the THOR Funds team. We're building the future of risk-managed investing and looking for talented individuals.",
  openGraph: {
    title: "Careers | THOR Funds",
    description: "Career opportunities at THOR Funds.",
  },
};

const openPositions = [
  {
    title: "ETF Sales Specialist",
    location: "Remote / Pittsburgh, PA",
    type: "Full-time",
    description: "Drive ETF distribution and build relationships with financial advisors and RIAs. Experience in ETF sales required.",
  },
];

const benefits = [
  "Competitive compensation",
  "Health, dental, and vision insurance",
  "401(k) with company match",
  "Flexible remote work",
  "Professional development",
  "Industry conference attendance",
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-16 lg:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Join THOR Funds</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              We&apos;re building the future of risk-managed investing. Join a team of 
              market experts, PhDs, and engineers working to solve the industry&apos;s 
              hardest problems.
            </p>
          </div>
        </div>
      </section>

      {/* Why THOR */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-12">Why Work at THOR?</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-2">Innovative Technology</h3>
              <p className="text-gray-600">
                Work with cutting-edge signal processing and quantitative methods that challenge 
                conventional financial thinking.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-2">Small Team, Big Impact</h3>
              <p className="text-gray-600">
                Your work directly impacts how advisors manage billions in client assets. 
                No bureaucracy, no red tape.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-2">Growth Stage</h3>
              <p className="text-gray-600">
                Join at a pivotal moment as we scale from $1B to the next level. 
                Grow your career as the company grows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-4">Open Positions</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Current opportunities to join the THOR team
          </p>

          <div className="max-w-3xl mx-auto space-y-4">
            {openPositions.length > 0 ? (
              openPositions.map((position, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-navy-800">{position.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="text-sm text-gray-500">{position.location}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-500">{position.type}</span>
                      </div>
                      <p className="text-gray-600 mt-3">{position.description}</p>
                    </div>
                    <Link href="/contact" className="btn-primary text-sm whitespace-nowrap">
                      Apply Now
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl p-8 text-center">
                <p className="text-gray-600">
                  No open positions at the moment. Check back soon or reach out to express interest.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-navy-800 text-white">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits & Perks</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="bg-gold-500 rounded-full p-1">
                  <svg className="w-4 h-4 text-navy-900" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-gold-400 to-gold-500">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-navy-800 mb-4">Don&apos;t See the Right Role?</h2>
          <p className="text-lg text-navy-700/80 max-w-2xl mx-auto mb-8">
            We&apos;re always looking for talented people. Send us your resume and tell us 
            how you can contribute to THOR.
          </p>
          <Link href="/contact" className="btn-secondary">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
