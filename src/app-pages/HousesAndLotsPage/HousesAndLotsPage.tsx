import React from 'react';

import { HousesAndLotsFiltersType } from '@/src/store/housesAndLotsFilters';
import { DefaultHousesAndLotsItem } from '@/src/types/HousesAndLots';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

import HousesAndLotsFilters from './HousesAndLotsFilters';
import HousesAndLotsList from './HousesAndLotsList';

interface HousesAndLotsPageProps {
  data: HousesAndLotsFiltersType['data'];
  housesAndLots: DefaultHousesAndLotsItem[];
  pagination: StrapiFindResponse<{}>['meta']['pagination'];
}

const HousesAndLotsPage = ({ data, housesAndLots, pagination }: HousesAndLotsPageProps) => {
  return (
    <>
      <HousesAndLotsFilters data={data} />
      <HousesAndLotsList housesAndLots={housesAndLots} pagination={pagination} />
    </>
  );
};

export default HousesAndLotsPage;
