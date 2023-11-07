import React from 'react';

import CheckboxGroup from '@/components/CheckboxGroup';
import { commercialFinishingOptions } from '@/enums/CommercialFilters';
import { useCommercialFilters } from '@/store/commercialFilters';

const CommercialFinishingFilter = () => {
  const {
    filters: { finishing },
    updateFilters,
  } = useCommercialFilters();
  return (
    <CheckboxGroup
      label="Ремонт"
      isMulti={true}
      items={commercialFinishingOptions}
      onChange={(selected) =>
        updateFilters({
          finishing: selected,
        })
      }
      values={finishing}
    />
  );
};

export default CommercialFinishingFilter;
