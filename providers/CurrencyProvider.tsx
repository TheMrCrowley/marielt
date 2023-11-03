import React, { PropsWithChildren } from 'react';

import { getCurrencies } from '@/services/getCurrency';
import CurrencySetter from '@/store/CurrencySetter';

const CurrencyProvider = async ({ children }: PropsWithChildren) => {
  const { eur, rub, usd } = await getCurrencies();
  return <CurrencySetter currencies={{ eur, rub, usd }}>{children}</CurrencySetter>;
};

export default CurrencyProvider;
