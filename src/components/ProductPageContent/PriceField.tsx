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
}
const PriceField: FC<PriceFieldProps> = ({ price, initialCurrency }) => {
  const { rates } = useCurrency();

  const renderPrice = () => {
    if (!price) {
      return (
        <Typography
          fontSize={24}
          fontWeight="medium"
          color="text-[#343434]"
          className={clsx('bg-secondary', 'lg:px-6', 'lg:py-3', 'px-4', 'py-2', 'w-max')}
        >
          Договорная
        </Typography>
      );
    }
    return (
      <>
        <Typography
          fontSize={24}
          fontWeight="medium"
          color="text-[#343434]"
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
        'lg:justify-center',
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
