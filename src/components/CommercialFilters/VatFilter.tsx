import React from 'react';

import CheckboxGroup from '@/src/components/common/CheckboxGroup';
import { useCommercialFilters } from '@/src/store/commercialFilters';

const VatToggleFilter = () => {
  const {
    filters: { vat },
    updateFilters,
  } = useCommercialFilters();

  return (
    <CheckboxGroup
      label="НДС"
      isMulti={false}
      values={vat}
      items={[
        { value: 'НДС 20%', label: 'НДС 20%' },
        { value: 'НДС 0', label: 'НДС 0' },
      ]}
      onChange={(selected) => updateFilters({ vat: selected })}
    />
  );
};

export default VatToggleFilter;
