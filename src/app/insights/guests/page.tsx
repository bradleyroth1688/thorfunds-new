import Link from 'next/link';
import { Metadata } from 'next';
import episodes from '@/data/episodes.json';

export const metadata: Metadata = {
  title: 'Podcast Guests | Behind the Ticker',
  description: 'Meet the experts and entrepreneurs featured on Behind the Ticker podcast. Portfolio managers, ETF issuers, and wealth management professionals.',
};

type Episode = {
  slug: string;
  title: string;
  guest: string;
  company: string;
  date: string;
  duration: string;
  youtubeId: string;
  audioUrl: string;
  description: string;
};

const typedEpisodes = episodes as Episode[];

// Get unique guests with their companies and episode counts
function getGuestData() {
  const guestMap = new Map<string, { company: string | null; episodeCount: number; latestSlug: string }>();
  
  typedEpisodes.forEach(ep => {
    if (!guestMap.has(ep.guest)) {
      guestMap.set(ep.guest, { company: ep.company, episodeCount: 1, latestSlug: ep.slug });
    } else {
      const existing = guestMap.get(ep.guest)!;
      existing.episodeCount++;
    }
  });

  return Array.from(guestMap.entries())
    .map(([name, data]) => ({
      name,
      company: data.company,
      episodeCount: data.episodeCount,
      latestSlug: data.latestSlug,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, ''),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default function GuestsPage() {
  const guests = getGuestData();

  return (
    <>
      {/* Hero */}
      <section className="gradient-navy text-white py-16">
        <div className="container-max mx-auto px-4 md:px-8">
          <nav className="text-sm mb-4">
            <Link href="/insights" className="text-white/60 hover:text-white">Insights</Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-white/80">Guests</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Podcast Guests</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Meet the portfolio managers, entrepreneurs, and industry experts who have shared their insights 
            on Behind the Ticker.
          </p>
        </div>
      </section>

      {/* Guests Grid */}
      <section className="section-padding">
        <div className="container-max mx-auto">
          <p className="text-gray-600 mb-8">{guests.length} guests featured</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guests.map((guest) => (
              <Link
                key={guest.slug}
                href={`/insights/${guest.latestSlug}`}
                className="card-hover group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-navy-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-navy-700">
                      {guest.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-700 group-hover:text-gold-600 transition-colors">
                      {guest.name}
                    </h3>
                    {guest.company && (
                      <p className="text-sm text-gray-600">{guest.company}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {guest.episodeCount} episode{guest.episodeCount > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy-800 text-white">
        <div className="container-max mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Want to Be a Guest?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Are you an ETF professional with insights to share? We&apos;d love to have you on Behind the Ticker.
          </p>
          <Link href="/contact" className="btn-primary">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
