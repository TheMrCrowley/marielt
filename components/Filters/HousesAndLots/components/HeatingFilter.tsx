import React from 'react';

import Select from '@/components/Select';
import { HeatingValues, heatingOptions } from '@/enums/HousesAndLotsFilters';

interface HeatingFilterProps {
  heating: HeatingValues[];
  onChange: (data: { heating: HeatingValues[] }) => void;
}

const HeatingFilter = ({ heating, onChange }: HeatingFilterProps) => {
  return (
    <Select
      options={heatingOptions}
      isMulti
      values={heating}
      label="Отопление"
      onChange={(selected) => onChange({ heating: selected as HeatingValues[] })}
      wrapperClassName="basis-3/12 shrink"
    />
  );
};

export default HeatingFilter;
