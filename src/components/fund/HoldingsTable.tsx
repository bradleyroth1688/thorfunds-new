'use client';

import { useEffect, useState } from 'react';

interface HoldingsTableProps {
  ticker: 'THIR' | 'THLV';
  limit?: number;
}

interface Holding {
  name: string;
  ticker: string;
  weight: string;
  shares: string;
  market_value: string;
  sector?: string;
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

export default function HoldingsTable({ ticker, limit }: HoldingsTableProps) {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHoldings() {
      try {
        const response = await fetch('https://filepoint.live/thor_getholdings_cached4.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `fundID=${FUND_IDS[ticker]}`,
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setHoldings(limit ? data.slice(0, limit) : data);
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
              <td className="font-medium">{holding.name}</td>
              <td className="text-navy-700 font-semibold">{holding.ticker}</td>
              <td className="text-right">{parseFloat(holding.weight).toFixed(2)}%</td>
              <td className="text-right">{parseInt(holding.shares).toLocaleString()}</td>
              <td className="text-right">{formatCurrency(holding.market_value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-500 mt-4">
        Holdings are subject to change. Current as of most recent portfolio update.
      </p>
    </div>
  );
}
