type AvailableCurrencies = 'USD' | 'EUR' | 'BYN';

const getFormatterByValueType = (value: number, options: Record<string, string | number>) => {
  return;
};

export const convertToMonetary = (value: number, type: AvailableCurrencies) => {
  return new Intl.NumberFormat('by-BY', {
    currency: type,
    style: 'currency',
    currencyDisplay: 'code',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
