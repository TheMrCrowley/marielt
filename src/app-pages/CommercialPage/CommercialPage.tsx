import dynamic from 'next/dynamic';
import React from 'react';

import ProductPageContent from '@/src/components/ProductPageContent';
import CommercialPageHeader from '@/src/components/ProductPageContent/CommercialPageHeader';
import { commercialCharacteristicsMap } from '@/src/enums/CommercialFilters';
import { formatItemToCharacteristics } from '@/src/helpers/formatters';
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

interface CommercialPageProps {
  commercial: DetailedCommercialItem;
}

const getCommercialCharacteristics = (commercial: DetailedCommercialItem) => {
  const characteristics = [
    ...formatItemToCharacteristics(commercial, commercialCharacteristicsMap),
  ];
  if (commercial.parameters.floor && commercial.parameters.maxFloor) {
    characteristics.push({
      name: 'Этаж/этажность',
      value: `${commercial.parameters.floor}/${commercial.parameters.maxFloor}`,
    });
  }

  return characteristics;
};

const CommercialPage = ({ commercial }: CommercialPageProps) => {
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
          />
        }
      />
    </>
  );
};

export default CommercialPage;
