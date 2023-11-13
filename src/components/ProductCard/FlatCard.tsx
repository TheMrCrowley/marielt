'use client';

import React from 'react';

import { getPriceByCurrencySign } from '@/src/helpers/currencyHelpers';
import { useCurrency } from '@/src/store/currency';
import { DefaultFlatItem } from '@/src/types/Flats';

import CardArea from './CardArea';
import CardFloor from './CardFloor';
import CardPrice from './CardPrice';
import CardWrapper from './CardWrapper';

interface FlatCardProps {
  flatItem: DefaultFlatItem;
}

const FlatCard = ({ flatItem }: FlatCardProps) => {
  const {
    img,
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
      to={`http://185.251.38.44:1337/admin/content-manager/collectionType/api::apartments-item.apartments-item/${id}`}
      imgUrl={img}
      title={name}
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
