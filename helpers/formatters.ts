import { AvailableCurrencies } from '@/types/Currency';

export const convertToMonetary = (value: number, type: AvailableCurrencies) => {
  return new Intl.NumberFormat('by-BY', {
    currency: type,
    style: 'currency',
    currencyDisplay: 'code',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
