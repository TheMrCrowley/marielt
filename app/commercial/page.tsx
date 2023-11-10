import React from 'react';

import CommercialFilters from '@/components/Filters/Commercial/CommercialFilters';
import CommercialList from '@/components/Filters/Commercial/CommercialList';
import { getCommercialItems } from '@/services/commercial';
import { getCommercialFiltersData } from '@/services/commercialFilters';

type CommercialProps = {
  searchParams: Record<string, string | string[]>;
};

const Commercial = async ({ searchParams }: CommercialProps) => {
  const [{ transactions, categories, directions }, { commercial, pagination }] = await Promise.all([
    getCommercialFiltersData(),
    getCommercialItems(searchParams),
  ]);

  console.log('Commercial was found: ', commercial.length);

  return (
    <>
      <CommercialFilters data={{ transactions, categories, directions }} />
      <CommercialList commercial={commercial} pagination={pagination} />
    </>
  );
};

export default Commercial;
