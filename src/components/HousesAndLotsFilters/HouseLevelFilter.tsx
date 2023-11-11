import React from 'react';

import CheckboxGroup from '@/src/components/common/CheckboxGroup';
import { HouseLevelValues, houseLevelsOptions } from '@/src/enums/HousesAndLotsFilters';

interface HouseLevelFilterProps {
  houseLevels: HouseLevelValues[];
  onChange: (data: { houseLevels: HouseLevelValues[] }) => void;
}

const HouseLevelFilter = ({ houseLevels, onChange }: HouseLevelFilterProps) => {
  return (
    <CheckboxGroup
      label="Уровней в доме"
      isMulti
      items={houseLevelsOptions}
      values={houseLevels}
      onChange={(selected) => onChange({ houseLevels: selected as HouseLevelValues[] })}
    />
  );
};

export default HouseLevelFilter;
