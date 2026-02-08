'use client';

import { useState, useEffect, useCallback } from 'react';
import { WizardStep, ReturnsData, PortfolioTemplate, TickerInfo } from '@/lib/analyzer/types';
import { usePortfolioStore } from '@/lib/analyzer/stores/portfolio-store';
import { useAnalysisStore } from '@/lib/analyzer/stores/analysis-store';
import { useOptimizationStore } from '@/lib/analyzer/stores/optimization-store';
import RiskScoreStep from './steps/RiskScoreStep';
import InputStep from './steps/InputStep';
import AnalysisStep from './steps/AnalysisStep';
import OptimizationStep from './steps/OptimizationStep';
import LeadGateStep from './steps/LeadGateStep';

const STEPS = [
  { num: 1, label: 'Risk Score' },
  { num: 2, label: 'Portfolio' },
  { num: 3, label: 'Your Info' },
  { num: 4, label: 'Analysis' },
  { num: 5, label: 'Optimize' },
];

export default function AnalyzerWizard() {
  const [step, setStep] = useState(1);
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

  // Run analysis when entering step 4 (after lead capture)
  const handleLeadCaptured = useCallback(() => {
    if (!isValid || !returnsData) return;
    runAnalysis(holdings);
    computeGrid(holdings, returnsData);
    setStep(4);
  }, [holdings, isValid, returnsData, runAnalysis, computeGrid]);

  // Go to lead gate after portfolio input
  const handlePortfolioComplete = useCallback(() => {
    setStep(3);
  }, []);

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
        <div className="flex items-center gap-1 md:gap-3">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex items-center gap-1 md:gap-3">
              <div className={`flex items-center gap-1.5 ${step >= s.num ? 'text-gold-500' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  ${step >= s.num ? 'bg-gold-500 text-navy-900' : 'bg-gray-200 text-gray-500'}`}>
                  {s.num}
                </div>
                <span className="hidden md:inline font-medium text-sm">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-6 md:w-12 h-0.5 ${step > s.num ? 'bg-gold-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {step === 1 && (
        <RiskScoreStep onContinue={() => setStep(2)} />
      )}
      {step === 2 && (
        <InputStep
          templates={templates}
          tickerLookup={tickerLookup}
          onAnalyze={handlePortfolioComplete}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <LeadGateStep
          onContinue={handleLeadCaptured}
          onBack={() => setStep(2)}
        />
      )}
      {step === 4 && analysisMetrics && (
        <AnalysisStep
          onContinue={() => setStep(5)}
          onBack={() => setStep(2)}
        />
      )}
      {step === 5 && analysisMetrics && (
        <OptimizationStep
          onContinue={reset}
          onBack={() => setStep(4)}
        />
      )}
    </div>
  );
}
