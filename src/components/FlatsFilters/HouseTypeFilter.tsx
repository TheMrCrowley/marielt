import React from 'react';

import Select from '@/src/components/common/Select';
import { HouseTypeValues, houseTypeOptions } from '@/src/enums/FlatsFilters';
import { useFlatsFilter } from '@/src/store/flatsFilters';

const HouseTypeFilter = () => {
  const {
    filters: { houseType },
    updateFilters,
  } = useFlatsFilter();

  return (
    <Select
      wrapperClassName="flex-auto"
      isMulti={true}
      label="Тип дома"
      values={houseType}
      items={houseTypeOptions}
      onChange={(selected) => updateFilters({ houseType: selected as HouseTypeValues[] })}
    />
  );
};

export default HouseTypeFilter;
