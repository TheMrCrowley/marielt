import { Metadata } from 'next';
import React, { Suspense } from 'react';

import FlatsFilters from '@/src/app-pages/FlatsPage/FlatsFilters';
import FlatsList from '@/src/app-pages/FlatsPage/FlatsList';
import ApplicationField from '@/src/components/ApplicationField';
import Loader from '@/src/components/common/Loader';
import { getFlatsFiltersData } from '@/src/services/filtersDataServices';
import { getFlatsForList } from '@/src/services/flatsServices';
import { getSeoFields } from '@/src/services/seoServices';

type FlatsProps = {
  searchParams: Record<string, string | string[]>;
};

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoFields('apartPage');

  return {
    title: seo?.title || 'Flats Static Title',
    description: seo?.description || 'Static Flats Description',
  };
}

const Flats = async ({ searchParams }: FlatsProps) => {
  const [data, { flats, pagination }] = await Promise.all([
    getFlatsFiltersData(),
    getFlatsForList(searchParams),
  ]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <FlatsFilters data={data} />
        <FlatsList flats={flats} pagination={pagination} />
        <ApplicationField />
      </Suspense>
    </>
  );
};

export default Flats;
