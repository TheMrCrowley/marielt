import React from 'react';

import FlatsFilters from '@/src/app-pages/FlatsPage/FlatsFilters';
import FlatsMap from '@/src/app-pages/FlatsPage/FlatsMap';
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
    <>
      <FlatsFilters data={data} />
      <FlatsMap productIds={searchParams.productIds || []} flats={flats} />
    </>
  );
};

export default Flats;
