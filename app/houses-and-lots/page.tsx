import React from 'react';

import HousesAndLotsFilters from '@/components/Filters/HousesAndLots/HousesAndLotsFilters';
import HousesAndLotsList from '@/components/Filters/HousesAndLots/HousesAndLotsList';
import { getHousesAndLotsFiltersData } from '@/services/filters';
import { getHousesAndLots } from '@/services/housesAndLots';

type HousesAndLotsProps = {
  searchParams: Record<string, string | string[]>;
};
const HousesAndLots = async ({ searchParams }: HousesAndLotsProps) => {
  const [{ directions, houseTypes }, { housesAndLots, pagination }] = await Promise.all([
    getHousesAndLotsFiltersData(),
    getHousesAndLots(searchParams),
  ]);

  return (
    <>
      <HousesAndLotsFilters
        data={{
          directions,
          houseTypes,
        }}
      />
      <HousesAndLotsList housesAndLots={housesAndLots} pagination={pagination} />
    </>
  );
};

export default HousesAndLots;
