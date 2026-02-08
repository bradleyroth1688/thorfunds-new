/**
 * Breadcrumb Schema - JSON-LD for navigation breadcrumbs
 * Helps Google understand site hierarchy and improves SERP display
 */

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}

// Helper function to generate breadcrumbs from URL path
export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const baseUrl = "https://thorfunds.com";
  const segments = pathname.split("/").filter(Boolean);
  
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", url: baseUrl },
  ];

  let currentPath = "";
  
  const labelMap: Record<string, string> = {
    funds: "Our Funds",
    thir: "THIR ETF",
    thlv: "THLV ETF",
    holdings: "Holdings",
    performance: "Performance",
    documents: "Documents",
    faq: "FAQ",
    compare: "Compare Funds",
    insights: "Behind the Ticker",
    learn: "Learning Center",
    about: "About Us",
    team: "Our Team",
    contact: "Contact",
    resources: "Resources",
    advisors: "For Advisors",
    "white-papers": "White Papers",
    book: "The Book",
    chapters: "Chapters",
    newsletter: "Newsletter",
    press: "Press",
    careers: "Careers",
    philosophy: "Investment Philosophy",
    legal: "Legal",
    disclosures: "Disclosures",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    "what-is-an-etf": "What Is an ETF?",
    "how-etfs-work": "How ETFs Work",
    "index-rotation-explained": "Index Rotation Explained",
    "low-volatility-investing": "Low Volatility Investing",
    "tactical-vs-strategic": "Tactical vs Strategic",
    "risk-management": "Risk Management",
    "going-to-cash": "Going to Cash",
    "volatility-drag": "Volatility Drag",
    "market-cycles": "Market Cycles",
    "sector-rotation": "Sector Rotation",
    glossary: "Glossary",
  };

  for (const segment of segments) {
    currentPath += `/${segment}`;
    const label = labelMap[segment] || segment.split("-").map(
      word => word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
    
    breadcrumbs.push({
      name: label,
      url: `${baseUrl}${currentPath}/`,
    });
  }

  return breadcrumbs;
}

export default BreadcrumbSchema;
