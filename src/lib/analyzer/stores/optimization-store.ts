'use client';

import { create } from 'zustand';
import { OptimizationResult, OptimizationMode, Holding, ReturnsData, PortfolioMetrics } from '../types';
import { computeOptimizationGrid, findOptimal } from '../optimization';

interface OptimizationState {
  grid: OptimizationResult[];
  sliderValue: number;
  currentResult: OptimizationResult | null;
  mode: OptimizationMode;
  targetScore: number;
  isComputed: boolean;

  computeGrid: (holdings: Holding[], returnsData: ReturnsData) => void;
  setSliderValue: (value: number) => void;
  setMode: (mode: OptimizationMode) => void;
  setTargetScore: (score: number) => void;
  findOptimalAllocation: (currentMetrics: PortfolioMetrics) => void;
  reset: () => void;
}

export const useOptimizationStore = create<OptimizationState>((set, get) => ({
  grid: [],
  sliderValue: 0,
  currentResult: null,
  mode: 'min-risk',
  targetScore: 50,
  isComputed: false,

  computeGrid: (holdings, returnsData) => {
    const grid = computeOptimizationGrid(holdings, returnsData);
    set({ grid, isComputed: true, sliderValue: 0, currentResult: grid[0] });
  },

  setSliderValue: (value) => {
    const grid = get().grid;
    const idx = Math.round(Math.max(0, Math.min(100, value)));
    set({ sliderValue: idx, currentResult: grid[idx] || null });
  },

  setMode: (mode) => set({ mode }),
  setTargetScore: (score) => set({ targetScore: score }),

  findOptimalAllocation: (currentMetrics) => {
    const { grid, mode, targetScore } = get();
    if (grid.length === 0) return;
    const optimal = findOptimal(grid, mode, currentMetrics, targetScore);
    const idx = Math.round(optimal);
    set({ sliderValue: idx, currentResult: grid[idx] || null });
  },

  reset: () => set({
    grid: [],
    sliderValue: 0,
    currentResult: null,
    mode: 'min-risk',
    targetScore: 50,
    isComputed: false,
  }),
}));
