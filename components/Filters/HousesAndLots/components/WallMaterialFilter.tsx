import React from 'react';

import Select from '@/components/Select';
import { wallMaterialOptions } from '@/enums/HousesAndLotsFilters';

interface WallMaterialFilterProps {
  wallMaterial: string[];
  onChange: (data: { wallMaterial: string[] }) => void;
}

const WallMaterialFilter = ({ onChange, wallMaterial }: WallMaterialFilterProps) => {
  return (
    <Select
      label="Материал Стен"
      options={wallMaterialOptions}
      isMulti
      values={wallMaterial}
      onChange={(selected) => onChange({ wallMaterial: selected })}
      wrapperClassName="basis-3/12 shrink"
    />
  );
};

export default WallMaterialFilter;
