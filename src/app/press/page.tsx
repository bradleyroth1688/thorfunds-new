import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press & Media | THOR Funds',
  description: 'THOR Funds press releases, media appearances, and news. Brad Roth featured on Schwab Network, FinTech TV, InvestmentNews, and more.',
};

const mediaAppearances = [
  {
    title: "THOR Financial CIO offers a pair of systematic ETFs for a volatile market",
    outlet: "InvestmentNews",
    type: "Video",
    date: "June 2025",
    url: "https://www.investmentnews.com/videos/in-the-nasdaq/thor-financial-cio-offers-a-pair-of-systematic-etfs-for-a-volatile-market/261049",
    description: "Brad Roth sits down with InvestmentNews to highlight the systematic approach of THOR ETFs."
  },
  {
    title: "Investment Strategies for the Modern Market",
    outlet: "Zephyr - Adjusted for Risk Podcast",
    type: "Podcast",
    date: "June 2025",
    url: "https://www.youtube.com/watch?v=2UGpPVGcKBQ",
    description: "Brad Roth discusses investment strategies with Ryan Nauman of Zephyr."
  },
  {
    title: "ETF 360: THLV and THIR Deep Dive",
    outlet: "ETF.com",
    type: "Video",
    date: "May 2025",
    url: "https://www.youtube.com/watch?v=VMyrCjFoDtQ",
    description: "In-depth discussion of both THOR ETF strategies."
  },
  {
    title: "Behind the Ticker Podcast Launches on ETF.com",
    outlet: "Yahoo Finance",
    type: "Article",
    date: "January 2026",
    url: "https://finance.yahoo.com/news/thor-financial-technologies-brad-roth-130000403.html",
    description: "Announcement of Behind the Ticker podcast launching on ETF.com."
  },
  {
    title: "Using Smart Algorithms to Tackle Market Volatility",
    outlet: "FinTech TV (Live at NYSE)",
    type: "Video",
    date: "October 2024",
    url: "https://fintech.tv/thor-financial-technologies-using-smart-algorithms-to-tackle-market-volatility-with-brad-roth-founder-cio-thor-financial-technologies/",
    description: "Live at NYSE discussing algorithmic strategies for managing market volatility."
  },
  {
    title: "Market Breadth Expanding Beyond the Mag 7",
    outlet: "Schwab Network",
    type: "Video",
    date: "October 2024",
    url: "https://schwabnetwork.com/video/market-breadth-expanding-beyond-the-mag-7",
    description: "Discussion on market breadth widening beyond the Magnificent 7."
  },
  {
    title: "Rotation Out of Large Caps Healthy; Tech Reached Its Limit",
    outlet: "Schwab Network",
    type: "Video",
    date: "October 2024",
    url: "https://schwabnetwork.com/video/roth-rotation-out-of-large-caps-healthy-tech-reached-its-limit-for-now",
    description: "Brad discusses healthy rotation out of large caps and tech's current limits."
  },
  {
    title: "ETF Leaders: Brad Roth at Exchange 2023",
    outlet: "NYSE",
    type: "Video",
    date: "April 2023",
    url: "https://www.youtube.com/watch?v=nuAF3r73nIc",
    description: "NYSE's Judy Shaw interviews Brad Roth at the Exchange 2023 conference."
  },
  {
    title: "What's the Fund?: THOR Low Volatility ETF",
    outlet: "What's the Fund?",
    type: "Video",
    date: "February 2023",
    url: "https://www.youtube.com/watch?v=DxATMMej8b8",
    description: "Deep dive into the THOR Low Volatility ETF strategy."
  },
  {
    title: "Risk Management Strategies: Hard Assets and Low-Volatility ETFs",
    outlet: "Schwab Network",
    type: "Video",
    date: "April 2022",
    url: "https://schwabnetwork.com/video/risk-management-strategies-hard-assets-and-low-volatility-etfs",
    description: "Discussion on value investing, commodities, and hard assets for portfolio hedging."
  },
  {
    title: "THOR Debuts With Volatility-Focused ETF",
    outlet: "ETF.com / Yahoo Finance",
    type: "Article",
    date: "September 2022",
    url: "https://www.yahoo.com/video/thor-debuts-volatility-focused-etf-211500350.html",
    description: "Launch coverage of THLV ETF."
  },
  {
    title: "Fintech Luminaries: Meet Brad Roth",
    outlet: "DWealth News",
    type: "Article",
    date: "November 2021",
    url: "https://dwealth.news/2021/11/fintech-luminaries-meet-brad-roth-of-thor-financial-technologies/",
    description: "Profile feature on Brad Roth and THOR's mission."
  }
];

export default function PressPage() {
  return (
    <>
      <section className="gradient-navy text-white py-16 md:py-24">
        <div className="container-max mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Press & Media</h1>
          <p className="text-xl text-white/80">News, media appearances, and press resources</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Media Appearances */}
              <h2 className="text-2xl font-bold mb-6">Media Appearances</h2>
              <p className="text-gray-600 mb-8">
                Brad Roth, CIO of THOR Financial Technologies, regularly appears on leading financial media outlets to discuss market conditions, ETF strategies, and risk management.
              </p>
              
              <div className="space-y-4 mb-12">
                {mediaAppearances.map((item, index) => (
                  <a 
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card block hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                            item.type === 'Video' ? 'bg-red-100 text-red-700' :
                            item.type === 'Podcast' ? 'bg-purple-100 text-purple-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {item.type}
                          </span>
                          <span className="text-xs text-gray-500">{item.outlet}</span>
                        </div>
                        <h3 className="font-semibold text-navy-800 mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs text-gray-500">{item.date}</span>
                        <div className="text-gold-600 mt-1">→</div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Press Releases */}
              <h2 className="text-2xl font-bold mb-6">Press Releases</h2>
              <div className="space-y-4">
                <div className="card">
                  <span className="text-xs text-gold-600 font-medium">PRESS RELEASE</span>
                  <h3 className="font-semibold text-lg mt-1 mb-2">Behind the Ticker Podcast Launches on ETF.com</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    THOR Financial Technologies announces that Behind the Ticker, the established ETF-focused podcast hosted by Brad Roth, launches on ETF.com.
                  </p>
                  <span className="text-xs text-gray-500">January 2026</span>
                </div>
                <div className="card">
                  <span className="text-xs text-gold-600 font-medium">PRESS RELEASE</span>
                  <h3 className="font-semibold text-lg mt-1 mb-2">THOR Launches THIR Index Rotation ETF</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    THOR Financial Technologies launches THIR on NYSE Arca, expanding tactical ETF offerings with an index rotation strategy.
                  </p>
                  <span className="text-xs text-gray-500">September 2024</span>
                </div>
                <div className="card">
                  <span className="text-xs text-gold-600 font-medium">PRESS RELEASE</span>
                  <h3 className="font-semibold text-lg mt-1 mb-2">THOR Debuts THLV Low Volatility ETF</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    THOR Financial Technologies launches THLV on NYSE Arca, bringing institutional-quality low volatility strategies to all investors.
                  </p>
                  <span className="text-xs text-gray-500">September 2022</span>
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
                  <strong>Phone:</strong> 1-800-974-6964<br />
                  <strong>Email:</strong> info@thorfunds.com
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold mb-4">Featured Outlets</h3>
                <div className="flex flex-wrap gap-2">
                  {['Schwab Network', 'InvestmentNews', 'ETF.com', 'FinTech TV', 'NYSE', 'Yahoo Finance'].map((outlet) => (
                    <span key={outlet} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {outlet}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="font-semibold mb-4">Podcast</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Listen to Behind the Ticker, Brad Roth's ETF-focused podcast featuring industry leaders.
                </p>
                <Link href="/podcast" className="btn-outline w-full text-center text-sm">
                  Listen Now
                </Link>
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
