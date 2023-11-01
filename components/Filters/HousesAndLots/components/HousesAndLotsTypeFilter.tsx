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
      label="Тип недвижимости"
      options={[
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
        updateFilters({ housesAndLotsType: selected[0] });
      }}
      values={[housesAndLotsType]}
      placeholder="Выбрать"
      wrapperClassName="flex-1"
    />
  );
};

export default HousesAndLotsTypeFilter;
