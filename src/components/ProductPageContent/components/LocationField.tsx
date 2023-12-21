'use client';

import {
  FullscreenControl,
  Map,
  Placemark,
  RulerControl,
  TypeSelector,
  YMaps,
  ZoomControl,
} from '@pbe/react-yandex-maps';
import clsx from 'clsx';

import Title from '@/src/components/common/Title/Title';

interface LocationFieldProps {
  location?: {
    lat: number;
    lng: number;
  };
}

const LocationField = ({ location }: LocationFieldProps) => {
  if (!location) {
    return null;
  }

  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'bg-primary-bold',
        'sm:p-5',
        'pt-5',
        'px-[10px]',
        'pb-[10px]',
      )}
    >
      <Title variant="h2" className={clsx('px-[10px]', 'sm:pb-4', 'pb-3')} fontSize={32}>
        Местоположение
      </Title>
      <div
        className={clsx('w-full', 'sm:h-[460px]', 'h-[340px]', 'sm:p-[10px]', 'p-1', 'relative')}
      >
        <YMaps
          query={{
            apikey: '3df8e968-877a-4154-8425-2833bdbcb517',
            // load: 'package.full',
          }}
          version={'2.1.79'}
        >
          <Map
            width={'100%'}
            height={'100%'}
            state={{
              center: [location.lat, location.lng],
              zoom: 15,
            }}
          >
            <FullscreenControl />
            <RulerControl />
            <TypeSelector />
            <ZoomControl />
            <Placemark geometry={[location.lat, location.lng]} />
          </Map>
        </YMaps>
        <div
          className={clsx(
            'sm:w-[91px]',
            'sm:h-[91px]',
            'w-[50px]',
            'h-[50px]',
            'absolute',
            'block',
            'top-0',
            'border-secondary',
            'border-t-2',
            'border-l-2',
            'left-0',
          )}
        />
        <div
          className={clsx(
            'sm:w-[91px]',
            'sm:h-[91px]',
            'w-[50px]',
            'h-[50px]',
            'absolute',
            'block',
            'top-0',
            'border-secondary',
            'border-t-2',
            'border-r-2',
            'right-0',
          )}
        />
        <div
          className={clsx(
            'sm:w-[91px]',
            'sm:h-[91px]',
            'w-[50px]',
            'h-[50px]',
            'absolute',
            'block',
            'bottom-0',
            'border-secondary',
            'border-b-2',
            'border-l-2',
            'left-0',
          )}
        />
        <div
          className={clsx(
            'sm:w-[91px]',
            'sm:h-[91px]',
            'w-[50px]',
            'h-[50px]',
            'absolute',
            'block',
            'bottom-0',
            'border-secondary',
            'border-b-2',
            'border-r-2',
            'right-0',
          )}
        />
      </div>
    </div>
  );
};

export default LocationField;
