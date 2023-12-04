import React from 'react';

import CommercialFilters from '@/src/app-pages/CommercialPage/CommercialFilters';
import CommercialMap from '@/src/app-pages/CommercialPage/CommercialMap';
import { getCommercialItemsForMap } from '@/src/services/commercialServices';
import { getCommercialFiltersData } from '@/src/services/filtersDataServices';

type CommercialProps = {
  searchParams: Record<string, string | string[]>;
};

const Commercial = async ({ searchParams }: CommercialProps) => {
  const [data, { commercial }] = await Promise.all([
    getCommercialFiltersData(),
    getCommercialItemsForMap(searchParams),
  ]);

  return (
    <>
      <CommercialFilters data={data} />
      <CommercialMap productIds={searchParams.productIds || []} commercial={commercial} />
    </>
  );
};

export default Commercial;
