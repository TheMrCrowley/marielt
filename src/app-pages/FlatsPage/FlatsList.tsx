'use client';
import React from 'react';

import FlatCard from '@/src/components/ProductCard/FlatCard';
import ProductListWrapper from '@/src/components/filters/ProductListWrapper';
import { DefaultFlatItem } from '@/src/types/Flats';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

interface FlatsListProps {
  flats: DefaultFlatItem[];
  pagination: StrapiFindResponse<{}>['meta']['pagination'];
}

const FlatsList = ({ flats, pagination }: FlatsListProps) => {
  return (
    <ProductListWrapper pagination={pagination}>
      {!!flats.length &&
        flats.map((flat) => <FlatCard flatItem={flat} key={`flats-list-flats-item-${flat.id}`} />)}
    </ProductListWrapper>
  );
};

export default FlatsList;
