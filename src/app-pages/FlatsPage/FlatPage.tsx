import React from 'react';

import ApplicationField from '@/src/components/ApplicationField/ApplicationField';
import {
  AgentForm,
  Characteristics,
  DescriptionField,
  FlatPageHeader,
  LocationField,
  NoteField,
} from '@/src/components/ProductPageContent';
import CreditCalculator from '@/src/components/ProductPageContent/CreditCalculator';
import ProductPageContent from '@/src/components/ProductPageContent/ProductPageContent';
import SimilarProducts from '@/src/components/ProductPageContent/SimilarProducts';
import ProductPageSlider from '@/src/components/Swiper/ProductPageSlider';
import { getRoominessByStrapiValue } from '@/src/enums/FlatsFilters';
import { formatToFlatCharacteristics } from '@/src/helpers/formatters';
import { getInterestRate } from '@/src/services/creditsService';
import { getSimilarFlatsItems } from '@/src/services/flatsServices';
import { DetailedFlatItem } from '@/src/types/Flats';

interface FlatPageProps {
  flat: DetailedFlatItem;
}

const getFlatCharacteristics = (flat: DetailedFlatItem) => [
  ...formatToFlatCharacteristics(flat),
  {
    name: 'Этаж/этажность',
    value: `${flat.parameters.floor}/${flat.parameters.maxFloor}`,
  },
];

const FlatPage = async ({ flat }: FlatPageProps) => {
  const {
    name,
    address,
    price,
    initialCurrency,
    note,
    images,
    location,
    agents,
    detailedDescription,
  } = flat;

  const { roominess, floor, maxFloor, constructionYear, totalArea, livingArea, kitchenArea } =
    flat.parameters;

  const [similarFlats, rate] = await Promise.all([getSimilarFlatsItems(flat), getInterestRate()]);

  return (
    <>
      <ProductPageSlider images={images} type="flats" />
      <ProductPageContent
        productHeader={
          <FlatPageHeader
            address={address}
            title={name}
            roominess={getRoominessByStrapiValue(roominess!)}
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
        agentForm={<AgentForm agentData={agents} />}
        characteristics={<Characteristics characteristics={getFlatCharacteristics(flat)} />}
        detailedDescription={<DescriptionField description={detailedDescription} />}
        locationField={<LocationField location={location} />}
        note={<NoteField note={note} />}
        creditCalculator={
          <CreditCalculator rate={rate} initialCurrency={initialCurrency} price={+price!} />
        }
        similarObjectsField={<SimilarProducts type="flats" similarProducts={similarFlats} />}
      />
      <ApplicationField />
    </>
  );
};

export default FlatPage;
