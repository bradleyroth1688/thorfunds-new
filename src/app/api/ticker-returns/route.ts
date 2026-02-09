import { NextRequest, NextResponse } from 'next/server';

// Fetch monthly returns from Polygon.io for benchmark/comparison tickers
// Returns: { [ticker]: number[] } aligned to our date grid

const POLYGON_KEY = '3bJPbfL6ODS5fE0GRzX9qUZy9aF4plQx';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  try {
    const { tickers, dates } = await req.json() as { tickers: string[]; dates: string[] };
    
    if (!tickers?.length || !dates?.length) {
      return NextResponse.json({ error: 'tickers and dates required' }, { status: 400, headers: CORS_HEADERS });
    }

    if (tickers.length > 50) {
      return NextResponse.json({ error: 'Max 50 tickers per request' }, { status: 400, headers: CORS_HEADERS });
    }

    const results: Record<string, number[]> = {};
    
    // Fetch in parallel (batches of 5 to respect Polygon rate limits)
    for (let i = 0; i < tickers.length; i += 5) {
      const batch = tickers.slice(i, i + 5);
      const promises = batch.map(t => fetchPolygonReturns(t, dates));
      const batchResults = await Promise.allSettled(promises);
      
      batchResults.forEach((result, idx) => {
        if (result.status === 'fulfilled' && result.value) {
          results[batch[idx]] = result.value;
        }
      });
    }

    return NextResponse.json({ returns: results }, { headers: CORS_HEADERS });
  } catch (e) {
    console.error('ticker-returns error:', e);
    return NextResponse.json({ error: 'Failed to fetch returns' }, { status: 500, headers: CORS_HEADERS });
  }
}

async function fetchPolygonReturns(ticker: string, dates: string[]): Promise<number[] | null> {
  try {
    // dates are like "2020-01", "2020-02", etc.
    // We need one month before the first date to compute the first return
    const firstDate = new Date(dates[0] + '-01');
    firstDate.setMonth(firstDate.getMonth() - 1);
    const from = firstDate.toISOString().slice(0, 10);
    const to = new Date().toISOString().slice(0, 10);

    // Fetch monthly adjusted bars from Polygon
    const url = `https://api.polygon.io/v2/aggs/ticker/${encodeURIComponent(ticker)}/range/1/month/${from}/${to}?adjusted=true&sort=asc&limit=500&apiKey=${POLYGON_KEY}`;
    
    const resp = await fetch(url);
    if (!resp.ok) return null;
    
    const data = await resp.json();
    if (!data?.results?.length) return null;

    // Build a map of YYYY-MM → adjusted close price
    const priceByMonth: Record<string, number> = {};
    for (const bar of data.results) {
      if (bar.c == null) continue;
      const d = new Date(bar.t); // bar.t is unix ms timestamp
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      // Use last bar per month (Polygon monthly bars give us month-end close)
      priceByMonth[key] = bar.c;
    }

    // Compute monthly returns aligned to our date grid
    const returns: number[] = [];
    for (const dateStr of dates) {
      const [y, m] = dateStr.split('-').map(Number);
      const prevDate = new Date(y, m - 2, 1);
      const prevKey = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`;
      
      const prevPrice = priceByMonth[prevKey];
      const curPrice = priceByMonth[dateStr];
      
      if (prevPrice && curPrice && prevPrice > 0) {
        returns.push((curPrice - prevPrice) / prevPrice);
      } else {
        returns.push(0);
      }
    }

    return returns;
  } catch (e) {
    console.error(`Polygon fetch failed for ${ticker}:`, e);
    return null;
  }
}
