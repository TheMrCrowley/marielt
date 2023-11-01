import React from 'react';

import Select from '@/components/Select';
import { useHousesAndLotsFilters } from '@/store/housesAndLotsFilters';

const DirectionFilter = () => {
  const {
    data: { directions: directionOptions },
    filters: { directions },
    updateFilters,
  } = useHousesAndLotsFilters();

  return (
    <Select
      label="Направление"
      isMulti
      options={directionOptions.map((station) => ({
        label: station,
        value: station,
      }))}
      values={directions}
      onChange={(selected) =>
        updateFilters({
          directions: selected,
        })
      }
      wrapperClassName="flex-1"
    />
  );
};

export default DirectionFilter;
