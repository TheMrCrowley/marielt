'use client';
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import clsx from 'clsx';
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
    <section className={clsx('w-full', 'py-20', 'px-20', 'gap-12')}>
      <ProductListWrapper pagination={pagination}>
        {flats.map((flat) => (
          <FlatCard flatItem={flat} key={`flats-list-flats-item-${flat.id}`} />
        ))}
      </ProductListWrapper>
    </section>
  );
};

export default FlatsList;
