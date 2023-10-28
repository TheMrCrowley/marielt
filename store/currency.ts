import { create } from 'zustand';

import { AvailableCurrencies } from '@/types/Currency';

import { getCurrencies } from './../services/getCurrency';

export interface CurrencyState {
  selectedCurrency: AvailableCurrencies;
  changeCurrency: (currency: AvailableCurrencies) => void;
  getCurrencies: () => Promise<void>;
  rates: {
    usd: number;
    eur: number;
    rub: number;
  };
  isCurrenciesExist: boolean;
}

export const useCurrency = create<CurrencyState>((set) => ({
  selectedCurrency: 'USD',
  changeCurrency: (currency) => set({ selectedCurrency: currency }),
  getCurrencies: async () => {
    const { eur, rub, usd } = await getCurrencies();

    set({
      rates: { eur, rub, usd },
      isCurrenciesExist: true,
    });
  },
  rates: {
    usd: 0,
    eur: 0,
    rub: 0,
  },
  isCurrenciesExist: false,
}));
