import React from 'react';

import FlatsPage from '@/src/app-pages/FlatsPage';
import { getFlatsFiltersData } from '@/src/services/filtersDataServices';
import { getFlats } from '@/src/services/flatsServices';

type FlatsProps = {
  searchParams: Record<string, string | string[]>;
};

const Flats = async ({ searchParams }: FlatsProps) => {
  const [data, { flats, pagination }] = await Promise.all([
    getFlatsFiltersData(),
    getFlats(searchParams),
  ]);

  console.log('Flats was found: ', flats.length);
  return <FlatsPage data={data} flats={flats} pagination={pagination} />;
};

export default Flats;
