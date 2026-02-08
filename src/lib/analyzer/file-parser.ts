import Papa from 'papaparse';
import { Holding } from './types';

export interface ParseResult {
  holdings: Holding[];
  error?: string;
}

const TICKER_COLUMNS = ['ticker', 'symbol', 'fund', 'etf', 'holding', 'security', 'name', 'description', 'account'];
const ALLOCATION_COLUMNS = ['weight', 'allocation', 'percent', 'pct', '%', 'portfolio %', 'port %', 'weighting'];
const VALUE_COLUMNS = ['value', 'market_value', 'market value', 'amount', 'balance', 'current value', 'total value', 'mkt value', 'market val'];
const SHARES_COLUMNS = ['shares', 'quantity', 'qty', 'units'];

// Common tickers we know are valid (helps with fuzzy matching)
const KNOWN_TICKERS = new Set([
  'SPY','QQQ','DIA','IWM','VTI','VOO','VEA','VXUS','VWO','AGG','BND','TLT','IEF','SHY',
  'GLD','SLV','USO','XLK','XLE','XLF','XLV','XLI','XLB','XLY','XLP','XLU','XLRE',
  'ARKK','AAPL','MSFT','AMZN','GOOGL','GOOG','NVDA','META','TSLA','BRK','JPM','JNJ',
  'UNH','V','MA','PG','HD','DIS','NFLX','PYPL','ADBE','CRM','AMD','INTC','COST',
  'PEP','KO','MRK','ABT','TMO','AVGO','TXN','QCOM','LLY','MCD','WMT','NKE',
  'VZ','T','CMCSA','PFE','XOM','CVX','BA','CAT','GE','MMM','IBM',
  'SCHD','VIG','DVY','VYM','JEPI','JEPQ','IVV','ITOT','IEFA','IEMG',
  'THIR','THLV','BIL','SHV','MINT','NEAR','RSP','SWVXX','SPAXX','VMFXX','FDRXX',
]);

function findColumn(headers: string[], candidates: string[]): string | null {
  const lower = headers.map(h => h.toLowerCase().trim());
  for (const c of candidates) {
    const idx = lower.findIndex(h => h.includes(c));
    if (idx >= 0) return headers[idx];
  }
  return null;
}

// Known single-letter tickers (only these are valid as 1-char symbols)
const SINGLE_LETTER_TICKERS = new Set(['V','X','F','C','T','K','G','E','Z','W','M','D','J','A','B','H','L','N','O','P','R','S','U','Y']);

function looksLikeTicker(s: string): boolean {
  if (!s || s.length < 1 || s.length > 6) return false;
  if (!/^[A-Z]{1,6}$/.test(s)) return false;
  
  // Skip PDF structural tokens
  const pdfTokens = new Set([
    'ENDOBJ','XREF','STARTXREF','ENDSTREAM','STREAM','OBJ','TRAILER',
    'PDF','EOF','NULL','TRUE','FALSE','CMAP','TOUNI','BEGINBFCHAR',
    'ENDBFCHAR','BEGINBFRANGE','ENDBFRANGE','BEGINCIDCHAR','ENDCIDCHAR',
    'FONT','SUBTYPE','LENGTH','FILTER','FLATEDECODE','TF','TD','TJ','TM',
    'BT','ET','RE','RG','CS','SCN','DO','CM','GS','RI','BI','EI','ID',
  ]);
  if (pdfTokens.has(s)) return false;
  
  // Skip common non-ticker words
  const skipWords = new Set([
    'THE','AND','FOR','INC','ETF','LLC','LTD','FUND','CLASS','TOTAL','NET','USD',
    'CASH','NAME','QTY','PCT','DATE','TYPE','BUY','SELL','FEE','TAX','DIV',
    'PRICE','COST','GAIN','LOSS','NOTE','ACCT','FROM','WITH','THAT','THIS',
    'HAVE','WILL','YOUR','EACH','ALL','ARE','WAS','HAS','HAD','NOT','BUT',
    'CAN','MAY','NEW','OLD','ONE','TWO','OUR','OWN','WHO','HOW','NOW',
    'GET','GOT','LET','RUN','SAY','SHE','HIS','HER','HIM','TOO','USE',
    // Brokerage statement words
    'BANK','SWEEP','MONEY','PRIME','CORE','SHARES','REINVEST','REINVESTED',
    'BEGINNING','ENDING','VALUE','MARKET','PERIOD','SUMMARY','CUSIP',
    'SYMBOL','DESCRIPTION','QUANTITY','BALANCE','INTEREST','YIELD',
    'ANNUAL','INCOME','DEPOSIT','WITHDRAWAL','PURCHASE','SALE','CREDIT',
    'DEBIT','TRANSFER','BROKERAGE','ACCOUNT','SCHWAB','FIDELITY','VANGUARD',
    'MERRILL','MORGAN','STANLEY','AMERITRADE','IRA','ROTH','BENE','CUST',
  ]);
  if (skipWords.has(s)) return false;
  
  // Single-letter symbols: only accept if it's a KNOWN ticker AND appears in a holdings context
  // (we'll be more strict — require it to be in KNOWN_TICKERS)
  if (s.length === 1) {
    return KNOWN_TICKERS.has(s);
  }
  
  // 2-letter symbols: require known ticker (too many false positives otherwise)
  if (s.length === 2) {
    return KNOWN_TICKERS.has(s);
  }
  
  return true;
}

export function parseCSV(text: string): ParseResult {
  // Try standard header-based parsing first
  const result = Papa.parse(text, { header: true, skipEmptyLines: true, dynamicTyping: false });

  if (result.data.length > 0 && result.meta.fields) {
    const headers = result.meta.fields;
    const tickerCol = findColumn(headers, TICKER_COLUMNS);
    const allocCol = findColumn(headers, ALLOCATION_COLUMNS);
    const valueCol = findColumn(headers, VALUE_COLUMNS);

    if (tickerCol) {
      const rows = result.data as Record<string, string>[];
      let totalValue = 0;

      if (valueCol && !allocCol) {
        totalValue = rows.reduce((sum, r) => {
          const v = parseFloat(String(r[valueCol] || '').replace(/[$,]/g, ''));
          return sum + (isNaN(v) ? 0 : v);
        }, 0);
      }

      const holdings: Holding[] = [];
      for (const row of rows) {
        let rawTicker = String(row[tickerCol] || '').trim().toUpperCase();
        // Sometimes ticker column has "AAPL - Apple Inc" format
        rawTicker = rawTicker.split(/[\s\-–—,]/)[0].trim();
        if (!looksLikeTicker(rawTicker)) continue;

        let allocation = 0;
        if (allocCol) {
          allocation = parseFloat(String(row[allocCol] || '').replace(/[%,]/g, ''));
        } else if (valueCol && totalValue > 0) {
          const val = parseFloat(String(row[valueCol] || '').replace(/[$,]/g, ''));
          allocation = isNaN(val) ? 0 : (val / totalValue) * 100;
        }
        if (isNaN(allocation)) allocation = 0;

        holdings.push({
          ticker: rawTicker,
          name: '',
          allocation: Math.round(allocation * 10) / 10,
          type: 'etf',
        });
      }

      if (holdings.length > 0) return { holdings };
    }
  }

  // Fallback: try to find tickers in any column
  const noHeaderResult = Papa.parse(text, { header: false, skipEmptyLines: true });
  const allRows = noHeaderResult.data as string[][];
  return extractHoldingsFromRows(allRows);
}

function extractHoldingsFromRows(rows: string[][]): ParseResult {
  const holdings: Holding[] = [];
  const seen = new Set<string>();
  let valueByTicker: Record<string, number> = {};

  for (const row of rows) {
    for (let i = 0; i < row.length; i++) {
      const cell = String(row[i] || '').trim().toUpperCase().split(/[\s\-–—,]/)[0];
      if (!looksLikeTicker(cell)) continue;
      if (seen.has(cell) && !KNOWN_TICKERS.has(cell)) continue;

      // Look for a percentage or dollar value in subsequent cells
      let allocation = 0;
      let value = 0;
      for (let j = i + 1; j < row.length; j++) {
        const v = String(row[j] || '').trim();
        const pctMatch = v.match(/^([\d.]+)\s*%$/);
        if (pctMatch) {
          allocation = parseFloat(pctMatch[1]);
          break;
        }
        const moneyMatch = v.replace(/[$,]/g, '');
        const num = parseFloat(moneyMatch);
        if (!isNaN(num) && num > 100) {
          value = num; // likely a dollar value
        }
      }

      if (!seen.has(cell)) {
        seen.add(cell);
        if (value > 0) valueByTicker[cell] = value;
        holdings.push({
          ticker: cell,
          name: '',
          allocation: Math.round(allocation * 10) / 10,
          type: 'etf',
        });
      }
    }
  }

  // If no allocations but have values, compute from values
  const totalValue = Object.values(valueByTicker).reduce((a, b) => a + b, 0);
  if (totalValue > 0) {
    for (const h of holdings) {
      if (h.allocation === 0 && valueByTicker[h.ticker]) {
        h.allocation = Math.round((valueByTicker[h.ticker] / totalValue) * 1000) / 10;
      }
    }
  }

  if (holdings.length === 0) {
    return { holdings: [], error: "We couldn't find any holdings in this file. Try adding them manually below." };
  }

  return { holdings };
}

export async function parsePDF(arrayBuffer: ArrayBuffer): Promise<ParseResult> {
  try {
    // Dynamic import pdfjs-dist with legacy build (no worker needed)
    // @ts-ignore - pdfjs-dist types have TS target issues
    const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
    
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true,
    });
    
    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let i = 1; i <= Math.min(pdf.numPages, 20); i++) { // cap at 20 pages
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const items = content.items as Array<{ str: string; transform?: number[] }>;
      
      // Group by Y position to reconstruct lines
      const lineMap = new Map<number, string[]>();
      for (const item of items) {
        const y = item.transform ? Math.round(item.transform[5]) : 0;
        if (!lineMap.has(y)) lineMap.set(y, []);
        lineMap.get(y)!.push(item.str);
      }
      
      // Sort by Y (descending = top to bottom in PDF coords)
      const entries: Array<[number, string[]]> = [];
      lineMap.forEach((parts, y) => entries.push([y, parts]));
      const sortedLines = entries
        .sort((a, b) => b[0] - a[0])
        .map(([_, parts]) => parts.join(' '));
      
      fullText += sortedLines.join('\n') + '\n';
    }

    return extractHoldingsFromText(fullText);
  } catch (e) {
    console.error('PDF parse error:', e);
    // Fallback: try treating as text
    try {
      const text = new TextDecoder().decode(arrayBuffer);
      if (text.includes(',') || text.includes('\t')) {
        return parseCSV(text);
      }
      return extractHoldingsFromText(text);
    } catch {
      return { holdings: [], error: "We couldn't read this PDF. Try exporting your statement as CSV instead, or enter holdings manually." };
    }
  }
}

// Money market / cash-equivalent tickers → map to BIL
const CASH_TICKERS = new Set(['SWVXX','SPAXX','VMFXX','FDRXX','SWTSX','SNVXX','SWRXX','SWYXX']);
const CASH_KEYWORDS = ['SCHWAB BANK', 'BANK SWEEP', 'SWEEP ACCOUNT', 'MONEY MARKET', 'MONEY FUND',
  'CASH INVESTMENTS', 'PRIME ADVANTAGE', 'GOVERNMENT MONEY', 'TREASURY MONEY'];

function extractHoldingsFromText(text: string): ParseResult {
  const holdings: Holding[] = [];
  const seen = new Set<string>();
  const valueByTicker: Record<string, number> = {};
  let cashValue = 0;
  const lines = text.split(/\n/);
  const fullTextUpper = text.toUpperCase();

  // ── Strategy 1: Find "Top Account Holdings" or "Positions" table sections ──
  // Schwab format: SYMBOL ... Market Value ... % of Account
  // Look for lines containing a known ticker followed by dollar amounts and percentages
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Split into tokens
    const tokens = line.split(/\s+/);
    
    for (let t = 0; t < tokens.length; t++) {
      const candidate = tokens[t].replace(/[^A-Z]/g, '').toUpperCase();
      if (!candidate) continue;
      if (seen.has(candidate)) continue;
      
      // Check if it's a cash-equivalent ticker
      if (CASH_TICKERS.has(candidate)) {
        // Extract the dollar value from this line or nearby
        const lineValues = extractDollarValues(line);
        if (lineValues.length > 0) {
          // Use the largest value that's reasonable (market value, not quantity)
          const val = lineValues.find(v => v > 50) || lineValues[0];
          if (val > 0) cashValue += val;
        }
        seen.add(candidate);
        continue;
      }
      
      if (!looksLikeTicker(candidate)) continue;
      const isKnown = KNOWN_TICKERS.has(candidate);
      
      // Build context: rest of current line + potentially next line
      const restOfLine = tokens.slice(t + 1).join(' ');
      const nextLine = (i + 1 < lines.length) ? lines[i + 1].trim() : '';
      const context = restOfLine + ' ' + nextLine;
      
      // Look for financial values in context
      const dollarValues = extractDollarValues(context);
      const percentages = extractPercentages(context);
      const hasMoney = dollarValues.length > 0;
      const hasPct = percentages.length > 0;
      
      // Accept if: known ticker + any financial data, OR unknown ticker + both money and pct
      if ((isKnown && (hasMoney || hasPct)) || (!isKnown && hasMoney && hasPct)) {
        let allocation = 0;
        let value = 0;
        
        // Use the last reasonable percentage (usually "% of Account")
        for (const pct of percentages) {
          if (pct > 0 && pct <= 100) allocation = pct;
        }
        
        // Use the first dollar value > $50 as market value
        for (const dv of dollarValues) {
          if (dv > 50) { value = dv; break; }
        }
        
        seen.add(candidate);
        if (value > 0) valueByTicker[candidate] = value;
        holdings.push({
          ticker: candidate,
          name: '',
          allocation: Math.round(allocation * 10) / 10,
          type: 'etf',
        });
      }
    }
  }
  
  // ── Strategy 2: Find cash held at bank (Schwab Bank, etc.) ──
  for (const line of lines) {
    const upper = line.toUpperCase();
    const isCashLine = CASH_KEYWORDS.some(kw => upper.includes(kw));
    if (isCashLine && !seen.has('__BANK_CASH__')) {
      const values = extractDollarValues(line);
      // Look for the "Ending Balance" or a value that looks like a cash position
      // Usually the last or second-to-last number on the line
      if (values.length > 0) {
        // For Schwab Bank lines in the positions table, take the ending balance
        // Heuristic: if there are multiple values, the second one is often ending balance
        const cashVal = values.length >= 2 ? values[1] : values[0];
        if (cashVal > 0 && cashVal < 10_000_000) {
          cashValue += cashVal;
          seen.add('__BANK_CASH__');
        }
      }
    }
  }
  
  // Add cash as BIL if we found any
  if (cashValue > 0 && !seen.has('BIL')) {
    valueByTicker['BIL'] = cashValue;
    holdings.push({
      ticker: 'BIL',
      name: 'Cash & Cash Equivalents',
      allocation: 0,
      type: 'etf',
    });
  }

  // Compute allocations from dollar values if percentages weren't found
  computeAllocationsFromValues(holdings, valueByTicker);
  
  // Fill remaining allocation gap with BIL (cash)
  const totalAlloc = holdings.reduce((sum, h) => sum + h.allocation, 0);
  if (holdings.length > 0 && totalAlloc > 0 && totalAlloc < 95) {
    const existing = holdings.find(h => h.ticker === 'BIL');
    if (existing) {
      existing.allocation = Math.round((100 - totalAlloc + existing.allocation) * 10) / 10;
    } else {
      holdings.push({
        ticker: 'BIL',
        name: 'Cash & Cash Equivalents',
        allocation: Math.round((100 - totalAlloc) * 10) / 10,
        type: 'etf',
      });
    }
  }

  if (holdings.length === 0) {
    return { holdings: [], error: "We couldn't find any holdings in this file. Try exporting as CSV or entering holdings manually." };
  }

  return { holdings };
}

/** Extract all dollar-like values from text (numbers with decimals, with or without $ and commas) */
function extractDollarValues(text: string): number[] {
  const values: number[] = [];
  const matches = Array.from(text.matchAll(/\$?([\d,]+\.\d{2})\b/g));
  for (const m of matches) {
    const val = parseFloat(m[1].replace(/,/g, ''));
    if (val > 0) values.push(val);
  }
  return values;
}

/** Extract all percentage values from text */
function extractPercentages(text: string): number[] {
  const pcts: number[] = [];
  const matches = Array.from(text.matchAll(/([\d.]+)\s*%/g));
  for (const m of matches) {
    const val = parseFloat(m[1]);
    if (val > 0 && val <= 100) pcts.push(val);
  }
  return pcts;
}

function computeAllocationsFromValues(holdings: Holding[], valueByTicker: Record<string, number>) {
  const totalValue = Object.values(valueByTicker).reduce((a, b) => a + b, 0);
  if (totalValue > 0) {
    for (const h of holdings) {
      if (h.allocation === 0 && valueByTicker[h.ticker]) {
        h.allocation = Math.round((valueByTicker[h.ticker] / totalValue) * 1000) / 10;
      }
    }
  }
}
