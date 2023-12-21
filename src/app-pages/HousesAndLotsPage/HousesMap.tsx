import clsx from 'clsx';
import React, { Suspense } from 'react';

import ProductMap from '@/src/components/ProductMap';
import ProductMapList from '@/src/components/ProductMap/ProductMapList';
import Loader from '@/src/components/common/Loader';
import { DefaultMapItem } from '@/src/types/Product';

interface HousesMapProps {
  houses: DefaultMapItem[];
  productIds: string[] | string;
}

const HousesMap = ({ houses, productIds }: HousesMapProps) => {
  return (
    <section className={clsx('flex', 'w-full', 'flex-auto', 'items-stretch', 'h-full', 'relative')}>
      <ProductMap items={houses}>
        <Suspense fallback={<Loader />} key={productIds?.toString()}>
          <ProductMapList
            ids={Array.isArray(productIds) ? productIds : [productIds]}
            type="houses-and-lots"
          />
        </Suspense>
      </ProductMap>
    </section>
  );
};

export default HousesMap;
