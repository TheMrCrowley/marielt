import React from 'react';

import Switch from '@/components/Switch';
import { useCommercialFilters } from '@/store/commercialFilters';

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
