'use client';

import React from 'react';

import ProductListWrapper from '@/components/Filters/ProductListWrapper';
import FlatCard from '@/components/ProductCard/FlatCard';
import { DefaultFlatItem } from '@/services/flats';
import { StrapiFindResponse } from '@/types/StrapiFindResponse';

interface FlatsListProps {
  flats: DefaultFlatItem[];
  pagination: StrapiFindResponse<{}>['meta']['pagination'];
}

const FlatsList = ({ flats, pagination }: FlatsListProps) => {
  return (
    <ProductListWrapper pagination={pagination}>
      {flats.map((flat) => (
        <FlatCard flatItem={flat} key={`flats-list-flats-item-${flat.id}`} />
      ))}
    </ProductListWrapper>
  );
};

export default FlatsList;
