'use client';

import React, { PropsWithChildren, useEffect } from 'react';

import Loader from '@/src/components/common/Loader';
import { useCurrency } from '@/src/store/currency';

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
    return <Loader />;
  }

  return <>{children}</>;
};

export default CurrencySetter;
