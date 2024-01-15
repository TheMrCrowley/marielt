import dynamic from 'next/dynamic';
import React from 'react';

import ProductPageContent, { FlatPageHeader } from '@/src/components/ProductPageContent';
import { CreditCalculator } from '@/src/components/ProductPageContent/components';
import SimilarProducts from '@/src/components/ProductPageContent/components/SimilarProducts';
import ProductViewsHandler from '@/src/components/ProductViewsHandler';
import { flatCharacteristicsMap, getRoominessByStrapiValue } from '@/src/enums/FlatsFilters';
import { formatItemToCharacteristics } from '@/src/helpers/formatters';
import { getInterestRate, getSimilarFlats } from '@/src/services';
import { DetailedFlatItem } from '@/src/types/Flats';

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

interface FlatPageProps {
  flat: DetailedFlatItem;
}

const getFlatCharacteristics = (flat: DetailedFlatItem) => [
  ...formatItemToCharacteristics(flat, flatCharacteristicsMap),
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
    video,
    id,
    metro,
  } = flat;

  const { roominess, floor, maxFloor, constructionYear, totalArea, livingArea, kitchenArea } =
    flat.parameters;

  const [similarFlats, rate] = await Promise.all([getSimilarFlats(flat), getInterestRate()]);

  return (
    <>
      {(video || !!images.length) && (
        <ProductPageSlider images={images} type="flats" video={video} />
      )}
      <ProductPageContent
        agentForm={agents && <AgentForm productId={id} type="flats" agentData={agents} />}
        locationField={location && <LocationField location={location} />}
        characteristics={<Characteristics characteristics={getFlatCharacteristics(flat)} />}
        detailedDescription={
          detailedDescription && <DescriptionField description={detailedDescription} />
        }
        note={note && <NoteField note={note} />}
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
            metro={metro}
          />
        }
        creditCalculator={
          <CreditCalculator
            product="квартиры"
            rate={rate}
            initialCurrency={initialCurrency}
            price={+price!}
          />
        }
        similarObjectsField={
          !!similarFlats.length && <SimilarProducts type="flats" similarProducts={similarFlats} />
        }
      />
      <ApplicationField />
      <ProductViewsHandler type="flats" id={id} />
    </>
  );
};

export default FlatPage;
