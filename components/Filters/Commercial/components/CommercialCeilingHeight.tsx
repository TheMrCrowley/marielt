import React from 'react';

import InputFromTo from '@/components/InputFromTo';
import { useCommercialFilters } from '@/store/commercialFilters';

const CommercialCeilingHeight = () => {
  const {
    filters: { ceilingHeightFrom, ceilingHeightTo },
    updateFilters,
  } = useCommercialFilters();
  return (
    <InputFromTo
      label="Высота Потолков"
      subLabel="м"
      values={{
        from: ceilingHeightFrom,
        to: ceilingHeightTo,
      }}
      onChange={({ from, to }) =>
        updateFilters({
          ceilingHeightFrom: from,
          ceilingHeightTo: to,
        })
      }
    />
  );
};

export default CommercialCeilingHeight;
