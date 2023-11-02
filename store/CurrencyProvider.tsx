'use client';

import React, { PropsWithChildren, useEffect } from 'react';

import Loader from '@/components/Loader';

import { useCurrency } from './currency';

const CurrencyProvider = ({ children }: PropsWithChildren) => {
  const { getCurrencies, isCurrenciesExist } = useCurrency();

  useEffect(() => {
    getCurrencies();
  }, []);

  if (!isCurrenciesExist) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default CurrencyProvider;
