import React from 'react';

import Switch from '@/components/Switch';
import { useCommercialFilters } from '@/store/commercialFilters';

const CommercialRampToggle = () => {
  const {
    filters: { ramp },
    updateFilters,
  } = useCommercialFilters();

  return (
    <Switch
      isChecked={ramp}
      label="Погрузка/Разгрузка/Рампа"
      onChange={(checked) =>
        updateFilters({
          ramp: checked,
        })
      }
    />
  );
};

export default CommercialRampToggle;
