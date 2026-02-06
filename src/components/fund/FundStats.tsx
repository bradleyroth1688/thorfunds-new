'use client';

import { useEffect, useState } from 'react';

interface FundStatsProps {
  ticker: 'THIR' | 'THLV';
  showReturns?: boolean;
}

interface NavData {
  nav: string;
  nav_change: string;
  nav_change_pct: string;
  aum: string;
  shares_outstanding: string;
  as_of_date: string;
  ytd_return: string;
  one_year_return: string;
  three_year_return: string;
  since_inception_return: string;
}

const FUND_IDS = {
  THIR: 1469,
  THLV: 1468,
};

function formatCurrency(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

function formatAUM(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '$0';
  
  if (num >= 1e9) {
    return `$${(num / 1e9).toFixed(2)}B`;
  }
  if (num >= 1e6) {
    return `$${(num / 1e6).toFixed(1)}M`;
  }
  return formatCurrency(num);
}

function formatPercent(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0.00%';
  return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`;
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export default function FundStats({ ticker, showReturns = false }: FundStatsProps) {
  const [data, setData] = useState<NavData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://filepoint.live/thor_getnav_cached4.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `fundID=${FUND_IDS[ticker]}`,
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const navData = await response.json();
        setData(navData);
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-100 dark:bg-navy-700/50 rounded-lg p-4">
            <div className="h-8 bg-gray-200 dark:bg-navy-600 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-navy-600 rounded w-16 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        {error || 'Unable to load data'}
      </div>
    );
  }

  const change = parseFloat(data.nav_change_pct);
  const isPositive = change >= 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 dark:bg-navy-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-navy-700 dark:text-white">{formatCurrency(data.nav)}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">NAV</div>
          <div className={`text-sm mt-1 ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {formatPercent(data.nav_change_pct)}
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-navy-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-navy-700 dark:text-white">{formatAUM(data.aum)}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">AUM</div>
        </div>
        <div className="bg-gray-50 dark:bg-navy-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-navy-700 dark:text-white">
            {parseInt(data.shares_outstanding).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Shares</div>
        </div>
        <div className="bg-gray-50 dark:bg-navy-700/50 rounded-lg p-4 text-center">
          <div className={`text-2xl font-bold ${parseFloat(data.ytd_return) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {formatPercent(data.ytd_return)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">YTD</div>
        </div>
      </div>

      {showReturns && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-navy-700/50 rounded-lg p-4 text-center">
            <div className={`text-xl font-bold ${parseFloat(data.ytd_return) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {formatPercent(data.ytd_return)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">YTD</div>
          </div>
          <div className="bg-gray-50 dark:bg-navy-700/50 rounded-lg p-4 text-center">
            <div className={`text-xl font-bold ${parseFloat(data.one_year_return) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {formatPercent(data.one_year_return)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">1 Year</div>
          </div>
          <div className="bg-gray-50 dark:bg-navy-700/50 rounded-lg p-4 text-center">
            <div className={`text-xl font-bold ${parseFloat(data.three_year_return) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {formatPercent(data.three_year_return)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">3 Year</div>
          </div>
          <div className="bg-gray-50 dark:bg-navy-700/50 rounded-lg p-4 text-center">
            <div className={`text-xl font-bold ${parseFloat(data.since_inception_return) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {formatPercent(data.since_inception_return)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Since Inception</div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Data as of {formatDate(data.as_of_date)}. Past performance does not guarantee future results.
      </p>
    </div>
  );
}
