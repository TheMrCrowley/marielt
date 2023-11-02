import React from 'react';

import CheckboxGroup from '@/components/CheckboxGroup';
import { houseLevelsOptions } from '@/enums/HousesAndLotsFilters';

interface HouseLevelFilterProps {
  houseLevels: string[];
  onChange: (data: { houseLevels: string[] }) => void;
}

const HouseLevelFilter = ({ houseLevels, onChange }: HouseLevelFilterProps) => {
  return (
    <CheckboxGroup
      label="Уровней в доме"
      isMulti
      items={houseLevelsOptions}
      values={houseLevels}
      onChange={(selected) => onChange({ houseLevels: selected })}
    />
  );
};

export default HouseLevelFilter;
