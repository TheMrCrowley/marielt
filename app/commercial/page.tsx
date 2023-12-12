import { Metadata } from 'next';
import React, { Suspense } from 'react';

import CommercialFilters from '@/src/app-pages/CommercialPage/CommercialFilters';
import CommercialList from '@/src/app-pages/CommercialPage/CommercialList';
import ApplicationField from '@/src/components/ApplicationField';
import Loader from '@/src/components/common/Loader';
import { getCommercialItemsForList } from '@/src/services/commercialServices';
import { getCommercialFiltersData } from '@/src/services/filtersDataServices';
import { getSeoFields } from '@/src/services/seoServices';

type CommercialProps = {
  searchParams: Record<string, string | string[]>;
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoFields('commPage');

  return {
    title: seo?.title || 'Commercial Static Title',
    description: seo?.description || 'Static Commercial Description',
  };
}

const Commercial = async ({ searchParams }: CommercialProps) => {
  const [data, { commercial, pagination }] = await Promise.all([
    getCommercialFiltersData(),
    getCommercialItemsForList(searchParams),
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
