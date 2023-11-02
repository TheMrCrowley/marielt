import React from 'react';

import HousesAndLotsFilters from '@/components/Filters/HousesAndLots/HousesAndLotsFilters';
import HousesAndLotsList from '@/components/Filters/HousesAndLots/HousesAndLotsList';
import { HousesAndLotsType } from '@/enums/HousesAndLotsFilters';
import { getHousesAndLotsFiltersData } from '@/services/filters';
import { getHousesAndLots } from '@/services/housesAndLots';

type CottagesProps = {
  searchParams: Record<string, string | string[]>;
};

const Cottages = async ({ searchParams }: CottagesProps) => {
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
        type={HousesAndLotsType.Cottages}
      />
      <HousesAndLotsList housesAndLots={housesAndLots} pagination={pagination} />
    </>
  );
};

export default Cottages;
