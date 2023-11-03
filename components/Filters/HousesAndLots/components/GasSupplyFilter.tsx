import React from 'react';

import CheckboxGroup from '@/components/CheckboxGroup';
import { gasSupplyOptions } from '@/enums/HousesAndLotsFilters';

interface GasSupplyFilterProps {
  gasSupply: string;
  onChange: (data: { gasSupply: string }) => void;
}

const GasSupplyFilter = ({ gasSupply, onChange }: GasSupplyFilterProps) => {
  return (
    <CheckboxGroup
      label="Газоснабжение"
      values={gasSupply}
      items={gasSupplyOptions}
      isMulti={false}
      onChange={(selected) => onChange({ gasSupply: selected })}
      wrapperClassName="flex-wrap"
    />
  );
};

export default GasSupplyFilter;
