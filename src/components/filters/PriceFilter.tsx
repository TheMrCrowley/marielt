import { useEffect, useRef } from 'react';

import InputFromTo from '@/src/components/common/InputFromTo';
import { getPriceByCurrency } from '@/src/helpers/currencyHelpers';
import { useCurrency } from '@/src/store/currency';
import { AvailableCurrencies } from '@/src/types/Currency';

interface PriceFilterProps {
  onChange: (data: { priceFrom: string; priceTo: string }) => void;
  priceFrom: string;
  priceTo: string;
}

const PriceFilter = ({ onChange, priceFrom, priceTo }: PriceFilterProps) => {
  const { selectedCurrency, rates } = useCurrency();

  const prev = useRef<AvailableCurrencies>(selectedCurrency);

  useEffect(() => {
    if (selectedCurrency !== prev.current) {
      onChange({
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
        onChange({
          priceFrom: from,
          priceTo: to,
        })
      }
    />
  );
};

export default PriceFilter;
