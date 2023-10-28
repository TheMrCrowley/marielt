import { useContext } from 'react';

import { FlatsFiltersContext } from '@/components/Filters/Flats/FlatsContextProvider';
import InputFromTo from '@/components/InputFromTo';

const PriceFilter = () => {
  const {
    filters: { currency, priceFrom, priceTo },
    updateFilters,
  } = useContext(FlatsFiltersContext);

  return (
    <InputFromTo
      label="Стоимость"
      subLabel={currency}
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
