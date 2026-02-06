/**
 * Financial Product Schema - JSON-LD for ETF fund pages
 * Enhanced for Google Rich Results with investment-specific properties
 */

interface FundData {
  ticker: string;
  name: string;
  description: string;
  inceptionDate: string;
  expenseRatio: string;
  exchange: string;
  category: string;
  aum?: string;
  nav?: string;
  ytdReturn?: string;
  benchmark?: string;
}

interface ProductSchemaProps {
  fund: FundData;
}

export function ProductSchema({ fund }: ProductSchemaProps) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "@id": `https://thorfunds.com/funds/${fund.ticker.toLowerCase()}/#product`,
    name: `${fund.ticker} - ${fund.name}`,
    description: fund.description,
    url: `https://thorfunds.com/funds/${fund.ticker.toLowerCase()}/`,
    image: `https://thorfunds.com/funds/${fund.ticker.toLowerCase()}/og-image.jpg`,
    brand: {
      "@type": "Organization",
      "@id": "https://thorfunds.com/#organization",
      name: "THOR Funds",
    },
    provider: {
      "@type": "Organization",
      "@id": "https://thorfunds.com/#organization",
      name: "THOR Financial Technologies",
    },
    category: fund.category,
    feesAndCommissionsSpecification: fund.expenseRatio,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Ticker Symbol",
        value: fund.ticker,
      },
      {
        "@type": "PropertyValue",
        name: "Exchange",
        value: fund.exchange,
      },
      {
        "@type": "PropertyValue",
        name: "Inception Date",
        value: fund.inceptionDate,
      },
      {
        "@type": "PropertyValue",
        name: "Expense Ratio",
        value: fund.expenseRatio,
      },
      ...(fund.aum ? [{
        "@type": "PropertyValue",
        name: "Assets Under Management",
        value: fund.aum,
      }] : []),
      ...(fund.nav ? [{
        "@type": "PropertyValue",
        name: "Net Asset Value",
        value: fund.nav,
      }] : []),
      ...(fund.ytdReturn ? [{
        "@type": "PropertyValue",
        name: "YTD Return",
        value: fund.ytdReturn,
      }] : []),
      ...(fund.benchmark ? [{
        "@type": "PropertyValue",
        name: "Benchmark",
        value: fund.benchmark,
      }] : []),
    ],
    isRelatedTo: {
      "@type": "InvestmentOrDeposit",
      name: "Exchange-Traded Fund (ETF)",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
    />
  );
}

// Pre-configured schemas for THOR funds
export const THIR_FUND: FundData = {
  ticker: "THIR",
  name: "THOR Index Rotation ETF",
  description: "An adaptive ETF that rotates between major equity indices and cash based on market conditions, seeking to participate in upside while protecting against significant drawdowns.",
  inceptionDate: "2022-08-16",
  expenseRatio: "0.80%",
  exchange: "NYSE Arca",
  category: "Adaptive Equity ETF",
  benchmark: "S&P 500 Total Return Index",
};

export const THLV_FUND: FundData = {
  ticker: "THLV",
  name: "THOR Low Volatility ETF",
  description: "A defensive equity ETF focused on low volatility stocks with the ability to reduce exposure during market stress, designed for investors seeking smoother returns.",
  inceptionDate: "2023-06-15",
  expenseRatio: "0.49%",
  exchange: "NYSE Arca",
  category: "Low Volatility Equity ETF",
  benchmark: "S&P 500 Low Volatility Index",
};

export default ProductSchema;
