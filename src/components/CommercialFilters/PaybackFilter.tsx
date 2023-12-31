import React from 'react';

import InputFromTo from '@/src/components/common/InputFromTo';
import { useCommercialFilters } from '@/src/store/commercialFilters';

const PaybackFilter = () => {
  const {
    filters: { paybackFrom, paybackTo },
    updateFilters,
  } = useCommercialFilters();

  return (
    <InputFromTo
      label="Окупаемость"
      subLabel="в годах"
      values={{ from: paybackFrom, to: paybackTo }}
      minMax={{ min: 0, max: 100 }}
      onChange={({ from, to }) => {
        updateFilters({ paybackFrom: from, paybackTo: to });
      }}
    />
  );
};

export default PaybackFilter;
