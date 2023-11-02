import React from 'react';

import Select from '@/components/Select';
import { waterOptions } from '@/enums/HousesAndLotsFilters';

interface WaterFilterProps {
  water: string[];
  onChange: (data: { water: string[] }) => void;
}

const WaterFilter = ({ onChange, water }: WaterFilterProps) => {
  return (
    <Select
      label="Вода"
      isMulti
      options={waterOptions}
      onChange={(selected) => onChange({ water: selected })}
      values={water}
      wrapperClassName="basis-1/5 shrink"
    />
  );
};

export default WaterFilter;
