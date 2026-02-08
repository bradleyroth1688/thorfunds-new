'use client';

import { useCallback } from 'react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { useAnalysisStore } from '@/lib/analyzer/stores/analysis-store';
import { useOptimizationStore } from '@/lib/analyzer/stores/optimization-store';
import { OptimizationMode } from '@/lib/analyzer/types';

interface Props {
  onContinue: () => void;
  onBack: () => void;
}

const MODES: { id: OptimizationMode; label: string; desc: string }[] = [
  { id: 'max-return', label: 'Maximize Return', desc: 'At current risk level' },
  { id: 'min-risk', label: 'Minimize Risk', desc: 'At current return level' },
  { id: 'min-drawdown', label: 'Minimize Drawdown', desc: 'Reduce worst-case losses' },
  { id: 'target-score', label: 'Target Risk Score', desc: 'Match a specific score' },
];

export default function OptimizationStep({ onContinue, onBack }: Props) {
  const currentMetrics = useAnalysisStore(s => s.metrics)!;
  const {
    sliderValue, currentResult, mode, targetScore, isComputed,
    setSliderValue, setMode, setTargetScore, findOptimalAllocation,
  } = useOptimizationStore();

  const optimized = currentResult?.metrics;

  const handleFindOptimal = useCallback(() => {
    findOptimalAllocation(currentMetrics);
  }, [findOptimalAllocation, currentMetrics]);

  if (!isComputed || !optimized) {
    return <div className="text-center py-20 text-gray-500">Computing optimization grid...</div>;
  }

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-12">
        <h2 className="heading-1 text-navy-800">Optimize with THOR</h2>
        <p className="body-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Drag the slider to see real-time impact on your portfolio.
        </p>
      </div>

      {/* Slider Card */}
      <div className="card p-8 mb-8">
        <h3 className="heading-3 text-navy-800 mb-2">THOR Allocation</h3>
        <p className="text-gray-600 mb-8">Drag to see real-time impact on your portfolio metrics.</p>

        <div className="relative mb-4">
          <input
            type="range"
            min={0}
            max={100}
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="w-full h-3 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-7
              [&::-webkit-slider-thumb]:h-7
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-gold-500
              [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:cursor-grab
              [&::-webkit-slider-thumb]:active:cursor-grabbing
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-webkit-slider-thumb]:transition-transform"
            style={{
              background: `linear-gradient(to right, #d69e2e 0%, #d69e2e ${sliderValue}%, #e5e7eb ${sliderValue}%, #e5e7eb 100%)`,
            }}
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">0%</span>
          <span className="text-3xl font-bold text-gold-500">{sliderValue}%</span>
          <span className="text-sm text-gray-500">100%</span>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-navy-700 mb-2">
            <span className="font-semibold">{sliderValue}%</span> of your portfolio allocated to:
          </p>
          <ul className="space-y-1 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold-500 rounded-full" />
              THIR ({(sliderValue / 2).toFixed(1)}%) — THOR Income & Return ETF
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-navy-600 rounded-full" />
              THLV ({(sliderValue / 2).toFixed(1)}%) — THOR Low Volatility ETF
            </li>
          </ul>
        </div>
      </div>

      {/* Optimization Mode */}
      <div className="card p-6 mb-8">
        <h3 className="heading-3 text-navy-800 mb-4">Optimization Goal</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {MODES.map((m) => (
            <label
              key={m.id}
              className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors
                ${mode === m.id ? 'border-gold-500 bg-gold-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <input
                type="radio"
                name="mode"
                value={m.id}
                checked={mode === m.id}
                onChange={() => setMode(m.id)}
                className="mt-1 accent-gold-500"
              />
              <div>
                <div className="font-medium text-navy-800">{m.label}</div>
                <div className="text-sm text-gray-500">{m.desc}</div>
              </div>
            </label>
          ))}
        </div>

        {mode === 'target-score' && (
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">Target Risk Score</label>
            <input
              type="number"
              value={targetScore}
              onChange={(e) => setTargetScore(Number(e.target.value))}
              className="ml-3 w-24 px-2 py-1.5 border border-gray-300 rounded-md text-sm"
              min={1}
              max={100}
            />
          </div>
        )}

        <button onClick={handleFindOptimal} className="btn-secondary mt-6">
          Find Optimal →
        </button>
      </div>

      {/* Comparison */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Current */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-500 mb-6">CURRENT PORTFOLIO</h3>
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-gray-400">{currentMetrics.riskScore}</div>
            <div className="text-sm text-gray-500 mt-1">Risk Score</div>
          </div>
          <ComparisonMetrics metrics={currentMetrics} />
        </div>

        {/* Optimized */}
        <div className="card p-6 ring-2 ring-gold-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gold-600">OPTIMIZED PORTFOLIO</h3>
            <span className="inline-block px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-xs font-medium">
              Recommended
            </span>
          </div>
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-gold-500">{optimized.riskScore}</div>
            <div className="text-sm text-gray-500 mt-1">
              Risk Score
              {optimized.riskScore !== currentMetrics.riskScore && (
                <span className={`ml-2 font-semibold ${optimized.riskScore < currentMetrics.riskScore ? 'text-green-600' : 'text-red-600'}`}>
                  {optimized.riskScore < currentMetrics.riskScore ? '↓' : '↑'}
                  {Math.abs(currentMetrics.riskScore - optimized.riskScore)}
                </span>
              )}
            </div>
          </div>
          <ComparisonMetricsWithDelta current={currentMetrics} optimized={optimized} />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={onBack} className="btn-outline">← Back to Analysis</button>
        <button onClick={onContinue} className="btn-primary btn-lg">Get Full Report →</button>
      </div>
    </div>
  );
}

function ComparisonMetrics({ metrics }: { metrics: { annualizedReturn: number; volatility: number; maxDrawdown: number; sharpeRatio: number } }) {
  return (
    <div className="space-y-3">
      <Row label="Return" value={`${(metrics.annualizedReturn * 100).toFixed(1)}%`} />
      <Row label="Volatility" value={`${(metrics.volatility * 100).toFixed(1)}%`} />
      <Row label="Max Drawdown" value={`${(metrics.maxDrawdown * 100).toFixed(1)}%`} />
      <Row label="Sharpe Ratio" value={metrics.sharpeRatio.toFixed(2)} />
    </div>
  );
}

function ComparisonMetricsWithDelta({ current, optimized }: { current: any; optimized: any }) {
  return (
    <div className="space-y-3">
      <RowDelta label="Return" current={current.annualizedReturn} optimized={optimized.annualizedReturn} pct />
      <RowDelta label="Volatility" current={current.volatility} optimized={optimized.volatility} pct inverted />
      <RowDelta label="Max Drawdown" current={current.maxDrawdown} optimized={optimized.maxDrawdown} pct inverted />
      <RowDelta label="Sharpe Ratio" current={current.sharpeRatio} optimized={optimized.sharpeRatio} />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function RowDelta({ label, current, optimized, pct = false, inverted = false }: {
  label: string; current: number; optimized: number; pct?: boolean; inverted?: boolean;
}) {
  const delta = optimized - current;
  const isGood = inverted ? delta < 0 : delta > 0;
  const displayVal = pct ? `${(optimized * 100).toFixed(1)}%` : optimized.toFixed(2);
  const displayDelta = pct ? `${(Math.abs(delta) * 100).toFixed(1)}%` : Math.abs(delta).toFixed(2);

  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-600">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-medium">{displayVal}</span>
        {Math.abs(delta) > 0.001 && (
          <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
            isGood ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {isGood ? '↑' : '↓'}{displayDelta}
          </span>
        )}
      </div>
    </div>
  );
}
