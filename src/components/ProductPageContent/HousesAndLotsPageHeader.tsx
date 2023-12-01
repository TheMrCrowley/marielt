import clsx from 'clsx';
import Image from 'next/image';

import LocationIcon from '@/public/card-map-pin.svg';
import DirectionIcon from '@/public/direction.svg';
import HouseIcon from '@/public/house-icon.svg';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';
import { AvailableCurrencies } from '@/src/types/Currency';

import PriceField from './PriceField';
import ProductHeader from './ProductHeader';

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
}: HousesAndLotsPageHeaderProps) => {
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
          {direction && (
            <div className={clsx('flex', 'gap-1.5')}>
              <Image alt="direction" src={DirectionIcon} />
              <Typography color="text-[#A3A3A3]" fontSize={16}>
                {direction}
              </Typography>
            </div>
          )}
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
            {category && (
              <div className={clsx('flex', 'gap-1.5')}>
                <Image alt="house" src={HouseIcon} />
                <Typography fontSize={16}>{category}</Typography>
              </div>
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
            'lg:gap-0',
            'gap-5',
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
              'my-auto',
            )}
          >
            {totalArea && (
              <div className={clsx('flex', 'flex-col', 'lg:px-8', 'px-4')}>
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
            )}
            {livingArea && (
              <div className={clsx('flex', 'flex-col', 'lg:px-8', 'px-4')}>
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
            )}
            {plotSize && (
              <div className={clsx('flex', 'flex-col', 'lg:px-8', 'px-5')}>
                <Typography>{plotSize} сот.</Typography>
              </div>
            )}
          </div>
        </div>
      }
      price={<PriceField initialCurrency={initialCurrency} price={+price!} />}
    />
  );
};

export default HousesAndLotsPageHeader;
