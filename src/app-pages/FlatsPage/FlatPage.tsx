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
import ImagesSwiper from '@/src/components/ProductPageContent/ImagesSwiper';
import ProductPageContent from '@/src/components/ProductPageContent/ProductPageContent';
import SimilarProducts from '@/src/components/ProductPageContent/SimilarProducts';
import { getRoominessByStrapiValue } from '@/src/enums/FlatsFilters';
import { formatToFlatCharacteristics } from '@/src/helpers/formatters';
import {
  getSimilarByLayout,
  getSimilarByLocation,
  getSimilarByPrice,
} from '@/src/services/flatsServices';
import { DetailedFlatItem } from '@/src/types/Flats';
import { CreditStrapiResponse, StrapiFindResponse } from '@/src/types/StrapiTypes';

interface FlatPageProps {
  flat: DetailedFlatItem;
}

const FlatPage = async ({ flat }: FlatPageProps) => {
  const {
    name,
    address,
    price,
    initialCurrency,
    note,
    images,
    location,
    id,
    agents,
    detailedDescription,
  } = flat;
  const {
    roominess,
    floor,
    maxFloor,
    constructionYear,
    totalArea,
    livingArea,
    kitchenArea,
    layout,
  } = flat.parameters;

  const flatCharacteristics = [
    ...formatToFlatCharacteristics(flat),
    {
      name: 'Этаж/этажность',
      value: `${floor}/${maxFloor}`,
    },
  ];

  const similarByPrice = await getSimilarByPrice({
    price: price || '0',
    roominess: roominess || '',
    id,
  });

  const similarByLocation = await getSimilarByLocation({
    latitude: location?.lat || 0,
    longitude: location?.lng || 0,
    roominess: roominess || '',
    id,
  });

  const similarByLayout = await getSimilarByLayout({
    layout: layout || '',
    roominess: roominess || '',
    id,
  });

  const getInterestRate = async () => {
    const interestRate = await fetch(`${process.env.API_BASE_URL}/credits`, { cache: 'no-cache' });
    const { data } = (await interestRate.json()) as StrapiFindResponse<CreditStrapiResponse>;

    return data.map((credit) => credit.attributes.interest_rate)[0];
  };

  const rate = await getInterestRate();

  return (
    <>
      <ImagesSwiper images={images} type="flats" />
      <ProductPageContent
        detailedDescription={<DescriptionField description={detailedDescription} />}
        agentForm={
          <AgentForm
            name={agents.fullName}
            phoneNumber={agents.phone1}
            position={agents.position}
          />
        }
        locationField={<LocationField location={location} />}
        note={<NoteField note={note} />}
        characteristics={<Characteristics characteristics={flatCharacteristics} />}
        creditCalculator={
          <CreditCalculator rate={rate} initialCurrency={initialCurrency} price={+price!} />
        }
        similarObjectsField={
          <SimilarProducts
            type="flats"
            similarProducts={[
              { label: 'По цене', data: similarByPrice },
              {
                label: 'По расположению',
                data: similarByLocation,
              },
              {
                label: 'По планировке',
                data: similarByLayout,
              },
            ]}
          />
        }
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
      />
      <ApplicationField />
    </>
  );
};

export default FlatPage;
