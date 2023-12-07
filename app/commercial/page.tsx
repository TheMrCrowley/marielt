import React from 'react';

import CommercialFilters from '@/src/app-pages/CommercialPage/CommercialFilters';
import CommercialList from '@/src/app-pages/CommercialPage/CommercialList';
import ApplicationField from '@/src/components/ApplicationField';
import { getCommercialItemsForList } from '@/src/services/commercialServices';
import { getCommercialFiltersData } from '@/src/services/filtersDataServices';

type CommercialProps = {
  searchParams: Record<string, string | string[]>;
};

const Commercial = async ({ searchParams }: CommercialProps) => {
  const [data, { commercial, pagination }] = await Promise.all([
    getCommercialFiltersData(),
    getCommercialItemsForList(searchParams),
  ]);

  return (
    <>
      <CommercialFilters data={data} />
      <CommercialList commercial={commercial} pagination={pagination} />
      <ApplicationField />
    </>
  );
};

export default Commercial;
