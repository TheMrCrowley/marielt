import React from 'react';

import CommercialPage from '@/src/app-pages/CommercialPage';
import { getCommercialItems } from '@/src/services/commercialServices';
import { getCommercialFiltersData } from '@/src/services/filtersDataServices';

type CommercialProps = {
  searchParams: Record<string, string | string[]>;
};

const Commercial = async ({ searchParams }: CommercialProps) => {
  const [data, { commercial, pagination }] = await Promise.all([
    getCommercialFiltersData(),
    getCommercialItems(searchParams),
  ]);

  return <CommercialPage data={data} commercial={commercial} pagination={pagination} />;
};

export default Commercial;
