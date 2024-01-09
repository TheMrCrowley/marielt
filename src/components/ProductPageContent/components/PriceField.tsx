'use client';

import clsx from 'clsx';
import { FC } from 'react';

import Typography from '@/src/components/common/Typography/Typography';
import { getPriceByCurrencyMonetary } from '@/src/helpers/currencyHelpers';
import { useCurrency } from '@/src/store/currency';
import { AvailableCurrencies } from '@/src/types/Currency';

interface PriceFieldProps {
  price: number;
  initialCurrency: AvailableCurrencies;
  totalArea?: string;
}
const PriceField: FC<PriceFieldProps> = ({ price, initialCurrency, totalArea }) => {
  const { rates } = useCurrency();

  const renderPrice = () => {
    if (!price) {
      return (
        <Typography
          fontSize={24}
          fontWeight="medium"
          color="text-primary-medium"
          className={clsx('bg-secondary', 'lg:px-6', 'lg:py-3', 'px-4', 'py-2', 'w-max')}
        >
          Договорная
        </Typography>
      );
    }

    if (totalArea) {
      return (
        <div
          className={clsx(
            'grid',
            'gap-4',
            'grid-rows-2',
            'grid-flow-col',
            'my-4',
            'justify-items-center',
            'items-center',
          )}
        >
          <Typography
            fontSize={24}
            fontWeight="medium"
            color="text-primary-medium"
            className={clsx('bg-secondary', 'lg:px-6', 'lg:py-3', 'px-4', 'py-2', 'w-max')}
          >
            {getPriceByCurrencyMonetary(price, initialCurrency, initialCurrency, rates)}
          </Typography>

          <Typography fontSize={20} color="text-[#E3C496B2]">
            {getPriceByCurrencyMonetary(
              price / +totalArea,
              initialCurrency,
              initialCurrency,
              rates,
            )}
            <span className="text-base"> за м²</span>
          </Typography>
          <Typography fontSize={24}>
            {getPriceByCurrencyMonetary(price, initialCurrency, 'BYN', rates)}
          </Typography>
          <Typography fontSize={20} color="text-[#E3C496B2]">
            {getPriceByCurrencyMonetary(price / +totalArea, initialCurrency, 'BYN', rates)}
            <span className="text-base"> за м²</span>
          </Typography>
        </div>
      );
    }

    return (
      <>
        <Typography
          fontSize={24}
          fontWeight="medium"
          color="text-primary-medium"
          className={clsx('bg-secondary', 'lg:px-6', 'lg:py-3', 'px-4', 'py-2', 'w-max')}
        >
          {getPriceByCurrencyMonetary(price, initialCurrency, initialCurrency, rates)}
        </Typography>
        <Typography fontSize={24}>
          {getPriceByCurrencyMonetary(price, initialCurrency, 'BYN', rates)}
        </Typography>
      </>
    );
  };

  return (
    <div
      className={clsx(
        'flex',

        'justify-start',
        'items-center',
        'flex-wrap',
        'lg:gap-3',
        'gap-2',
        'my-auto',
      )}
    >
      {renderPrice()}
    </div>
  );
};

export default PriceField;
