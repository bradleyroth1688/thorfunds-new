'use client';

import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

type Ticker = 'THIR' | 'THLV';

type GrowthPoint = {
  portfolioNumber: string;
  performDate: string;
  noLoadAmount: number;
};

interface Props {
  ticker: Ticker;
}

const FUND_IDS: Record<Ticker, string> = {
  THLV: '1468',
  THIR: '1469',
};

function formatMoney(v: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(v);
}

function formatAxisDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.getFullYear().toString();
}

export default function GrowthOfInvestmentChart({ ticker }: Props) {
  const [points, setPoints] = useState<GrowthPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const fundId = FUND_IDS[ticker];
        const res = await fetch(`/api/fund?fundId=${fundId}&endpoint=growth`);
        if (!res.ok) throw new Error(`API ${res.status}`);
        const raw = await res.json();

        const clean = Array.isArray(raw)
          ? raw
              .filter((p: GrowthPoint) => p.portfolioNumber === fundId && typeof p.noLoadAmount === 'number')
              .map((p: GrowthPoint) => ({
                portfolioNumber: p.portfolioNumber,
                performDate: p.performDate,
                noLoadAmount: p.noLoadAmount,
              }))
          : [];

        setPoints(clean);
      } catch (e) {
        console.error('Growth chart load failed', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [ticker]);

  if (loading) {
    return <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-500">Loading {ticker} growth chart…</div>;
  }

  if (!points?.length) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="text-xl font-semibold text-navy-800">{ticker} — Growth of $10,000</h3>
        <p className="mt-2 text-sm text-gray-600">No growth history is available yet for this fund.</p>
      </div>
    );
  }

  const sorted = [...points].sort(
    (a, b) => new Date(a.performDate).getTime() - new Date(b.performDate).getTime()
  );

  const monthly = new Map<string, GrowthPoint>();
  for (const p of sorted) {
    const d = new Date(p.performDate);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    monthly.set(key, p);
  }
  const series = Array.from(monthly.values());

  const first = series[0];
  const last = series[series.length - 1];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <h3 className="text-xl font-semibold text-navy-800">{ticker} — Growth of $10,000</h3>
      <p className="mt-1 text-sm text-gray-600">
        Hypothetical growth of a $10,000 investment from {new Date(first.performDate).toLocaleDateString()} through{' '}
        {new Date(last.performDate).toLocaleDateString()}.
      </p>

      <div className="mt-5 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series} margin={{ top: 12, right: 8, left: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="performDate" tickFormatter={formatAxisDate} minTickGap={40} stroke="#6B7280" />
            <YAxis tickFormatter={(v) => formatMoney(v as number)} stroke="#6B7280" width={84} />
            <Tooltip
              formatter={(value) => formatMoney(Number(value ?? 0))}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            <Line type="monotone" dataKey="noLoadAmount" stroke="#C89B3C" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 text-sm text-gray-600">
        Current value: <span className="font-semibold text-navy-800">{formatMoney(last.noLoadAmount)}</span>
      </div>
      <p className="mt-2 text-xs text-gray-500">Source: Ultimus Fund Solutions. Shown at NAV. No benchmark included.</p>
    </div>
  );
}
