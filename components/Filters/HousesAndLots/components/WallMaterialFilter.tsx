import React from 'react';

import Select from '@/components/Select';
import { WallMaterialValues, wallMaterialOptions } from '@/enums/HousesAndLotsFilters';

interface WallMaterialFilterProps {
  wallMaterial: WallMaterialValues[];
  onChange: (data: { wallMaterial: WallMaterialValues[] }) => void;
}

const WallMaterialFilter = ({ onChange, wallMaterial }: WallMaterialFilterProps) => {
  return (
    <Select
      label="Материал Стен"
      options={wallMaterialOptions}
      isMulti
      values={wallMaterial}
      onChange={(selected) => onChange({ wallMaterial: selected as WallMaterialValues[] })}
      wrapperClassName="md:basis-3/12 basis-full shrink"
    />
  );
};

export default WallMaterialFilter;
