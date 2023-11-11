import React from 'react';

import CheckboxGroup from '@/src/components/common/CheckboxGroup';
import { SewerageValues, sewerageOptions } from '@/src/enums/HousesAndLotsFilters';

interface SewerageFilterProps {
  sewerage: SewerageValues[];
  onChange: (data: { sewerage: SewerageValues[] }) => void;
  wrapperClassName?: string;
}

const SewerageFilter = ({ onChange, sewerage, wrapperClassName }: SewerageFilterProps) => {
  return (
    <CheckboxGroup
      label="Канализация"
      isMulti={true}
      values={sewerage}
      items={sewerageOptions}
      onChange={(selected) => onChange({ sewerage: selected as SewerageValues[] })}
      wrapperClassName={wrapperClassName}
    />
  );
};

export default SewerageFilter;
