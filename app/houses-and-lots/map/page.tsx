import { Metadata } from 'next';
import React, { Suspense } from 'react';

import HousesAndLotsFilters from '@/src/app-pages/HousesAndLotsPage/HousesAndLotsFilters';
import HousesMap from '@/src/app-pages/HousesAndLotsPage/HousesMap';
import Loader from '@/src/components/common/Loader';
import { getHousesAndLotsFiltersData } from '@/src/services/filtersDataServices';
import { getHousesAndLotsForMap } from '@/src/services/housesAndLotsServices';
import { canonicalUrlMap, getOpenGraphField, getSeoFields } from '@/src/services/seoServices';

type HouseProps = {
  searchParams: Record<string, string | string[]>;
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoFields('housePage');
  const canonical = canonicalUrlMap.housePage();

  const title = seo.title ? seo.title + ' на Карте' : 'Загородная Недвижимость на Карте';

  const description = seo?.description || 'Static Houses and Lots Description';

  return {
    title,
    alternates: {
      canonical,
    },
    openGraph: getOpenGraphField(title, description),
  };
}

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
