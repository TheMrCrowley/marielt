import React from 'react';

import Select from '@/components/Select';
import { electricityOptions } from '@/enums/HousesAndLotsFilters';

interface ElectricityFilterProps {
  electricity: string[];
  onChange: (data: { electricity: string[] }) => void;
}

const ElectricityFilter = ({ electricity, onChange }: ElectricityFilterProps) => {
  return (
    <Select
      label="Электроснабжение"
      isMulti
      options={electricityOptions}
      onChange={(selected) => onChange({ electricity: selected })}
      values={electricity}
      wrapperClassName="basis-1/5 shrink"
    />
  );
};

export default ElectricityFilter;
