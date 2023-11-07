import React from 'react';

import HousesAndLotsFilters from '@/components/Filters/HousesAndLots';
import HousesAndLotsList from '@/components/Filters/HousesAndLots/HousesAndLotsList';
import { getHousesAndLots } from '@/services/housesAndLots';
import { getHousesAndLotsFiltersData } from '@/services/housesAndLotsFilters';

type HousesAndLotsProps = {
  searchParams: Record<string, string | string[]>;
};

const HousesAndLots = async ({ searchParams }: HousesAndLotsProps) => {
  const [{ directions, housesAndLotasCategories }, { housesAndLots, pagination }] =
    await Promise.all([getHousesAndLotsFiltersData(), getHousesAndLots(searchParams)]);

  return (
    <>
      <HousesAndLotsFilters
        data={{
          directions,
          housesAndLotasCategories,
        }}
      />
      <HousesAndLotsList housesAndLots={housesAndLots} pagination={pagination} />
    </>
  );
};

export default HousesAndLots;
