import { create } from 'zustand';

import { AvailableCurrencies } from '@/types/Currency';

export interface CurrencyState {
  selectedCurrency: AvailableCurrencies;
  changeCurrency: (currency: AvailableCurrencies) => void;
  setCurrencies: (currencies: { usd: number; eur: number; rub: number }) => void;
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
  setCurrencies(currencies) {
    set({ rates: currencies, isCurrenciesExist: true });
  },
  rates: {
    usd: 0,
    eur: 0,
    rub: 0,
  },
  isCurrenciesExist: false,
}));
