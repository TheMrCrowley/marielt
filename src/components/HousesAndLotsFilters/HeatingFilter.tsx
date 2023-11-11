import React from 'react';

import Select from '@/src/components/common/Select';
import { HeatingValues, heatingOptions } from '@/src/enums/HousesAndLotsFilters';

interface HeatingFilterProps {
  heating: HeatingValues[];
  onChange: (data: { heating: HeatingValues[] }) => void;
}

const HeatingFilter = ({ heating, onChange }: HeatingFilterProps) => {
  return (
    <Select
      isMulti={true}
      items={heatingOptions}
      values={heating}
      label="Отопление"
      onChange={(selected) => onChange({ heating: selected as HeatingValues[] })}
      wrapperClassName="md:basis-3/12 basis-full shrink"
    />
  );
};

export default HeatingFilter;
