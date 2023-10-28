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
      isMulti
      label="Тип дома"
      values={houseType}
      options={houseTypeOptions}
      onChange={(selected) => updateFilters({ houseType: selected as HouseTypeValues[] })}
      optionWidth="full"
    />
  );
};

export default HouseTypeFilter;
