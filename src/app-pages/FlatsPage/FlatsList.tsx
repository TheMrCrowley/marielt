'use client';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import FlatCard from '@/src/components/ProductCard/FlatCard';
import ProductMap from '@/src/components/ProductMap';
import ProductListWrapper from '@/src/components/filters/ProductListWrapper';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import { DefaultFlatItem } from '@/src/types/Flats';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

interface FlatsListProps {
  flats: DefaultFlatItem[];
  pagination: StrapiFindResponse<{}>['meta']['pagination'];
}

const FlatsList = ({ flats, pagination }: FlatsListProps) => {
  const breakpoint = useWindowSize();
  const searchParams = useSearchParams();

  const viewType = searchParams.get('viewType');
  return (
    // TODO move to common wrapper
    <section className={clsx('w-full', 'md:py-12', 'md:px-20', 'py-6', 'px-6', 'gap-4')}>
      {viewType === 'map' ? (
        <ProductMap items={flats} />
      ) : (
        <ProductListWrapper pagination={pagination}>
          {flats.map((flat) => (
            <FlatCard flatItem={flat} key={`flats-list-flats-item-${flat.id}`} />
          ))}
        </ProductListWrapper>
      )}
    </section>
  );
};

export default FlatsList;
