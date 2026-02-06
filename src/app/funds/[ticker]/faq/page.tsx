import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FUNDS } from "@/lib/api";

interface FundFAQPageProps {
  params: Promise<{ ticker: string }>;
}

export async function generateStaticParams() {
  return Object.keys(FUNDS).map((ticker) => ({
    ticker: ticker.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: FundFAQPageProps): Promise<Metadata> {
  const { ticker } = await params;
  const fund = FUNDS[ticker.toUpperCase()];
  
  if (!fund) {
    return { title: "FAQ Not Found" };
  }

  return {
    title: `${fund.ticker} FAQ - Frequently Asked Questions`,
    description: `Common questions about ${fund.name}. Learn about the strategy, risks, and how ${fund.ticker} fits into portfolios.`,
  };
}

const commonFAQs = {
  THIR: [
    {
      q: "What is THIR's investment objective?",
      a: "THIR seeks to provide capital appreciation with downside protection by investing in a portfolio of U.S. equity index ETFs based on our proprietary risk signals.",
    },
    {
      q: "Which indexes does THIR rotate between?",
      a: "THIR rotates between three major U.S. equity indexes: the S&P 500 (SPY), Dow Jones Industrial Average (DIA), and Nasdaq 100 (QQQ).",
    },
    {
      q: "How often does THIR rebalance?",
      a: "THIR's signals are evaluated every Monday after market close. Any portfolio adjustments are executed on Wednesday at market close to allow for proper basket creation.",
    },
    {
      q: "Can THIR go to 100% cash?",
      a: "Yes. When all three indexes turn risk-off, THIR can allocate 100% to short-duration treasuries (BIL). This is a key differentiator from passive index funds.",
    },
    {
      q: "What happens when one index goes risk-off?",
      a: "When the first index goes risk-off, THIR remains 100% invested in the remaining two indexes (50% each). Cash allocation only begins when the second index goes risk-off.",
    },
    {
      q: "What is THIR's expense ratio?",
      a: "Please refer to the prospectus for current expense ratio information. You can find it on our Documents page.",
    },
    {
      q: "How should THIR be used in a portfolio?",
      a: "THIR is designed as satellite equity exposure alongside existing long-only holdings. It provides adaptive risk management that complements core positions.",
    },
    {
      q: "What are the risks of investing in THIR?",
      a: "THIR is subject to market risk, timing risk, and the risk that signals may not accurately predict market movements. Please read the prospectus for a complete list of risk factors.",
    },
  ],
  THLV: [
    {
      q: "What is THLV's investment objective?",
      a: "THLV seeks to provide exposure to U.S. large-cap equities while lowering volatility by avoiding sectors in down-trending cycles.",
    },
    {
      q: "Which sectors does THLV invest in?",
      a: "THLV monitors 10 of the 11 S&P 500 sectors (excluding Communications) using sector SPDRs: XLB, XLE, XLF, XLI, XLK, XLP, XLV, XLU, XLY, and XLRE.",
    },
    {
      q: "How does THLV's equal-weight approach work?",
      a: "Unlike cap-weighted low-vol funds, THLV gives equal weight to each sector that's risk-on. This prevents concentration in any single sector.",
    },
    {
      q: "How often does THLV rebalance?",
      a: "THLV's signals are evaluated every Monday after market close. Portfolio adjustments are executed on Wednesday at market close.",
    },
    {
      q: "Can THLV go to 100% cash?",
      a: "Yes. When all sectors turn risk-off, THLV can allocate 100% to short-duration treasuries. This is unique among low-volatility ETFs.",
    },
    {
      q: "How does sector rotation work in THLV?",
      a: "When sectors go risk-off, they're sold and weight is redistributed equally among remaining sectors. Once only 5 sectors remain (20% each), additional risk-off sectors trigger cash allocation.",
    },
    {
      q: "How is THLV different from other low-vol ETFs?",
      a: "THLV is the only equal-weight low-vol ETF we're aware of. It can also go to 100% cash, unlike passive low-vol funds like SPLV or USMV that must stay fully invested.",
    },
    {
      q: "What are the risks of investing in THLV?",
      a: "THLV is subject to market risk, sector concentration risk, and timing risk. Please read the prospectus for a complete list of risk factors.",
    },
  ],
};

export default async function FundFAQPage({ params }: FundFAQPageProps) {
  const { ticker } = await params;
  const fund = FUNDS[ticker.toUpperCase()];

  if (!fund) {
    notFound();
  }

  const faqs = commonFAQs[ticker.toUpperCase() as keyof typeof commonFAQs] || [];

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 py-12">
        <div className="container-wide">
          <nav className="text-sm mb-4">
            <Link href="/funds" className="text-white/60 hover:text-white">Funds</Link>
            <span className="mx-2 text-white/40">/</span>
            <Link href={`/funds/${ticker}`} className="text-white/60 hover:text-white">{fund.ticker}</Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-white/80">FAQ</span>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-gold-500">{fund.ticker}</span>
            <h1 className="text-2xl font-semibold text-white">Frequently Asked Questions</h1>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding bg-white">
        <div className="container-wide max-w-4xl">
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-navy-800 mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-navy-800 rounded-xl p-8 text-white">
            <h3 className="text-xl font-semibold mb-4">Still Have Questions?</h3>
            <p className="text-gray-300 mb-6">
              Our team is here to help. Contact us for additional information about {fund.ticker}.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                Contact Us
              </Link>
              <Link href={`/funds/${ticker}/documents`} className="btn-outline border-white text-white hover:bg-white hover:text-navy-800">
                View Documents
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-navy-800 mb-6">More About {fund.ticker}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href={`/funds/${ticker}`} className="card-hover">
              <h3 className="font-semibold text-navy-700">Fund Overview</h3>
              <p className="text-sm text-gray-600 mt-2">Key stats, performance, and strategy details.</p>
            </Link>
            <Link href={`/funds/${ticker}/holdings`} className="card-hover">
              <h3 className="font-semibold text-navy-700">Current Holdings</h3>
              <p className="text-sm text-gray-600 mt-2">See what {fund.ticker} currently holds.</p>
            </Link>
            <Link href={`/funds/${ticker}/performance`} className="card-hover">
              <h3 className="font-semibold text-navy-700">Performance</h3>
              <p className="text-sm text-gray-600 mt-2">Historical returns and risk metrics.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
