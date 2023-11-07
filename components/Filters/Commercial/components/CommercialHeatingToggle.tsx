import React from 'react';

import Switch from '@/components/Switch';
import { useCommercialFilters } from '@/store/commercialFilters';

const CommercialHeatingToggle = () => {
  const {
    filters: { heating },
    updateFilters,
  } = useCommercialFilters();

  return (
    <Switch
      label="Отопление"
      isChecked={heating}
      onChange={(checked) => updateFilters({ heating: checked })}
    />
  );
};

export default CommercialHeatingToggle;
