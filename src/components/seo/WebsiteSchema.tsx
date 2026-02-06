/**
 * Website Schema - JSON-LD for the overall website
 * Includes SearchAction for potential sitelinks searchbox
 */

export function WebsiteSchema() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://thorfunds.com/#website",
    name: "THOR Funds",
    alternateName: "THOR Financial Technologies",
    url: "https://thorfunds.com",
    description: "THOR Funds offers innovative, risk-managed ETFs designed to participate in market upside while protecting against significant drawdowns.",
    publisher: {
      "@type": "Organization",
      "@id": "https://thorfunds.com/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://thorfunds.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  );
}

export default WebsiteSchema;
