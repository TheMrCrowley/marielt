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

  const renderPriceBlock = () => {
    return (
      <div className={clsx('flex', 'justify-between', 'items-center', 'mb-4')}>
        <p className={clsx('text-white', 'text-xl', 'font-medium')}>
          {price
            ? getPriceByCurrencyMonetary(+price, initialCurrency, selectedCurrency, rates)
            : 'цена'}
        </p>
        <p className={clsx('text-white', 'text-xl', 'font-normal', 'opacity-50')}>
          {price ? getPriceByCurrencyMonetary(+price, initialCurrency, 'BYN', rates) : 'цена'}
        </p>
      </div>
    );
  };

  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'max-w-[300px]',
        'w-full',
        'bg-[#262626]',
        'min-h-[435px]',
      )}
    >
      <Image
        className={clsx('object-cover')}
        src={img || ImagePlaceholder}
        width={330}
        height={165}
        alt="product-card"
      />
      <div className={clsx('pt-3', 'pb-5', 'px-5', 'flex', 'flex-col', 'flex-auto')}>
        <Title
          className={clsx(
            'text-ellipsis',
            'whitespace-nowrap',
            'overflow-hidden',
            'w-full',
            'mb-3',
          )}
          variant="h2"
          fontSize={20}
        >
          {name || 'Название Дома или Участка'}
        </Title>
        <div className={clsx('flex', 'items-center', 'gap-x-2', 'mb-auto')}>
          <Image src={CardMapPinIcon} alt="card-map-pin" />
          <p className={clsx('text-white', 'text-base', 'font-normal', 'opacity-50')}>{address}</p>
        </div>
        {!!plotSize && (
          <p className={clsx('md:text-sm', 'text-xs', 'font-light', 'text-white')}>
            Площадь участка:{' '}
            <span className={clsx('md:text-base', 'text-sm', 'font-medium')}>{plotSize}</span>{' '}
            <span className={clsx('opacity-50')}>соток</span>
          </p>
        )}
        {price && renderPriceBlock()}
        <Link
          href={`http://185.251.38.44:1337/admin/content-manager/collectionType/api::houses-and-lots-item.houses-and-lots-item/${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button buttonType="bordered" className="w-full">
            Подробнее
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HousesAndLotsCard;
