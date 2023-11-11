import React from 'react';

import Select from '@/src/components/common/Select';
import { WaterValues, waterOptions } from '@/src/enums/HousesAndLotsFilters';

interface WaterFilterProps {
  water: WaterValues[];
  onChange: (data: { water: WaterValues[] }) => void;
}

const WaterFilter = ({ onChange, water }: WaterFilterProps) => {
  return (
    <Select
      isMulti={true}
      label="Вода"
      items={waterOptions}
      onChange={(selected) => onChange({ water: selected as WaterValues[] })}
      values={water}
      wrapperClassName="md:basis-1/5 basis-full shrink"
    />
  );
};

export default WaterFilter;
