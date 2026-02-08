'use client';

import { useState } from 'react';
import { usePortfolioStore } from '@/lib/analyzer/stores/portfolio-store';

interface Props {
  onContinue: () => void;
  onBack: () => void;
}

export default function LeadGateStep({ onContinue, onBack }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const holdings = usePortfolioStore(s => s.holdings);
  const normalizedScore = usePortfolioStore(s => s.normalizedScore);

  const canSubmit = name.trim().length > 0 && email.includes('@');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsSubmitting(true);

    try {
      await fetch('/api/analyzer-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          holdingsCount: holdings.length,
          tickers: holdings.map(h => h.ticker).join(', '),
          riskScore: normalizedScore,
          step: 'pre-analysis',
        }),
      });
    } catch {
      // Continue even if save fails
    }

    setIsSubmitting(false);
    onContinue();
  };

  return (
    <div className="max-w-lg mx-auto animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">📊</div>
        <h2 className="heading-1 text-navy-800">Almost There!</h2>
        <p className="body-lg text-gray-600 mt-4">
          Enter your info below to unlock your personalized risk analysis and optimization results.
        </p>
      </div>

      <div className="card p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
              required
              autoFocus
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Company <span className="text-gray-400">(optional)</span></label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Your firm or RIA"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="btn-primary btn-lg w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Loading...' : 'See My Results →'}
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-4 text-center">
          We&apos;ll send you a summary of your analysis. No spam, unsubscribe anytime.
        </p>
      </div>

      <div className="mt-6 text-center">
        <button onClick={onBack} className="btn-ghost text-sm">← Back to Portfolio</button>
      </div>
    </div>
  );
}
