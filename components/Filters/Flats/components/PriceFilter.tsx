import { useEffect, useRef } from 'react';

import InputFromTo from '@/components/InputFromTo';
import { getPriceByCurrency } from '@/helpers/currencyHelpers';
import { useCurrency } from '@/store/currency';
import { useFlatsFilter } from '@/store/flatsFilters';
import { AvailableCurrencies } from '@/types/Currency';

const PriceFilter = () => {
  const {
    filters: { priceFrom, priceTo },
    updateFilters,
  } = useFlatsFilter();

  const { selectedCurrency, rates } = useCurrency();

  const prev = useRef<AvailableCurrencies>(selectedCurrency);

  useEffect(() => {
    if (selectedCurrency !== prev.current) {
      updateFilters({
        priceFrom:
          priceFrom && getPriceByCurrency(priceFrom, prev.current, selectedCurrency, rates),
        priceTo: priceTo && getPriceByCurrency(priceTo, prev.current, selectedCurrency, rates),
      });
      prev.current = selectedCurrency;
    }
  }, [selectedCurrency]);

  return (
    <InputFromTo
      label="Стоимость"
      subLabel={selectedCurrency}
      values={{
        from: priceFrom,
        to: priceTo,
      }}
      onChange={({ from, to }) =>
        updateFilters({
          priceFrom: from,
          priceTo: to,
        })
      }
    />
  );
};

export default PriceFilter;
