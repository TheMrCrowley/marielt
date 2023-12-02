import React from 'react';

import HousesAndLotsCard from '@/src/components/ProductCard/HousesAndLotsCard';
import ProductListWrapper from '@/src/components/filters/ProductListWrapper';
import { DefaultHousesAndLotsItem } from '@/src/types/HousesAndLots';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

interface HousesAndLotsListProps {
  housesAndLots: DefaultHousesAndLotsItem[];
  pagination: StrapiFindResponse<{}>['meta']['pagination'];
}

const HousesAndLotsList = ({ housesAndLots, pagination }: HousesAndLotsListProps) => {
  return (
    <ProductListWrapper pagination={pagination}>
      {housesAndLots.map((item) => (
        <HousesAndLotsCard housesAndLotsItem={item} key={`flats-list-flats-item-${item.id}`} />
      ))}
    </ProductListWrapper>
  );
};

export default HousesAndLotsList;
