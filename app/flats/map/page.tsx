import { Metadata } from 'next';
import React, { Suspense } from 'react';

import FlatsFilters from '@/src/app-pages/FlatsPage/FlatsFilters';
import FlatsMap from '@/src/app-pages/FlatsPage/FlatsMap';
import Loader from '@/src/components/common/Loader';
import { getFlatsFiltersData } from '@/src/services/filtersDataServices';
import { getFlatsForMap } from '@/src/services/flatsServices';
import { canonicalUrlMap, getSeoFields } from '@/src/services/seoServices';

type FlatsProps = {
  searchParams: Record<string, string | string[]>;
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoFields('apartPage');
  const canonical = canonicalUrlMap.apartPageMap();

  const title = seo.title ? seo.title + ' на Карте' : 'Жилая Недвижимость на Карте';

  const description = seo?.description || 'Описание Жилой Недвижимости на Карте';
  return {
    title,
    description,
    alternates: {
      canonical,
    },
  };
}

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
