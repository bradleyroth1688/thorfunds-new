'use client';

import { useState } from 'react';
import { useAnalysisStore } from '@/lib/analyzer/stores/analysis-store';
import { useOptimizationStore } from '@/lib/analyzer/stores/optimization-store';

interface Props {
  onReset: () => void;
  onBack: () => void;
}

export default function CaptureStep({ onReset, onBack }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentMetrics = useAnalysisStore(s => s.metrics)!;
  const optimized = useOptimizationStore(s => s.currentResult);
  const sliderValue = useOptimizationStore(s => s.sliderValue);

  const scoreDelta = optimized ? currentMetrics.riskScore - optimized.riskScore : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await fetch('/api/analyzer-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          currentRiskScore: currentMetrics.riskScore,
          optimizedRiskScore: optimized?.riskScore,
          thorAllocation: sliderValue,
        }),
      });
    } catch {
      // Fallback: mailto
      window.open(`mailto:welcome@thoranalytics.com?subject=Portfolio%20Analyzer%20Lead&body=Name:%20${name}%0AEmail:%20${email}%0ARisk%20Score:%20${currentMetrics.riskScore}%20→%20${optimized?.riskScore}`);
    }
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      {/* Success Summary */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="heading-1 text-navy-800 mb-4">Your Optimized Portfolio is Ready</h2>
        {scoreDelta > 0 && (
          <div className="flex flex-wrap justify-center gap-3">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              Risk Score ↓{scoreDelta}
            </span>
            {optimized && (
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Sharpe improved to {optimized.metrics.sharpeRatio.toFixed(2)}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Two-Column CTAs */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Email Capture */}
        <div className="card p-8">
          <div className="text-4xl mb-4">📄</div>
          <h3 className="heading-3 text-navy-800 mb-2">Get Your Full Report</h3>
          <p className="text-gray-600 mb-6">
            Detailed analysis with implementation steps and historical comparisons.
          </p>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-green-700 font-medium">✓ Request sent!</p>
              <p className="text-sm text-green-600 mt-1">We&apos;ll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-3 focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                required
              />
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-4 focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                required
              />
              <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Get Report'}
              </button>
            </form>
          )}

          <p className="text-xs text-gray-400 mt-4">
            We&apos;ll also send you occasional insights. Unsubscribe anytime.
          </p>
        </div>

        {/* Schedule a Call */}
        <div className="card p-8">
          <div className="text-4xl mb-4">📅</div>
          <h3 className="heading-3 text-navy-800 mb-2">Schedule a Call</h3>
          <p className="text-gray-600 mb-6">
            15-minute consultation with a THOR specialist to discuss your optimized portfolio.
          </p>
          <a
            href="https://calendly.com/thorfunds/consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full inline-flex items-center justify-center"
          >
            Pick a Time →
          </a>
        </div>
      </div>

      {/* About THOR */}
      <div className="card bg-navy-800 text-white p-8 mb-12">
        <h3 className="text-xl font-bold text-gold-500 mb-4">About THOR&apos;s Approach</h3>
        <p className="text-gray-300 mb-6">
          THOR products use active risk management to provide downside protection during market
          corrections while participating in market upside. Our systematic approach has helped
          investors achieve better risk-adjusted returns since 2019.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="/funds/thir" className="btn-outline text-gold-500 border-gold-500 hover:bg-gold-500 hover:text-navy-900">
            Learn About THIR
          </a>
          <a href="/funds/thlv" className="btn-outline text-gold-500 border-gold-500 hover:bg-gold-500 hover:text-navy-900">
            Learn About THLV
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-gray-400 mb-8 leading-relaxed">
        <p className="mb-2"><strong>Important Disclaimer:</strong> This tool is for informational purposes only and does not constitute investment advice. Past performance does not guarantee future results. Risk scores are estimates based on historical data and may not reflect actual future risk. All investments involve risk, including possible loss of principal. Consult with a qualified financial advisor before making investment decisions.</p>
        <p>THOR ETFs are distributed by [Distributor Name]. Please read the prospectus carefully before investing.</p>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={onBack} className="btn-outline">← Back to Optimization</button>
        <button onClick={onReset} className="btn-ghost">Start Over with New Portfolio</button>
      </div>
    </div>
  );
}
