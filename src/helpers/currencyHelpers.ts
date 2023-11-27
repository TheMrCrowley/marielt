import { CurrencyState } from '@/src/store/currency';
import { AvailableCurrencies } from '@/src/types/Currency';

import { convertToMonetary, convertToSign } from './formatters';

export const getPriceByCurrencyMonetary = (
  price: number,
  fromCurrency: AvailableCurrencies,
  toCurrency: AvailableCurrencies,
  rates: CurrencyState['rates'],
): string => {
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

export const getPriceByCurrencySign = (
  price: number,
  fromCurrency: AvailableCurrencies,
  toCurrency: AvailableCurrencies,
  rates: CurrencyState['rates'],
): string => {
  switch (toCurrency) {
    case 'EUR':
      return convertToSign(convertToEUR(price, fromCurrency, rates), 'EUR');
    case 'USD':
      return convertToSign(convertToUSD(price, fromCurrency, rates), 'USD');
    case 'RUB':
      return convertToSign(convertToRUB(price, fromCurrency, rates), 'RUB');
    case 'BYN':
      return convertToSign(convertToBYN(price, fromCurrency, rates), 'BYN');
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

export const convertToBYN = (
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
      return target;
  }
};
