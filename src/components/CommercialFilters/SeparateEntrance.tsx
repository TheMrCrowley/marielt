import React from 'react';

import Switch from '@/src/components/common/Switch';
import { useCommercialFilters } from '@/src/store/commercialFilters';

const SeparateEntrance = () => {
  const {
    filters: { separateEntrance },
    updateFilters,
  } = useCommercialFilters();
  return (
    <Switch
      isChecked={separateEntrance}
      label="Отдельный вход"
      onChange={(checked) => updateFilters({ separateEntrance: checked })}
    />
  );
};

export default SeparateEntrance;
