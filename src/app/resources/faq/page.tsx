import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about THOR Funds' ETFs, investment strategies, and risk management approach.",
};

const faqs = [
  {
    category: "About THOR",
    questions: [
      {
        q: "What is THOR's investment philosophy?",
        a: "THOR uses digital signal processing, the same science behind noise-canceling headphones, to identify market regime changes in real time. Rather than predicting markets, we react to conditions as they change, with the ability to move to cash when signals turn negative.",
      },
      {
        q: "How much does THOR manage?",
        a: "THOR Financial Technologies offers robust model offerings across three adaptive ETFs and separately managed accounts.",
      },
      {
        q: "Who is THOR designed for?",
        a: "Our ETFs are designed for financial advisors and their clients who want risk-managed exposure. THOR SDQ Index Rotation ETF is often used as a satellite sleeve, THOR Low Volatility ETF can serve as a core equity sleeve, and THOR AdaptiveRisk Dynamic ETF is designed as a multi-asset diversifier.",
      },
    ],
  },
  {
    category: "The ETFs",
    questions: [
      {
        q: "How do the THOR ETFs differ?",
        a: "THOR SDQ Index Rotation ETF rotates between three major U.S. equity indexes, THOR Low Volatility ETF equal-weights ten S&P 500 sectors with adaptive de-risking, and THOR AdaptiveRisk Dynamic ETF is a coming-soon multi-strategy, multi-asset ETF with dynamic allocation across equities, fixed income, commodities, and alternatives.",
      },
      {
        q: "What is THOR AdaptiveRisk Dynamic ETF?",
        a: "THOR AdaptiveRisk Dynamic ETF is a coming-soon fund designed to dynamically allocate across multiple strategies and asset classes. It is intended to complement equity-only allocations and can shift from fully invested to defensive cash positioning as market conditions change.",
      },
      {
        q: "Can THOR's ETFs really go to 100% cash?",
        a: "Yes. THOR SDQ Index Rotation ETF and THOR Low Volatility ETF can move entirely to short-term treasuries when all relevant signals turn negative. THOR AdaptiveRisk Dynamic ETF is also designed with 0-100% defensive cash flexibility after launch.",
      },
      {
        q: "How often do the portfolios rebalance?",
        a: "The live strategies are evaluated every Monday after market close. If changes are warranted, they are executed on Wednesday at the close.",
      },
      {
        q: "What are the expense ratios?",
        a: "Please refer to each fund prospectus for current expense ratios. For THOR AdaptiveRisk Dynamic ETF, the expense ratio will be posted once launch documents are finalized.",
      },
    ],
  },
  {
    category: "Implementation",
    questions: [
      {
        q: "How do I buy THOR ETFs?",
        a: "THOR SDQ Index Rotation ETF and THOR Low Volatility ETF trade on major exchanges and are available through most brokerages and custodians. THOR AdaptiveRisk Dynamic ETF will be available after launch.",
      },
      {
        q: "How should I position THOR in a portfolio?",
        a: "Many advisors use THOR SDQ Index Rotation ETF as a 5-20% satellite sleeve, THOR Low Volatility ETF as a core defensive equity sleeve, and THOR AdaptiveRisk Dynamic ETF as a moderate-risk multi-asset diversifier or alternative sleeve.",
      },
    ],
  },
  {
    category: "Performance & Risk",
    questions: [
      {
        q: "What kind of returns should I expect?",
        a: "We do not make return predictions. Our objective is to participate in market upside while improving downside mitigation during severe drawdowns.",
      },
      {
        q: "What's your track record?",
        a: "The live ETFs launched in 2024. THOR AdaptiveRisk Dynamic ETF is coming soon and does not yet have live fund performance.",
      },
      {
        q: "How does THOR perform in different market environments?",
        a: "THOR's adaptive process is designed to respond across market regimes. It may underperform in some steady uptrends or choppy ranges and may improve downside mitigation during larger dislocations.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <section className="bg-navy-800 py-16 lg:py-20">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">Frequently Asked Questions</h1>
            <p className="mt-4 text-xl text-gray-300">
              Find answers to common questions about THOR&apos;s strategies, ETFs, and investment process.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide max-w-4xl">
          {faqs.map((section) => (
            <div key={section.category} className="mb-12 last:mb-0">
              <h2 className="text-2xl font-bold text-navy-800 mb-6">{section.category}</h2>
              <div className="space-y-6">
                {section.questions.map((faq, i) => (
                  <div key={i} className="border-b border-gray-100 pb-6">
                    <h3 className="text-lg font-semibold text-navy-800">{faq.q}</h3>
                    <p className="mt-3 text-gray-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-bold text-navy-800">Still Have Questions?</h2>
          <p className="mt-2 text-gray-600">
            We&apos;re happy to help. Reach out and we&apos;ll get back to you.
          </p>
          <Link href="/contact" className="mt-6 inline-block btn-primary">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
