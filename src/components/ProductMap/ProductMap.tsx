// @ts-nocheck
'use client';

import { Map, ObjectManager, YMaps } from '@pbe/react-yandex-maps';
import React, { useRef, useState } from 'react';
import ymaps from 'yandex-maps';

import { getPriceByCurrencySign } from '@/src/helpers/currencyHelpers';
import { useCurrency } from '@/src/store/currency';
import { DefaultFlatItem } from '@/src/types/Flats';

import './Map.css';

interface ProductMapProps {
  items: DefaultFlatItem[];
}

const ProductMap = ({ items }: ProductMapProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [api, setApi] = useState<typeof ymaps | null>(null);
  const { selectedCurrency, rates } = useCurrency();

  const mapRef = useRef<ymaps.Map>();
  const objectManagerRef = useRef();

  return (
    <YMaps
      query={{
        apikey: '3df8e968-877a-4154-8425-2833bdbcb517',
      }}
      version={'2.1.79'}
    >
      <Map
        instanceRef={mapRef}
        width={'100%'}
        height={'100%'}
        style={{
          flex: '1 1 auto',
        }}
        state={{
          center: [53.902287, 27.561824],
          zoom: 11,
        }}
        modules={['templateLayoutFactory', 'control.ZoomControl', 'control.FullscreenControl']}
        onLoad={(yapi) => {
          setIsLoaded(true);
          setApi(yapi);
        }}
      >
        {isLoaded && api && (
          <ObjectManager
            instanceRef={objectManagerRef}
            options={{
              clusterize: true,
              gridSize: 256,
            }}
            objects={{
              openBalloonOnClick: true,
              preset: 'islands#greenDotIcon',
            }}
            clusters={{
              clusterIconLayout: api.templateLayoutFactory.createClass(
                '<div class="cluster-wrapper">{{ properties.geoObjects.length}}</div>',
                {
                  build: function () {
                    this.constructor.superclass.build.call(this);
                    const el = this.getParentElement().getElementsByClassName(
                      'cluster-wrapper',
                    )[0] as HTMLDivElement;

                    const lowestPrice = Math.min(
                      ...(
                        this.getData().features as Array<{
                          data: {
                            price: number;
                          };
                        }>
                      ).map((item) => item.data.price),
                    );

                    el.innerHTML = `
                        <span>${this.getData().features.length}</span>
                        <p>от ${
                          lowestPrice
                            ? getPriceByCurrencySign(lowestPrice, 'USD', selectedCurrency, rates)
                            : 'Договорная'
                        }</p>
                    `;

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
            }}
            modules={['objectManager.addon.objectsBalloon']}
            defaultFeatures={items.map((item) => ({
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
                  `<div class="pin-container">${getPriceByCurrencySign(
                    item.price,
                    item.initialCurrency || 'USD',
                    selectedCurrency,
                    rates,
                  )}</div>`,
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
            }))}
            onClick={(e) => {
              const id = e.get('objectId');
              const isObject = !!objectManagerRef.current.objects.getById(id);
              if (isObject) {
                const objectId = objectManagerRef.current.objects.getById(id);
                console.log(items.find((i) => i.id === objectId.id));
              }
              console.log(objectManagerRef.current.clusters.getById(id));
              console.log(objectManagerRef.current.objects.getById(id));
            }}
          />
        )}
      </Map>
    </YMaps>
  );
};

export default ProductMap;
