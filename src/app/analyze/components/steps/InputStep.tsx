'use client';

import { useState, useCallback, useMemo, useRef } from 'react';
import { Holding, PortfolioTemplate, TickerInfo, InputMode } from '@/lib/analyzer/types';
import { usePortfolioStore } from '@/lib/analyzer/stores/portfolio-store';

interface Props {
  templates: PortfolioTemplate[];
  tickerLookup: Record<string, TickerInfo>;
  onAnalyze: () => void;
}

export default function InputStep({ templates, tickerLookup, onAnalyze }: Props) {
  const [mode, setMode] = useState<InputMode | null>(null);
  const {
    holdings, totalAllocation, isValid, validationErrors,
    addHolding, removeHolding, updateHolding, setFromTemplate, setHoldings,
  } = usePortfolioStore();

  if (!mode && holdings.length === 0) {
    return <InitialView onMode={setMode} />;
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
    />
  );
}

function InitialView({ onMode }: { onMode: (m: InputMode) => void }) {
  return (
    <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
      <h2 className="heading-2 text-navy-800">Enter Your Portfolio</h2>
      <p className="body-lg text-gray-600 mt-4 mb-12">
        Upload a statement, enter holdings manually, or start from a template.
      </p>

      <div
        className="card-interactive border-2 border-dashed border-gray-300 hover:border-gold-500 p-12 mb-8 cursor-pointer transition-colors"
        onClick={() => onMode('manual')}
      >
        <div className="text-5xl mb-4">📄</div>
        <h3 className="heading-3 text-navy-800 mb-2">Upload Statement</h3>
        <p className="text-gray-500 mb-4">Drop PDF or CSV here, or click to browse</p>
        <p className="text-sm text-gray-400">Coming soon — use manual entry or templates for now</p>
      </div>

      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-gray-400 text-sm">OR</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={() => onMode('manual')} className="btn-outline">
          ✏️ Enter Manually
        </button>
        <button onClick={() => onMode('template')} className="btn-outline">
          📋 Start from Template
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
  onAdd, onRemove, onUpdate, onAnalyze, onSwitchTemplate,
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
}) {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      <div className="flex items-center justify-between mb-8">
        <h2 className="heading-2 text-navy-800">Your Holdings</h2>
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

      <button
        onClick={() => onAdd({ ticker: '', name: '', allocation: 0, type: 'etf' })}
        className="btn-ghost mt-4 w-full border border-dashed border-gray-300"
      >
        + Add Another Holding
      </button>

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
            setSearchQuery(e.target.value.toUpperCase());
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="w-24 px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
          placeholder="SPY"
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
