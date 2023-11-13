import React, { useEffect, useRef } from 'react';

import InputFromTo from '@/src/components/common/InputFromTo';
import { getPriceByCurrency } from '@/src/helpers/currencyHelpers';
import { useCommercialFilters } from '@/src/store/commercialFilters';
import { useCurrency } from '@/src/store/currency';
import { AvailableCurrencies } from '@/src/types/Currency';

const CommercialPriceForMeterFilter = () => {
  const {
    filters: { priceForMeterFrom, priceForMeterTo },
    updateFilters,
  } = useCommercialFilters();

  const { selectedCurrency, rates } = useCurrency();

  const prev = useRef<AvailableCurrencies>(selectedCurrency);

  useEffect(() => {
    if (selectedCurrency !== prev.current) {
      updateFilters({
        priceForMeterFrom:
          priceForMeterFrom &&
          getPriceByCurrency(priceForMeterFrom, prev.current, selectedCurrency, rates),
        priceForMeterTo:
          priceForMeterTo &&
          getPriceByCurrency(priceForMeterTo, prev.current, selectedCurrency, rates),
      });
      prev.current = selectedCurrency;
    }
  }, [selectedCurrency]);

  return (
    <InputFromTo
      label={<>Стоимость за м{<sup>2</sup>}</>}
      subLabel={selectedCurrency}
      values={{
        from: priceForMeterFrom,
        to: priceForMeterTo,
      }}
      onChange={({ from, to }) =>
        updateFilters({
          priceForMeterFrom: from,
          priceForMeterTo: to,
        })
      }
    />
  );
};

export default CommercialPriceForMeterFilter;
