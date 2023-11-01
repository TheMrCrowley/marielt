import React from 'react';

import HousesAndLotsFilters from '@/components/Filters/HousesAndLots/HousesAndLotsFilters';
import { getHousesAndLotsFiltersData } from '@/services/filters';

const HousesAndLots = async () => {
  const { directions, houseTypes } = await getHousesAndLotsFiltersData();

  return (
    <>
      <HousesAndLotsFilters
        data={{
          directions,
          houseTypes,
        }}
      />
    </>
  );
};

export default HousesAndLots;
