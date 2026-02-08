import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Newsletter - Weekly Market Insights',
  description: 'Subscribe to the THOR Funds newsletter for weekly market commentary, signal updates, and educational content delivered to your inbox.',
};

export default function NewsletterPage() {
  return (
    <>
      <section className="gradient-navy text-white py-16 md:py-24">
        <div className="container-max mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Stay Informed</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Get weekly market insights, signal updates, and educational content delivered to your inbox.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max mx-auto max-w-2xl">
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Subscribe to Our Newsletter</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name (optional)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I am a...
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="type" value="advisor" className="mr-2" />
                    <span className="text-sm">Financial Advisor</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="type" value="investor" className="mr-2" />
                    <span className="text-sm">Individual Investor</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="type" value="other" className="mr-2" />
                    <span className="text-sm">Other</span>
                  </label>
                </div>
              </div>
              <button type="submit" className="btn-primary w-full">
                Subscribe
              </button>
              <p className="text-xs text-gray-500 text-center">
                By subscribing, you agree to our <Link href="/legal/privacy" className="underline">privacy policy</Link>. Unsubscribe anytime.
              </p>
            </form>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-bold mb-4 text-center">What You'll Get</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="card text-center">
                <div className="text-2xl mb-2">📊</div>
                <h4 className="font-semibold mb-1">Market Commentary</h4>
                <p className="text-sm text-gray-600">Weekly analysis of market conditions</p>
              </div>
              <div className="card text-center">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-semibold mb-1">Signal Updates</h4>
                <p className="text-sm text-gray-600">Current positioning and changes</p>
              </div>
              <div className="card text-center">
                <div className="text-2xl mb-2">📚</div>
                <h4 className="font-semibold mb-1">Education</h4>
                <p className="text-sm text-gray-600">Investment insights and strategies</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
