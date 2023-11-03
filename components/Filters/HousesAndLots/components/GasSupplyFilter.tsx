import React from 'react';

import CheckboxGroup from '@/components/CheckboxGroup';
import { GasSupplyValues, gasSupplyOptions } from '@/enums/HousesAndLotsFilters';

interface GasSupplyFilterProps {
  gasSupply: GasSupplyValues[];
  onChange: (data: { gasSupply: GasSupplyValues[] }) => void;
}

const GasSupplyFilter = ({ gasSupply, onChange }: GasSupplyFilterProps) => {
  return (
    <CheckboxGroup
      label="Газоснабжение"
      isMulti={true}
      values={gasSupply}
      items={gasSupplyOptions}
      onChange={(selected) => onChange({ gasSupply: selected as GasSupplyValues[] })}
      wrapperClassName="flex-wrap"
    />
  );
};

export default GasSupplyFilter;
