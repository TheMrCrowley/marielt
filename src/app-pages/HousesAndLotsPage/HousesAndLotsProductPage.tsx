import dynamic from 'next/dynamic';
import React from 'react';

import ProductPageContent from '@/src/components/ProductPageContent';
import HousesAndLotsPageHeader from '@/src/components/ProductPageContent/HousesAndLotsPageHeader';
import { CreditCalculator } from '@/src/components/ProductPageContent/components';
import SimilarProducts from '@/src/components/ProductPageContent/components/SimilarProducts';
import ProductViewsHandler from '@/src/components/ProductViewsHandler';
import { houseCharacteristicsMap } from '@/src/enums/HousesAndLotsFilters';
import { formatItemToCharacteristics } from '@/src/helpers/formatters';
import { getInterestRate, getSimilarHouses } from '@/src/services';
import { DetailedHousesAndLotsItem } from '@/src/types/HousesAndLots';

const ProductPageSlider = dynamic(() =>
  import('@/src/components/Swiper').then((mod) => mod.ProductPageSlider),
);

const AgentForm = dynamic(() =>
  import('@/src/components/ProductPageContent/components').then((mod) => mod.AgentForm),
);
const LocationField = dynamic(() =>
  import('@/src/components/ProductPageContent/components').then((mod) => mod.LocationField),
);
const Characteristics = dynamic(() =>
  import('@/src/components/ProductPageContent/components').then((mod) => mod.Characteristics),
);

const DescriptionField = dynamic(() =>
  import('@/src/components/ProductPageContent/components').then((mod) => mod.DescriptionField),
);

const NoteField = dynamic(() =>
  import('@/src/components/ProductPageContent/components').then((mod) => mod.NoteField),
);

const ApplicationField = dynamic(() => import('@/src/components/ApplicationField'));

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
    agents,
    detailedDescription,
    images,
    video,
    location,
    address,
    rootType,
    name,
    direction,
    id,
    type,
    distance,
    metro,
  } = item;

  const { constructionYear, totalArea, livingArea, plotSize } = item.parameters;
  const [similarHouses, rate] = await Promise.all([getSimilarHouses(item), getInterestRate()]);

  return (
    <>
      {(video || !!images.length) && (
        <ProductPageSlider images={images} type="houses-and-lots" video={video} />
      )}
      <ProductPageContent
        agentForm={agents && <AgentForm productId={id} type="houses-and-lots" agentData={agents} />}
        locationField={location && <LocationField location={location} />}
        characteristics={<Characteristics characteristics={getHouseCharacteristics(item)} />}
        detailedDescription={
          detailedDescription && <DescriptionField description={detailedDescription} />
        }
        note={note && <NoteField note={note} />}
        creditCalculator={
          <CreditCalculator
            rate={rate}
            product="объекта"
            initialCurrency={initialCurrency}
            price={+price!}
          />
        }
        similarObjectsField={
          !!similarHouses.length && (
            <SimilarProducts type="houses-and-lots" similarProducts={similarHouses} />
          )
        }
        productHeader={
          <HousesAndLotsPageHeader
            address={address}
            initialCurrency={initialCurrency}
            category={rootType}
            constructionYear={constructionYear}
            livingArea={livingArea}
            plotSize={plotSize}
            totalArea={totalArea}
            childCategory={type}
            price={+price!}
            title={name}
            direction={direction}
            distance={distance}
            metro={metro}
          />
        }
      />
      <ApplicationField />
      <ProductViewsHandler type="houses-and-lots" id={id} />
    </>
  );
};

export default HousesAndLotsProductPage;
