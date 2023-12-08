'use client';

import clsx from 'clsx';
import React from 'react';

import Typography from '@/src/components/common/Typography';
import { getPriceByCurrencyMonetary } from '@/src/helpers/currencyHelpers';
import { useCurrency } from '@/src/store/currency';
import { DetailedCommercialItem } from '@/src/types/Commercial';
import { AvailableCurrencies } from '@/src/types/Currency';

const getCommercialPriceValues = ({
  initialCurrency,
  priceMeter,
  rates,
  totalPrice,
}: {
  totalPrice: DetailedCommercialItem['totalPrice'];
  priceMeter: DetailedCommercialItem['pricePerMeter'];
  initialCurrency: AvailableCurrencies;
  rates: {
    usd: number;
    eur: number;
    rub: number;
  };
}): { main: string[]; additional: string[] | null } => {
  const result: { main: string[]; additional: string[] | null } = {
    main: [],

    additional: null,
  };

  if (totalPrice) {
    if (totalPrice.from && !totalPrice.to) {
      result.main.push(
        getPriceByCurrencyMonetary(+totalPrice.from, initialCurrency, initialCurrency, rates),
        getPriceByCurrencyMonetary(+totalPrice.from, initialCurrency, 'BYN', rates),
      );
    }

    if (totalPrice.from && totalPrice.to) {
      result.main.push(
        `${getPriceByCurrencyMonetary(
          +totalPrice.from,
          initialCurrency,
          initialCurrency,
          rates,
        )} - ${getPriceByCurrencyMonetary(
          +totalPrice.to,
          initialCurrency,
          initialCurrency,
          rates,
        )}`,
        getPriceByCurrencyMonetary(+totalPrice.from, initialCurrency, 'BYN', rates),
      );
    }

    if (priceMeter) {
      if (priceMeter.from && !priceMeter.to) {
        result.additional = [
          `${getPriceByCurrencyMonetary(
            +priceMeter.from,
            initialCurrency,
            initialCurrency,
            rates,
          )} за м²`,
          `${getPriceByCurrencyMonetary(+priceMeter.from, initialCurrency, 'BYN', rates)} за м²`,
        ];
      }
      if (priceMeter.from && priceMeter.to) {
        result.additional = [
          `${getPriceByCurrencyMonetary(
            +priceMeter.from,
            initialCurrency,
            initialCurrency,
            rates,
          )} - ${getPriceByCurrencyMonetary(
            +priceMeter.to,
            initialCurrency,
            initialCurrency,
            rates,
          )} за м²`,
          `${getPriceByCurrencyMonetary(+priceMeter.from, initialCurrency, 'BYN', rates)} за м²`,
        ];
      }
    }
  } else {
    if (priceMeter) {
      if (priceMeter.from && !priceMeter.to) {
        result.main.push(
          `${getPriceByCurrencyMonetary(
            +priceMeter.from,
            initialCurrency,
            initialCurrency,
            rates,
          )} за м²`,
          `${getPriceByCurrencyMonetary(+priceMeter.from, initialCurrency, 'BYN', rates)} за м²`,
        );
      }

      if (priceMeter.from && priceMeter.to) {
        result.main.push(
          `${getPriceByCurrencyMonetary(
            +priceMeter.from,
            initialCurrency,
            initialCurrency,
            rates,
          )} - ${getPriceByCurrencyMonetary(
            +priceMeter.to,
            initialCurrency,
            initialCurrency,
            rates,
          )} за м²`,
          `${getPriceByCurrencyMonetary(+priceMeter.from, initialCurrency, 'BYN', rates)} за м²`,
        );
      }
    }
  }

  return result;
};

const CommercialPriceField = ({
  priceMeter,
  totalPrice,
  initialCurrency,
}: {
  totalPrice: DetailedCommercialItem['totalPrice'];
  priceMeter: DetailedCommercialItem['pricePerMeter'];
  initialCurrency: AvailableCurrencies;
}) => {
  const { rates } = useCurrency();

  const {
    main: [currency, formatted],
    additional,
  } = getCommercialPriceValues({
    initialCurrency,
    priceMeter,
    rates,
    totalPrice,
  });

  return (
    <div
      className={clsx(
        'w-full',
        'flex',
        'flex-col',
        'lg:justify-center',
        'justify-start',
        'items-center',
        'flex-wrap',
        'lg:gap-4',
        'gap-2',
        'my-auto',
      )}
    >
      <div
        className={clsx('flex', 'w-full', 'justify-center', 'items-center', 'gap-4', 'flex-wrap')}
      >
        <Typography
          fontSize={24}
          fontWeight="medium"
          color="text-[#343434]"
          className={clsx(
            'bg-secondary',
            'lg:px-6',
            'lg:py-3',
            'px-4',
            'py-2',
            'w-max',
            'text-center',
          )}
        >
          {currency}
        </Typography>
        <Typography fontSize={24}>{formatted}</Typography>
      </div>
      {additional && (
        <div
          className={clsx('flex', 'w-full', 'justify-center', 'items-center', 'gap-4', 'flex-wrap')}
        >
          <Typography fontSize={20} color="text-[#E3C496B2]">
            {additional[0]}
          </Typography>
          <Typography fontSize={20} color="text-[#B1B1B1]">
            {additional[1]}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default CommercialPriceField;