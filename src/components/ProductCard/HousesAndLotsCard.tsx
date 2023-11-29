'use client';

import React from 'react';

import { useCurrency } from '@/src/store/currency';
import { DefaultHousesAndLotsItem } from '@/src/types/HousesAndLots';

import CardArea from './CardArea';
import CardPrice from './CardPrice';
import CardWrapper from './CardWrapper';

interface HousesAndLotsCardProps {
  housesAndLotsItem: DefaultHousesAndLotsItem;
}

const HousesAndLotsCard = ({ housesAndLotsItem }: HousesAndLotsCardProps) => {
  const {
    address,
    id,
    initialCurrency,
    image,
    name,
    price,
    parameters: { plotSize },
  } = housesAndLotsItem;

  const { selectedCurrency, rates } = useCurrency();

  return (
    <CardWrapper
      address={address}
      to={`https://marielt.site/admin/content-manager/collectionType/api::houses-and-lots-item.houses-and-lots-item/${id}`}
      imgUrl={image?.url}
      placeholderUrl={image?.placeholderUrl}
      title={name}
    >
      <CardArea plotSize={plotSize} />
      <CardPrice
        initialCurrency={initialCurrency}
        rates={rates}
        selectedCurrency={selectedCurrency}
        price={price}
      />
    </CardWrapper>
  );
};

export default HousesAndLotsCard;