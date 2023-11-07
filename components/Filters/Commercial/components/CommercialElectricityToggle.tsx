import React from 'react';

import Switch from '@/components/Switch';
import { useCommercialFilters } from '@/store/commercialFilters';

const CommercialElectricityToggle = () => {
  const {
    filters: { electricity },
    updateFilters,
  } = useCommercialFilters();

  return (
    <Switch
      label="Электроснабжение"
      isChecked={electricity}
      onChange={(checked) => updateFilters({ electricity: checked })}
    />
  );
};

export default CommercialElectricityToggle;
