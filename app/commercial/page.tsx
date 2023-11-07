import React from 'react';

import CommercialFilters from '@/components/Filters/Commercial/CommercialFilters';
import { getCommercialFiltersData } from '@/services/commercialFilters';

const Commercial = async () => {
  const { transactions, categories, directions } = await getCommercialFiltersData();

  return <CommercialFilters data={{ transactions, categories, directions }} />;
};

export default Commercial;
