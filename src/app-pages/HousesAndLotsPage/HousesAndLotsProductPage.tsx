import React from 'react';

import ApplicationField from '@/src/components/ApplicationField';
import ProductPageContent, {
  CreditCalculator,
  LocationField,
  NoteField,
} from '@/src/components/ProductPageContent';
import SimilarProducts from '@/src/components/ProductPageContent/SimilarProducts';
import { DetailedHousesAndLotsItem } from '@/src/types/HousesAndLots';

interface HousesAndLotsProductPageProps {
  item: DetailedHousesAndLotsItem;
}
const HousesAndLotsProductPage = async ({ item }: HousesAndLotsProductPageProps) => {
  const { price, initialCurrency, note } = item;
  return (
    <>
      {/* <ImagesSwiper images={images} type="flats" /> */}
      {/* <ProductPageContent
        locationField={<LocationField location={{ lat: 0, lng: 0 }} />}
        note={<NoteField note={note} />}
        characteristics={<div>x</div>}
        creditCalculator={
          <CreditCalculator rate={14.4} initialCurrency={initialCurrency} price={+price!} />
        }
        similarObjectsField={
          <SimilarProducts
            type="houses-and-lots"
            similarProducts={[
              { label: 'По цене', data: [] },
              {
                label: 'По расположению',
                data: [],
              },
            ]}
          />
        }
        productHeader={<div />}
      />
      <ApplicationField /> */}
    </>
  );
};

export default HousesAndLotsProductPage;
