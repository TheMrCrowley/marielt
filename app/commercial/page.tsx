import { Metadata } from 'next';
import React, { Suspense } from 'react';

import CommercialFilters from '@/src/app-pages/CommercialPage/CommercialFilters';
import CommercialList from '@/src/app-pages/CommercialPage/CommercialList';
import ApplicationField from '@/src/components/ApplicationField';
import Loader from '@/src/components/common/Loader';
import { getCommercialForList } from '@/src/services';
import { getCommercialFiltersData } from '@/src/services/filtersDataServices';
import { canonicalUrlMap, getOpenGraphField, getSeoFields } from '@/src/services/seoServices';

type CommercialProps = {
  searchParams: Record<string, string | string[]>;
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoFields('commPage');
  const canonical = canonicalUrlMap.commPage();

  const title = seo?.title || 'Коммерческая Недвижимость';
  const description = seo?.description || 'Описание Коммерческой Недвижимости';

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
  const [data, { commercial, pagination }] = await Promise.all([
    getCommercialFiltersData(),
    getCommercialForList(searchParams),
  ]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <CommercialFilters data={data} />
        <CommercialList commercial={commercial} pagination={pagination} />
        <ApplicationField />
      </Suspense>
    </>
  );
};

export default Commercial;
