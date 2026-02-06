import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the team behind THOR Funds. Led by Brad Roth, our team combines market expertise with engineering principles to deliver risk-managed ETF strategies.",
};

export default function TeamPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 py-16 lg:py-20">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">Our Team</h1>
            <p className="mt-4 text-xl text-gray-300">
              Market experts, PhDs, and engineers working together to deliver risk-managed investing.
            </p>
          </div>
        </div>
      </section>

      {/* Brad Roth Profile */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1">
                <div className="rounded-2xl overflow-hidden aspect-square">
                  <Image
                    src="/images/brad-roth-headshot.jpg"
                    alt="Brad Roth - Founder & CIO of THOR Funds"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="mt-6 flex gap-4 justify-center">
                  <a
                    href="https://twitter.com/Bradr_thor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gold-500 transition-colors"
                    title="Twitter/X"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/in/bradroth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gold-500 transition-colors"
                    title="LinkedIn"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com/thor.funds"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gold-500 transition-colors"
                    title="Instagram"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold text-navy-800">Brad Roth</h2>
                <p className="text-gold-600 font-medium mt-1">Founder & Chief Investment Officer</p>
                
                <div className="mt-6 prose prose-navy max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    Brad Roth is the founder and Chief Investment Officer of THOR Financial Technologies. With over two decades of experience in quantitative investing and risk management, Brad has dedicated his career to developing systematic approaches that help investors navigate volatile markets.
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    Brad&apos;s background combines deep expertise in finance with principles from engineering and physics. He recognized early in his career that traditional Modern Portfolio Theory—while academically elegant—fails investors precisely when they need protection most: during market crises.
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    This insight led Brad to develop THOR&apos;s signature approach: using digital signal processing to identify market regime changes in real time. The methodology, inspired by the same science behind noise-canceling headphones, allows THOR&apos;s strategies to dynamically adjust positioning based on actual market conditions rather than predictions or forecasts.
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    Under Brad&apos;s leadership, THOR has grown with robust model offerings across two tactical ETFs and serves financial advisors across the country. He hosts the &quot;Behind the Ticker&quot; podcast, where he interviews leaders in the ETF and wealth management industry.
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-navy-800 mb-4">Key Responsibilities</h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {[
                      "Investment strategy development",
                      "Portfolio risk management",
                      "Signal research & development",
                      "Advisor relationships",
                      "Product development",
                      "Thought leadership",
                    ].map((item) => (
                      <li key={item} className="flex items-center text-gray-600">
                        <svg className="h-5 w-5 text-gold-500 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Philosophy */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy-800">Our Team Philosophy</h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              THOR is built on the principle that the best investment strategies combine rigorous quantitative analysis with practical market experience. Our team includes market experts, PhDs in quantitative fields, and engineers who bring diverse perspectives to solving the challenge of risk management.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              We believe in transparency, continuous improvement, and putting our clients&apos; interests first. Every member of our team is committed to our mission: helping investors participate in market upside while protecting against significant drawdowns.
            </p>
          </div>
        </div>
      </section>

      {/* Distribution */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-800 text-center mb-8">Distribution Partner</h2>
            <div className="bg-navy-50 rounded-xl p-8 text-center">
              <h3 className="text-xl font-semibold text-navy-800">PINE Distributors LLC</h3>
              <p className="mt-4 text-gray-600">
                THOR ETFs are distributed by PINE Distributors LLC, providing institutional-quality distribution and support to financial advisors and their clients across the country.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy-800">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-white">Get in Touch</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Have questions about THOR or want to discuss how our strategies might fit your portfolio? We&apos;d love to hear from you.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
            <Link href="/resources/advisors" className="btn-outline border-white text-white hover:bg-white hover:text-navy-800">
              Advisor Resources
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
