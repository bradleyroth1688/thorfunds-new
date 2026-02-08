'use client';

import Link from 'next/link';
import { useAnalysisStore } from '@/lib/analyzer/stores/analysis-store';
import { useOptimizationStore } from '@/lib/analyzer/stores/optimization-store';
import { usePortfolioStore } from '@/lib/analyzer/stores/portfolio-store';
import { getRiskProfile } from '@/lib/analyzer/risk-providers';

interface Props {
  onContinue: () => void;
  onBack: () => void;
}

function SliderInput({ label, subtitle, value, max, color, onChange }: {
  label: string; subtitle: string; value: number; max: number; color: string; onChange: (v: number) => void;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-semibold text-navy-800">{label}</div>
          <div className="text-xs text-gray-500">{subtitle}</div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            max={max}
            value={value}
            onChange={(e) => onChange(Math.min(Math.max(0, Number(e.target.value)), max))}
            className="w-16 text-right text-xl font-bold border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gold-500"
            style={{ color }}
          />
          <span className="text-2xl font-bold" style={{ color }}>%</span>
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-3 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-6
          [&::-webkit-slider-thumb]:h-6
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:shadow-lg
          [&::-webkit-slider-thumb]:cursor-grab
          [&::-webkit-slider-thumb]:active:cursor-grabbing
          [&::-webkit-slider-thumb]:hover:scale-110
          [&::-webkit-slider-thumb]:transition-transform"
        style={{
          background: `linear-gradient(to right, ${color} 0%, ${color} ${max > 0 ? (value / max) * 100 : 0}%, #e5e7eb ${max > 0 ? (value / max) * 100 : 0}%, #e5e7eb 100%)`,
        }}
      />
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          background: ${color};
        }
      `}</style>
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>0%</span>
        <span>{max}%</span>
      </div>
    </div>
  );
}

function MetricDelta({ label, current, optimized, pct = false, inverted = false }: {
  label: string; current: number; optimized: number; pct?: boolean; inverted?: boolean;
}) {
  const delta = optimized - current;
  // For drawdown: values are negative (e.g., -0.30). More negative = worse.
  // inverted=true means lower is better. For drawdown, if optimized is more negative, that's bad.
  const isGood = inverted ? delta < 0 : delta > 0;
  const displayVal = pct ? `${(optimized * 100).toFixed(1)}%` : optimized.toFixed(2);
  const absDelta = Math.abs(delta);
  const displayDelta = pct ? `${(absDelta * 100).toFixed(1)}%` : absDelta.toFixed(2);
  const hasChange = absDelta > 0.001;

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-navy-800">{displayVal}</span>
        {hasChange && (
          <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
            isGood ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {delta > 0 ? '+' : ''}{pct ? `${(delta * 100).toFixed(1)}%` : delta.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
}

export default function OptimizationStep({ onContinue, onBack }: Props) {
  const currentMetrics = useAnalysisStore(s => s.metrics)!;
  const { normalizedScore, providerName } = usePortfolioStore();
  const {
    thirPct, thlvPct, currentResult, isComputed,
    setThirPct, setThlvPct,
  } = useOptimizationStore();

  const optimized = currentResult?.metrics;
  const totalThor = thirPct + thlvPct;

  if (!isComputed || !optimized) {
    return <div className="text-center py-20 text-gray-500">Computing optimization grid...</div>;
  }

  // Use currentMetrics when THOR is 0% so numbers match exactly
  const displayMetrics = totalThor === 0 ? currentMetrics : optimized;

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="heading-1 text-navy-800">Optimize with THOR</h2>
        <p className="body-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          See how THOR&apos;s systematic strategies can complement your portfolio in real time.
        </p>
      </div>

      {/* Combined: Sliders + Live Metrics */}
      <div className="card p-8 mb-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Sliders */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="heading-3 text-navy-800">THOR Allocation</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Total: <span className="font-bold text-gold-600">{totalThor}%</span>
                  <span className="text-gray-400"> (max 50%)</span>
                </p>
              </div>
            </div>

            <SliderInput
              label="THOR SDQ Index Rotation"
              subtitle="Rotates S&P/Dow/Nasdaq, can go 100% cash"
              value={thirPct}
              max={50}
              color="#d69e2e"
              onChange={(v) => setThirPct(Math.min(v, 50 - thlvPct))}
            />

            <SliderInput
              label="THOR Low Volatility"
              subtitle="10-sector rotation, equal-weight risk-on"
              value={thlvPct}
              max={50}
              color="#1a365d"
              onChange={(v) => setThlvPct(Math.min(v, 50 - thirPct))}
            />

            {/* Allocation Bar */}
            <div className="mt-6">
              <div className="flex h-3 rounded-full overflow-hidden">
                {thirPct > 0 && <div className="bg-gold-500 transition-all" style={{ width: `${thirPct}%` }} />}
                {thlvPct > 0 && <div className="bg-navy-600 transition-all" style={{ width: `${thlvPct}%` }} />}
                <div className="bg-gray-200 transition-all" style={{ width: `${100 - totalThor}%` }} />
              </div>
              <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                {thirPct > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 bg-gold-500 rounded-full" />THIR {thirPct}%</span>}
                {thlvPct > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 bg-navy-600 rounded-full" />THLV {thlvPct}%</span>}
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-gray-200 rounded-full border border-gray-300" />Your Portfolio {100 - totalThor}%</span>
              </div>
            </div>
          </div>

          {/* Right: Live Metrics */}
          <div>
            <h3 className="heading-3 text-navy-800 mb-4">
              {totalThor > 0 ? 'Portfolio Impact' : 'Current Portfolio'}
            </h3>

            {/* Risk Score */}
            <div className="text-center mb-6 p-4 bg-gradient-to-br from-navy-800 to-navy-900 rounded-xl">
              <div className="text-5xl font-bold text-gold-500">{displayMetrics.riskScore}</div>
              <div className="text-sm text-gray-300 mt-1">
                Risk Score
                {totalThor > 0 && displayMetrics.riskScore !== currentMetrics.riskScore && (
                  <span className={`ml-2 font-semibold ${displayMetrics.riskScore < currentMetrics.riskScore ? 'text-green-400' : 'text-red-400'}`}>
                    ({displayMetrics.riskScore < currentMetrics.riskScore ? '' : '+'}{displayMetrics.riskScore - currentMetrics.riskScore} from {currentMetrics.riskScore})
                  </span>
                )}
              </div>
            </div>

            {/* Key Metrics with deltas */}
            <div className="space-y-3">
              <MetricDelta label="Annual Return" current={currentMetrics.annualizedReturn} optimized={displayMetrics.annualizedReturn} pct />
              <MetricDelta label="Volatility" current={currentMetrics.volatility} optimized={displayMetrics.volatility} pct inverted />
              <MetricDelta label="Max Drawdown" current={currentMetrics.maxDrawdown} optimized={displayMetrics.maxDrawdown} pct inverted />
              <MetricDelta label="Sharpe Ratio" current={currentMetrics.sharpeRatio} optimized={displayMetrics.sharpeRatio} />
              <MetricDelta label="Sortino Ratio" current={currentMetrics.sortinoRatio} optimized={displayMetrics.sortinoRatio} />
            </div>

            {/* Risk Tolerance comparison */}
            {normalizedScore && providerName !== 'none' && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Your Risk Tolerance</span>
                  <span className="font-semibold" style={{ color: getRiskProfile(normalizedScore).color }}>
                    {normalizedScore} ({getRiskProfile(normalizedScore).label})
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-500">Portfolio Risk</span>
                  <span className="font-semibold text-navy-800">{displayMetrics.riskScore}</span>
                </div>
                {(() => {
                  const optimizedDist = Math.abs(normalizedScore - displayMetrics.riskScore);
                  const currentDist = Math.abs(normalizedScore - currentMetrics.riskScore);
                  if (totalThor > 0 && optimizedDist < currentDist) {
                    return <p className="text-xs text-green-600 mt-2">✓ Closer to your risk tolerance</p>;
                  }
                  if (totalThor > 0 && optimizedDist > currentDist) {
                    return <p className="text-xs text-amber-600 mt-2">⚠ Further from your risk tolerance</p>;
                  }
                  return null;
                })()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* White Paper CTA */}
      <div className="card bg-gradient-to-br from-navy-800 to-navy-900 p-8 text-center mb-8">
        <div className="text-4xl mb-4">📄</div>
        <h3 className="text-xl font-bold text-white mb-2">Download Our Free White Paper</h3>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto italic">
          &ldquo;Understanding Risk-Managed Investing: How Systematic Strategies Protect and Grow Your Portfolio&rdquo;
        </p>
        <Link href="/resources/white-papers" className="btn-primary btn-lg">
          Download White Paper →
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex justify-center">
        <button onClick={onBack} className="btn-outline">← Back to Analysis</button>
      </div>
    </div>
  );
}
