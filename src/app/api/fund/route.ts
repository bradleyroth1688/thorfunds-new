import { NextRequest, NextResponse } from 'next/server';

const AUTH_URL = "https://uauth.ultimusfundsolutions.com/server/api/login";
const DATA_URL = "https://funddata.ultimusfundsolutions.com/funds";
const API_EMAIL = "broth@thoranalytics.com";
const API_PASSWORD = "000b6e14-48a9-46fb-8113-f1d0cc2166ef";

const VALID_FUND_IDS = ['1468', '1469'];
const VALID_ENDPOINTS = [
  'performance',
  'performance/LastMonth',
  'performance/LastQuarter',
  'indexperformance',
  'etfholdings',
  'etfholdingsfile',
  'analytics',
  'distribution',
  'growth',
  'premiumdiscount',
  'pricing',
];

// Token cache
let cachedToken: string | null = null;
let tokenExpiry = 0;

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const response = await fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: API_EMAIL, password: API_PASSWORD }),
  });

  if (!response.ok) {
    throw new Error(`Auth failed: ${response.status}`);
  }

  const token = await response.text();
  cachedToken = token.replace(/"/g, "");
  tokenExpiry = Date.now() + 10 * 60 * 60 * 1000;
  return cachedToken;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fundId = searchParams.get('fundId');
  const endpoint = searchParams.get('endpoint');

  if (!fundId || !VALID_FUND_IDS.includes(fundId)) {
    return NextResponse.json({ error: 'Invalid fund ID' }, { status: 400 });
  }

  if (!endpoint || !VALID_ENDPOINTS.some(e => endpoint.startsWith(e))) {
    return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
  }

  try {
    const token = await getToken();
    const apiUrl = `${DATA_URL}/${fundId}/${endpoint}`;

    const response = await fetch(apiUrl, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error(`Ultimus API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Fund API proxy error:', error);
    return NextResponse.json(
      { error: 'Unable to fetch fund data' },
      { status: 500 }
    );
  }
}
