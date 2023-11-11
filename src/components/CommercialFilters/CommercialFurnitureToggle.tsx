import React from 'react';

import Switch from '@/src/components/common/Switch';
import { useCommercialFilters } from '@/src/store/commercialFilters';

const CommercialFurnitureToggle = () => {
  const {
    filters: { furniture },
    updateFilters,
  } = useCommercialFilters();

  return (
    <Switch
      label="Мебель"
      isChecked={furniture}
      onChange={(checked) =>
        updateFilters({
          furniture: checked,
        })
      }
    />
  );
};

export default CommercialFurnitureToggle;
