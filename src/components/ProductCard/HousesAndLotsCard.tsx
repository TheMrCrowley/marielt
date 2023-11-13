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
    img,
    name,
    price,
    parameters: { plotSize },
  } = housesAndLotsItem;

  const { selectedCurrency, rates } = useCurrency();

  return (
    <CardWrapper
      address={address}
      to={`http://185.251.38.44:1337/admin/content-manager/collectionType/api::houses-and-lots-item.houses-and-lots-item/${id}`}
      imgUrl={img}
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
