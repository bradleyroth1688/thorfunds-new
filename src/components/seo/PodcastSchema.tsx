/**
 * Podcast Schema - JSON-LD for podcast series and episodes
 * Supports both PodcastSeries and PodcastEpisode types
 */

interface PodcastEpisodeData {
  slug: string;
  title: string;
  description: string;
  guest: string;
  company: string;
  publishedAt: string;
  duration: number; // in seconds
  mp3Url: string;
  topic?: string;
}

interface PodcastSeriesSchemaProps {
  totalEpisodes: number;
  latestEpisodeDate?: string;
}

interface PodcastEpisodeSchemaProps {
  episode: PodcastEpisodeData;
  episodeNumber?: number;
}

export function PodcastSeriesSchema({ totalEpisodes, latestEpisodeDate }: PodcastSeriesSchemaProps) {
  const seriesSchema = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    "@id": "https://thorfunds.com/insights/#podcast",
    name: "Behind the Ticker",
    description: "Behind the Ticker is a podcast featuring in-depth conversations with ETF managers, portfolio strategists, and investment thought leaders. Host Brad Roth, CIO of THOR Funds, explores the stories behind innovative investment products and strategies.",
    url: "https://thorfunds.com/insights/",
    image: "https://thorfunds.com/podcast-cover.jpg",
    webFeed: "https://feeds.buzzsprout.com/2162961.rss",
    author: {
      "@type": "Person",
      "@id": "https://thorfunds.com/team/#brad-roth",
      name: "Brad Roth",
      jobTitle: "Chief Investment Officer",
      worksFor: {
        "@type": "Organization",
        "@id": "https://thorfunds.com/#organization",
      },
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://thorfunds.com/#organization",
      name: "THOR Funds",
    },
    numberOfEpisodes: totalEpisodes,
    ...(latestEpisodeDate && { dateModified: latestEpisodeDate }),
    genre: ["Business", "Finance", "Investing"],
    inLanguage: "en-US",
    productionCompany: {
      "@type": "Organization",
      "@id": "https://thorfunds.com/#organization",
      name: "THOR Financial Technologies",
    },
    sameAs: [
      "https://open.spotify.com/show/behindtheticker",
      "https://podcasts.apple.com/us/podcast/behind-the-ticker/id1682702118",
      "https://www.youtube.com/@BehindtheTicker",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(seriesSchema) }}
    />
  );
}

export function PodcastEpisodeSchema({ episode, episodeNumber }: PodcastEpisodeSchemaProps) {
  const episodeSchema = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "@id": `https://thorfunds.com/insights/${episode.slug}/#episode`,
    name: episode.title,
    description: episode.description,
    url: `https://thorfunds.com/insights/${episode.slug}/`,
    datePublished: episode.publishedAt,
    timeRequired: `PT${Math.floor(episode.duration / 60)}M${episode.duration % 60}S`,
    duration: `PT${Math.floor(episode.duration / 60)}M${episode.duration % 60}S`,
    ...(episodeNumber && { episodeNumber }),
    partOfSeries: {
      "@type": "PodcastSeries",
      "@id": "https://thorfunds.com/insights/#podcast",
      name: "Behind the Ticker",
    },
    associatedMedia: {
      "@type": "AudioObject",
      contentUrl: episode.mp3Url,
      encodingFormat: "audio/mpeg",
      duration: `PT${Math.floor(episode.duration / 60)}M${episode.duration % 60}S`,
    },
    author: {
      "@type": "Person",
      "@id": "https://thorfunds.com/team/#brad-roth",
      name: "Brad Roth",
    },
    // Guest as interviewee
    contributor: {
      "@type": "Person",
      name: episode.guest,
      ...(episode.company && {
        worksFor: {
          "@type": "Organization",
          name: episode.company,
        },
      }),
    },
    about: episode.topic ? [
      {
        "@type": "Thing",
        name: episode.topic,
      },
      {
        "@type": "Thing",
        name: "Exchange-Traded Funds",
      },
    ] : [
      {
        "@type": "Thing",
        name: "Exchange-Traded Funds",
      },
      {
        "@type": "Thing",
        name: "Investment Strategy",
      },
    ],
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(episodeSchema) }}
    />
  );
}

export default PodcastEpisodeSchema;
