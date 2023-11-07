import React from 'react';

import Switch from '@/components/Switch';
import { useCommercialFilters } from '@/store/commercialFilters';

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
