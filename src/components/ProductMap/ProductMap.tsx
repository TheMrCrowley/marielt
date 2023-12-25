// @ts-nocheck
'use client';

import {
  Button,
  FullscreenControl,
  Map,
  ObjectManager,
  RulerControl,
  TypeSelector,
  YMaps,
  ZoomControl,
} from '@pbe/react-yandex-maps';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { PropsWithChildren, useEffect, useRef, useState, useMemo } from 'react';
import ymaps from 'yandex-maps';

import { getPriceByCurrencySign } from '@/src/helpers/currencyHelpers';
import { isClientMobile } from '@/src/helpers/isClientMobile';
import { useCurrency } from '@/src/store/currency';
import { DefaultMapItem } from '@/src/types/Product';

import './Map.css';
import ProductMapModal from './ProductMapModal';

interface ProductMapProps extends PropsWithChildren {
  items: DefaultMapItem[];
}

const ProductMap = ({ items, children }: ProductMapProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [api, setApi] = useState<typeof ymaps | null>(null);
  const { selectedCurrency, rates } = useCurrency();

  const mapRef = useRef<ymaps.Map>();
  const objectManagerRef = useRef();

  const handleButtonClick = () => {
    router.push(location.href.replace('/map', ''), {
      scroll: true,
    });
  };

  useEffect(() => {
    if (mapRef.current) {
      if (isClientMobile()) {
        mapRef.current.behaviors.disable('drag');
      } else {
        mapRef.current?.behaviors.enable('drag');
      }
    }
  }, [mapRef.current]);

  useEffect(() => {
    const productIds = searchParams.getAll('productIds');

    if (!productIds.length) {
      setIsModalOpen(false);
      return;
    }

    if (productIds.length && !isModalOpen) {
      setIsModalOpen(true);
      return;
    }
  }, [searchParams]);

  const featuresToRender = useMemo(() => {
    if (isLoaded && api) {
      return items.map((item) => ({
        type: 'Feature',
        id: item.id,
        geometry: {
          type: 'Point',
          coordinates: [item.location?.lat, item.location?.lng],
        },
        data: {
          price: item.price,
        },
        options: {
          iconLayout: api.templateLayoutFactory.createClass(
            `<div class="pin-container">${
              +item.price
                ? getPriceByCurrencySign(
                    +item.price,
                    item.initialCurrency || 'USD',
                    selectedCurrency,
                    rates,
                  )
                : 'Договорная'
            }</div>`,
            {
              build: function () {
                this.constructor.superclass.build.call(this);

                const el = this.getParentElement().getElementsByClassName('pin-container')[0];

                this.getData().options.set('shape', {
                  type: 'Rectangle',
                  coordinates: [
                    [-0, -0],
                    [el.offsetWidth, el.offsetHeight],
                  ],
                });
              },
            },
          ),
        },
      }));
    }

    return null;
  }, [isLoaded, api, selectedCurrency, items]);

  const clustersToRender = useMemo(() => {
    if (isLoaded && api) {
      return api.templateLayoutFactory.createClass(
        '<div class="cluster-wrapper">{{ properties.geoObjects.length}}</div>',
        {
          build: function () {
            this.constructor.superclass.build.call(this);

            const el = this.getParentElement().getElementsByClassName(
              'cluster-wrapper',
            )[0] as HTMLDivElement;

            const currentZoom = mapRef.current!.getZoom();

            if (currentZoom > 15) {
              const lowestPrice = Math.min(
                ...(
                  this.getData().features as Array<{
                    data: {
                      price: number;
                    };
                  }>
                ).map((item) => item.data.price),
              );

              el.classList.remove('cluster-wrapper');
              el.classList.add('cluster-with-tooltip');
              el.textContent = '';
              el.innerHTML = '';

              el.innerHTML = `
              <p class='tooltiptext'>${
                lowestPrice
                  ? getPriceByCurrencySign(lowestPrice, 'USD', selectedCurrency, rates)
                  : 'Договорная'
              }</p>
              <p class="cluster-wrapper">${this.getData().features.length}</p>                
              `;
            }

            this.getData().options.set('shape', {
              type: 'Rectangle',
              coordinates: [
                [-0, -0],
                [el.offsetWidth, el.offsetHeight],
              ],
            });
          },
        },
      );
    }

    return null;
  }, [isLoaded, api, selectedCurrency, items]);

  return (
    <>
      <YMaps
        query={{
          apikey: process.env.REACT_APP_YANDEX_MAPS_API_KEY,
        }}
        version={'2.1.79'}
      >
        <Map
          instanceRef={mapRef}
          width={'100%'}
          height={'100%'}
          style={{
            display: 'flex',
            alignItems: 'stretch',
            flex: '1 1 auto',
          }}
          defaultState={{
            center: [53.902287, 27.561824],
            zoom: 11,
          }}
          modules={['templateLayoutFactory', 'control.ZoomControl', 'control.FullscreenControl']}
          onLoad={(yapi) => {
            setIsLoaded(true);
            setApi(yapi);
          }}
        >
          <FullscreenControl />
          <RulerControl />
          <TypeSelector />
          <ZoomControl />
          <Button
            options={{
              layout:
                api &&
                api.templateLayoutFactory.createClass(
                  `<button class='listButton'>${'Список'}</button>`,
                ),
            }}
            data={{ content: 'Список' }}
            onClick={handleButtonClick}
          />
          {isLoaded && api && (
            <ObjectManager
              instanceRef={objectManagerRef}
              options={{
                clusterize: true,
                gridSize: 256,
              }}
              clusters={{
                clusterIconLayout: clustersToRender,
              }}
              modules={['objectManager.addon.objectsBalloon']}
              features={featuresToRender}
              onClick={(e) => {
                const id = e.get('objectId');

                const isObject = !!objectManagerRef.current.objects.getById(id);
                if (isObject) {
                  const objectId = objectManagerRef.current.objects.getById(id);
                  const targetSingleItem = items.find((item) => item.id === objectId.id)!;

                  router.push(pathname + '?' + `productIds=${targetSingleItem.id}`);
                } else {
                  const geometrySet = new Set<number>();
                  (objectManagerRef.current.clusters as ymaps.ObjectManager['clusters'])
                    .getById(id)
                    .features.forEach((feature) => {
                      geometrySet.add(feature.geometry.coordinates[0]);
                      geometrySet.add(feature.geometry.coordinates[1]);
                    });

                  const isFiniteCluster = geometrySet.size >= 2;

                  if (isFiniteCluster) {
                    const productSearchParams = new URLSearchParams();
                    const targetClusterItem = (
                      objectManagerRef.current.clusters as ymaps.ObjectManager['clusters']
                    ).getById(id);

                    targetClusterItem.features.forEach((feature) =>
                      productSearchParams.append('productIds', feature.id),
                    );

                    router.push(pathname + '?' + productSearchParams.toString());
                  }
                }
              }}
            />
          )}
        </Map>
      </YMaps>
      <ProductMapModal
        closeModal={() => {
          router.push(pathname);
        }}
        isOpen={isLoaded && isModalOpen}
      >
        {children}
      </ProductMapModal>
    </>
  );
};

export default ProductMap;
