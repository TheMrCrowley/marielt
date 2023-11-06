import React from 'react';

import HousesAndLotsFilters from '@/components/Filters/HousesAndLots';
import HousesAndLotsList from '@/components/Filters/HousesAndLots/HousesAndLotsList';
import { HousesAndLotsRootCategory } from '@/enums/HousesAndLotsFilters';
import { getHousesAndLots } from '@/services/housesAndLots';
import { getHousesAndLotsFiltersData } from '@/services/housesAndLotsFilters';

type CottagesProps = {
  searchParams: Record<string, string | string[]>;
};

const Cottages = async ({ searchParams }: CottagesProps) => {
  const [{ directions, housesAndLotasCategories }, { housesAndLots, pagination }] =
    await Promise.all([getHousesAndLotsFiltersData(), getHousesAndLots(searchParams)]);

  return (
    <>
      <HousesAndLotsFilters
        data={{
          directions,
          housesAndLotasCategories,
        }}
        type={HousesAndLotsRootCategory.Cottages}
      />
      <HousesAndLotsList housesAndLots={housesAndLots} pagination={pagination} />
    </>
  );
};

export default Cottages;
