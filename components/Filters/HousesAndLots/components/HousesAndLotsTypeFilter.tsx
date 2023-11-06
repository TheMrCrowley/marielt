import React from 'react';

import Select from '@/components/Select';
import { HousesAndLotsType, housesAndLotsTypeMap } from '@/enums/HousesAndLotsFilters';
import { useHousesAndLotsFilters } from '@/store/housesAndLotsFilters';

const HousesAndLotsTypeFilter = () => {
  const {
    filters: { housesAndLotsType },
    updateFilters,
  } = useHousesAndLotsFilters();

  return (
    <Select
      isMulti={false}
      label="Тип недвижимости"
      items={[
        {
          label: housesAndLotsTypeMap[HousesAndLotsType.Cottages],
          value: housesAndLotsTypeMap[HousesAndLotsType.Cottages],
        },
        {
          label: housesAndLotsTypeMap[HousesAndLotsType.Dachi],
          value: housesAndLotsTypeMap[HousesAndLotsType.Dachi],
        },
        {
          label: housesAndLotsTypeMap[HousesAndLotsType.Plots],
          value: housesAndLotsTypeMap[HousesAndLotsType.Plots],
        },
      ]}
      onChange={(selected) => {
        updateFilters({ housesAndLotsType: selected });
      }}
      values={housesAndLotsType}
      wrapperClassName="flex-1"
    />
  );
};

export default HousesAndLotsTypeFilter;
