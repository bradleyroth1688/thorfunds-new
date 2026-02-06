'use client';

import { useEffect, useState } from 'react';

interface FundStatsProps {
  ticker: 'THIR' | 'THLV';
  showReturns?: boolean;
}

interface UltimusData {
  performDate: string;
  fundName: string;
  naV_NoLoad: number;
  navDailyChange: number;
  oneDay_NoLoad: number;
  totalNetAssets: number;
  sharesOutstanding: number;
  yearToDate_NoLoad: number;
  oneYear_NoLoad: number;
  threeYear_NoLoad: number | null;
  sinceInception_NoLoad: number;
  marketPrice: number;
  marketOneDay: number;
  premiumDiscount: number;
  premiumDiscountPct: number;
  volume: number;
}

const AUTH_URL = "https://uauth.ultimusfundsolutions.com/server/api/login";
const DATA_URL = "https://funddata.ultimusfundsolutions.com/funds";

const FUND_IDS: Record<string, string> = {
  THIR: '1469',
  THLV: '1468',
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
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  return formatCurrency(value);
}

function formatPercent(value: number | null): string {
  if (value === null) return '—';
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
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
  const [data, setData] = useState<UltimusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Get auth token
        const authResponse = await fetch(AUTH_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'broth@thoranalytics.com',
            password: '000b6e14-48a9-46fb-8113-f1d0cc2166ef',
          }),
        });

        if (!authResponse.ok) throw new Error('Auth failed');
        const token = (await authResponse.text()).replace(/"/g, '');

        // Get performance data
        const perfResponse = await fetch(
          `${DATA_URL}/${FUND_IDS[ticker]}/performance`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!perfResponse.ok) throw new Error(`API error: ${perfResponse.status}`);
        const perfData = await perfResponse.json();

        if (Array.isArray(perfData) && perfData.length > 0) {
          setData(perfData[0]);
        } else {
          throw new Error('No data returned');
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-4">
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-8 text-gray-500">
        {error || 'Unable to load data'}
      </div>
    );
  }

  const isPositive = (data.oneDay_NoLoad || 0) >= 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-navy-700">{formatCurrency(data.naV_NoLoad)}</div>
          <div className="text-sm text-gray-600">NAV</div>
          <div className={`text-sm mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {formatPercent(data.oneDay_NoLoad)}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-navy-700">{formatAUM(data.totalNetAssets)}</div>
          <div className="text-sm text-gray-600">AUM</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-navy-700">
            {(data.sharesOutstanding || 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Shares</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className={`text-2xl font-bold ${(data.yearToDate_NoLoad || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatPercent(data.yearToDate_NoLoad)}
          </div>
          <div className="text-sm text-gray-600">YTD</div>
        </div>
      </div>

      {data.marketPrice > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-xl font-bold text-navy-700">{formatCurrency(data.marketPrice)}</div>
            <div className="text-sm text-gray-600">Market Price</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className={`text-xl font-bold ${(data.premiumDiscountPct || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercent(data.premiumDiscountPct)}
            </div>
            <div className="text-sm text-gray-600">Premium/Discount</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-xl font-bold text-navy-700">{(data.volume || 0).toLocaleString()}</div>
            <div className="text-sm text-gray-600">Volume</div>
          </div>
        </div>
      )}

      {showReturns && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className={`text-xl font-bold ${(data.yearToDate_NoLoad || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercent(data.yearToDate_NoLoad)}
            </div>
            <div className="text-sm text-gray-600">YTD</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className={`text-xl font-bold ${(data.oneYear_NoLoad || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercent(data.oneYear_NoLoad)}
            </div>
            <div className="text-sm text-gray-600">1 Year</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className={`text-xl font-bold ${(data.threeYear_NoLoad || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercent(data.threeYear_NoLoad)}
            </div>
            <div className="text-sm text-gray-600">3 Year</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className={`text-xl font-bold ${(data.sinceInception_NoLoad || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercent(data.sinceInception_NoLoad)}
            </div>
            <div className="text-sm text-gray-600">Since Inception</div>
          </div>
        </div>
      )}

      <div className="text-xs text-gray-400 text-center">
        As of {formatDate(data.performDate)} • Source: Ultimus Fund Solutions
      </div>
    </div>
  );
}
