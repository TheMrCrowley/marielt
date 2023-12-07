'use client';

import clsx from 'clsx';
import React from 'react';

import Typography from '@/src/components/common/Typography';
import { getPriceByCurrencyMonetary } from '@/src/helpers/currencyHelpers';
import { useCurrency } from '@/src/store/currency';
import { AvailableCurrencies } from '@/src/types/Currency';

interface CommercialPriceProps {
  totalPrice?: {
    from?: string;
    to?: string;
  };
  pricePerMeter?: {
    from?: string;
    to?: string;
  };
  initialCurrency: AvailableCurrencies;
}

const CommercialPrice = ({ initialCurrency, pricePerMeter, totalPrice }: CommercialPriceProps) => {
  const { selectedCurrency, rates } = useCurrency();

  if (!pricePerMeter?.from && !pricePerMeter?.to && !totalPrice?.from && !totalPrice?.to) {
    return null;
  }

  const renderTotalPrice = () => {
    if (!totalPrice?.from) {
      return null;
    }

    return (
      <div className={clsx('flex', 'justify-between', 'items-center')}>
        <Typography fontWeight="medium">
          {totalPrice.from && totalPrice.to && 'от'}{' '}
          {getPriceByCurrencyMonetary(+totalPrice.from, initialCurrency, selectedCurrency, rates)}
        </Typography>
        <Typography className={'opacity-50'}>
          {totalPrice.from && totalPrice.to && 'от'}{' '}
          {getPriceByCurrencyMonetary(+totalPrice.from, initialCurrency, 'BYN', rates)}
        </Typography>
      </div>
    );
  };

  const renderPricePerMeter = () => {
    if (!pricePerMeter?.from) {
      return null;
    }

    return (
      <div className={clsx('flex', 'justify-between', 'items-center')}>
        <Typography fontWeight="medium">
          {pricePerMeter.from && pricePerMeter.to && 'от'}{' '}
          {getPriceByCurrencyMonetary(
            +pricePerMeter.from,
            initialCurrency,
            selectedCurrency,
            rates,
          )}{' '}
          <span className="font-light md:text-base text-sm">за м²</span>
        </Typography>
        <Typography className={'opacity-50'}>
          {pricePerMeter.from && pricePerMeter.to && 'от'}{' '}
          {getPriceByCurrencyMonetary(+pricePerMeter.from, initialCurrency, 'BYN', rates)}
        </Typography>
      </div>
    );
  };

  return renderTotalPrice() || renderPricePerMeter();
};

export default CommercialPrice;
