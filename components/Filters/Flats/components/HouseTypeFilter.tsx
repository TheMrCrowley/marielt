import React, { useContext } from 'react';

import { FlatsFiltersContext } from '@/components/Filters/Flats/FlatsContextProvider';
import Select from '@/components/Select';
import { HouseTypeValues, houseTypeOptions } from '@/enums/FlatsFilters';

const HouseTypeFilter = () => {
  const {
    filters: { houseType },
    updateFilters,
  } = useContext(FlatsFiltersContext);

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
