import React from 'react';

import CheckboxGroup from '@/src/components/common/CheckboxGroup';
import { LotsWaterValues, lotsWaterOptions } from '@/src/enums/HousesAndLotsFilters';
import { useHousesAndLotsFilters } from '@/src/store/housesAndLotsFilters';

const LotsWaterFilter = () => {
  const {
    filters: { lotsWater },
    updateFilters,
  } = useHousesAndLotsFilters();

  return (
    <CheckboxGroup
      label="Вода"
      isMulti={true}
      values={lotsWater}
      items={lotsWaterOptions}
      onChange={(selected) => updateFilters({ lotsWater: selected as LotsWaterValues[] })}
    />
  );
};

export default LotsWaterFilter;
