'use client';

import React from 'react';

import { DefaultCommercialItem } from '@/src/types/Commercial';

import CardWrapper from './CardWrapper';
import CommercialArea from './CommercialArea';
import CommercialPrice from './CommercialPrice';

interface CommercialCardProps {
  commercialItem: DefaultCommercialItem;
}

const CommercialCard = ({ commercialItem }: CommercialCardProps) => {
  const {
    img,
    name,
    address,
    id,
    initialCurrency,

    parameters: { totalArea, plotSize, floor, maxFloor, pricePerMeter, totalPrice },
  } = commercialItem;

  return (
    <CardWrapper
      address={address}
      to={`http://185.251.38.44:1337/admin/content-manager/collectionType/api::commercial-property-item.commercial-property-item/${id}`}
      imgUrl={img}
      title={name}
    >
      <CommercialArea
        totalArea={totalArea}
        floor={floor}
        maxFloor={maxFloor}
        plotSize={plotSize}
        initialCurrency={initialCurrency}
        pricePerMeter={pricePerMeter}
        totalPrice={!!totalPrice.from}
      />
      <CommercialPrice
        initialCurrency={initialCurrency}
        pricePerMeter={pricePerMeter}
        totalPrice={totalPrice}
      />
    </CardWrapper>
  );
};

export default CommercialCard;
