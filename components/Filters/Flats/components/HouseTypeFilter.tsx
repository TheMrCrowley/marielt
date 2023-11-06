import React from 'react';

import Select from '@/components/Select';
import { HouseTypeValues, houseTypeOptions } from '@/enums/FlatsFilters';
import { useFlatsFilter } from '@/store/flatsFilters';

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
