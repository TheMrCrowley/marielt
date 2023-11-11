import React from 'react';

import Select from '@/src/components/common/Select';
import { commercialWallMaterialOptions } from '@/src/enums/CommercialFilters';
import { useCommercialFilters } from '@/src/store/commercialFilters';

const CommercialWallMaterialFilter = () => {
  const {
    filters: { wallMaterial },
    updateFilters,
  } = useCommercialFilters();

  return (
    <Select
      label="Материал Стен"
      isMulti={true}
      values={wallMaterial}
      onChange={(selected) =>
        updateFilters({
          wallMaterial: selected,
        })
      }
      items={commercialWallMaterialOptions}
      wrapperClassName="md:basis-1/4 basis-full"
    />
  );
};

export default CommercialWallMaterialFilter;
