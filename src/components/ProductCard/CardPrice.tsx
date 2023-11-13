'use client';

import clsx from 'clsx';
import React from 'react';

import Typography from '@/src/components/common/Typography';
import { getPriceByCurrencyMonetary } from '@/src/helpers/currencyHelpers';
import { CurrencyState } from '@/src/store/currency';
import { AvailableCurrencies } from '@/src/types/Currency';

interface CardPriceProps {
  selectedCurrency: AvailableCurrencies;
  initialCurrency: AvailableCurrencies;
  price?: string;
  rates: CurrencyState['rates'];
}

const CardPrice = ({ price, initialCurrency, rates, selectedCurrency }: CardPriceProps) => {
  if (!price) {
    return null;
  }

  return (
    <div className={clsx('flex', 'justify-between', 'items-center')}>
      <Typography fontWeight="medium">
        {getPriceByCurrencyMonetary(+price, initialCurrency, selectedCurrency, rates)}
      </Typography>
      <Typography className={'opacity-50'}>
        {getPriceByCurrencyMonetary(+price, initialCurrency, 'BYN', rates)}
      </Typography>
    </div>
  );
};

export default CardPrice;
