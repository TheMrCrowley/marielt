import { Metadata } from 'next';
import React, { Suspense } from 'react';

import FlatsFilters from '@/src/app-pages/FlatsPage/FlatsFilters';
import FlatsList from '@/src/app-pages/FlatsPage/FlatsList';
import ApplicationField from '@/src/components/ApplicationField';
import Loader from '@/src/components/common/Loader';
import { getFlatsForList } from '@/src/services';
import { getFlatsFiltersData } from '@/src/services/filtersDataServices';
import { canonicalUrlMap, getOpenGraphField, getSeoFields } from '@/src/services/seoServices';

type FlatsProps = {
  searchParams: Record<string, string | string[]>;
};

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoFields('apartPage');
  const canonical = canonicalUrlMap.apartPage();

  const title = seo?.title || 'Жилая Недвижимость';
  const description = seo?.description || 'Описание Жилой Недвижимости';

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: getOpenGraphField(title, description),
  };
}

const Flats = async ({ searchParams }: FlatsProps) => {
  const [data, { flats, pagination }] = await Promise.all([
    getFlatsFiltersData(),
    getFlatsForList(searchParams),
  ]);

  return (
    <Suspense fallback={<Loader />}>
      <FlatsFilters data={data} />
      <FlatsList flats={flats} pagination={pagination} />
      <ApplicationField />
    </Suspense>
  );
};

export default Flats;
