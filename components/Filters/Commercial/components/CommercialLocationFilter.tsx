import React from 'react';

import Select from '@/components/Select';
import { commercialLocationOptions } from '@/enums/CommercialFilters';
import { useCommercialFilters } from '@/store/commercialFilters';

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
