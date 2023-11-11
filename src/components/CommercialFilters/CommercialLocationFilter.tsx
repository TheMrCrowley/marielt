import React from 'react';

import Select from '@/src/components/common/Select';
import { commercialLocationOptions } from '@/src/enums/CommercialFilters';
import { useCommercialFilters } from '@/src/store/commercialFilters';

const CommercialLocationFilter = () => {
  const {
    filters: { commercialLocation },
    updateFilters,
  } = useCommercialFilters();

  return (
    <Select
      isMulti={true}
      label="Расположение"
      items={commercialLocationOptions}
      onChange={(selected) =>
        updateFilters({
          commercialLocation: selected,
        })
      }
      values={commercialLocation}
      wrapperClassName="lg:basis-1/4 sm:basis-1/3 basis-full"
    />
  );
};

export default CommercialLocationFilter;
