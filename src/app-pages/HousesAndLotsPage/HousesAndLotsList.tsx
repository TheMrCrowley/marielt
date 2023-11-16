import clsx from 'clsx';
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
    <section
      className={clsx(
        'w-full',
        'md:py-12',
        'md:px-20',
        'py-6',
        'px-6',
        'gap-8',
        'flex',
        'items-stretch',
      )}
    >
      <ProductListWrapper pagination={pagination}>
        {housesAndLots.map((item) => (
          <HousesAndLotsCard housesAndLotsItem={item} key={`flats-list-flats-item-${item.id}`} />
        ))}
      </ProductListWrapper>
    </section>
  );
};

export default HousesAndLotsList;
