'use client';

import { useMemo } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area,
} from 'recharts';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { useAnalysisStore } from '@/lib/analyzer/stores/analysis-store';
import { usePortfolioStore } from '@/lib/analyzer/stores/portfolio-store';
import { getRiskCategory, getRiskColor } from '@/lib/analyzer/types';

const COLORS = ['#1a365d', '#d69e2e', '#41699b', '#10b981', '#f97316', '#8b5cf6', '#ef4444', '#06b6d4', '#84cc16', '#ec4899'];

interface Props {
  onContinue: () => void;
  onBack: () => void;
}

export default function AnalysisStep({ onContinue, onBack }: Props) {
  const metrics = useAnalysisStore(s => s.metrics)!;
  const benchmarks = useAnalysisStore(s => s.benchmarks);
  const holdings = usePortfolioStore(s => s.holdings);

  // Scatter data: portfolio + benchmarks
  const scatterData = useMemo(() => {
    const points = [
      { name: 'Your Portfolio', volatility: +(metrics.volatility * 100).toFixed(1), return: +(metrics.annualizedReturn * 100).toFixed(1), fill: '#d69e2e', z: 200 },
    ];
    for (const [name, bm] of Object.entries(benchmarks)) {
      points.push({
        name,
        volatility: +(bm.volatility * 100).toFixed(1),
        return: +(bm.annualizedReturn * 100).toFixed(1),
        fill: name === 'S&P 500' ? '#1a365d' : name === '60/40' ? '#41699b' : '#94a3b8',
        z: 100,
      });
    }
    return points;
  }, [metrics, benchmarks]);

  // Pie data
  const pieData = holdings.map((h, i) => ({
    name: h.ticker,
    value: h.allocation,
    fill: COLORS[i % COLORS.length],
  }));

  // Drawdown chart data
  const drawdownData = useMemo(() => {
    return metrics.drawdownSeries.map((dd, i) => ({
      index: i,
      drawdown: +(dd * 100).toFixed(2),
    }));
  }, [metrics.drawdownSeries]);

  return (
    <div className="animate-fade-in-up">
      {/* Risk Score Hero */}
      <div className="card bg-gradient-to-br from-navy-800 to-navy-900 text-center py-12 mb-8">
        <div className="text-7xl font-bold text-gold-500 mb-2">
          <AnimatedCounter end={metrics.riskScore} duration={1500} />
        </div>
        <div className="text-2xl text-white mb-4">Risk Score</div>
        <div className="inline-block px-4 py-2 bg-navy-700 rounded-full">
          <span className="text-gray-300">Your portfolio has </span>
          <span className="text-gold-500 font-semibold">{getRiskCategory(metrics.riskScore)}</span>
          <span className="text-gray-300"> risk</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <MetricCard label="Annual Return" value={metrics.annualizedReturn * 100} suffix="%" decimals={1}
          color={metrics.annualizedReturn >= 0 ? 'text-green-600' : 'text-red-600'} />
        <MetricCard label="Volatility" value={metrics.volatility * 100} suffix="%" decimals={1} />
        <MetricCard label="Max Drawdown" value={metrics.maxDrawdown * 100} suffix="%" decimals={1} color="text-red-600" />
        <MetricCard label="Sharpe Ratio" value={metrics.sharpeRatio} decimals={2} />
      </div>

      {/* Additional Metrics */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <MetricCard label="Sortino Ratio" value={metrics.sortinoRatio} decimals={2} />
        <MetricCard label="VaR (95%)" value={metrics.var95 * 100} suffix="%" decimals={1} />
        <MetricCard label="CVaR (95%)" value={metrics.cvar95 * 100} suffix="%" decimals={1} />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Risk/Return Scatter */}
        <div className="card p-6">
          <h3 className="heading-3 text-navy-800 mb-4">Risk vs Return</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" dataKey="volatility" name="Volatility" unit="%" stroke="#64748b"
                  tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis type="number" dataKey="return" name="Return" unit="%" stroke="#64748b"
                  tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a365d', border: 'none', borderRadius: '8px', color: '#fff' }}
                  formatter={(value: any, name: any) => [`${value}%`, name]}
                />
                <Scatter data={scatterData} name="Portfolio">
                  {scatterData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} r={entry.name === 'Your Portfolio' ? 8 : 6} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-gold-500 rounded-full" />
              <span>Your Portfolio</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-navy-800 rounded-full" />
              <span>S&P 500</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-navy-500 rounded-full" />
              <span>60/40</span>
            </div>
          </div>
        </div>

        {/* Allocation Pie */}
        <div className="card p-6">
          <h3 className="heading-3 text-navy-800 mb-4">Asset Allocation</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%"
                  outerRadius={100} innerRadius={50} paddingAngle={2}>
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a365d', border: 'none', borderRadius: '8px', color: '#fff' }}
                  formatter={(value: any) => [`${Number(value).toFixed(1)}%`]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.fill }} />
                {d.name} ({d.value.toFixed(1)}%)
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Drawdown Chart */}
      <div className="card p-6 mb-12">
        <h3 className="heading-3 text-navy-800 mb-6">Historical Drawdowns</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={drawdownData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="index" hide />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(v: any) => [`${v}%`, 'Drawdown']}
                contentStyle={{ backgroundColor: '#1a365d', border: 'none', borderRadius: '8px', color: '#fff' }} />
              <Area type="monotone" dataKey="drawdown" stroke="#ef4444" fill="#fecaca" fillOpacity={0.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CTA */}
      <div className="card bg-gold-50 border border-gold-200 p-8 text-center">
        <h3 className="heading-2 text-navy-800 mb-4">
          Want to reduce risk without sacrificing returns?
        </h3>
        <p className="body-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          See how adding THOR products can improve your risk-adjusted returns.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={onBack} className="btn-outline">← Edit Portfolio</button>
          <button onClick={onContinue} className="btn-primary btn-lg">See THOR Optimization →</button>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, suffix = '', decimals = 0, color = '' }: {
  label: string; value: number; suffix?: string; decimals?: number; color?: string;
}) {
  return (
    <div className="card text-center">
      <div className={`text-3xl font-bold ${color || 'text-navy-800'}`}>
        <AnimatedCounter end={value} suffix={suffix} decimals={decimals} duration={1200} />
      </div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}
