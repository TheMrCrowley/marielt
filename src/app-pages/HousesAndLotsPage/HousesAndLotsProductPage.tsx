import React from 'react';

import ApplicationField from '@/src/components/ApplicationField';
import ProductPageContent from '@/src/components/ProductPageContent';
import HousesAndLotsPageHeader from '@/src/components/ProductPageContent/HousesAndLotsPageHeader';
import {
  AgentForm,
  Characteristics,
  CreditCalculator,
  DescriptionField,
  LocationField,
  NoteField,
} from '@/src/components/ProductPageContent/components';
import SimilarProducts from '@/src/components/ProductPageContent/components/SimilarProducts';
import ProductPageSlider from '@/src/components/Swiper/ProductPageSlider';
import { houseCharacteristicsMap } from '@/src/enums/HousesAndLotsFilters';
import { formatItemToCharacteristics } from '@/src/helpers/formatters';
import { DetailedHousesAndLotsItem } from '@/src/types/HousesAndLots';

interface HousesAndLotsProductPageProps {
  item: DetailedHousesAndLotsItem;
}

const getHouseCharacteristics = (house: DetailedHousesAndLotsItem) => [
  ...formatItemToCharacteristics(house, houseCharacteristicsMap),
];

const HousesAndLotsProductPage = async ({ item }: HousesAndLotsProductPageProps) => {
  const {
    price,
    initialCurrency,
    note,
    agent,
    detailedDescription,
    images,
    video,
    location,
    address,
    houseCategories,
    name,
    direction,
  } = item;

  console.log(item.parameters.builtUpArea);

  const { constructionYear, totalArea, livingArea, plotSize } = item.parameters;

  return (
    <>
      <ProductPageSlider images={images} type="houses-and-lots" video={video} />
      <ProductPageContent
        agentForm={<AgentForm agentData={agent} />}
        detailedDescription={<DescriptionField description={detailedDescription} />}
        locationField={<LocationField location={location} />}
        note={<NoteField note={note} />}
        characteristics={<Characteristics characteristics={getHouseCharacteristics(item)} />}
        creditCalculator={
          <CreditCalculator
            rate={14.4}
            product="объекта"
            initialCurrency={initialCurrency}
            price={+price!}
          />
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
        productHeader={
          <HousesAndLotsPageHeader
            address={address}
            initialCurrency={initialCurrency}
            category={houseCategories.name}
            constructionYear={constructionYear}
            livingArea={livingArea}
            plotSize={plotSize}
            totalArea={totalArea}
            price={+price!}
            title={name}
            direction={direction.name}
          />
        }
      />
      <ApplicationField />
    </>
  );
};

export default HousesAndLotsProductPage;
