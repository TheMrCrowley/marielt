import clsx from 'clsx';
import React from 'react';

import CommercialCard from '@/src/components/ProductCard/CommercialCard';
import FlatCard from '@/src/components/ProductCard/FlatCard';
import HousesAndLotsCard from '@/src/components/ProductCard/HousesAndLotsCard';
import { getFlatsByIds } from '@/src/services';
import { getCommercialByIds } from '@/src/services/commercialServices';
import { getHousesByIds } from '@/src/services/housesAndLotsServices';
import { DefaultCommercialItem } from '@/src/types/Commercial';
import { DefaultFlatItem } from '@/src/types/Flats';
import { DefaultHousesAndLotsItem } from '@/src/types/HousesAndLots';
import { ProductType } from '@/src/types/Product';

const getFetchFunctionByType = (type: ProductType) => {
  switch (type) {
    case 'flats':
      return getFlatsByIds;
    case 'houses-and-lots':
      return getHousesByIds;
    case 'commercial':
      return getCommercialByIds;
    default:
      return null as never;
  }
};

const ProductMapList = async ({ ids, type }: { type: ProductType; ids: string[] }) => {
  const products = await getFetchFunctionByType(type)(ids);

  if (!products || !products.length) {
    return null;
  }

  const renderProductsByType = () => {
    switch (type) {
      case 'flats':
        return products.map((product) => (
          <FlatCard
            flatItem={product as DefaultFlatItem}
            key={`map-flats-product-card-${type}-${product.id}`}
            // wrapperClassName="!min-w-[330px]"
          />
        ));
      case 'houses-and-lots':
        return products.map((product) => (
          <HousesAndLotsCard
            housesAndLotsItem={product as DefaultHousesAndLotsItem}
            key={`map-house-product-card-${type}-${product.id}`}
            // wrapperClassName="!min-w-[330px]"
          />
        ));
      case 'commercial':
        return products.map((product) => (
          <CommercialCard
            commercialItem={product as DefaultCommercialItem}
            key={`map-house-product-card-${type}-${product.id}`}
            // wrapperClassName="!min-w-[330px]"
          />
        ));
      default:
        return null as never;
    }
  };

  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'justify-start',
        'items-center',
        'gap-6',
        'overflow-y-auto',
        'p-4',
        'w-full',
      )}
    >
      {renderProductsByType()}
    </div>
  );
};

export default ProductMapList;
