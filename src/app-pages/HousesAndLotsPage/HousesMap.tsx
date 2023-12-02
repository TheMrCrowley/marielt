import clsx from 'clsx';
import React from 'react';

import ProductMap from '@/src/components/ProductMap';
import ProductMapList from '@/src/components/ProductMap/ProductMapList';
import { DefaultMapItem } from '@/src/types/Product';

interface HousesMapProps {
  houses: DefaultMapItem[];
  productIds: string[] | string;
}

const HousesMap = ({ houses, productIds }: HousesMapProps) => {
  return (
    <section className={clsx('flex', 'w-full', 'flex-auto', 'items-stretch', 'h-full', 'relative')}>
      <ProductMap items={houses}>
        <ProductMapList
          ids={Array.isArray(productIds) ? productIds : [productIds]}
          type="houses-and-lots"
        />
      </ProductMap>
    </section>
  );
};

export default HousesMap;
