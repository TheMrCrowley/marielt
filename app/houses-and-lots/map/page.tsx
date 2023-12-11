import React, { Suspense } from 'react';

import HousesAndLotsFilters from '@/src/app-pages/HousesAndLotsPage/HousesAndLotsFilters';
import HousesMap from '@/src/app-pages/HousesAndLotsPage/HousesMap';
import Loader from '@/src/components/common/Loader';
import { getHousesAndLotsFiltersData } from '@/src/services/filtersDataServices';
import { getHousesAndLotsForMap } from '@/src/services/housesAndLotsServices';

type HouseProps = {
  searchParams: Record<string, string | string[]>;
};

const HouseMap = async ({ searchParams }: HouseProps) => {
  const [data, { houses }] = await Promise.all([
    getHousesAndLotsFiltersData(),
    getHousesAndLotsForMap(searchParams),
  ]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <HousesAndLotsFilters data={data} />
        <HousesMap houses={houses} productIds={searchParams.productIds} />
      </Suspense>
    </>
  );
};

export default HouseMap;
