/**
 * Person Schema - JSON-LD for team members and podcast guests
 * Enhanced for E-E-A-T signals
 */

interface PersonData {
  name: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  company?: string;
  companyUrl?: string;
  twitter?: string;
  linkedin?: string;
  email?: string;
  slug?: string;
}

interface PersonSchemaProps {
  person: PersonData;
  isAuthor?: boolean;
}

export function PersonSchema({ person, isAuthor = false }: PersonSchemaProps) {
  const baseUrl = "https://thorfunds.com";
  
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    ...(person.slug && { "@id": `${baseUrl}/team/#${person.slug}` }),
    name: person.name,
    ...(person.jobTitle && { jobTitle: person.jobTitle }),
    ...(person.description && { description: person.description }),
    ...(person.image && { image: person.image }),
    ...(person.company && {
      worksFor: {
        "@type": "Organization",
        name: person.company,
        ...(person.companyUrl && { url: person.companyUrl }),
      },
    }),
    ...(person.email && { email: person.email }),
    sameAs: [
      ...(person.twitter ? [`https://twitter.com/${person.twitter.replace('@', '')}`] : []),
      ...(person.linkedin ? [person.linkedin] : []),
    ].filter(Boolean),
    ...(isAuthor && {
      knowsAbout: [
        "Exchange-Traded Funds",
        "Risk Management",
        "Adaptive Investing",
        "Portfolio Management",
        "Financial Markets",
      ],
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}

// Pre-configured team members
export const BRAD_ROTH: PersonData = {
  name: "Brad Roth",
  jobTitle: "Chief Investment Officer",
  description: "Brad Roth is the founder and CIO of THOR Financial Technologies, where he leads the development of risk-managed ETF strategies. With over 15 years of experience in investment management, Brad is a recognized thought leader in adaptive and defensive investing.",
  image: "https://thorfunds.com/team/brad-roth.jpg",
  company: "THOR Financial Technologies",
  companyUrl: "https://thorfunds.com",
  twitter: "@Bradr_thor",
  linkedin: "https://www.linkedin.com/in/bradroth",
  email: "broth@thoranalytics.com",
  slug: "brad-roth",
};

export default PersonSchema;
