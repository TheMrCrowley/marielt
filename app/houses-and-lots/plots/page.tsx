import React from 'react';

import HousesAndLotsFilters from '@/components/Filters/HousesAndLots';
import HousesAndLotsList from '@/components/Filters/HousesAndLots/HousesAndLotsList';
import { HousesAndLotsRootCategory } from '@/enums/HousesAndLotsFilters';
import { getHousesAndLots } from '@/services/housesAndLots';
import { getHousesAndLotsFiltersData } from '@/services/housesAndLotsFilters';

type PlotsProps = {
  searchParams: Record<string, string | string[]>;
};

const Plots = async ({ searchParams }: PlotsProps) => {
  const [{ directions, housesAndLotasCategories }, { housesAndLots, pagination }] =
    await Promise.all([getHousesAndLotsFiltersData(), getHousesAndLots(searchParams)]);

  return (
    <>
      <HousesAndLotsFilters
        data={{
          directions,
          housesAndLotasCategories,
        }}
        type={HousesAndLotsRootCategory.Plots}
      />
      <HousesAndLotsList housesAndLots={housesAndLots} pagination={pagination} />
    </>
  );
};

export default Plots;
