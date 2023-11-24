import React from 'react';

import { FlatPageHeader } from '@/src/components/ProductPageContent';
import ImagesSwiper from '@/src/components/ProductPageContent/ImagesSwiper';
import ProductPageContent from '@/src/components/ProductPageContent/ProductPageContent';
import { formatToFlatCharacteristics } from '@/src/helpers/formatters';
import { DetailedFlatItem } from '@/src/types/Flats';

interface FlatPageProps {
  flat: DetailedFlatItem;
}

const FlatPage = ({ flat }: FlatPageProps) => {
  const { name, address, price, initialCurrency, note, images } = flat;
  const { roominess, floor, maxFloor, constructionYear, totalArea, livingArea, kitchenArea } =
    flat.parameters;

  const flatCharacteristics = [
    ...formatToFlatCharacteristics(flat),
    {
      name: 'Этаж/этажность',
      value: `${floor}/${maxFloor}`,
    },
  ];
  return (
    <>
      <ImagesSwiper images={images} type="flats" />
      <ProductPageContent
        cost={+price!}
        note={note}
        characteristics={flatCharacteristics}
        productHeader={
          <FlatPageHeader
            address={address}
            title={name}
            roominess={roominess}
            floor={floor}
            maxFloor={maxFloor}
            constructionYear={constructionYear}
            totalArea={totalArea}
            livingArea={livingArea}
            kitchenArea={kitchenArea}
            initialCurrency={initialCurrency}
            price={+price!}
          />
        }
      />
    </>
  );
};

export default FlatPage;
