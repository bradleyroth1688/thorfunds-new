import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press & Media | THOR Funds",
  description: "Media coverage, press releases, and news about THOR Funds and our adaptive ETF strategies.",
  openGraph: {
    title: "Press & Media | THOR Funds",
    description: "News and media coverage about THOR Funds.",
  },
};

const pressReleases = [
  {
    date: "September 2024",
    title: "THOR Funds Launches THIR ETF",
    description: "THOR Financial Technologies announces the launch of THIR, an adaptive index rotation ETF designed to provide risk-managed equity exposure.",
    link: "#",
  },
  {
    date: "September 2024",
    title: "THOR Funds Launches THLV ETF",
    description: "THOR Financial Technologies introduces THLV, an equal-weight low volatility ETF with dynamic sector allocation capabilities.",
    link: "#",
  },
];

const mediaFeatures = [
  {
    outlet: "ETF.com",
    title: "New ETF Launches: THIR and THLV Enter the Adaptive Space",
    date: "October 2024",
    link: "#",
  },
  {
    outlet: "Citywire",
    title: "The Case for Adaptive ETFs in Modern Portfolios",
    date: "November 2024",
    link: "#",
  },
];

export default function PressPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-16 lg:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Press & Media</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              News, press releases, and media coverage about THOR Funds and our 
              innovative approach to risk-managed investing.
            </p>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 mb-8">Press Releases</h2>
          
          <div className="space-y-6 max-w-4xl">
            {pressReleases.map((release, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6">
                <span className="text-sm text-gold-600 font-medium">{release.date}</span>
                <h3 className="text-xl font-semibold text-navy-800 mt-2">{release.title}</h3>
                <p className="text-gray-600 mt-2">{release.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 mb-8">Media Coverage</h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {mediaFeatures.map((feature, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <span className="text-sm text-gray-500">{feature.outlet}</span>
                <h3 className="text-lg font-semibold text-navy-800 mt-1">{feature.title}</h3>
                <span className="text-sm text-gray-400 block mt-2">{feature.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Podcast */}
      <section className="section-padding bg-navy-800 text-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Behind the Ticker Podcast</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Brad Roth interviews entrepreneurs and experts in the wealth management industry. 
              90+ episodes and growing.
            </p>
            <Link href="/insights" className="btn-primary">
              Listen to the Podcast
            </Link>
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy-800 mb-6">Media Inquiries</h2>
            <p className="text-gray-600 mb-8">
              For press inquiries, interview requests, or media kit access, please contact us.
            </p>
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-8">Brand Assets</h2>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-navy-800 mb-4">Logo & Brand Guidelines</h3>
              <p className="text-gray-600 mb-6">
                Need our logo or brand assets for a story? Download our media kit with 
                high-resolution logos and brand guidelines.
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-navy-800 rounded-lg p-4">
                  <span className="text-gold-400 font-bold">THOR</span>
                  <span className="text-white ml-1">FUNDS</span>
                </div>
                <p className="text-sm text-gray-500">
                  Primary colors: Navy (#1a365d) + Gold (#d69e2e)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
