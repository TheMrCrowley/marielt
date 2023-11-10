'use client';

import React, { PropsWithChildren, useEffect } from 'react';

import Loader from '@/components/Loader';

import { useCurrency } from './currency';

interface CurrencySetterProps extends PropsWithChildren {
  currencies: {
    usd: number;
    eur: number;
    rub: number;
  };
}

const CurrencySetter = ({ children, currencies }: CurrencySetterProps) => {
  const { setCurrencies, isCurrenciesExist } = useCurrency();

  useEffect(() => {
    setCurrencies(currencies);
  }, []);

  if (!isCurrenciesExist) {
    console.log(3);

    return <Loader />;
  }

  return <>{children}</>;
};

export default CurrencySetter;
