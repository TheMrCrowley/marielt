import clsx from 'clsx';
import React from 'react';

import ProductMap from '@/src/components/ProductMap';
import ProductMapList from '@/src/components/ProductMap/ProductMapList';
import { DefaultMapItem } from '@/src/types/Product';

interface CommercialMapProps {
  commercial: DefaultMapItem[];
  productIds: string[] | string;
}

const CommercialMap = ({ commercial, productIds }: CommercialMapProps) => {
  return (
    <section className={clsx('flex', 'w-full', 'flex-auto', 'items-stretch', 'h-full', 'relative')}>
      <ProductMap items={commercial}>
        <ProductMapList
          ids={Array.isArray(productIds) ? productIds : [productIds]}
          type="commercial"
        />
      </ProductMap>
    </section>
  );
};

export default CommercialMap;
