'use client';

import { useState, useCallback, useMemo, useRef, DragEvent, ChangeEvent } from 'react';
import { Holding, PortfolioTemplate, TickerInfo, InputMode } from '@/lib/analyzer/types';
import { usePortfolioStore } from '@/lib/analyzer/stores/portfolio-store';
import { parseCSV } from '@/lib/analyzer/file-parser';

interface Props {
  templates: PortfolioTemplate[];
  tickerLookup: Record<string, TickerInfo>;
  onAnalyze: () => void;
  onBack?: () => void;
}

export default function InputStep({ templates, tickerLookup, onAnalyze, onBack }: Props) {
  const [mode, setMode] = useState<InputMode | null>(null);
  const {
    holdings, totalAllocation, isValid, validationErrors,
    addHolding, removeHolding, updateHolding, setFromTemplate, setHoldings,
  } = usePortfolioStore();

  if (!mode && holdings.length === 0) {
    return <InitialView onMode={setMode} tickerLookup={tickerLookup} onSetHoldings={setHoldings} onBack={onBack} />;
  }

  if (mode === 'template' && holdings.length === 0) {
    return (
      <TemplateSelector
        templates={templates}
        onSelect={(t) => { setFromTemplate(t); setMode('manual'); }}
        onBack={() => setMode(null)}
      />
    );
  }

  return (
    <ManualEntry
      holdings={holdings}
      totalAllocation={totalAllocation}
      isValid={isValid}
      validationErrors={validationErrors}
      tickerLookup={tickerLookup}
      onAdd={addHolding}
      onRemove={removeHolding}
      onUpdate={updateHolding}
      onAnalyze={onAnalyze}
      onSwitchTemplate={() => { setHoldings([]); setMode('template'); }}
      onBack={onBack}
    />
  );
}

/* ─── File Upload Zone ─── */

function FileUploadZone({ onHoldingsParsed, tickerLookup, onFallbackManual }: {
  onHoldingsParsed: (holdings: Holding[]) => void;
  tickerLookup: Record<string, TickerInfo>;
  onFallbackManual: () => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [parseMessage, setParseMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    setParsing(true);
    setParseMessage(null);

    try {
      let result;
      if (file.name.endsWith('.csv') || file.type === 'text/csv') {
        const text = await file.text();
        result = parseCSV(text);
      } else {
        setParseMessage({ type: 'error', text: 'Please upload a .csv file. See format instructions below.' });
        setParsing(false);
        return;
      }

      if (result.error || result.holdings.length === 0) {
        setParseMessage({ type: 'error', text: result.error || "We couldn't automatically read this file. Try adding your holdings manually below." });
      } else {
        // Enrich with ticker lookup
        const enriched = result.holdings.map((h: Holding) => {
          const info = tickerLookup[h.ticker];
          return info ? { ...h, name: info.name, type: info.type as Holding['type'], sector: info.sector } : h;
        });
        setParseMessage({ type: 'success', text: `We found ${enriched.length} holdings from your file.` });
        onHoldingsParsed(enriched);
      }
    } catch {
      setParseMessage({ type: 'error', text: "We couldn't automatically read this file. Try adding your holdings manually below." });
    }

    setParsing(false);
  }, [tickerLookup, onHoldingsParsed]);

  const onDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const onFileInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div>
      <div
        className={`card-interactive border-2 border-dashed p-12 mb-4 cursor-pointer transition-colors text-center
          ${isDragging ? 'border-gold-500 bg-gold-50' : 'border-gray-300 hover:border-gold-500'}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => fileRef.current?.click()}
      >
        <input
          ref={fileRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={onFileInput}
        />
        <div className="text-5xl mb-4">{parsing ? '⏳' : '📄'}</div>
        <h3 className="heading-3 text-navy-800 mb-2">Upload CSV</h3>
        <p className="text-gray-500 mb-2">Drop a CSV file here, or click to browse</p>
        <p className="text-xs text-gray-400">Export your holdings from your brokerage as CSV</p>
      </div>

      {/* CSV Format Instructions */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
        <p className="font-medium text-navy-800 mb-2">📋 CSV Format</p>
        <p className="mb-2">Your CSV should have columns for <strong>ticker</strong> and <strong>allocation %</strong> (or <strong>market value</strong>):</p>
        <pre className="bg-white rounded p-3 text-xs font-mono overflow-x-auto border border-gray-100 mb-3">{`Ticker,Allocation
SPY,40
AGG,30
GLD,15
BIL,15`}</pre>
        <p className="mb-1">Accepted column names:</p>
        <ul className="list-disc list-inside space-y-0.5 text-xs">
          <li><strong>Ticker:</strong> ticker, symbol, fund, holding, security</li>
          <li><strong>Allocation:</strong> weight, allocation, percent, pct, %</li>
          <li><strong>Value:</strong> value, market value, amount, balance (auto-converts to %)</li>
        </ul>
      </div>

      {parseMessage && (
        <div className={`p-4 rounded-lg mb-4 text-sm ${
          parseMessage.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
        }`}>
          {parseMessage.type === 'success' ? '✅' : '⚠️'} {parseMessage.text}
          {parseMessage.type === 'error' && (
            <button onClick={onFallbackManual} className="ml-2 underline font-medium">Enter manually</button>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Initial View ─── */

function InitialView({ onMode, tickerLookup, onSetHoldings, onBack }: {
  onMode: (m: InputMode) => void;
  tickerLookup: Record<string, TickerInfo>;
  onSetHoldings: (h: Holding[]) => void;
  onBack?: () => void;
}) {
  const [showUpload, setShowUpload] = useState(false);

  if (showUpload) {
    return (
      <div className="max-w-3xl mx-auto animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="heading-2 text-navy-800">Upload CSV</h2>
          <button onClick={() => setShowUpload(false)} className="btn-ghost text-sm">← Back</button>
        </div>
        <FileUploadZone
          tickerLookup={tickerLookup}
          onHoldingsParsed={(holdings) => { onSetHoldings(holdings); onMode('manual'); }}
          onFallbackManual={() => onMode('manual')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in-up">
      <div className="flex items-center justify-between mb-2">
        <h2 className="heading-2 text-navy-800">Enter Your Portfolio</h2>
        {onBack && <button onClick={onBack} className="btn-ghost text-sm">← Back to Risk Score</button>}
      </div>
      <p className="body-lg text-gray-600 mt-2 mb-10 text-center">
        Choose how you&apos;d like to enter your holdings.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Upload CSV */}
        <button
          onClick={() => setShowUpload(true)}
          className="card-interactive p-8 text-center hover:border-gold-400/50 transition-all group"
        >
          <div className="text-5xl mb-4">📄</div>
          <h3 className="text-lg font-bold text-navy-800 group-hover:text-gold-600 transition-colors mb-2">Upload CSV</h3>
          <p className="text-sm text-gray-500">Import holdings from a CSV export from your brokerage</p>
        </button>

        {/* Enter Manually */}
        <button
          onClick={() => onMode('manual')}
          className="card-interactive p-8 text-center hover:border-gold-400/50 transition-all group"
        >
          <div className="text-5xl mb-4">✏️</div>
          <h3 className="text-lg font-bold text-navy-800 group-hover:text-gold-600 transition-colors mb-2">Enter Manually</h3>
          <p className="text-sm text-gray-500">Type in your tickers and allocations by hand</p>
        </button>

        {/* Start from Template */}
        <button
          onClick={() => onMode('template')}
          className="card-interactive p-8 text-center hover:border-gold-400/50 transition-all group"
        >
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-lg font-bold text-navy-800 group-hover:text-gold-600 transition-colors mb-2">Use a Template</h3>
          <p className="text-sm text-gray-500">Start from a common portfolio type and customize</p>
        </button>
      </div>
    </div>
  );
}

function TemplateSelector({ templates, onSelect, onBack }: {
  templates: PortfolioTemplate[];
  onSelect: (t: PortfolioTemplate) => void;
  onBack: () => void;
}) {
  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up">
      <div className="flex items-center justify-between mb-8">
        <h2 className="heading-2 text-navy-800">Choose a Starting Template</h2>
        <button onClick={onBack} className="btn-ghost text-sm">← Back</button>
      </div>
      <p className="text-gray-600 mb-8">Select a common portfolio type. You can adjust holdings after.</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((t) => (
          <div
            key={t.id}
            onClick={() => onSelect(t)}
            className="card-interactive p-6"
          >
            <h3 className="heading-3 text-navy-800 mb-2">{t.name}</h3>
            <div className="flex h-4 rounded-full overflow-hidden mb-4">
              <div className="bg-navy-600" style={{ width: `${t.equity}%` }} />
              <div className="bg-gold-400" style={{ width: `${t.bonds}%` }} />
              {t.other > 0 && <div className="bg-gray-300" style={{ width: `${t.other}%` }} />}
            </div>
            <p className="text-sm text-gray-600 mb-4">{t.description}</p>
            <div className="flex items-center justify-between">
              <span className="inline-block px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-xs font-medium">
                Risk Score ~{t.expectedRisk}
              </span>
              <span className="text-gold-600 font-medium text-sm">Select →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ManualEntry({
  holdings, totalAllocation, isValid, validationErrors, tickerLookup,
  onAdd, onRemove, onUpdate, onAnalyze, onSwitchTemplate, onBack,
}: {
  holdings: Holding[];
  totalAllocation: number;
  isValid: boolean;
  validationErrors: string[];
  tickerLookup: Record<string, TickerInfo>;
  onAdd: (h: Holding) => void;
  onRemove: (i: number) => void;
  onUpdate: (i: number, h: Partial<Holding>) => void;
  onAnalyze: () => void;
  onSwitchTemplate: () => void;
  onBack?: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          {onBack && <button onClick={onBack} className="btn-ghost text-sm">← Back</button>}
          <h2 className="heading-2 text-navy-800">Your Holdings</h2>
        </div>
        <button onClick={onSwitchTemplate} className="btn-ghost text-sm">Use Template Instead</button>
      </div>

      {/* Holdings Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Ticker</th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Name</th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-gray-600">Allocation %</th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Type</th>
              <th className="py-3 px-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h, i) => (
              <HoldingRow
                key={i}
                index={i}
                holding={h}
                tickerLookup={tickerLookup}
                onUpdate={(partial) => onUpdate(i, partial)}
                onRemove={() => onRemove(i)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => onAdd({ ticker: '', name: '', allocation: 0, type: 'etf' })}
          className="btn-ghost flex-1 border border-dashed border-gray-300"
        >
          + Add Another Holding
        </button>
        {totalAllocation < 99 && (
          <button
            onClick={() => onAdd({ ticker: 'BIL', name: 'SPDR Bloomberg 1-3 Month T-Bill', allocation: Math.round((100 - totalAllocation) * 10) / 10, type: 'etf' })}
            className="btn-ghost border border-dashed border-green-300 text-green-700 hover:bg-green-50 whitespace-nowrap"
          >
            💵 Add Cash ({(100 - totalAllocation).toFixed(1)}%)
          </button>
        )}
      </div>

      {/* Allocation Progress */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Total Allocation</span>
          <span className={`text-sm font-bold ${Math.abs(totalAllocation - 100) <= 1 ? 'text-green-600' : 'text-amber-600'}`}>
            {totalAllocation.toFixed(1)}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${Math.abs(totalAllocation - 100) <= 1 ? 'bg-green-500' : 'bg-amber-500'}`}
            style={{ width: `${Math.min(totalAllocation, 100)}%` }}
          />
        </div>
        {Math.abs(totalAllocation - 100) > 1 && (
          <p className="mt-2 text-sm text-amber-600">⚠️ Allocations must sum to ~100%</p>
        )}
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && holdings.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          {validationErrors.map((err, i) => (
            <p key={i} className="text-sm text-red-600">{err}</p>
          ))}
        </div>
      )}

      {/* Analyze Button */}
      <div className="mt-8 text-center">
        <button
          onClick={onAnalyze}
          disabled={!isValid}
          className="btn-primary btn-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Analyze My Portfolio →
        </button>
      </div>
    </div>
  );
}

function HoldingRow({ index, holding, tickerLookup, onUpdate, onRemove }: {
  index: number;
  holding: Holding;
  tickerLookup: Record<string, TickerInfo>;
  onUpdate: (h: Partial<Holding>) => void;
  onRemove: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState(holding.ticker);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 1) return [];
    const q = searchQuery.toUpperCase();
    return Object.values(tickerLookup)
      .filter(t => t.ticker.includes(q) || t.name.toUpperCase().includes(q))
      .slice(0, 8);
  }, [searchQuery, tickerLookup]);

  const selectTicker = useCallback((info: TickerInfo) => {
    setSearchQuery(info.ticker);
    setShowSuggestions(false);
    onUpdate({
      ticker: info.ticker,
      name: info.name,
      type: info.type as Holding['type'],
      sector: info.sector,
    });
  }, [onUpdate]);

  return (
    <tr className="border-b border-gray-100">
      <td className="py-2 px-2 relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => {
            const val = e.target.value.toUpperCase();
            setSearchQuery(val);
            setShowSuggestions(true);
            // Update store immediately so validation stays current
            if (val.trim()) {
              const match = tickerLookup[val.trim()];
              if (match) {
                onUpdate({ ticker: match.ticker, name: match.name, type: match.type as Holding['type'], sector: match.sector });
              } else {
                onUpdate({ ticker: val.trim() });
              }
            } else {
              onUpdate({ ticker: '' });
            }
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => {
            setTimeout(() => setShowSuggestions(false), 200);
            const typed = searchQuery.trim().toUpperCase();
            if (typed && typed !== holding.ticker) {
              const match = tickerLookup[typed];
              if (match) {
                onUpdate({ ticker: match.ticker, name: match.name, type: match.type as Holding['type'], sector: match.sector });
              } else {
                onUpdate({ ticker: typed, name: typed, type: 'etf' as Holding['type'] });
              }
            }
          }}
          className="w-24 px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
          placeholder="e.g. SPY"
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-50 top-full left-2 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg w-72 max-h-48 overflow-y-auto">
            {suggestions.map((s) => (
              <button
                key={s.ticker}
                className="w-full text-left px-3 py-2 hover:bg-gold-50 text-sm flex items-center gap-2"
                onMouseDown={(e) => { e.preventDefault(); selectTicker(s); }}
              >
                <span className="font-semibold text-navy-800 w-14">{s.ticker}</span>
                <span className="text-gray-600 truncate">{s.name}</span>
              </button>
            ))}
          </div>
        )}
      </td>
      <td className="py-2 px-2 text-sm text-gray-600">{holding.name || '—'}</td>
      <td className="py-2 px-2">
        <input
          type="number"
          value={holding.allocation || ''}
          onChange={(e) => onUpdate({ allocation: parseFloat(e.target.value) || 0 })}
          onBlur={(e) => onUpdate({ allocation: parseFloat(e.target.value) || 0 })}
          className="w-20 px-2 py-1.5 border border-gray-300 rounded-md text-sm text-right focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
          min={0}
          max={100}
          step={0.1}
        />
      </td>
      <td className="py-2 px-2">
        <select
          value={holding.type}
          onChange={(e) => onUpdate({ type: e.target.value as Holding['type'] })}
          className="px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-gold-500"
        >
          <option value="etf">ETF</option>
          <option value="stock">Stock</option>
          <option value="mutual_fund">Mutual Fund</option>
          <option value="bond">Bond</option>
          <option value="cash">Cash</option>
        </select>
      </td>
      <td className="py-2 px-2">
        <button onClick={onRemove} className="text-red-400 hover:text-red-600 text-lg">✕</button>
      </td>
    </tr>
  );
}
