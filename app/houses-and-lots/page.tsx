import React from 'react';

import HousesAndLotsFilters from '@/src/app-pages/HousesAndLotsPage/HousesAndLotsFilters';
import HousesAndLotsList from '@/src/app-pages/HousesAndLotsPage/HousesAndLotsList';
import ApplicationField from '@/src/components/ApplicationField';
import { getHousesAndLotsFiltersData } from '@/src/services/filtersDataServices';
import { getHousesAndLotsForList } from '@/src/services/housesAndLotsServices';

type HousesAndLotsProps = {
  searchParams: Record<string, string | string[]>;
};

const HousesAndLots = async ({ searchParams }: HousesAndLotsProps) => {
  const [data, { housesAndLots, pagination }] = await Promise.all([
    getHousesAndLotsFiltersData(),
    getHousesAndLotsForList(searchParams),
  ]);

  return (
    <>
      <HousesAndLotsFilters data={data} />
      <HousesAndLotsList housesAndLots={housesAndLots} pagination={pagination} />
      <ApplicationField />
    </>
  );
};

export default HousesAndLots;
