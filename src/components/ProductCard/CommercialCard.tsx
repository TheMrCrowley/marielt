'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import CardMapPinIcon from '@/public/card-map-pin.svg';
import ImagePlaceholder from '@/public/card-placeholder.png';
import Button from '@/src/components/common/Button';
import Title from '@/src/components/common/Title';
import { getPriceByCurrencyMonetary } from '@/src/helpers/currencyHelpers';
import { useCurrency } from '@/src/store/currency';
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
      <CommercialArea totalArea={totalArea} floor={floor} maxFloor={maxFloor} plotSize={plotSize} />
      <CommercialPrice
        initialCurrency={initialCurrency}
        pricePerMeter={pricePerMeter}
        totalPrice={totalPrice}
      />
    </CardWrapper>
  );
};

export default CommercialCard;
