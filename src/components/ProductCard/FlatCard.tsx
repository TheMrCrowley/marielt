'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import FloorIcon from '@/public/card-floor.svg';
import CardMapPinIcon from '@/public/card-map-pin.svg';
import ImagePlaceholder from '@/public/card-placeholder.png';
import Button from '@/src/components/common/Button';
import Title from '@/src/components/common/Title';
import { getPriceByCurrencyMonetary, getPriceByCurrencySign } from '@/src/helpers/currencyHelpers';
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
