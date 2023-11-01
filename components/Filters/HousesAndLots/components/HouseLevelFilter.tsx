import React from 'react';

import CheckboxGroup from '@/components/CheckboxGroup';

interface HouseLevelFilterProps {
  houseLevels: string[];
  onChange: (data: { houseLevels: string[] }) => void;
}

const HouseLevelFilter = ({ houseLevels, onChange }: HouseLevelFilterProps) => {
  return (
    <CheckboxGroup
      label="Уровней в доме"
      isMulti
      items={[
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3+', label: '3+' },
      ]}
      values={houseLevels}
      onChange={(selected) => onChange({ houseLevels: selected })}
    />
  );
};

export default HouseLevelFilter;
