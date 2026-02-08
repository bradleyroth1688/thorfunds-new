import { NextRequest, NextResponse } from 'next/server';

// Known tickers for validation
const KNOWN_TICKERS = new Set([
  'SPY','QQQ','DIA','IWM','VTI','VOO','VEA','VXUS','VWO','AGG','BND','TLT','IEF','SHY',
  'GLD','SLV','USO','XLK','XLE','XLF','XLV','XLI','XLB','XLY','XLP','XLU','XLRE',
  'ARKK','AAPL','MSFT','AMZN','GOOGL','GOOG','NVDA','META','TSLA','BRK','JPM','JNJ',
  'UNH','V','MA','PG','HD','DIS','NFLX','PYPL','ADBE','CRM','AMD','INTC','COST',
  'PEP','KO','MRK','ABT','TMO','AVGO','TXN','QCOM','LLY','MCD','WMT','NKE',
  'VZ','T','CMCSA','PFE','XOM','CVX','BA','CAT','GE','MMM','IBM',
  'SCHD','VIG','DVY','VYM','JEPI','JEPQ','IVV','ITOT','IEFA','IEMG',
  'THIR','THLV','BIL','SHV','MINT','NEAR','RSP','SWVXX','SPAXX','VMFXX','FDRXX',
  'SWTSX','SCHX','SCHB','SCHA','SCHF','SCHE','SCHZ','SCHP','TIP','LQD','HYG',
  'EMB','MUB','VCIT','VCSH','BSV','BIV','BLV','VGSH','VGIT','VGLT',
]);

const SKIP_WORDS = new Set([
  'THE','AND','FOR','INC','ETF','LLC','LTD','FUND','CLASS','TOTAL','NET','USD',
  'CASH','NAME','QTY','PCT','DATE','TYPE','BUY','SELL','FEE','TAX','DIV',
  'PRICE','COST','GAIN','LOSS','NOTE','ACCT','FROM','WITH','THAT','THIS',
  'HAVE','WILL','YOUR','EACH','ALL','ARE','WAS','HAS','HAD','NOT','BUT',
  'CAN','MAY','NEW','OLD','ONE','TWO','OUR','OWN','WHO','HOW','NOW',
  'BANK','SWEEP','MONEY','PRIME','CORE','SHARES','REINVEST','REINVESTED',
  'BEGINNING','ENDING','VALUE','MARKET','PERIOD','SUMMARY','CUSIP',
  'SYMBOL','DESCRIPTION','QUANTITY','BALANCE','INTEREST','YIELD',
  'ANNUAL','INCOME','DEPOSIT','WITHDRAWAL','PURCHASE','SALE','CREDIT',
  'DEBIT','TRANSFER','BROKERAGE','ACCOUNT','SCHWAB','FIDELITY','VANGUARD',
  'MERRILL','MORGAN','STANLEY','AMERITRADE','IRA','ROTH','BENE','CUST',
  'POSITIONS','EXCHANGE','TRADED','FUNDS','INVESTMENTS','SECURITIES',
  'UNREALIZED','REALIZED','ESTIMATED','INFORMATION','CHARLES','COMPANY',
  'LESS','MORE','THAN','ALSO','BEEN','HELD','SUCH','ONLY','MADE','INTO',
  'AFTER','PRIOR','WOULD','COULD','SHOULD','ABOUT','OTHER','THESE','THOSE',
  'WHICH','WHERE','WHILE','BEING','STILL','ABOVE','BELOW','FIRST','LAST',
  'TERMS','CONDITIONS','PLEASE','REFER','CONTACT','REPORT','RATES',
]);

function looksLikeTicker(s: string): boolean {
  if (!s || s.length > 6) return false;
  if (!/^[A-Z]{1,6}$/.test(s)) return false;
  if (SKIP_WORDS.has(s)) return false;
  // 1-2 char symbols: must be known
  if (s.length <= 2) return KNOWN_TICKERS.has(s);
  return true;
}

interface Holding {
  ticker: string;
  name: string;
  allocation: number;
  value: number;
  type: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    // Use eval to avoid Next.js bundler mangling pdfjs-dist
    // eslint-disable-next-line no-eval
    const pdfjsLib = eval("require('pdfjs-dist/legacy/build/pdf.mjs')");

    const doc = await pdfjsLib.getDocument({
      data: new Uint8Array(buffer),
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true,
    }).promise;

    // Extract text with line reconstruction
    const lines: string[] = [];
    for (let i = 1; i <= Math.min(doc.numPages, 10); i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      const items = content.items as Array<{ str: string; transform?: number[] }>;

      const lineMap = new Map<number, string[]>();
      for (const item of items) {
        const y = item.transform ? Math.round(item.transform[5]) : 0;
        if (!lineMap.has(y)) lineMap.set(y, []);
        lineMap.get(y)!.push(item.str);
      }

      const entries: Array<[number, string[]]> = [];
      lineMap.forEach((parts, y) => entries.push([y, parts]));
      entries.sort((a, b) => b[0] - a[0]);

      for (const [, parts] of entries) {
        const line = parts.join(' ').trim();
        if (line) lines.push(line);
      }
    }

    // Parse holdings from lines
    const holdings: Holding[] = [];
    const seen = new Set<string>();
    const valueByTicker: Record<string, number> = {};

    for (const line of lines) {
      const tokens = line.split(/\s+/);
      const firstToken = tokens[0]?.replace(/[^A-Z]/gi, '').toUpperCase();

      if (!firstToken || !looksLikeTicker(firstToken)) continue;
      if (seen.has(firstToken)) continue;

      const rest = tokens.slice(1).join(' ');

      // Must have a dollar amount or percentage
      const hasFinancialData = /[\d,]+\.\d{2}/.test(rest) || /\d+%/.test(rest);
      // Must have a description (at least some alpha chars after ticker)
      const hasDescription = /[A-Z]{2,}/.test(rest);

      if (!hasFinancialData || !hasDescription) continue;

      // Extract percentage (last one on line that's <= 100)
      let allocation = 0;
      const pctMatches = Array.from(rest.matchAll(/([\d.]+)%/g));
      for (const pm of pctMatches) {
        const v = parseFloat(pm[1]);
        if (v > 0 && v <= 100) allocation = v;
      }

      // Extract first large dollar value
      let value = 0;
      const numMatches = Array.from(rest.matchAll(/([\d,]+\.\d{2})/g));
      for (const nm of numMatches) {
        const v = parseFloat(nm[1].replace(/,/g, ''));
        if (v > 50) { value = v; break; }
      }

      // Extract description (text between ticker and first number)
      const descMatch = rest.match(/^([A-Z][A-Za-z\s&']+?)(?:\s*[,◊]|\s+[\d$])/);
      const name = descMatch ? descMatch[1].trim() : '';

      seen.add(firstToken);
      if (value > 0) valueByTicker[firstToken] = value;
      holdings.push({
        ticker: firstToken,
        name,
        allocation: Math.round(allocation * 10) / 10,
        value,
        type: KNOWN_TICKERS.has(firstToken) ? 'etf' : 'stock',
      });
    }

    // Compute allocations from values if not all have percentages
    const totalValue = Object.values(valueByTicker).reduce((a, b) => a + b, 0);
    if (totalValue > 0) {
      for (const h of holdings) {
        if (h.allocation === 0 && valueByTicker[h.ticker]) {
          h.allocation = Math.round((valueByTicker[h.ticker] / totalValue) * 1000) / 10;
        }
      }
    }

    // If total allocation < 95%, check for cash/bank sweep and add as BIL
    const totalAlloc = holdings.reduce((s, h) => s + h.allocation, 0);
    if (totalAlloc > 0 && totalAlloc < 95) {
      const cashPct = Math.round((100 - totalAlloc) * 10) / 10;
      holdings.push({
        ticker: 'BIL',
        name: 'Cash / Short-Term Treasuries',
        allocation: cashPct,
        value: 0,
        type: 'etf',
      });
    }

    return NextResponse.json({
      holdings: holdings.map(h => ({
        ticker: h.ticker,
        name: h.name,
        allocation: h.allocation,
        type: h.type,
      })),
      debug: {
        totalLines: lines.length,
        totalPages: doc.numPages,
      },
    });
  } catch (e: unknown) {
    console.error('PDF parse error:', e);
    return NextResponse.json(
      { error: 'Failed to parse PDF. Try CSV or manual entry.', detail: String(e) },
      { status: 500 }
    );
  }
}
