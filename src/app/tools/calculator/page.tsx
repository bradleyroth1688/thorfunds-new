"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

// Historical returns data (hypothetical - replace with actual data)
const historicalReturns = {
  THIR: {
    "2020": 15.2,
    "2021": 18.7,
    "2022": -4.3,
    "2023": 21.5,
    "2024": 12.8,
  },
  THLV: {
    "2020": 8.5,
    "2021": 11.2,
    "2022": 2.1,
    "2023": 14.3,
    "2024": 9.7,
  },
  SPY: {
    "2020": 18.4,
    "2021": 28.7,
    "2022": -18.1,
    "2023": 26.3,
    "2024": 25.0,
  },
};

interface CalculationResult {
  finalValue: number;
  totalContributions: number;
  totalEarnings: number;
  yearByYear: Array<{
    year: number;
    startValue: number;
    contribution: number;
    earnings: number;
    endValue: number;
  }>;
}

function calculateGrowth(
  initialInvestment: number,
  monthlyContribution: number,
  annualReturn: number,
  years: number
): CalculationResult {
  const monthlyReturn = annualReturn / 100 / 12;
  const yearByYear: CalculationResult["yearByYear"] = [];
  
  let currentValue = initialInvestment;
  let totalContributions = initialInvestment;
  
  for (let year = 1; year <= years; year++) {
    const startValue = currentValue;
    let yearlyContribution = 0;
    
    for (let month = 1; month <= 12; month++) {
      currentValue += monthlyContribution;
      yearlyContribution += monthlyContribution;
      currentValue *= (1 + monthlyReturn);
    }
    
    totalContributions += yearlyContribution;
    
    yearByYear.push({
      year,
      startValue,
      contribution: yearlyContribution,
      earnings: currentValue - startValue - yearlyContribution,
      endValue: currentValue,
    });
  }
  
  return {
    finalValue: currentValue,
    totalContributions,
    totalEarnings: currentValue - totalContributions,
    yearByYear,
  };
}

export default function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(10);
  const [selectedFund, setSelectedFund] = useState<"THIR" | "THLV">("THIR");
  const [customReturn, setCustomReturn] = useState<number | null>(null);
  const [showComparison, setShowComparison] = useState(true);

  // Calculate average historical return
  const getAverageReturn = (fund: keyof typeof historicalReturns) => {
    const returns = Object.values(historicalReturns[fund]);
    return returns.reduce((sum, r) => sum + r, 0) / returns.length;
  };

  const expectedReturn = customReturn ?? getAverageReturn(selectedFund);
  const spyReturn = getAverageReturn("SPY");

  // Calculate results
  const results = useMemo(() => {
    return {
      selected: calculateGrowth(initialInvestment, monthlyContribution, expectedReturn, years),
      spy: calculateGrowth(initialInvestment, monthlyContribution, spyReturn, years),
      conservative: calculateGrowth(initialInvestment, monthlyContribution, expectedReturn - 3, years),
      optimistic: calculateGrowth(initialInvestment, monthlyContribution, expectedReturn + 3, years),
    };
  }, [initialInvestment, monthlyContribution, expectedReturn, spyReturn, years]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const maxValue = Math.max(
    results.selected.finalValue,
    results.spy.finalValue,
    results.optimistic.finalValue
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900 py-12">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-navy-800 dark:text-white mb-4">
            Investment Growth Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See how your investment could grow over time with THOR's risk-managed ETFs compared to traditional buy-and-hold investing.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="text-xl font-semibold text-navy-800 dark:text-white mb-6">
                Investment Details
              </h2>

              {/* Fund Selection */}
              <div className="mb-6">
                <label className="input-label">Select Fund</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedFund("THIR")}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedFund === "THIR"
                        ? "border-gold-500 bg-gold-50 dark:bg-gold-500/10"
                        : "border-gray-200 dark:border-navy-600 hover:border-gold-300"
                    }`}
                  >
                    <div className="font-bold text-navy-800 dark:text-white">THIR</div>
                    <div className="text-xs text-gray-500">Index Rotation</div>
                  </button>
                  <button
                    onClick={() => setSelectedFund("THLV")}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedFund === "THLV"
                        ? "border-gold-500 bg-gold-50 dark:bg-gold-500/10"
                        : "border-gray-200 dark:border-navy-600 hover:border-gold-300"
                    }`}
                  >
                    <div className="font-bold text-navy-800 dark:text-white">THLV</div>
                    <div className="text-xs text-gray-500">Low Volatility</div>
                  </button>
                </div>
              </div>

              {/* Initial Investment */}
              <div className="mb-6">
                <label className="input-label">
                  Initial Investment
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(Number(e.target.value))}
                    className="input-base pl-8"
                    min={0}
                    step={1000}
                  />
                </div>
                <input
                  type="range"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                  min={0}
                  max={500000}
                  step={1000}
                  className="w-full mt-2 accent-gold-500"
                />
              </div>

              {/* Monthly Contribution */}
              <div className="mb-6">
                <label className="input-label">
                  Monthly Contribution
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="input-base pl-8"
                    min={0}
                    step={100}
                  />
                </div>
                <input
                  type="range"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  min={0}
                  max={5000}
                  step={100}
                  className="w-full mt-2 accent-gold-500"
                />
              </div>

              {/* Time Horizon */}
              <div className="mb-6">
                <label className="input-label">
                  Time Horizon: <span className="text-gold-600">{years} years</span>
                </label>
                <input
                  type="range"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  min={1}
                  max={30}
                  step={1}
                  className="w-full accent-gold-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 year</span>
                  <span>30 years</span>
                </div>
              </div>

              {/* Expected Return */}
              <div className="mb-6">
                <label className="input-label">
                  Expected Annual Return
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={customReturn ?? expectedReturn.toFixed(1)}
                    onChange={(e) => setCustomReturn(e.target.value ? Number(e.target.value) : null)}
                    className="input-base text-center"
                    min={-20}
                    max={50}
                    step={0.5}
                  />
                  <span className="text-gray-500">%</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Based on {selectedFund} historical 5-year average: {getAverageReturn(selectedFund).toFixed(1)}%
                </p>
              </div>

              {/* Comparison Toggle */}
              <div className="flex items-center gap-2 mb-6">
                <input
                  type="checkbox"
                  id="showComparison"
                  checked={showComparison}
                  onChange={(e) => setShowComparison(e.target.checked)}
                  className="w-4 h-4 accent-gold-500"
                />
                <label htmlFor="showComparison" className="text-sm text-gray-700 dark:text-gray-300">
                  Compare with S&P 500 (SPY)
                </label>
              </div>

              <Link href="/tools/risk-profile" className="btn-outline w-full text-center">
                Take Risk Profile Quiz
              </Link>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="card text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Final Value</div>
                <div className="text-2xl md:text-3xl font-bold text-gold-600">
                  <AnimatedCounter 
                    end={results.selected.finalValue} 
                    prefix="$" 
                    duration={1500}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">with {selectedFund}</div>
              </div>
              <div className="card text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Contributions</div>
                <div className="text-2xl md:text-3xl font-bold text-navy-700 dark:text-white">
                  {formatCurrency(results.selected.totalContributions)}
                </div>
                <div className="text-xs text-gray-500 mt-1">your money in</div>
              </div>
              <div className="card text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Investment Earnings</div>
                <div className="text-2xl md:text-3xl font-bold text-green-600">
                  <AnimatedCounter 
                    end={results.selected.totalEarnings} 
                    prefix="$" 
                    duration={1500}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">growth from investing</div>
              </div>
            </div>

            {/* Visual Chart */}
            <div className="card">
              <h3 className="text-lg font-semibold text-navy-800 dark:text-white mb-6">
                Projected Growth Over {years} Years
              </h3>
              
              {/* Simple bar visualization */}
              <div className="space-y-4">
                {/* Selected Fund */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-navy-800 dark:text-white">{selectedFund}</span>
                    <span className="text-gold-600 font-bold">{formatCurrency(results.selected.finalValue)}</span>
                  </div>
                  <div className="h-8 bg-gray-100 dark:bg-navy-700 rounded-lg overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-gold-400 to-gold-500 rounded-lg transition-all duration-1000"
                      style={{ width: `${(results.selected.finalValue / maxValue) * 100}%` }}
                    />
                  </div>
                </div>

                {/* SPY Comparison */}
                {showComparison && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-navy-800 dark:text-white">S&P 500 (SPY)</span>
                      <span className="text-navy-600 dark:text-gray-300 font-bold">{formatCurrency(results.spy.finalValue)}</span>
                    </div>
                    <div className="h-8 bg-gray-100 dark:bg-navy-700 rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-navy-500 to-navy-600 rounded-lg transition-all duration-1000"
                        style={{ width: `${(results.spy.finalValue / maxValue) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Scenario Range */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-navy-600">
                  <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                    Scenario Range (±3% annual return)
                  </h4>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Conservative</div>
                      <div className="font-semibold text-navy-800 dark:text-white">
                        {formatCurrency(results.conservative.finalValue)}
                      </div>
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-navy-700 rounded-full relative">
                      <div 
                        className="absolute h-4 w-4 bg-gold-500 rounded-full top-1/2 -translate-y-1/2 shadow-lg"
                        style={{ 
                          left: `${((results.selected.finalValue - results.conservative.finalValue) / (results.optimistic.finalValue - results.conservative.finalValue)) * 100}%` 
                        }}
                      />
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Optimistic</div>
                      <div className="font-semibold text-navy-800 dark:text-white">
                        {formatCurrency(results.optimistic.finalValue)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Year-by-Year Breakdown */}
            <div className="card">
              <h3 className="text-lg font-semibold text-navy-800 dark:text-white mb-4">
                Year-by-Year Breakdown
              </h3>
              <div className="overflow-x-auto">
                <table className="table-modern w-full">
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th className="text-right">Start Value</th>
                      <th className="text-right">Contributions</th>
                      <th className="text-right">Earnings</th>
                      <th className="text-right">End Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.selected.yearByYear.map((row) => (
                      <tr key={row.year}>
                        <td className="font-medium">{row.year}</td>
                        <td className="text-right">{formatCurrency(row.startValue)}</td>
                        <td className="text-right text-navy-600 dark:text-gray-400">
                          +{formatCurrency(row.contribution)}
                        </td>
                        <td className={`text-right ${row.earnings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {row.earnings >= 0 ? '+' : ''}{formatCurrency(row.earnings)}
                        </td>
                        <td className="text-right font-semibold">{formatCurrency(row.endValue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Insights */}
            <div className="card bg-gold-50 dark:bg-navy-800 border border-gold-200 dark:border-gold-500/30">
              <h3 className="text-lg font-semibold text-navy-800 dark:text-white mb-4">
                💡 Key Insights
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-gold-500 mt-1">•</span>
                  <span>
                    <strong>Power of consistent investing:</strong> Your {formatCurrency(monthlyContribution)}/month 
                    contributions will add up to {formatCurrency(monthlyContribution * 12 * years)} over {years} years.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500 mt-1">•</span>
                  <span>
                    <strong>Compound growth:</strong> Roughly {Math.round((results.selected.totalEarnings / results.selected.totalContributions) * 100)}% 
                    of your final value will come from investment earnings.
                  </span>
                </li>
                {showComparison && results.selected.finalValue < results.spy.finalValue && (
                  <li className="flex items-start gap-2">
                    <span className="text-gold-500 mt-1">•</span>
                    <span>
                      <strong>Risk vs. Reward:</strong> While SPY shows higher projected returns in this scenario, 
                      {selectedFund}'s risk management can significantly reduce drawdowns during bear markets.
                    </span>
                  </li>
                )}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/funds/${selectedFund.toLowerCase()}`} className="btn-primary flex-1 text-center">
                Learn More About {selectedFund}
              </Link>
              <Link href="/funds/compare" className="btn-outline flex-1 text-center">
                Compare All Funds
              </Link>
            </div>

            {/* Disclaimer */}
            <div className="p-4 bg-gray-100 dark:bg-navy-800 rounded-lg text-xs text-gray-500 dark:text-gray-400">
              <strong>Important Disclaimer:</strong> This calculator is for illustrative purposes only and uses hypothetical 
              return assumptions. Actual results will vary. Past performance does not guarantee future results. 
              All investments involve risk, including potential loss of principal. Consult a financial advisor 
              before making investment decisions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
