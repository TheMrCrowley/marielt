import React from 'react';

import Switch from '@/src/components/common/Switch';
import { useCommercialFilters } from '@/src/store/commercialFilters';

const CommercialBathroomToggle = () => {
  const {
    filters: { bathroom },
    updateFilters,
  } = useCommercialFilters();

  return (
    <Switch
      isChecked={bathroom}
      label="Санузел"
      onChange={(checked) =>
        updateFilters({
          bathroom: checked,
        })
      }
    />
  );
};

export default CommercialBathroomToggle;
