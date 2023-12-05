import dynamic from 'next/dynamic';
import React from 'react';

import ProductPageContent from '@/src/components/ProductPageContent';
import CommercialPageHeader from '@/src/components/ProductPageContent/CommercialPageHeader';
import SimilarProducts from '@/src/components/ProductPageContent/components/SimilarProducts';
import { commercialCharacteristicsMap } from '@/src/enums/CommercialFilters';
import { formatItemToCharacteristics } from '@/src/helpers/formatters';
import { getCommercialSimilar } from '@/src/services/commercialServices';
import { DetailedCommercialItem } from '@/src/types/Commercial';

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

interface CommercialPageProps {
  commercial: DetailedCommercialItem;
}

const getCommercialCharacteristics = (commercial: DetailedCommercialItem) => {
  const characteristics = [];
  if (commercial.premisesArea?.max || commercial.premisesArea?.min) {
    characteristics.push({
      name: 'Площадь помещений',
      value: commercial.premisesArea.max
        ? `${commercial.premisesArea.min}-${commercial.premisesArea.max} м²`
        : `${commercial.premisesArea.min} м²`,
    });
  }

  if (commercial.separateRooms?.from || commercial.separateRooms?.to) {
    characteristics.push({
      name: 'Раздельных помещений',
      value: commercial.separateRooms.to
        ? `${commercial.separateRooms.from}-${commercial.separateRooms.to}`
        : `${commercial.separateRooms.from}`,
    });
  }

  if (commercial.parameters.floor || commercial.parameters.maxFloor) {
    characteristics.push({
      name: commercial.parameters.maxFloor ? 'Этаж/этажность' : 'Этаж',
      value: commercial.parameters.maxFloor
        ? `${commercial.parameters.floor}/${commercial.parameters.maxFloor}`
        : `${commercial.parameters.floor}`,
    });
  }

  return [
    ...characteristics,
    ...formatItemToCharacteristics(commercial, commercialCharacteristicsMap),
  ];
};

const CommercialPage = async ({ commercial }: CommercialPageProps) => {
  const similarProducts = await getCommercialSimilar(commercial);

  return (
    <>
      {commercial.images?.length && (
        <ProductPageSlider type="commercial" images={commercial.images} video={commercial.video} />
      )}
      <ProductPageContent
        agentForm={
          commercial.agents && (
            <AgentForm agentData={commercial.agents} productId={commercial.id!} type="commercial" />
          )
        }
        locationField={commercial.location && <LocationField location={commercial.location} />}
        characteristics={
          <Characteristics characteristics={getCommercialCharacteristics(commercial)} />
        }
        detailedDescription={<DescriptionField description={commercial.detailedDescription} />}
        note={<NoteField note={commercial.note} />}
        productHeader={
          <CommercialPageHeader
            initialCurrency={commercial.initialCurrency!}
            address={commercial.address}
            direction={commercial.direction}
            distance={commercial.distance}
            title={commercial.name}
            rootType={commercial.rootType}
            type={commercial.type}
            priceMeter={commercial.pricePerMeter}
            priceTotal={commercial.totalPrice}
          />
        }
        similarObjectsField={
          <SimilarProducts type="commercial" similarProducts={similarProducts} />
        }
      />
      <ApplicationField />
    </>
  );
};

export default CommercialPage;
