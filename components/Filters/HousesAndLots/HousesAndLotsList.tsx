import React from 'react';

import ProductListWrapper from '@/components/Filters/ProductListWrapper';
import HousesAndLotsCard from '@/components/ProductCard/HousesAndLotsCard';
import { DefaultHousesAndLotsItem } from '@/services/housesAndLots';
import { StrapiFindResponse } from '@/types/StrapiFindResponse';

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
