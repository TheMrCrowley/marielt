import React from 'react';

import InputFromTo from '@/src/components/common/InputFromTo';
import { useCommercialFilters } from '@/src/store/commercialFilters';

const CommercialSeparateRooms = () => {
  const {
    filters: { separateRoomsFrom, separateRoomsTo },
    updateFilters,
  } = useCommercialFilters();

  return (
    <InputFromTo
      label="Раздельных Помещений"
      values={{
        from: separateRoomsFrom,
        to: separateRoomsTo,
      }}
      onChange={({ from, to }) =>
        updateFilters({
          separateRoomsFrom: from,
          separateRoomsTo: to,
        })
      }
    />
  );
};

export default CommercialSeparateRooms;
