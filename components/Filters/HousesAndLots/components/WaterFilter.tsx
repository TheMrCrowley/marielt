import React from 'react';

import Select from '@/components/Select';
import { WaterValues, waterOptions } from '@/enums/HousesAndLotsFilters';

interface WaterFilterProps {
  water: WaterValues[];
  onChange: (data: { water: WaterValues[] }) => void;
}

const WaterFilter = ({ onChange, water }: WaterFilterProps) => {
  return (
    <Select
      label="Вода"
      isMulti
      options={waterOptions}
      onChange={(selected) => onChange({ water: selected as WaterValues[] })}
      values={water}
      wrapperClassName="basis-1/5 shrink"
    />
  );
};

export default WaterFilter;
