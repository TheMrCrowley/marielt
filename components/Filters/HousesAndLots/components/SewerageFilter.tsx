import React from 'react';

import CheckboxGroup from '@/components/CheckboxGroup';

interface SewerageFilterProps {
  sewerage: string[];
  onChange: (data: { sewerage: string[] }) => void;
  wrapperClassName?: string;
}

const SewerageFilter = ({ onChange, sewerage, wrapperClassName }: SewerageFilterProps) => {
  return (
    <CheckboxGroup
      label="Канализация"
      values={sewerage}
      items={[
        { label: 'Есть', value: 'есть' },
        { label: 'Нет', value: 'нет' },
        { label: 'С/у на улице', value: 'с/у на улице' },
      ]}
      isMulti={true}
      onChange={(selected) => onChange({ sewerage: selected })}
      wrapperClassName={wrapperClassName}
    />
  );
};

export default SewerageFilter;
