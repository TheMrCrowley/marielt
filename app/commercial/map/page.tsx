import React, { Suspense } from 'react';

import CommercialFilters from '@/src/app-pages/CommercialPage/CommercialFilters';
import CommercialMap from '@/src/app-pages/CommercialPage/CommercialMap';
import Loader from '@/src/components/common/Loader';
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
      <Suspense fallback={<Loader />}>
        <CommercialFilters data={data} />
        <CommercialMap productIds={searchParams.productIds || []} commercial={commercial} />
      </Suspense>
    </>
  );
};

export default Commercial;
