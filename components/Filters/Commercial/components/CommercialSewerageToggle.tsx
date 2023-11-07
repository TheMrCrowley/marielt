import React from 'react';

import Switch from '@/components/Switch';
import { useCommercialFilters } from '@/store/commercialFilters';

const CommercialSewerageToggle = () => {
  const {
    filters: { sewerage },
    updateFilters,
  } = useCommercialFilters();

  return (
    <Switch
      label="Канализация"
      isChecked={sewerage}
      onChange={(checked) => updateFilters({ sewerage: checked })}
    />
  );
};

export default CommercialSewerageToggle;
