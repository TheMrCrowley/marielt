import React from 'react';

import HousesAndLotsFilters from '@/components/Filters/HousesAndLots';
import HousesAndLotsList from '@/components/Filters/HousesAndLots/HousesAndLotsList';
import { HousesAndLotsRootCategory } from '@/enums/HousesAndLotsFilters';
import { getHousesAndLots } from '@/services/housesAndLots';
import { getHousesAndLotsFiltersData } from '@/services/housesAndLotsFilters';

type DachiProps = {
  searchParams: Record<string, string | string[]>;
};

const Dachi = async ({ searchParams }: DachiProps) => {
  const [{ directions, housesAndLotasCategories }, { housesAndLots, pagination }] =
    await Promise.all([getHousesAndLotsFiltersData(), getHousesAndLots(searchParams)]);

  return (
    <>
      <HousesAndLotsFilters
        data={{
          directions,
          housesAndLotasCategories,
        }}
        type={HousesAndLotsRootCategory.Dachi}
      />
      <HousesAndLotsList housesAndLots={housesAndLots} pagination={pagination} />
    </>
  );
};

export default Dachi;
