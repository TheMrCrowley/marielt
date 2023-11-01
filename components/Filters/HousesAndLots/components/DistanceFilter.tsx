import React from 'react';

import Select from '@/components/Select';
import { useHousesAndLotsFilters } from '@/store/housesAndLotsFilters';

const DistanceFilter = () => {
  const {
    filters: { distance },
    updateFilters,
  } = useHousesAndLotsFilters();

  return (
    <Select
      label="Расстояние от МКАД"
      placeholder="Выбрать"
      placeholderPrefix="До"
      placeholderPostfix="км."
      options={[
        {
          value: '50',
          label: 'До 50 км.',
        },
        {
          value: '100',
          label: 'До 100 км.',
        },
        {
          value: '150',
          label: 'До 150 км.',
        },
        {
          value: '200',
          label: 'До 200 км.',
        },
      ]}
      values={[distance]}
      onChange={([selected]) =>
        updateFilters({
          distance: selected,
        })
      }
      wrapperClassName="flex-1"
    />
  );
};

export default DistanceFilter;
