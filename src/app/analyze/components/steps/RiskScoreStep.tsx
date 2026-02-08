'use client';

import { useState } from 'react';
import { usePortfolioStore } from '@/lib/analyzer/stores/portfolio-store';
import { RISK_PROVIDERS, getRiskProfile } from '@/lib/analyzer/risk-providers';

interface Props {
  onContinue: () => void;
}

export default function RiskScoreStep({ onContinue }: Props) {
  const { providerName, providerScore, normalizedScore, setProvider } = usePortfolioStore();
  const [showQuiz, setShowQuiz] = useState(false);

  const selectedProvider = RISK_PROVIDERS.find(p => p.id === providerName);
  const profile = normalizedScore ? getRiskProfile(normalizedScore) : null;
  const isNone = providerName === 'none';

  const handleProviderChange = (id: string) => {
    setShowQuiz(false);
    if (id === 'none') {
      setProvider('none', null);
    } else {
      setProvider(id, null);
    }
  };

  const handleScoreChange = (val: string) => {
    const num = parseFloat(val);
    if (isNaN(num)) {
      setProvider(providerName, null);
    } else {
      setProvider(providerName, num);
    }
  };

  // Quick risk quiz state
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);

  const quizQuestions = [
    {
      question: "How would you describe your investment timeline?",
      options: [
        { text: "Less than 3 years", score: 1 },
        { text: "3-7 years", score: 2 },
        { text: "7-15 years", score: 3 },
        { text: "More than 15 years", score: 4 },
      ],
    },
    {
      question: "If your portfolio dropped 20% in a month, what would you do?",
      options: [
        { text: "Sell everything immediately", score: 1 },
        { text: "Sell some to reduce risk", score: 2 },
        { text: "Hold and wait for recovery", score: 3 },
        { text: "Buy more at lower prices", score: 4 },
      ],
    },
    {
      question: "What is your primary investment goal?",
      options: [
        { text: "Preserve capital — I can't afford to lose money", score: 1 },
        { text: "Generate income with minimal risk", score: 2 },
        { text: "Balanced growth with moderate risk", score: 3 },
        { text: "Maximum growth — I can handle volatility", score: 4 },
      ],
    },
    {
      question: "How much of your total savings is this investment?",
      options: [
        { text: "More than 75%", score: 1 },
        { text: "50-75%", score: 2 },
        { text: "25-50%", score: 3 },
        { text: "Less than 25%", score: 4 },
      ],
    },
    {
      question: "Which scenario sounds most comfortable?",
      options: [
        { text: "Low returns, almost no chance of losing money", score: 1 },
        { text: "Modest returns with small potential for losses", score: 2 },
        { text: "Above-average returns with moderate risk", score: 3 },
        { text: "High returns with significant risk", score: 4 },
      ],
    },
  ];

  const handleQuizAnswer = (score: number) => {
    const newAnswers = [...quizAnswers, score];
    setQuizAnswers(newAnswers);

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Calculate score: map 5-20 range to 1-99
      const total = newAnswers.reduce((a, b) => a + b, 0);
      const normalized = Math.round(((total - 5) / 15) * 98 + 1);
      setProvider('nitrogen', normalized); // Use nitrogen scale since it's 1-99
      setShowQuiz(false);
    }
  };

  // Quiz UI
  if (showQuiz) {
    const q = quizQuestions[quizStep];
    const progress = ((quizStep + 1) / quizQuestions.length) * 100;

    return (
      <div className="max-w-2xl mx-auto animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="heading-2 text-navy-800">Quick Risk Assessment</h2>
          <button onClick={() => setShowQuiz(false)} className="text-sm text-gray-500 hover:text-gray-700">← Back</button>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Question {quizStep + 1} of {quizQuestions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gold-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="card p-8">
          <h3 className="text-xl font-semibold text-navy-800 mb-6">{q.question}</h3>
          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleQuizAnswer(opt.score)}
                className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-gold-500 hover:bg-gold-50 transition-all group"
              >
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-gold-500 group-hover:text-white flex items-center justify-center font-semibold text-sm transition-colors">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-gray-700 group-hover:text-navy-800">{opt.text}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {quizStep > 0 && (
          <button
            onClick={() => { setQuizStep(quizStep - 1); setQuizAnswers(quizAnswers.slice(0, -1)); }}
            className="mt-4 text-sm text-gray-500 hover:text-gold-600"
          >
            ← Previous Question
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <h2 className="heading-2 text-navy-800 text-center mb-2">Do you have a risk score?</h2>
      <p className="body-lg text-gray-600 text-center mb-8">
        Select your risk assessment provider and enter your score, or take a quick quiz.
      </p>

      <div className="card p-8">
        {/* Provider Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Risk Assessment Provider</label>
          <div className="grid grid-cols-1 gap-2">
            {RISK_PROVIDERS.map(p => (
              <button
                key={p.id}
                onClick={() => handleProviderChange(p.id)}
                className={`text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  providerName === p.id
                    ? 'border-gold-500 bg-gold-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-navy-800">{p.name}</span>
                  {p.id !== 'none' && (
                    <span className="text-xs text-gray-400">{p.unit} ({p.min}–{p.max})</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Score Input (when provider selected) */}
        {!isNone && providerName && selectedProvider && (
          <div className="mb-6 animate-fade-in-up">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your {selectedProvider.unit}
            </label>
            <input
              type="number"
              value={providerScore ?? ''}
              onChange={(e) => handleScoreChange(e.target.value)}
              min={selectedProvider.min}
              max={selectedProvider.max}
              step={selectedProvider.step || 1}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
              placeholder={`Enter your ${selectedProvider.unit} (${selectedProvider.min}–${selectedProvider.max})`}
            />
          </div>
        )}

        {/* Score Interpretation */}
        {profile && normalizedScore && (
          <div className="p-5 rounded-lg mb-6 animate-fade-in-up" style={{ backgroundColor: `${profile.color}12`, borderLeft: `4px solid ${profile.color}` }}>
            <div className="flex items-center gap-4 mb-3">
              <span className="text-3xl font-bold" style={{ color: profile.color }}>{normalizedScore}</span>
              <div>
                <div className="font-semibold text-navy-800 text-lg">{profile.label}</div>
                <div className="text-sm text-gray-500">Normalized Risk Score (1–99)</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <strong>Estimated 6-month downside:</strong> {profile.downside6m}
            </div>
          </div>
        )}

        {/* "Don't have one" → Take Quiz prompt */}
        {isNone && (
          <div className="text-center p-6 bg-gray-50 rounded-lg animate-fade-in-up">
            <p className="text-gray-600 mb-4">No problem — take a quick 5-question quiz to estimate your risk tolerance.</p>
            <button onClick={() => { setShowQuiz(true); setQuizStep(0); setQuizAnswers([]); }} className="btn-primary">
              Take Risk Quiz →
            </button>
            <p className="text-xs text-gray-400 mt-3">Takes about 1 minute</p>
          </div>
        )}
      </div>

      {/* Continue Button */}
      <div className="mt-8 text-center">
        <button
          onClick={onContinue}
          className="btn-primary btn-lg"
        >
          {normalizedScore ? 'Continue to Portfolio →' : 'Skip — Enter Portfolio →'}
        </button>
        {!normalizedScore && !isNone && (
          <p className="text-xs text-gray-400 mt-2">You can proceed without a risk score</p>
        )}
      </div>
    </div>
  );
}
