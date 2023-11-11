import React from 'react';

import InputFromTo from '@/src/components/common/InputFromTo';
import { useCommercialFilters } from '@/src/store/commercialFilters';

const ProfitabilityFilter = () => {
  const {
    filters: { profitabilityFrom, profitabilityTo },
    updateFilters,
  } = useCommercialFilters();
  return (
    <InputFromTo
      label="Доходность"
      subLabel="%"
      values={{
        from: profitabilityFrom,
        to: profitabilityTo,
      }}
      minMax={{
        max: 100,
        min: 0,
      }}
      onChange={({ from, to }) => {
        updateFilters({ profitabilityFrom: from, profitabilityTo: to });
      }}
    />
  );
};

export default ProfitabilityFilter;
