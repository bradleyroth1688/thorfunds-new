'use client';

import { useEffect, useState } from 'react';

interface HoldingsTableProps {
  ticker: 'THIR' | 'THLV';
  limit?: number;
}

interface Holding {
  securityDescriptionLong: string;
  securityDescriptionShort: string;
  securityTicker: string;
  marketValuePercent: number;
  shares: number;
  marketValueBase: number;
  category?: string;
  asOfDate?: string;
}

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

export default function HoldingsTable({ ticker, limit }: HoldingsTableProps) {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [asOfDate, setAsOfDate] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHoldings() {
      try {
        const res = await fetch(`/api/fund?fundId=${FUND_IDS[ticker]}&endpoint=etfholdings`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          const sorted = data.sort((a: Holding, b: Holding) =>
            (b.marketValueBase || 0) - (a.marketValueBase || 0)
          );
          setHoldings(limit ? sorted.slice(0, limit) : sorted);
          if (data.length > 0 && data[0].asOfDate) {
            setAsOfDate(new Date(data[0].asOfDate).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric'
            }));
          }
        }
      } catch (err) {
        setError('Unable to load holdings data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchHoldings();
  }, [ticker, limit]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded mb-2"></div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 bg-gray-100 rounded mb-1"></div>
        ))}
      </div>
    );
  }

  if (error || holdings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {error || 'No holdings data available'}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Ticker</th>
            <th className="text-right">Weight</th>
            <th className="text-right">Shares</th>
            <th className="text-right">Market Value</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding, index) => (
            <tr key={index}>
              <td className="font-medium">{holding.securityDescriptionLong || holding.securityDescriptionShort}</td>
              <td className="text-navy-700 font-semibold">{holding.securityTicker}</td>
              <td className="text-right">{((holding.marketValuePercent || 0) * 100).toFixed(2)}%</td>
              <td className="text-right">{(holding.shares || 0).toLocaleString()}</td>
              <td className="text-right">{formatCurrency(holding.marketValueBase || 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-500 mt-4">
        {asOfDate ? `Holdings as of ${asOfDate}` : 'Holdings are subject to change.'} • Source: Ultimus Fund Solutions
      </p>
    </div>
  );
}
