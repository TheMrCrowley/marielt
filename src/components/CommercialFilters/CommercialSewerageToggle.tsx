import React from 'react';

import Switch from '@/src/components/common/Switch';
import { useCommercialFilters } from '@/src/store/commercialFilters';

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
