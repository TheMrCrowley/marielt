import React from 'react';

import Switch from '@/components/Switch';
import { useCommercialFilters } from '@/store/commercialFilters';

const CommercialGasToggle = () => {
  const {
    filters: { gas },
    updateFilters,
  } = useCommercialFilters();

  return (
    <Switch
      isChecked={gas}
      label="Газоснабжение"
      onChange={(checked) =>
        updateFilters({
          gas: checked,
        })
      }
    />
  );
};

export default CommercialGasToggle;
