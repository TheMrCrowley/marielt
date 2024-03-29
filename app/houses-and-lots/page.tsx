import { Metadata } from 'next';
import React, { Suspense } from 'react';

import HousesAndLotsFilters from '@/src/app-pages/HousesAndLotsPage/HousesAndLotsFilters';
import HousesAndLotsList from '@/src/app-pages/HousesAndLotsPage/HousesAndLotsList';
import ApplicationField from '@/src/components/ApplicationField';
import Loader from '@/src/components/common/Loader';
import { getHousesForList } from '@/src/services';
import { getHousesAndLotsFiltersData } from '@/src/services/filtersDataServices';
import { canonicalUrlMap, getOpenGraphField, getSeoFields } from '@/src/services/seoServices';

type HousesAndLotsProps = {
  searchParams: Record<string, string | string[]>;
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoFields('housePage');
  const canonical = canonicalUrlMap.housePage();

  const title = seo?.title || 'Загородная Недвижимость';
  const description = seo?.description || 'Static Houses and Lots Description';

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: getOpenGraphField(title, description),
  };
}

const HousesAndLots = async ({ searchParams }: HousesAndLotsProps) => {
  const [data, { housesAndLots, pagination }] = await Promise.all([
    getHousesAndLotsFiltersData(),
    getHousesForList(searchParams),
  ]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <HousesAndLotsFilters data={data} />
        <HousesAndLotsList housesAndLots={housesAndLots} pagination={pagination} />
        <ApplicationField />
      </Suspense>
    </>
  );
};

export default HousesAndLots;
