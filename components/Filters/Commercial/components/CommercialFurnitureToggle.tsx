import React from 'react';

import Switch from '@/components/Switch';
import { useCommercialFilters } from '@/store/commercialFilters';

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
