import React from 'react';

import CheckboxGroup from '@/src/components/common/CheckboxGroup';
import { commercialFinishingOptions } from '@/src/enums/CommercialFilters';
import { useCommercialFilters } from '@/src/store/commercialFilters';

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
