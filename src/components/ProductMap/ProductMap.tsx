// @ts-nocheck
'use client';

import { Clusterer, Map, ObjectManager, Placemark, YMaps } from '@pbe/react-yandex-maps';
import React, { useEffect, useRef, useState } from 'react';
import ymaps from 'yandex-maps';

import { DefaultFlatItem } from '@/src/types/Flats';

import './Map.css';

interface ProductMapProps {
  items: DefaultFlatItem[];
}

const CustomPlacemark = ({ flat, api }: { flat: DefaultFlatItem; api: typeof ymaps }) => {
  const placeMarkRef = useRef();

  // const layout = api.templateLayoutFactory.createClass(
  //   `<div class="pin-container">${flat.price}</div>`,
  // {
  //   build: function () {
  //     layout.superclass.build.call(this);
  //     const el = this.getParentElement().getElementsByClassName('pin-container')[0];

  //     console.log(this);

  //     window.api = this;

  //     this.getData().options.set('shape', {
  //       type: 'Rectangle',
  //       coordinates: [
  //         [-0, -0],
  //         [el.offsetWidth, el.offsetHeight],
  //       ],
  //     });
  //     this.getData().geoObject.events.add(
  //       'click',
  //       () => {
  //         console.log(flat.price);
  //       },
  //       this,
  //     );
  //   },
  // },
  // );

  return (
    <Placemark
      instanceRef={placeMarkRef}
      geometry={[flat.location?.lat, flat.location?.lng]}
      options={{
        // iconLayout: layout,
        hasBalloon: true,
      }}
      onClick={console.log}
    />
  );
};

const ProductMap = ({ items }: ProductMapProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [api, setApi] = useState<typeof ymaps | null>(null);

  const mapRef = useRef<ymaps.Map>();
  const objectManagerRef = useRef();

  return (
    <YMaps
      query={{
        apikey: '3df8e968-877a-4154-8425-2833bdbcb517',
        // load: 'package.full',
      }}
      version={'2.1.79'}
    >
      <Map
        instanceRef={mapRef}
        width={'100%'}
        height={900}
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
          // <ObjectManager>
          //   {items.map((item) => (
          //     <CustomPlacemark flat={item} key={item.id} api={api} />
          //   ))}
          // </ObjectManager>
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
                '<div class="pin-container">{{ properties.geoObjects.length}}</div>',
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
            }}
            modules={['objectManager.addon.objectsBalloon']}
            defaultFeatures={items.map((item) => ({
              type: 'Feature',
              id: item.id,
              geometry: {
                type: 'Point',
                coordinates: [item.location?.lat, item.location?.lng],
              },
              options: {
                iconLayout: api.templateLayoutFactory.createClass(
                  `<div class="pin-container">${item.price}${item.initialCurrency}</div>`,
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
