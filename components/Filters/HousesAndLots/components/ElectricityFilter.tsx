import React from 'react';

import Select from '@/components/Select';
import { ElectricityValues, electricityOptions } from '@/enums/HousesAndLotsFilters';

interface ElectricityFilterProps {
  electricity: ElectricityValues[];
  onChange: (data: { electricity: ElectricityValues[] }) => void;
}

const ElectricityFilter = ({ electricity, onChange }: ElectricityFilterProps) => {
  return (
    <Select
      isMulti={true}
      label="Электроснабжение"
      items={electricityOptions}
      onChange={(selected) => onChange({ electricity: selected as ElectricityValues[] })}
      values={electricity}
      wrapperClassName="md:basis-1/5 basis-full shrink"
    />
  );
};

export default ElectricityFilter;
