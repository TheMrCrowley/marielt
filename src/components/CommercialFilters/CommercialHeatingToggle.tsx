import React from 'react';

import Switch from '@/src/components/common/Switch';
import { useCommercialFilters } from '@/src/store/commercialFilters';

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
