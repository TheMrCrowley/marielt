import { CurrencyState } from '@/store/currency';
import { AvailableCurrencies } from '@/types/Currency';

import { convertToMonetary } from './formatters';

export const getPriceByCurrencyMonetary = (
  price: number,
  fromCurrency: AvailableCurrencies,
  toCurrency: AvailableCurrencies,
  rates: CurrencyState['rates'],
): string => {
  // console.log(price, fromCurrency, toCurrency, rates);
  switch (toCurrency) {
    case 'EUR':
      return convertToMonetary(convertToEUR(price, fromCurrency, rates), 'EUR');
    case 'USD':
      return convertToMonetary(convertToUSD(price, fromCurrency, rates), 'USD');
    case 'RUB':
      return convertToMonetary(convertToRUB(price, fromCurrency, rates), 'RUB');
    case 'BYN':
      return convertToMonetary(convertToBYN(price, fromCurrency, rates), 'BYN');
    default:
      return null as never;
  }
};

export const getPriceByCurrency = (
  price: string,
  fromCurrency: AvailableCurrencies,
  toCurrency: AvailableCurrencies,
  rates: CurrencyState['rates'],
): string => {
  // console.log(price, fromCurrency, toCurrency, rates);
  if (!price) {
    return '';
  }

  switch (toCurrency) {
    case 'EUR':
      return convertToEUR(+price, fromCurrency, rates).toFixed(0);
    case 'USD':
      return convertToUSD(+price, fromCurrency, rates).toFixed(0);
    case 'RUB':
      return convertToRUB(+price, fromCurrency, rates).toFixed(0);
    case 'BYN':
      return convertToBYN(+price, fromCurrency, rates).toFixed(0);
    default:
      return null as never;
  }
};

const convertToEUR = (
  target: number,
  fromCurrency: AvailableCurrencies,
  rates: CurrencyState['rates'],
): number => {
  switch (fromCurrency) {
    case 'USD':
      return (target * rates.usd) / rates.eur;
    case 'RUB':
      return (target * rates.rub) / rates.eur;
    default:
      return target;
  }
};

const convertToUSD = (
  target: number,
  fromCurrency: AvailableCurrencies,
  rates: CurrencyState['rates'],
): number => {
  switch (fromCurrency) {
    case 'EUR':
      return (target * rates.eur) / rates.usd;
    case 'RUB':
      return (target * rates.rub) / rates.usd;
    default:
      return target;
  }
};

const convertToRUB = (
  target: number,
  fromCurrency: AvailableCurrencies,
  rates: CurrencyState['rates'],
): number => {
  switch (fromCurrency) {
    case 'EUR':
      return (target * rates.eur) / rates.rub;
    case 'USD':
      return (target * rates.usd) / rates.rub;
    default:
      return target;
  }
};

const convertToBYN = (
  target: number,
  fromCurrency: AvailableCurrencies,
  rates: CurrencyState['rates'],
): number => {
  switch (fromCurrency) {
    case 'EUR':
      return target * rates.eur;
    case 'USD':
      return target * rates.usd;
    case 'RUB':
      return target * rates.rub;
    default:
      return null as never;
  }
};
