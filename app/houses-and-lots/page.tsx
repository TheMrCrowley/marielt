import React from 'react';

import HousesAndLotsPage from '@/src/app-pages/HousesAndLotsPage';
import { getHousesAndLotsFiltersData } from '@/src/services/filtersDataServices';
import { getHousesAndLots } from '@/src/services/housesAndLotsServices';

type HousesAndLotsProps = {
  searchParams: Record<string, string | string[]>;
};

const HousesAndLots = async ({ searchParams }: HousesAndLotsProps) => {
  const [data, { housesAndLots, pagination }] = await Promise.all([
    getHousesAndLotsFiltersData(),
    getHousesAndLots(searchParams),
  ]);

  console.log('Found: ', housesAndLots.length);
  return <HousesAndLotsPage data={data} housesAndLots={housesAndLots} pagination={pagination} />;
};

export default HousesAndLots;
