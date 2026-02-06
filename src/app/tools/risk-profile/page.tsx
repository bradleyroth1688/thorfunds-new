"use client";

import { useState } from "react";
import Link from "next/link";
import { Metadata } from "next";

// Note: Metadata must be in a server component, so we'll use generateMetadata or a parent layout
// For now, we'll set the title via useEffect

const questions = [
  {
    id: 1,
    question: "How would you describe your investment timeline?",
    options: [
      { text: "Less than 3 years", score: 1 },
      { text: "3-7 years", score: 2 },
      { text: "7-15 years", score: 3 },
      { text: "More than 15 years", score: 4 },
    ],
  },
  {
    id: 2,
    question: "If your portfolio dropped 20% in a month, what would you do?",
    options: [
      { text: "Sell everything immediately to prevent further losses", score: 1 },
      { text: "Sell some positions to reduce risk", score: 2 },
      { text: "Hold and wait for recovery", score: 3 },
      { text: "Buy more at the lower prices", score: 4 },
    ],
  },
  {
    id: 3,
    question: "What is your primary investment goal?",
    options: [
      { text: "Preserve capital - I can't afford to lose money", score: 1 },
      { text: "Generate income with minimal risk", score: 2 },
      { text: "Balanced growth with moderate risk", score: 3 },
      { text: "Maximum growth - I can handle volatility", score: 4 },
    ],
  },
  {
    id: 4,
    question: "How much of your total savings is this investment?",
    options: [
      { text: "More than 75% - Most of my savings", score: 1 },
      { text: "50-75% - A significant portion", score: 2 },
      { text: "25-50% - A moderate portion", score: 3 },
      { text: "Less than 25% - A small portion", score: 4 },
    ],
  },
  {
    id: 5,
    question: "How do you feel about market volatility?",
    options: [
      { text: "It keeps me up at night - I check my portfolio constantly", score: 1 },
      { text: "It makes me uncomfortable but I try not to look", score: 2 },
      { text: "It's part of investing - I accept it", score: 3 },
      { text: "I see it as an opportunity to buy low", score: 4 },
    ],
  },
  {
    id: 6,
    question: "What's your experience with stock market investing?",
    options: [
      { text: "None - I'm completely new to this", score: 1 },
      { text: "Limited - I've invested in a few funds", score: 2 },
      { text: "Moderate - I've been investing for several years", score: 3 },
      { text: "Extensive - I actively manage my portfolio", score: 4 },
    ],
  },
  {
    id: 7,
    question: "Which scenario would make you most comfortable?",
    options: [
      { text: "Low returns but almost no chance of losing money", score: 1 },
      { text: "Modest returns with small potential for losses", score: 2 },
      { text: "Above-average returns with moderate risk of losses", score: 3 },
      { text: "High returns with significant risk of losses", score: 4 },
    ],
  },
];

interface RiskProfile {
  name: string;
  description: string;
  fundRecommendation: string;
  fundTicker: string;
  allocation: { name: string; percentage: number; color: string }[];
}

const riskProfiles: Record<string, RiskProfile> = {
  conservative: {
    name: "Conservative Investor",
    description: "You prioritize capital preservation over growth. You're uncomfortable with market volatility and prefer steady, predictable returns even if they're lower.",
    fundRecommendation: "THLV is ideal for you. Its low-volatility strategy and ability to move to treasuries during downturns aligns with your risk tolerance.",
    fundTicker: "THLV",
    allocation: [
      { name: "THLV", percentage: 70, color: "bg-gold-500" },
      { name: "Bonds/Treasuries", percentage: 30, color: "bg-navy-600" },
    ],
  },
  moderate: {
    name: "Moderate Investor",
    description: "You seek a balance between growth and capital preservation. You can tolerate some market fluctuations but want protection during severe downturns.",
    fundRecommendation: "A combination of THLV and THIR would suit you well. THLV provides stability while THIR offers growth potential with built-in risk management.",
    fundTicker: "THLV + THIR",
    allocation: [
      { name: "THLV", percentage: 50, color: "bg-gold-500" },
      { name: "THIR", percentage: 40, color: "bg-navy-600" },
      { name: "Cash/Treasuries", percentage: 10, color: "bg-gray-400" },
    ],
  },
  growth: {
    name: "Growth-Oriented Investor",
    description: "You're focused on long-term wealth accumulation and can tolerate market volatility. You understand that higher potential returns come with higher risk.",
    fundRecommendation: "THIR is your primary choice. Its index rotation strategy captures market upside while the systematic risk management provides downside protection.",
    fundTicker: "THIR",
    allocation: [
      { name: "THIR", percentage: 70, color: "bg-navy-600" },
      { name: "THLV", percentage: 20, color: "bg-gold-500" },
      { name: "Individual Stocks", percentage: 10, color: "bg-green-500" },
    ],
  },
  aggressive: {
    name: "Aggressive Investor",
    description: "You have a high risk tolerance and a long investment horizon. You're comfortable with significant volatility in pursuit of maximum returns.",
    fundRecommendation: "THIR should be your core holding. Consider adding sector-specific exposure or individual stocks for additional growth potential.",
    fundTicker: "THIR",
    allocation: [
      { name: "THIR", percentage: 80, color: "bg-navy-600" },
      { name: "Growth Stocks", percentage: 15, color: "bg-green-500" },
      { name: "Cash", percentage: 5, color: "bg-gray-400" },
    ],
  },
};

function getProfile(score: number): RiskProfile {
  if (score <= 10) return riskProfiles.conservative;
  if (score <= 17) return riskProfiles.moderate;
  if (score <= 24) return riskProfiles.growth;
  return riskProfiles.aggressive;
}

export default function RiskProfileQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowEmailCapture(true);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, you'd send this to your email service
    console.log("Email captured:", email);
    setShowResults(true);
  };

  const handleSkipEmail = () => {
    setShowResults(true);
  };

  const totalScore = answers.reduce((sum, score) => sum + score, 0);
  const profile = getProfile(totalScore);
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setShowEmailCapture(false);
    setEmail("");
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-navy-900 py-12">
        <div className="container-narrow">
          {/* Results Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold-500 text-navy-900 mb-6">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-navy-800 dark:text-white mb-4">
              Your Risk Profile
            </h1>
            <p className="text-xl text-gold-600 dark:text-gold-500 font-semibold">
              {profile.name}
            </p>
          </div>

          {/* Profile Card */}
          <div className="card mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-navy-800 dark:text-white mb-2">
                {totalScore}<span className="text-2xl text-gray-400">/{questions.length * 4}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Risk Score</p>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              {profile.description}
            </p>

            <div className="bg-gold-50 dark:bg-navy-700 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-navy-800 dark:text-white mb-2">
                💡 Our Recommendation
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {profile.fundRecommendation}
              </p>
            </div>

            {/* Suggested Allocation */}
            <div className="mb-6">
              <h3 className="font-semibold text-navy-800 dark:text-white mb-4">
                Suggested Portfolio Allocation
              </h3>
              <div className="h-4 rounded-full overflow-hidden flex mb-4">
                {profile.allocation.map((item, index) => (
                  <div
                    key={index}
                    className={`${item.color} transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                {profile.allocation.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.name} ({item.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href={profile.fundTicker === "THLV + THIR" ? "/funds/compare" : `/funds/${profile.fundTicker.toLowerCase()}`}
                className="btn-primary flex-1 text-center"
              >
                View {profile.fundTicker} Details
              </Link>
              <Link 
                href="/tools/calculator"
                className="btn-outline flex-1 text-center"
              >
                Try Investment Calculator
              </Link>
            </div>
          </div>

          {/* Share & Restart */}
          <div className="text-center space-y-4">
            <button
              onClick={restartQuiz}
              className="text-gold-600 dark:text-gold-500 hover:underline text-sm"
            >
              Retake Quiz
            </button>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 p-4 bg-gray-100 dark:bg-navy-800 rounded-lg text-xs text-gray-500 dark:text-gray-400">
            <strong>Disclaimer:</strong> This quiz provides general guidance based on your responses and should not be considered personalized investment advice. Please consult with a financial advisor before making investment decisions. All investments involve risk, including potential loss of principal.
          </div>
        </div>
      </div>
    );
  }

  if (showEmailCapture) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-navy-900 py-12 flex items-center">
        <div className="container-narrow">
          <div className="card text-center max-w-md mx-auto animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-gold-100 dark:bg-gold-500/20 text-gold-600 dark:text-gold-400 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-navy-800 dark:text-white mb-2">
              Almost There!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enter your email to see your personalized results and receive investing insights tailored to your risk profile.
            </p>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-base"
                required
              />
              <button type="submit" className="btn-primary w-full">
                See My Results
              </button>
            </form>
            <button
              onClick={handleSkipEmail}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900 py-12">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-navy-800 dark:text-white mb-4">
            Risk Profile Assessment
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            Answer {questions.length} questions to discover your investment risk profile and get personalized fund recommendations.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="card animate-fade-in-up" key={currentQuestion}>
          <h2 className="text-xl md:text-2xl font-semibold text-navy-800 dark:text-white mb-6">
            {questions[currentQuestion].question}
          </h2>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.score)}
                className="w-full text-left p-4 rounded-lg border-2 border-gray-200 dark:border-navy-600 hover:border-gold-500 hover:bg-gold-50 dark:hover:bg-navy-700 transition-all duration-200 group"
              >
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-navy-700 group-hover:bg-gold-500 group-hover:text-white flex items-center justify-center font-semibold text-sm transition-colors">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-navy-800 dark:group-hover:text-white">
                    {option.text}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Back Button */}
        {currentQuestion > 0 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setCurrentQuestion(currentQuestion - 1);
                setAnswers(answers.slice(0, -1));
              }}
              className="text-gray-600 dark:text-gray-400 hover:text-gold-600 dark:hover:text-gold-500 text-sm"
            >
              ← Previous Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
