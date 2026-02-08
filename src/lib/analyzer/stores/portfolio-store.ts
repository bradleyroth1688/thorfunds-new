'use client';

import { create } from 'zustand';
import { Holding, InputMode, PortfolioTemplate } from '../types';

interface PortfolioState {
  holdings: Holding[];
  inputMode: InputMode;
  isValid: boolean;
  validationErrors: string[];
  totalAllocation: number;

  setHoldings: (holdings: Holding[]) => void;
  addHolding: (holding: Holding) => void;
  removeHolding: (index: number) => void;
  updateHolding: (index: number, holding: Partial<Holding>) => void;
  setFromTemplate: (template: PortfolioTemplate) => void;
  setInputMode: (mode: InputMode) => void;
  validate: () => boolean;
  reset: () => void;
}

function computeValidation(holdings: Holding[]) {
  const errors: string[] = [];
  const total = holdings.reduce((s, h) => s + h.allocation, 0);
  
  if (holdings.length === 0) errors.push('Add at least one holding');
  if (Math.abs(total - 100) > 1) errors.push(`Allocations sum to ${total.toFixed(1)}%, must be ~100%`);
  for (const h of holdings) {
    if (!h.ticker) errors.push('All holdings must have a ticker');
    if (h.allocation <= 0) errors.push(`${h.ticker}: allocation must be > 0`);
  }
  
  return { errors, total, isValid: errors.length === 0 };
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  holdings: [],
  inputMode: 'manual',
  isValid: false,
  validationErrors: [],
  totalAllocation: 0,

  setHoldings: (holdings) => {
    const v = computeValidation(holdings);
    set({ holdings, isValid: v.isValid, validationErrors: v.errors, totalAllocation: v.total });
  },

  addHolding: (holding) => {
    const holdings = [...get().holdings, holding];
    const v = computeValidation(holdings);
    set({ holdings, isValid: v.isValid, validationErrors: v.errors, totalAllocation: v.total });
  },

  removeHolding: (index) => {
    const holdings = get().holdings.filter((_, i) => i !== index);
    const v = computeValidation(holdings);
    set({ holdings, isValid: v.isValid, validationErrors: v.errors, totalAllocation: v.total });
  },

  updateHolding: (index, partial) => {
    const holdings = get().holdings.map((h, i) => i === index ? { ...h, ...partial } : h);
    const v = computeValidation(holdings);
    set({ holdings, isValid: v.isValid, validationErrors: v.errors, totalAllocation: v.total });
  },

  setFromTemplate: (template) => {
    const v = computeValidation(template.holdings);
    set({
      holdings: [...template.holdings],
      inputMode: 'template',
      isValid: v.isValid,
      validationErrors: v.errors,
      totalAllocation: v.total,
    });
  },

  setInputMode: (mode) => set({ inputMode: mode }),

  validate: () => {
    const v = computeValidation(get().holdings);
    set({ isValid: v.isValid, validationErrors: v.errors, totalAllocation: v.total });
    return v.isValid;
  },

  reset: () => set({
    holdings: [],
    inputMode: 'manual',
    isValid: false,
    validationErrors: [],
    totalAllocation: 0,
  }),
}));
