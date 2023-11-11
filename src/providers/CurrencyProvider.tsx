import React, { PropsWithChildren } from 'react';

import CurrencySetter from '@/src/providers/CurrencySetter';
import { getCurrencies } from '@/src/services/currencyServices';

const CurrencyProvider = async ({ children }: PropsWithChildren) => {
  const { eur, rub, usd } = await getCurrencies();
  return <CurrencySetter currencies={{ eur, rub, usd }}>{children}</CurrencySetter>;
};

export default CurrencyProvider;
