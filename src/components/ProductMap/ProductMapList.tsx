import clsx from 'clsx';
import React from 'react';

import FlatCard from '@/src/components/ProductCard/FlatCard';
import { getFlatsByIds } from '@/src/services/flatsServices';
import { ProductType } from '@/src/types/Product';

const ProductMapList = async ({ ids, type }: { type: ProductType; ids: string[] }) => {
  const products = await getFlatsByIds(ids);

  if (!products || !products.length) {
    return null;
  }

  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'gap-6',
        'overflow-y-auto',
        'p-4',
      )}
    >
      {products.map((product) => (
        <FlatCard flatItem={product} key={`map-product-card-${type}-${product.id}`} />
      ))}
    </div>
  );
};

export default ProductMapList;
