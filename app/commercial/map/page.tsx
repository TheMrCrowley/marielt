import { Metadata } from 'next';
import React, { Suspense } from 'react';

import CommercialFilters from '@/src/app-pages/CommercialPage/CommercialFilters';
import CommercialMap from '@/src/app-pages/CommercialPage/CommercialMap';
import Loader from '@/src/components/common/Loader';
import { getCommercialForMap } from '@/src/services';
import { getCommercialFiltersData } from '@/src/services/filtersDataServices';
import { canonicalUrlMap, getOpenGraphField, getSeoFields } from '@/src/services/seoServices';

type CommercialProps = {
  searchParams: Record<string, string | string[]>;
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoFields('commPage');
  const canonical = canonicalUrlMap.commPageMap();

  const title = seo.title ? seo.title + ' на Карте' : 'Коммерческая недвижимость на карте';
  const description = seo.description || 'Описание Коммерческой Недвижимости на Карте';

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: getOpenGraphField(title, description),
  };
}

const Commercial = async ({ searchParams }: CommercialProps) => {
  const [data, { commercial }] = await Promise.all([
    getCommercialFiltersData(),
    getCommercialForMap(searchParams),
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
