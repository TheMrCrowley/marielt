import React from 'react';

import CheckboxGroup from '@/components/CheckboxGroup';

interface GasSupplyFilterProps {
  gasSupply: string;
  onChange: (data: { gasSupply: string }) => void;
}

const GasSupplyFilter = ({ gasSupply, onChange }: GasSupplyFilterProps) => {
  return (
    <CheckboxGroup
      label="Газоснабжение"
      values={gasSupply}
      items={[
        {
          label: 'Есть',
          value: 'Yes',
        },
        {
          value: 'No',
          label: 'Нет',
        },
      ]}
      isMulti={false}
      onChange={(selected) => onChange({ gasSupply: selected })}
    />
  );
};

export default GasSupplyFilter;
