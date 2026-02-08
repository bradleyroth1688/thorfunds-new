import { NextRequest, NextResponse } from 'next/server';

// Fetch monthly returns from Yahoo Finance for tickers not in our static matrix
// Returns: { [ticker]: number[] } aligned to our date grid

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

    // Limit to prevent abuse
    if (tickers.length > 50) {
      return NextResponse.json({ error: 'Max 50 tickers per request' }, { status: 400, headers: CORS_HEADERS });
    }

    const results: Record<string, number[]> = {};
    
    // Fetch in parallel (batches of 10)
    for (let i = 0; i < tickers.length; i += 10) {
      const batch = tickers.slice(i, i + 10);
      const promises = batch.map(t => fetchYahooReturns(t, dates));
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

async function fetchYahooReturns(ticker: string, dates: string[]): Promise<number[] | null> {
  try {
    // We need monthly price data going back to cover all our dates
    // dates are like "2020-01", "2020-02", etc.
    const firstDate = new Date(dates[0] + '-01');
    // Go one month earlier so we can compute first month's return
    firstDate.setMonth(firstDate.getMonth() - 1);
    const period1 = Math.floor(firstDate.getTime() / 1000);
    const period2 = Math.floor(Date.now() / 1000);

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?period1=${period1}&period2=${period2}&interval=1mo&includeAdjustedClose=true`;
    
    const resp = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      },
    });

    if (!resp.ok) return null;
    
    const data = await resp.json();
    const result = data?.chart?.result?.[0];
    if (!result) return null;

    const timestamps = result.timestamp as number[];
    const adjClose = result.indicators?.adjclose?.[0]?.adjclose as number[] ||
                     result.indicators?.quote?.[0]?.close as number[];
    
    if (!timestamps?.length || !adjClose?.length) return null;

    // Build a map of YYYY-MM → adjusted close price
    const priceByMonth: Record<string, number> = {};
    for (let i = 0; i < timestamps.length; i++) {
      if (adjClose[i] == null) continue;
      const d = new Date(timestamps[i] * 1000);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      priceByMonth[key] = adjClose[i];
    }

    // Compute monthly returns aligned to our date grid
    const returns: number[] = [];
    for (const dateStr of dates) {
      // We need the previous month's close to compute this month's return
      const [y, m] = dateStr.split('-').map(Number);
      const prevDate = new Date(y, m - 2, 1); // month is 0-indexed, so m-2
      const prevKey = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`;
      
      const prevPrice = priceByMonth[prevKey];
      const curPrice = priceByMonth[dateStr];
      
      if (prevPrice && curPrice && prevPrice > 0) {
        returns.push((curPrice - prevPrice) / prevPrice);
      } else {
        returns.push(0); // Missing data → 0 return (conservative)
      }
    }

    return returns;
  } catch (e) {
    console.error(`Yahoo fetch failed for ${ticker}:`, e);
    return null;
  }
}
