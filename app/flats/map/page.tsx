import React, { Suspense } from 'react';

import FlatsFilters from '@/src/app-pages/FlatsPage/FlatsFilters';
import FlatsMap from '@/src/app-pages/FlatsPage/FlatsMap';
import Loader from '@/src/components/common/Loader';
import { getFlatsFiltersData } from '@/src/services/filtersDataServices';
import { getFlatsForMap } from '@/src/services/flatsServices';

type FlatsProps = {
  searchParams: Record<string, string | string[]>;
};

const Flats = async ({ searchParams }: FlatsProps) => {
  const [data, { flats }] = await Promise.all([
    getFlatsFiltersData(),
    getFlatsForMap(searchParams),
  ]);

  return (
    <Suspense fallback={<Loader />}>
      <FlatsFilters data={data} />
      <FlatsMap productIds={searchParams.productIds || []} flats={flats} />
    </Suspense>
  );
};

export default Flats;
