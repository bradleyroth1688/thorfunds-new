'use client';

import { useState, useEffect, useCallback } from 'react';
import { WizardStep, ReturnsData, PortfolioTemplate, TickerInfo } from '@/lib/analyzer/types';
import { usePortfolioStore } from '@/lib/analyzer/stores/portfolio-store';
import { useAnalysisStore } from '@/lib/analyzer/stores/analysis-store';
import { useOptimizationStore } from '@/lib/analyzer/stores/optimization-store';
import InputStep from './steps/InputStep';
import AnalysisStep from './steps/AnalysisStep';
import OptimizationStep from './steps/OptimizationStep';
import CaptureStep from './steps/CaptureStep';

const STEPS = [
  { num: 1, label: 'Input' },
  { num: 2, label: 'Analysis' },
  { num: 3, label: 'Optimize' },
  { num: 4, label: 'Results' },
];

export default function AnalyzerWizard() {
  const [step, setStep] = useState<WizardStep>(1);
  const [templates, setTemplates] = useState<PortfolioTemplate[]>([]);
  const [tickerLookup, setTickerLookup] = useState<Record<string, TickerInfo>>({});
  const [dataLoaded, setDataLoaded] = useState(false);

  const holdings = usePortfolioStore(s => s.holdings);
  const isValid = usePortfolioStore(s => s.isValid);
  const analysisMetrics = useAnalysisStore(s => s.metrics);
  const returnsData = useAnalysisStore(s => s.returnsData);
  const setReturnsData = useAnalysisStore(s => s.setReturnsData);
  const runAnalysis = useAnalysisStore(s => s.runAnalysis);
  const computeGrid = useOptimizationStore(s => s.computeGrid);

  // Load static data
  useEffect(() => {
    Promise.all([
      fetch('/data/analyzer/metadata/templates.json').then(r => r.json()),
      fetch('/data/analyzer/metadata/ticker-lookup.json').then(r => r.json()),
      fetch('/data/analyzer/securities/returns-matrix.json').then(r => r.json()),
    ]).then(([tmpl, lookup, returns]) => {
      setTemplates(tmpl);
      setTickerLookup(lookup);
      setReturnsData(returns as ReturnsData);
      setDataLoaded(true);
    }).catch(err => console.error('Failed to load analyzer data:', err));
  }, [setReturnsData]);

  const handleAnalyze = useCallback(() => {
    if (!isValid || !returnsData) return;
    runAnalysis(holdings);
    computeGrid(holdings, returnsData);
    setStep(2);
  }, [holdings, isValid, returnsData, runAnalysis, computeGrid]);

  const reset = useCallback(() => {
    usePortfolioStore.getState().reset();
    useAnalysisStore.getState().reset();
    useOptimizationStore.getState().reset();
    setStep(1);
  }, []);

  if (!dataLoaded) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-gray-500">Loading analyzer data...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-2 md:gap-4">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex items-center gap-2 md:gap-4">
              <div className={`flex items-center gap-2 ${step >= s.num ? 'text-gold-500' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  ${step >= s.num ? 'bg-gold-500 text-navy-900' : 'bg-gray-200 text-gray-500'}`}>
                  {s.num}
                </div>
                <span className="hidden md:inline font-medium">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-8 md:w-16 h-0.5 ${step > s.num ? 'bg-gold-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      {step === 1 && (
        <InputStep
          templates={templates}
          tickerLookup={tickerLookup}
          onAnalyze={handleAnalyze}
        />
      )}
      {step === 2 && analysisMetrics && (
        <AnalysisStep
          onContinue={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && analysisMetrics && (
        <OptimizationStep
          onContinue={() => setStep(4)}
          onBack={() => setStep(2)}
        />
      )}
      {step === 4 && (
        <CaptureStep
          onReset={reset}
          onBack={() => setStep(3)}
        />
      )}
    </div>
  );
}
