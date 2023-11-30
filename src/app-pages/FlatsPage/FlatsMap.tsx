import clsx from 'clsx';
import React from 'react';

import ProductMap from '@/src/components/ProductMap';
import ProductMapList from '@/src/components/ProductMap/ProductMapList';
import { DefaultMapFlatItem } from '@/src/types/Flats';

interface FlatsMapProps {
  flats: DefaultMapFlatItem[];
  productIds: string[] | string;
}

const FlatsMap = ({ flats, productIds }: FlatsMapProps) => {
  return (
    <section className={clsx('flex', 'w-full', 'flex-auto', 'items-stretch', 'h-full', 'relative')}>
      <ProductMap items={flats}>
        <ProductMapList ids={Array.isArray(productIds) ? productIds : [productIds]} type="flats" />
      </ProductMap>
    </section>
  );
};

export default FlatsMap;
