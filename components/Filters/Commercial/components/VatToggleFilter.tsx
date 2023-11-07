import React from 'react';

import Switch from '@/components/Switch';
import { useCommercialFilters } from '@/store/commercialFilters';

const VatToggleFilter = () => {
  const {
    filters: { vat },
    updateFilters,
  } = useCommercialFilters();

  return (
    <Switch label="НДС" isChecked={vat} onChange={(checked) => updateFilters({ vat: checked })} />
  );
};

export default VatToggleFilter;
