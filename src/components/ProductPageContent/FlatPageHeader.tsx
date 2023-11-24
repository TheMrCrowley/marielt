import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import LocationIcon from '@/public/card-map-pin.svg';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';
import { AvailableCurrencies } from '@/src/types/Currency';

import PriceField from './PriceField';
import ProductHeader from './ProductHeader';

interface FlatPageHeaderProps {
  address?: string;
  title?: string;
  roominess?: string;
  floor?: string;
  maxFloor?: string;
  constructionYear?: string;
  totalArea?: string;
  livingArea?: string;
  kitchenArea?: string;
  initialCurrency: AvailableCurrencies;
  price?: number;
}

const FlatPageHeader = ({
  address,
  title,
  constructionYear,
  floor,
  maxFloor,
  roominess,
  initialCurrency,
  kitchenArea,
  livingArea,
  price,
  totalArea,
}: FlatPageHeaderProps) => {
  return (
    <ProductHeader
      description={
        <>
          <Title variant="h2" fontSize={24} fontWeight={'medium'}>
            {title}
          </Title>
          <div className={clsx('flex', 'gap-1.5')}>
            <Image alt="map-pin" src={LocationIcon} />
            <Typography fontSize={16}>{address}</Typography>
          </div>
          <div
            className={clsx(
              'flex',
              'justify-start',
              'mt-4',
              'lg:flex-row',
              'flex-col',
              'flex-wrap',
              'gap-4',
            )}
          >
            {roominess && (
              <Typography fontSize={16}>
                Комнат:
                <span className="text-secondary"> {roominess}</span>
              </Typography>
            )}
            {floor && (
              <Typography fontSize={16}>
                Этаж:
                <span className="text-secondary"> {floor}</span>
                {maxFloor && <>/{maxFloor}</>}
              </Typography>
            )}
            {constructionYear && (
              <Typography fontSize={16}>
                Год постройки:
                <span className="text-secondary"> {constructionYear}</span>
              </Typography>
            )}
          </div>
        </>
      }
      area={
        <div
          className={clsx(
            'flex',
            'flex-col',
            'lg:gap-y-[38px]',
            'gap-y-5',
            'lg:px-8',
            'px-4',
            'py-5',
            'lg:border-r',
            'border-[#ffffff1a]',
            'lg:border-t-0',
            'border-t',
            'border-[#ffffff1a]',
          )}
        >
          <Title variant="h2" fontSize={24} fontWeight={'medium'}>
            Площадь
          </Title>
          <div
            className={clsx(
              'flex',
              'lg:justify-center',
              'xs:justify-start',
              'justify-center',
              'items-center',
            )}
          >
            <div
              className={clsx(
                'flex',
                'flex-col',
                'lg:px-8',
                'border-r',
                'border-[#ffffff1a]',
                'px-4',
              )}
            >
              <Typography>
                {totalArea}
                <span className={clsx('text-[#B1B1B1]')}>
                  м<sup>2</sup>
                </span>
              </Typography>
              <Typography fontSize={16} fontWeight={'light'}>
                общая
              </Typography>
            </div>
            <div
              className={clsx(
                'flex',
                'flex-col',
                'lg:px-8',
                'px-4',
                'border-r',
                'border-[#ffffff1a]',
              )}
            >
              <Typography>
                {livingArea}
                <span className={clsx('text-[#B1B1B1]')}>
                  м<sup>2</sup>
                </span>
              </Typography>
              <Typography fontSize={16} fontWeight={'light'}>
                жилая
              </Typography>
            </div>
            <div className={clsx('flex', 'flex-col', 'lg:px-8', 'px-5')}>
              <Typography>
                {kitchenArea}
                <span className={clsx('text-[#B1B1B1]')}>
                  м<sup>2</sup>
                </span>
              </Typography>
              <Typography fontSize={16} fontWeight={'light'}>
                кухня
              </Typography>
            </div>
          </div>
        </div>
      }
      price={<PriceField initialCurrency={initialCurrency} price={+price!} />}
    />
  );
};

export default FlatPageHeader;
