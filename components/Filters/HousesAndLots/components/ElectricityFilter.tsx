import React from 'react';

import Select from '@/components/Select';

interface ElectricityFilterProps {
  electricity: string[];
  onChange: (data: { electricity: string[] }) => void;
}

const ElectricityFilter = ({ electricity, onChange }: ElectricityFilterProps) => {
  return (
    <Select
      label="Электроснабжение"
      isMulti
      options={[
        { label: 'есть', value: 'есть' },
        { label: 'рядом', value: 'рядом' },
        { label: 'нет', value: 'нет' },
        { label: 'В220', value: 'В220' },
        { label: 'В380', value: 'В380' },
      ]}
      onChange={(selected) => onChange({ electricity: selected })}
      values={electricity}
      wrapperClassName="basis-1/5 shrink"
    />
  );
};

export default ElectricityFilter;
