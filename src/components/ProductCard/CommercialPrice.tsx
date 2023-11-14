'use client';

import clsx from 'clsx';
import React from 'react';

import Typography from '@/src/components/common/Typography';
import { getPriceByCurrencyMonetary, getPriceByCurrencySign } from '@/src/helpers/currencyHelpers';
import { useCurrency } from '@/src/store/currency';
import { AvailableCurrencies } from '@/src/types/Currency';

interface CommercialPriceProps {
  totalPrice: {
    from?: string;
    to?: string;
  };
  pricePerMeter: {
    from?: string;
    to?: string;
  };
  initialCurrency: AvailableCurrencies;
}

const CommercialPrice = ({
  initialCurrency,
  pricePerMeter: { from: pricePerMeterFrom, to: pricePerMeterTo },
  totalPrice: { from, to },
}: CommercialPriceProps) => {
  const { selectedCurrency, rates } = useCurrency();

  if (!pricePerMeterFrom && !pricePerMeterTo && !from && !to) {
    return null;
  }

  const renderTotalPrice = () => {
    if (!from) {
      return null;
    }

    return (
      <div className={clsx('flex', 'justify-between', 'items-center')}>
        <Typography fontWeight="medium">
          {from && to && 'от'}{' '}
          {getPriceByCurrencyMonetary(+from, initialCurrency, selectedCurrency, rates)}
        </Typography>
        <Typography className={'opacity-50'}>
          {from && to && 'от'} {getPriceByCurrencyMonetary(+from, initialCurrency, 'BYN', rates)}
        </Typography>
      </div>
    );
  };

  const renderPricePerMeter = () => {
    if (!pricePerMeterFrom) {
      return null;
    }

    return (
      <div className={clsx('flex', 'justify-between', 'items-center')}>
        <Typography fontWeight="medium">
          {pricePerMeterFrom && pricePerMeterTo && 'от'}{' '}
          {getPriceByCurrencyMonetary(+pricePerMeterFrom, initialCurrency, selectedCurrency, rates)}{' '}
          <Typography fontSize={16} fontWeight="light" className="inline">
            за м²
          </Typography>
        </Typography>
        <Typography className={'opacity-50'}>
          {pricePerMeterFrom && pricePerMeterTo && 'от'}{' '}
          {getPriceByCurrencyMonetary(+pricePerMeterFrom, initialCurrency, 'BYN', rates)}
        </Typography>
      </div>
    );
  };

  return renderTotalPrice() || renderPricePerMeter();
};

export default CommercialPrice;
