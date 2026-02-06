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
        a: "THOR uses digital signal processing—the same science behind noise-canceling headphones—to identify market regime changes in real time. Rather than predicting markets, we react to conditions as they change, with the ability to move to cash when all signals turn negative.",
      },
      {
        q: "How much does THOR manage?",
        a: "THOR Financial Technologies manages over $1.1 billion in assets across our strategies, including ETFs and separately managed accounts.",
      },
      {
        q: "Who is THOR designed for?",
        a: "Our ETFs are designed for financial advisors and their clients who want risk-managed equity exposure. They can be used as satellite allocations (THIR) or core equity holdings (THLV) within diversified portfolios.",
      },
    ],
  },
  {
    category: "The ETFs",
    questions: [
      {
        q: "What's the difference between THIR and THLV?",
        a: "THIR (Index Rotation) tactically rotates between three major U.S. equity indexes—SPY, DIA, and QQQ—and is best used as a satellite allocation. THLV (Low Volatility) equal-weights 10 S&P 500 sectors and is designed as a core equity holding. Both can move to 100% cash when conditions warrant.",
      },
      {
        q: "Can THOR's ETFs really go to 100% cash?",
        a: "Yes. Unlike traditional index funds that must stay invested, both THIR and THLV have the ability to move entirely to short-term treasuries (BIL) when all of our risk signals turn negative. This provides protection that passive strategies cannot offer.",
      },
      {
        q: "How often do the portfolios rebalance?",
        a: "Both strategies are evaluated every Monday after market close. If changes are warranted, they're executed on Wednesday at the close. This gives time for custom basket creations for ETF tax purposes.",
      },
      {
        q: "What are the expense ratios?",
        a: "Please refer to each fund's prospectus for the most current expense ratio information. You can access prospectuses on our Documents page.",
      },
    ],
  },
  {
    category: "The Strategy",
    questions: [
      {
        q: "How do your risk signals work?",
        a: "We use digital signal processing techniques—including the True Strength Index and Ehlers High-Pass Filter—to convert noisy price data into smooth waveforms. From these, we identify trend direction and momentum to generate risk-on/risk-off signals for each asset we monitor.",
      },
      {
        q: "Isn't this just market timing?",
        a: "We prefer to call it 'regime detection' rather than market timing. We're not trying to predict where markets will go—we're identifying when market conditions have changed and adjusting positioning accordingly. We don't claim to catch tops or bottoms perfectly.",
      },
      {
        q: "What happens if the signals are wrong?",
        a: "No strategy is perfect. Our signals can whipsaw in choppy, directionless markets—particularly when moves are in the 10-15% range. We're transparent about this limitation. The strategy works best during clear trends and severe drawdowns (15%+).",
      },
      {
        q: "How does THOR compare to traditional low volatility ETFs?",
        a: "Traditional low vol ETFs (like SPLV or USMV) use backward-looking beta to select stocks and must stay invested at all times. THLV uses forward-looking risk signals, equal-weights sectors for better upside capture, and can go to cash when needed—providing protection traditional low vol can't.",
      },
    ],
  },
  {
    category: "Implementation",
    questions: [
      {
        q: "How do I buy THOR ETFs?",
        a: "THIR and THLV trade on major exchanges and are available through most brokerages and custodians. Simply search for the ticker symbol and place your order like any other stock or ETF.",
      },
      {
        q: "Are there any minimum investments?",
        a: "As ETFs, you can purchase as little as one share. There are no minimum investment requirements beyond the price of a single share.",
      },
      {
        q: "How should I position THOR in a portfolio?",
        a: "THIR works best as a 5-20% satellite allocation alongside traditional long-only equity. THLV can serve as a core equity holding, replacing or complementing passive large-cap exposure. We recommend discussing portfolio construction with a financial advisor.",
      },
      {
        q: "Do you offer model portfolios?",
        a: "Yes, we provide sample model portfolio allocations for advisors. Contact us or visit our Advisor Resources page for more information.",
      },
    ],
  },
  {
    category: "Performance & Risk",
    questions: [
      {
        q: "What kind of returns should I expect?",
        a: "We don't make return predictions. Our goal is to participate in market upside while protecting against significant drawdowns. Over time, we aim to deliver competitive risk-adjusted returns with lower maximum drawdowns than the market.",
      },
      {
        q: "What's your track record?",
        a: "The ETFs launched in 2024, but the underlying strategies have been managed in SMA format since 2020. Please see each fund's performance page for historical returns and the prospectus for important disclosures about hypothetical performance.",
      },
      {
        q: "How does THOR perform in different market environments?",
        a: "THOR tends to excel during severe drawdowns (15%+) and quick selloffs. It may underperform during steady, low-volatility uptrends or choppy sideways markets. See our Learn section for detailed discussion of different market environments.",
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
