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
      label="Электроснабжение"
      isMulti
      options={electricityOptions}
      onChange={(selected) => onChange({ electricity: selected as ElectricityValues[] })}
      values={electricity}
      wrapperClassName="basis-1/5 shrink"
    />
  );
};

export default ElectricityFilter;
