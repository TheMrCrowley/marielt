'use client';

import clsx from 'clsx';
import React from 'react';

import { AvailableCurrencies } from '@/types/Currency';

interface CurrencySwitchProps {
  selectedCurrency: AvailableCurrencies;
  onChange: (currency: AvailableCurrencies) => void;
}

const CurrencySwitch = ({ onChange, selectedCurrency }: CurrencySwitchProps) => {
  const renderCurrency = (currencyType: AvailableCurrencies) => {
    const isSelected = currencyType === selectedCurrency;
    return (
      <p
        className={clsx(
          isSelected ? 'text-secondary' : 'text-[#B1B1B1]',
          isSelected ? 'cursor-default' : 'cursor-pointer',
          isSelected ? 'pointer-events-none' : 'pointer-events-auto',
        )}
        onClick={() => onChange(currencyType)}
      >
        {currencyType}
      </p>
    );
  };

  return (
    <div className={clsx('flex', 'text-white', 'text-[20px]', 'gap-x-1')}>
      {renderCurrency('EUR')} / {renderCurrency('USD')} / {renderCurrency('RUB')}
    </div>
  );
};

export default CurrencySwitch;
