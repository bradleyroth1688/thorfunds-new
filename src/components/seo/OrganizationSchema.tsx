/**
 * Organization Schema - JSON-LD for THOR Funds corporate entity
 * Includes E-E-A-T signals, contact info, social profiles
 */

interface OrganizationSchemaProps {
  includeFinancialServices?: boolean;
}

export function OrganizationSchema({ includeFinancialServices = true }: OrganizationSchemaProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "FinancialService"],
    "@id": "https://thorfunds.com/#organization",
    name: "THOR Financial Technologies",
    alternateName: ["THOR Funds", "THOR ETFs"],
    url: "https://thorfunds.com",
    logo: {
      "@type": "ImageObject",
      url: "https://thorfunds.com/logo.png",
      width: 512,
      height: 512,
    },
    image: "https://thorfunds.com/og-image.jpg",
    description: "THOR Financial Technologies offers innovative, risk-managed ETFs designed to participate in market upside while protecting against significant drawdowns.",
    foundingDate: "2021",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
      maxValue: 50,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pittsburgh",
      addressRegion: "PA",
      addressCountry: "US",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "info@thorfunds.com",
        availableLanguage: "English",
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "advisors@thorfunds.com",
        availableLanguage: "English",
      },
    ],
    sameAs: [
      "https://x.com/Bradr_thor",
      "https://www.linkedin.com/company/thor-financial-technologies",
      "https://www.youtube.com/@BehindtheTicker",
    ],
    ...(includeFinancialServices && {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "THOR ETF Products",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "FinancialProduct",
              name: "THIR - THOR Index Rotation ETF",
              url: "https://thorfunds.com/funds/thir/",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "FinancialProduct",
              name: "THLV - THOR Low Volatility ETF",
              url: "https://thorfunds.com/funds/thlv/",
            },
          },
        ],
      },
    }),
    knowsAbout: [
      "Exchange-Traded Funds",
      "Risk Management",
      "Dynamic Asset Allocation",
      "Index Rotation",
      "Low Volatility Investing",
      "Downside Protection",
      "Portfolio Construction",
    ],
    award: [
      "Listed on NYSE Arca",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}

export default OrganizationSchema;
