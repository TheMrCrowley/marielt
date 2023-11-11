import React from 'react';

import Switch from '@/src/components/common/Switch';
import { useCommercialFilters } from '@/src/store/commercialFilters';

const CommercialWaterToggle = () => {
  const {
    filters: { water },
    updateFilters,
  } = useCommercialFilters();

  return (
    <Switch
      label="Вода"
      isChecked={water}
      onChange={(checked) => updateFilters({ water: checked })}
    />
  );
};

export default CommercialWaterToggle;
