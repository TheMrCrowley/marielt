'use client';

import React from 'react';

import { useCurrency } from '@/src/store/currency';
import { DefaultHousesAndLotsItem } from '@/src/types/HousesAndLots';

import CardArea from './CardArea';
import CardPrice from './CardPrice';
import CardWrapper from './CardWrapper';

interface HousesAndLotsCardProps {
  housesAndLotsItem: DefaultHousesAndLotsItem;
  wrapperClassName?: string;
}

const HousesAndLotsCard = ({ housesAndLotsItem, wrapperClassName }: HousesAndLotsCardProps) => {
  const {
    address,
    id,
    initialCurrency,
    image,
    name,
    price,
    parameters: { plotSize, totalArea },
  } = housesAndLotsItem;

  const { selectedCurrency, rates } = useCurrency();

  return (
    <CardWrapper
      wrapperClassName={wrapperClassName}
      address={address}
      to={`/houses-and-lots/${id}`}
      imgUrl={image?.url}
      placeholderUrl={image?.placeholderUrl}
      title={name}
    >
      <CardArea plotSize={plotSize} totalArea={totalArea} />
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
