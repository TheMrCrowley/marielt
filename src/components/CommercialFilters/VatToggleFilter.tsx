import React from 'react';

import Switch from '@/src/components/common/Switch';
import { useCommercialFilters } from '@/src/store/commercialFilters';

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
