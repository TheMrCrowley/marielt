import React from 'react';

import Switch from '@/src/components/common/Switch';
import { useCommercialFilters } from '@/src/store/commercialFilters';

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
