import React from 'react';

import Select from '@/components/Select';
import { heatingOptions } from '@/enums/HousesAndLotsFilters';

interface HeatingFilterProps {
  heating: string[];
  onChange: (data: { heating: string[] }) => void;
}

const HeatingFilter = ({ heating, onChange }: HeatingFilterProps) => {
  return (
    <Select
      options={heatingOptions}
      isMulti
      values={heating}
      label="Отопление"
      onChange={(selected) => onChange({ heating: selected })}
      wrapperClassName="basis-3/12 shrink"
    />
  );
};

export default HeatingFilter;
