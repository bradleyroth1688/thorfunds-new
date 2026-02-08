'use client';

import { create } from 'zustand';
import { OptimizationResult, OptimizationMode, Holding, ReturnsData, PortfolioMetrics } from '../types';
import { computeOptimizationGrid, computeMetricsForAllocation, findOptimal } from '../optimization';

interface OptimizationState {
  grid: OptimizationResult[];
  sliderValue: number; // legacy total
  thirPct: number;
  thlvPct: number;
  currentResult: OptimizationResult | null;
  mode: OptimizationMode;
  targetScore: number;
  isComputed: boolean;
  originalHoldings: Holding[];
  returnsData: ReturnsData | null;

  computeGrid: (holdings: Holding[], returnsData: ReturnsData) => void;
  setSliderValue: (value: number) => void;
  setThirPct: (value: number) => void;
  setThlvPct: (value: number) => void;
  setMode: (mode: OptimizationMode) => void;
  setTargetScore: (score: number) => void;
  findOptimalAllocation: (currentMetrics: PortfolioMetrics) => void;
  reset: () => void;
}

export const useOptimizationStore = create<OptimizationState>((set, get) => ({
  grid: [],
  sliderValue: 0,
  thirPct: 0,
  thlvPct: 0,
  currentResult: null,
  mode: 'min-risk',
  targetScore: 50,
  isComputed: false,
  originalHoldings: [],
  returnsData: null,

  computeGrid: (holdings, returnsData) => {
    const grid = computeOptimizationGrid(holdings, returnsData);
    const initial = computeMetricsForAllocation(holdings, returnsData, 0, 0);
    set({
      grid,
      isComputed: true,
      sliderValue: 0,
      thirPct: 0,
      thlvPct: 0,
      currentResult: initial,
      originalHoldings: holdings,
      returnsData,
    });
  },

  setSliderValue: (value) => {
    const { originalHoldings, returnsData } = get();
    if (!returnsData) return;
    const v = Math.round(Math.max(0, Math.min(100, value)));
    const thirPct = v / 2;
    const thlvPct = v / 2;
    const result = computeMetricsForAllocation(originalHoldings, returnsData, thirPct, thlvPct);
    set({ sliderValue: v, thirPct, thlvPct, currentResult: result });
  },

  setThirPct: (value) => {
    const { thlvPct, originalHoldings, returnsData } = get();
    if (!returnsData) return;
    const v = Math.max(0, Math.min(50 - thlvPct, value));
    const result = computeMetricsForAllocation(originalHoldings, returnsData, v, thlvPct);
    set({ thirPct: v, sliderValue: v + thlvPct, currentResult: result });
  },

  setThlvPct: (value) => {
    const { thirPct, originalHoldings, returnsData } = get();
    if (!returnsData) return;
    const v = Math.max(0, Math.min(50 - thirPct, value));
    const result = computeMetricsForAllocation(originalHoldings, returnsData, thirPct, v);
    set({ thlvPct: v, sliderValue: thirPct + v, currentResult: result });
  },

  setMode: (mode) => set({ mode }),
  setTargetScore: (score) => set({ targetScore: score }),

  findOptimalAllocation: (currentMetrics) => {
    const { grid, mode, targetScore, originalHoldings, returnsData } = get();
    if (grid.length === 0 || !returnsData) return;
    const optimal = findOptimal(grid, mode, currentMetrics, targetScore);
    const result = computeMetricsForAllocation(originalHoldings, returnsData, optimal.thirPct, optimal.thlvPct);
    set({ sliderValue: optimal.thirPct + optimal.thlvPct, thirPct: optimal.thirPct, thlvPct: optimal.thlvPct, currentResult: result });
  },

  reset: () => set({
    grid: [],
    sliderValue: 0,
    thirPct: 0,
    thlvPct: 0,
    currentResult: null,
    mode: 'min-risk',
    targetScore: 50,
    isComputed: false,
    originalHoldings: [],
    returnsData: null,
  }),
}));
