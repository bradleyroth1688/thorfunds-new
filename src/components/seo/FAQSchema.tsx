/**
 * FAQ Schema - JSON-LD for FAQ sections
 * Optimized for Google Rich Results FAQ snippets
 */

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
  pageUrl?: string;
}

export function FAQSchema({ faqs, pageUrl }: FAQSchemaProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(pageUrl && { "@id": `${pageUrl}#faq` }),
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

// Pre-configured FAQs for fund pages
export const THIR_FAQS: FAQItem[] = [
  {
    question: "What is THIR and how does it work?",
    answer: "THIR (THOR Index Rotation ETF) is a tactical equity ETF that rotates between major market indices (S&P 500, Nasdaq 100, Russell 2000) and cash based on proprietary trend-following signals. When markets are trending up, THIR participates. When trends break down, THIR can move to cash to protect against significant drawdowns.",
  },
  {
    question: "What is the expense ratio for THIR?",
    answer: "THIR has a net expense ratio of 0.80%. This covers the active management, daily monitoring, and tactical rotation strategy that aims to protect against major market downturns.",
  },
  {
    question: "Can THIR go to 100% cash?",
    answer: "Yes, THIR has the ability to move up to 100% cash or cash equivalents when market conditions warrant. This go-to-cash capability is a key differentiator that provides downside protection during bear markets and severe corrections.",
  },
  {
    question: "How often does THIR rotate between indices?",
    answer: "THIR's rotation frequency depends on market conditions. During stable trending markets, rotations may be infrequent. During volatile or transitional periods, the strategy may rotate more frequently. The goal is to be in the strongest index during uptrends and in cash during downtrends.",
  },
  {
    question: "What benchmark should I compare THIR against?",
    answer: "While THIR can be compared to the S&P 500, it's important to understand that THIR is not designed to beat the market in every environment. It's designed to participate in upside while protecting against significant drawdowns, resulting in potentially better risk-adjusted returns over full market cycles.",
  },
  {
    question: "Is THIR suitable for long-term investors?",
    answer: "Yes, THIR is designed for investors with a long-term perspective who want equity exposure but are concerned about major market drawdowns. It can serve as a core equity holding or as a tactical sleeve within a diversified portfolio.",
  },
];

export const THLV_FAQS: FAQItem[] = [
  {
    question: "What is THLV and what makes it different from other low volatility ETFs?",
    answer: "THLV (THOR Low Volatility ETF) combines a low volatility stock selection process with the ability to reduce equity exposure during market stress. Unlike passive low vol ETFs, THLV can tactically move to cash, providing an additional layer of downside protection.",
  },
  {
    question: "What is the expense ratio for THLV?",
    answer: "THLV has a net expense ratio of 0.49%, which is competitive with other actively managed low volatility ETFs while providing tactical cash management capabilities.",
  },
  {
    question: "What types of stocks does THLV hold?",
    answer: "THLV focuses on high-quality, lower volatility stocks across sectors. The selection process emphasizes companies with stable earnings, strong balance sheets, and historically lower price volatility relative to the broader market.",
  },
  {
    question: "How does THLV perform during market downturns?",
    answer: "THLV is designed to decline less than the market during downturns through two mechanisms: holding inherently less volatile stocks, and the ability to reduce equity exposure when market conditions deteriorate. This dual approach aims to protect capital during bear markets.",
  },
  {
    question: "Is THLV appropriate for retirees or conservative investors?",
    answer: "Yes, THLV is well-suited for investors seeking equity exposure with reduced volatility and downside protection. This includes retirees, pre-retirees, and conservative investors who want to participate in equity markets but cannot tolerate significant drawdowns.",
  },
];

export const GENERAL_FAQS: FAQItem[] = [
  {
    question: "What makes THOR Funds different from other ETF providers?",
    answer: "THOR Funds specializes in risk-managed, tactical ETFs that can adapt to changing market conditions. Our strategies combine systematic trend-following with the ability to move to cash, providing downside protection that traditional passive ETFs cannot offer.",
  },
  {
    question: "Where can I buy THOR ETFs?",
    answer: "THOR ETFs (THIR and THLV) are listed on NYSE Arca and can be purchased through any brokerage account that allows stock and ETF trading, including Fidelity, Schwab, TD Ameritrade, Interactive Brokers, and others.",
  },
  {
    question: "Are THOR ETFs suitable for financial advisors and RIAs?",
    answer: "Yes, many financial advisors and RIAs use THOR ETFs as tactical building blocks within client portfolios. We offer advisor resources, model portfolios, and institutional share classes. Contact advisors@thorfunds.com for more information.",
  },
  {
    question: "How much money does THOR Funds manage?",
    answer: "THOR Financial Technologies manages over $1.1 billion in assets under management across our ETF strategies and separately managed accounts.",
  },
  {
    question: "Who is behind THOR Funds?",
    answer: "THOR Funds was founded by Brad Roth, who serves as Chief Investment Officer. Brad has over 15 years of experience in investment management and is a recognized thought leader in tactical and risk-managed investing. The team includes experienced portfolio managers, analysts, and operations professionals.",
  },
];

export default FAQSchema;
