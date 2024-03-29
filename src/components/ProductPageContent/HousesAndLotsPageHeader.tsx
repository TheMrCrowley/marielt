import clsx from 'clsx';
import Image from 'next/image';

import LocationIcon from '@/public/card-map-pin.svg';
import DirectionIcon from '@/public/direction.svg';
import MetroIcon from '@/public/metro-icon.svg';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';
import { AvailableCurrencies } from '@/src/types/Currency';

import { AreaField, PriceField, ProductHeader } from './components';

interface HousesAndLotsPageHeaderProps {
  address?: string;
  title?: string;
  constructionYear?: string;
  totalArea?: string;
  livingArea?: string;
  kitchenArea?: string;
  plotSize?: string;
  initialCurrency: AvailableCurrencies;
  price?: number;
  category?: string;
  direction?: string;
  distance?: string;
  childCategory?: string;
  metro?: string;
}

const HousesAndLotsPageHeader = ({
  initialCurrency,
  address,
  constructionYear,
  totalArea,
  livingArea,
  plotSize,
  price,
  title,
  category,
  direction,
  childCategory,
  distance,
  metro,
}: HousesAndLotsPageHeaderProps) => {
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
      {plotSize && (
        <div className={clsx('flex', 'flex-col')}>
          <Typography>{plotSize} сот.</Typography>
          <Typography fontSize={16} fontWeight={'light'}>
            участок
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
          <div className={clsx('h-full', 'flex', 'justify-between', 'gap-4', 'flex-col')}>
            <div className={clsx('flex', 'gap-1.5')}>
              <Image alt="map-pin" src={LocationIcon} />
              <Typography className="inline" fontSize={16}>
                {address}
              </Typography>
            </div>
            {metro && (
              <div className={clsx('flex', 'gap-1.5')}>
                <Image alt="map-pin" src={MetroIcon} />
                <Typography fontSize={16}>{metro}</Typography>
              </div>
            )}
            {direction && (
              <div className={clsx('flex', 'gap-1.5')}>
                <Image alt="direction" src={DirectionIcon} />
                <Typography color="text-[#A3A3A3]" fontSize={16}>
                  {direction}
                  {distance && `, ${distance} км от МКАД`}
                </Typography>
              </div>
            )}
            <div
              className={clsx(
                'flex',
                'justify-start',
                'lg:items-end',
                'lg:flex-row',
                'flex-col',
                'flex-wrap',
                'gap-4',
              )}
            >
              {category && (
                <div>
                  <Typography fontSize={14} color="text-[#B1B1B1]">
                    Тип
                  </Typography>
                  <Typography fontSize={14}>{category}</Typography>
                </div>
              )}
              {childCategory && (
                <div>
                  <Typography fontSize={14} color="text-[#B1B1B1]">
                    Вид
                  </Typography>
                  <Typography fontSize={14}>{childCategory}</Typography>
                </div>
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
      price={<PriceField totalArea={totalArea} initialCurrency={initialCurrency} price={+price!} />}
    />
  );
};

export default HousesAndLotsPageHeader;
