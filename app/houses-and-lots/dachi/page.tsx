import React from 'react';

import HousesAndLotsFilters from '@/components/Filters/HousesAndLots/HousesAndLotsFilters';
import { HousesAndLotsType } from '@/enums/HousesAndLotsFilters';
import { getHousesAndLotsFiltersData } from '@/services/filters';

const Dachi = async () => {
  const { directions, houseTypes } = await getHousesAndLotsFiltersData();

  return (
    <>
      <HousesAndLotsFilters
        data={{
          directions,
          houseTypes,
        }}
        type={HousesAndLotsType.Dachi}
      />
    </>
  );
};

export default Dachi;
