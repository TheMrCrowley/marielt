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
    <div className={clsx('flex', 'flex-col', 'max-w-[300px]', 'w-full', 'bg-[#262626]')}>
      <Link
        href={`http://185.251.38.44:1337/admin/content-manager/collectionType/api::apartments-item.apartments-item/${id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          className={clsx('object-cover')}
          src={img || ImagePlaceholder}
          width={330}
          height={165}
          alt="product-card"
        />
      </Link>

      <div className={clsx('pt-3', 'pb-5', 'px-5', 'flex', 'flex-col')}>
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
          {name || 'Тут могло быть ваше название'}
        </Title>
        <div className={clsx('flex', 'items-center', 'gap-x-2', 'mb-3')}>
          <Image src={CardMapPinIcon} alt="card-map-pin" />
          <p className={clsx('text-white', 'text-base', 'font-normal', 'opacity-50')}>{address}</p>
        </div>
        <div className={clsx('flex', 'items-center', 'gap-x-2', 'mb-3')}>
          <Image src={FloorIcon} alt="floor" />
          <p className={clsx('text-white', 'text-base', 'font-normal')}>
            {floor}
            <span className={clsx('text-white', 'text-base', 'font-normal', 'opacity-50')}>
              /{maxFloor}
            </span>
          </p>
        </div>
        <div className={clsx('flex', 'items-center', 'gap-x-11', 'my-5')}>
          <div className={clsx('flex', 'flex-col')}>
            <p className={clsx('text-white', 'text-sm', 'font-medium')}>
              {totalArea}
              <span className={clsx('text-xs', 'opacity-50')}>
                м<sup>2</sup>
              </span>
            </p>
            <p className={clsx('text-white', 'text-xs', 'font-light')}>общая</p>
          </div>
          {!!livingArea && (
            <div className={clsx('flex', 'flex-col')}>
              <p className={clsx('text-white', 'text-sm', 'font-medium')}>
                {livingArea}
                <span className={clsx('text-xs', 'opacity-50')}>
                  м<sup>2</sup>
                </span>
              </p>
              <p className={clsx('text-white', 'text-xs', 'font-light')}>жилая</p>
            </div>
          )}
          {!!price && !!totalArea && (
            <div className={clsx('flex', 'flex-col')}>
              <p className={clsx('text-white', 'text-sm', 'font-medium')}>
                {getPriceByCurrencySign(
                  +price / +totalArea,
                  initialCurrency,
                  selectedCurrency,
                  rates,
                )}
              </p>
              <p className={clsx('text-white', 'text-xs', 'font-light')}>
                за м<sup>2</sup>
              </p>
            </div>
          )}
        </div>
        {renderPriceBlock()}
        <Link
          href={`http://185.251.38.44:1337/admin/content-manager/collectionType/api::apartments-item.apartments-item/${id}`}
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

export default FlatCard;
