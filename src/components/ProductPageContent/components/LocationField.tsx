'use client';

import clsx from 'clsx';

import Loader from '@/src/components/common/Loader';
import Title from '@/src/components/common/Title/Title';
import { LoadFunctionType, useLoadComponent } from '@/src/hooks/useLoadComponent';

interface LocationFieldProps {
  location?: {
    lat: number;
    lng: number;
  };
}

const loadComponent =
  (location: LocationFieldProps['location']): LoadFunctionType =>
  async (setComponent) => {
    if (location) {
      const YMaps = (await import('@pbe/react-yandex-maps')).YMaps;
      const Map = (await import('@pbe/react-yandex-maps')).Map;
      const FullscreenControl = (await import('@pbe/react-yandex-maps')).FullscreenControl;
      const RulerControl = (await import('@pbe/react-yandex-maps')).RulerControl;
      const TypeSelector = (await import('@pbe/react-yandex-maps')).TypeSelector;
      const ZoomControl = (await import('@pbe/react-yandex-maps')).ZoomControl;
      const Placemark = (await import('@pbe/react-yandex-maps')).Placemark;

      setComponent(
        <YMaps
          query={{
            apikey: process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY,
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
        </YMaps>,
      );
    }
  };

const LocationField = ({ location }: LocationFieldProps) => {
  const { component, isLoaded } = useLoadComponent(loadComponent(location));

  if (!location) {
    return null;
  }

  const renderMap = () => (isLoaded ? component : <Loader />);

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
        {renderMap()}
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
