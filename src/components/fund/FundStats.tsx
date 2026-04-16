'use client';

import { useEffect, useState } from 'react';

interface FundStatsProps {
  ticker: 'THIR' | 'THLV' | 'THMR';
  showReturns?: boolean;
}

interface PerfData {
  performDate: string;
  fundName: string;
  fundInceptionDate?: string;
  naV_NoLoad: number;
  navDailyChange: number;
  oneDay_NoLoad: number;
  fiveDay_NoLoad?: number | null;
  sevenDay_NoLoad?: number | null;
  totalNetAssets: number;
  sharesOutstanding: number;
  yearToDate_NoLoad: number | null;
  oneYear_NoLoad: number | null;
  threeYear_NoLoad: number | null;
  sinceInception_NoLoad: number | null;
  marketPrice: number;
  marketOneDay: number;
  premiumDiscount: number;
  premiumDiscountPct: number;
  volume: number;
}

const FUND_IDS: Record<string, string> = {
  THIR: '1469',
  THLV: '1468',
  THMR: '1513',
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatAUM(value: number): string {
  if (!value || value <= 0) return '—';
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
}

function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined) return '—';
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

function formatVolume(value: number): string {
  if (!value) return '—';
  return value.toLocaleString('en-US');
}

function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch { return dateString; }
}

// Pick the right period-return label + value.
//
// Rules (honest reporting, auto-flips as fund ages):
//   1. If YTD and Since Inception both exist AND diverge (fund has crossed a year boundary) → use YTD.
//      This is the steady state for any fund older than 1 calendar year.
//   2. If Since Inception exists and matches YTD (still in inception year) → label "Since Inception",
//      value = SI. Avoids confusion where YTD and SI show the same number with different labels.
//   3. Brand-new funds (< 30 days old) where Ultimus hasn't populated SI/YTD yet → fall back to
//      the longest available short-term return (sevenDay, fiveDay) and label "Since Inception".
//   4. Anything else → best-effort: YTD if present, otherwise SI, otherwise null.
//
// When THMR crosses Jan 1, 2027 and Ultimus starts populating YTD ≠ SI, rule 1 takes over
// automatically. No code change needed.
function pickPeriodReturn(data: PerfData): { label: string; value: number | null } {
  const ytd = data.yearToDate_NoLoad;
  const si = data.sinceInception_NoLoad;
  const sevenDay = data.sevenDay_NoLoad;
  const fiveDay = data.fiveDay_NoLoad;

  const ytdValid = ytd !== null && ytd !== undefined;
  const siValid = si !== null && si !== undefined;

  // Rule 1: YTD and SI both populated and diverge → steady-state older fund → YTD wins.
  if (ytdValid && siValid && Math.abs(ytd - si) > 0.01) {
    return { label: 'YTD', value: ytd };
  }

  // Rule 2: both populated and match → still in inception year → label as Since Inception.
  if (ytdValid && siValid) {
    return { label: 'Since Inception', value: si };
  }

  // Rule 3: brand-new fund — Ultimus hasn't populated the long-period returns yet.
  // Fall back to the longest available short-term value.
  if (sevenDay !== null && sevenDay !== undefined) {
    return { label: 'Since Inception', value: sevenDay };
  }
  if (fiveDay !== null && fiveDay !== undefined) {
    return { label: 'Since Inception', value: fiveDay };
  }

  // Rule 4: best-effort fallbacks.
  if (ytdValid) return { label: 'YTD', value: ytd };
  if (siValid) return { label: 'Since Inception', value: si };
  return { label: 'Since Inception', value: null };
}

export default function FundStats({ ticker, showReturns = false }: FundStatsProps) {
  const [data, setData] = useState<PerfData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const fundId = FUND_IDS[ticker];
      if (!fundId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/fund?fundId=${fundId}&endpoint=performance`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const json = await res.json();
        if (Array.isArray(json) && json.length > 0) {
          setData(json[0]);
        } else {
          throw new Error('No data');
        }
      } catch (err) {
        setError('Unable to load fund data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [ticker]);

  if (loading) {
    return (
      <div className="animate-pulse py-6">
        <div className="h-10 bg-gray-100 rounded w-32 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-100 rounded w-16 mx-auto mb-6"></div>
        <div className="h-4 bg-gray-100 rounded w-48 mx-auto mb-3"></div>
        <div className="h-4 bg-gray-100 rounded w-40 mx-auto"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-8 text-gray-500 text-sm">
        {error || 'Unable to load data'}
      </div>
    );
  }

  const isDayPositive = (data.oneDay_NoLoad || 0) >= 0;
  const period = pickPeriodReturn(data);
  const isPeriodPositive = (period.value ?? 0) >= 0;
  const isPremiumPositive = (data.premiumDiscountPct || 0) >= 0;

  return (
    <div className="py-2">
      {/* Price anchor */}
      <div className="text-center">
        <div className="text-4xl font-bold text-navy-700 dark:text-white tracking-tight">
          {formatCurrency(data.naV_NoLoad)}
        </div>
        <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-1">
          NAV
        </div>
      </div>

      {/* Day change + period return */}
      <div className="flex items-center justify-center gap-3 mt-4 text-sm">
        <span className={`font-semibold ${isDayPositive ? 'text-green-600' : 'text-red-600'}`}>
          {formatPercent(data.oneDay_NoLoad)}
        </span>
        <span className="text-gray-400">today</span>
        <span className="text-gray-300 dark:text-gray-600">|</span>
        <span className={`font-semibold ${isPeriodPositive ? 'text-green-600' : 'text-red-600'}`}>
          {formatPercent(period.value)}
        </span>
        <span className="text-gray-400">{period.label}</span>
      </div>

      {/* Secondary stats */}
      {data.marketPrice > 0 && (
        <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700 space-y-1.5 text-sm text-center">
          <div className="text-gray-600 dark:text-gray-300">
            <span className="text-gray-400">Market</span>{' '}
            <span className="font-medium">{formatCurrency(data.marketPrice)}</span>
            <span className="mx-2 text-gray-300">·</span>
            <span className="text-gray-400">Premium/Disc</span>{' '}
            <span className={`font-medium ${isPremiumPositive ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercent(data.premiumDiscountPct)}
            </span>
          </div>
          <div className="text-gray-600 dark:text-gray-300">
            <span className="text-gray-400">Volume</span>{' '}
            <span className="font-medium">{formatVolume(data.volume)}</span>
            <span className="mx-2 text-gray-300">·</span>
            <span className="text-gray-400">AUM</span>{' '}
            <span className="font-medium">{formatAUM(data.totalNetAssets)}</span>
          </div>
        </div>
      )}

      {/* Expanded returns grid (detail pages only) */}
      {showReturns && (
        <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className={`text-lg font-semibold ${(data.yearToDate_NoLoad || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercent(data.yearToDate_NoLoad)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">YTD</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-semibold ${(data.oneYear_NoLoad || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercent(data.oneYear_NoLoad)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">1 Year</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-semibold ${(data.threeYear_NoLoad ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercent(data.threeYear_NoLoad)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">3 Year</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-semibold ${(data.sinceInception_NoLoad || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercent(data.sinceInception_NoLoad)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Since Inception</div>
          </div>
        </div>
      )}

      <div className="mt-5 text-xs text-gray-400 dark:text-gray-500 text-center">
        As of {formatDate(data.performDate)} · Ultimus Fund Solutions
      </div>
    </div>
  );
}
