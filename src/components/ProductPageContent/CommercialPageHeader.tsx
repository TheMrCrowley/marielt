import clsx from 'clsx';
import Image from 'next/image';

import LocationIcon from '@/public/card-map-pin.svg';
import DirectionIcon from '@/public/direction.svg';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';
import { AvailableCurrencies } from '@/src/types/Currency';

import { ProductHeader } from './components';

interface CommercialPageHeaderProps {
  address?: string;
  title?: string;
  initialCurrency: AvailableCurrencies;
  price?: number;
  rootType?: string;
  type?: string;
  direction?: string;
  distance?: string;
}

const CommercialPageHeader = ({
  address,
  title,
  rootType,
  type,
  direction,
  distance,
}: CommercialPageHeaderProps) => {
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
                'mt-4',
                'lg:flex-row',
                'flex-col',
                'flex-wrap',
                'gap-4',
              )}
            >
              {rootType && (
                <div>
                  <Typography fontSize={14} color="text-[#B1B1B1]">
                    Тип
                  </Typography>
                  <Typography fontSize={14}>{rootType}</Typography>
                </div>
              )}
              {type && (
                <div>
                  <Typography fontSize={14} color="text-[#B1B1B1]">
                    Вид
                  </Typography>
                  <Typography fontSize={14}>{type}</Typography>
                </div>
              )}
            </div>
          </div>
        </>
      }
      // price={<PriceField totalArea={totalArea} initialCurrency={initialCurrency} price={+price!} />}
    />
  );
};

export default CommercialPageHeader;
