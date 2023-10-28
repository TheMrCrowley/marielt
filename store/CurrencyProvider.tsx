'use client';

import React, { PropsWithChildren, useEffect } from 'react';

import { useCurrency } from './currency';

const CurrencyProvider = ({ children }: PropsWithChildren) => {
  const { getCurrencies, isCurrenciesExist } = useCurrency();

  useEffect(() => {
    getCurrencies();
  }, []);

  if (!isCurrenciesExist) {
    return null;
  }

  return <>{children}</>;
};

export default CurrencyProvider;
