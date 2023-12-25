'use client';

import React from 'react';

import { AppRoutes } from '@/src/enums/AppRoutes';
import { getPriceByCurrencySign } from '@/src/helpers/currencyHelpers';
import { useCurrency } from '@/src/store/currency';
import { DefaultFlatItem } from '@/src/types/Flats';

import CardArea from './CardArea';
import CardFloor from './CardFloor';
import CardPrice from './CardPrice';
import CardWrapper from './CardWrapper';

interface FlatCardProps {
  flatItem: DefaultFlatItem;
  wrapperClassName?: string;
}

const FlatCard = ({ flatItem, wrapperClassName }: FlatCardProps) => {
  const {
    image,
    name,
    address,
    id,
    price,
    initialCurrency,
    parameters: { floor, maxFloor, totalArea, livingArea },
  } = flatItem;

  const { selectedCurrency, rates } = useCurrency();

  return (
    <CardWrapper
      address={address}
      to={`${AppRoutes.Flats}/${id}`}
      imgUrl={image?.url}
      placeholderUrl={image?.placeholder}
      title={name}
      wrapperClassName={wrapperClassName}
    >
      <CardFloor floor={floor} maxFloor={maxFloor} />
      <CardArea
        livingArea={livingArea}
        totalArea={totalArea}
        priceByMeter={
          totalArea &&
          price &&
          getPriceByCurrencySign(+price / +totalArea, initialCurrency, selectedCurrency, rates)
        }
      />
      <CardPrice
        initialCurrency={initialCurrency}
        price={price}
        rates={rates}
        selectedCurrency={selectedCurrency}
      />
    </CardWrapper>
  );
};

export default FlatCard;
