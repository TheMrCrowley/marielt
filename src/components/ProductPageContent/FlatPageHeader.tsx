import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import LocationIcon from '@/public/card-map-pin.svg';
import {
  AreaField,
  PriceField,
  ProductHeader,
} from '@/src/components/ProductPageContent/components';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';
import { AvailableCurrencies } from '@/src/types/Currency';

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
  const renderAreas = () => (
    <>
      {totalArea && (
        <div className={clsx('flex', 'flex-col')}>
          <Typography>
            {totalArea}
            <span className={clsx('text-[#B1B1B1]')}>м²</span>
          </Typography>
          <Typography fontSize={16} fontWeight={'light'}>
            общая
          </Typography>
        </div>
      )}
      {livingArea && (
        <div className={clsx('flex', 'flex-col')}>
          <Typography>
            {livingArea}
            <span className={clsx('text-[#B1B1B1]')}>м²</span>
          </Typography>
          <Typography fontSize={16} fontWeight={'light'}>
            жилая
          </Typography>
        </div>
      )}
      {kitchenArea && (
        <div className={clsx('flex', 'flex-col')}>
          <Typography>
            {kitchenArea}
            <span className={clsx('text-[#B1B1B1]')}>м²</span>
          </Typography>
          <Typography fontSize={16} fontWeight={'light'}>
            кухня
          </Typography>
        </div>
      )}
    </>
  );

  return (
    <ProductHeader
      description={
        <>
          <Title variant="h2" fontSize={24} fontWeight={'medium'}>
            {title}
          </Title>
          <div className={clsx('flex', 'h-full', 'justify-between', 'gap-4', 'flex-col')}>
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
          </div>
        </>
      }
      area={<AreaField>{renderAreas()}</AreaField>}
      price={<PriceField initialCurrency={initialCurrency} price={+price!} />}
    />
  );
};

export default FlatPageHeader;
