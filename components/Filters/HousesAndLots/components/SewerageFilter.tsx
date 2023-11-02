import React from 'react';

import CheckboxGroup from '@/components/CheckboxGroup';
import { sewerageOptions } from '@/enums/HousesAndLotsFilters';

interface SewerageFilterProps {
  sewerage: string;
  onChange: (data: { sewerage: string }) => void;
  wrapperClassName?: string;
}

const SewerageFilter = ({ onChange, sewerage, wrapperClassName }: SewerageFilterProps) => {
  return (
    <CheckboxGroup
      label="Канализация"
      values={sewerage}
      items={sewerageOptions}
      isMulti={false}
      onChange={(selected) => onChange({ sewerage: selected })}
      wrapperClassName={wrapperClassName}
    />
  );
};

export default SewerageFilter;
