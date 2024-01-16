'use client';

import React from 'react';

import { DefaultCommercialItem } from '@/src/types/Commercial';

import CardWrapper from './CardWrapper';
import CommercialArea from './CommercialArea';
import CommercialPrice from './CommercialPrice';

interface CommercialCardProps {
  commercialItem: DefaultCommercialItem;
  wrapperClassName?: string;
}

const CommercialCard = ({ commercialItem, wrapperClassName }: CommercialCardProps) => {
  const {
    image,
    name,
    address,
    id,
    initialCurrency,
    parameters,
    totalArea,
    pricePerMeter,
    totalPrice,
    metro,
  } = commercialItem;

  return (
    <CardWrapper
      address={address}
      to={`/commercial/${id}`}
      imgUrl={image?.url}
      title={name}
      wrapperClassName={wrapperClassName}
      metro={metro}
    >
      <CommercialArea
        totalArea={totalArea}
        floor={parameters?.floor}
        maxFloor={parameters?.maxFloor}
        plotSize={parameters?.plotSize}
        initialCurrency={initialCurrency || 'USD'}
        pricePerMeter={pricePerMeter}
        totalPrice={!!totalPrice?.from}
        vat={parameters?.vat}
      />
      <CommercialPrice
        initialCurrency={initialCurrency || 'USD'}
        pricePerMeter={pricePerMeter}
        totalPrice={totalPrice}
      />
    </CardWrapper>
  );
};

export default CommercialCard;
