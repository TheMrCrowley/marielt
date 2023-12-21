import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

import ProductPageContent from '@/src/components/ProductPageContent';
import CommercialPageHeader from '@/src/components/ProductPageContent/CommercialPageHeader';
import SimilarProducts from '@/src/components/ProductPageContent/components/SimilarProducts';
import ProductViewsHandler from '@/src/components/ProductViewsHandler';
import { getCommercialCharacteristics } from '@/src/helpers/characteristics';
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
            <AgentForm
              agentData={{ ...commercial.agents, phone1: '+375293808585', phone2: '+375333808585' }}
              productId={commercial.id!}
              type="commercial"
            />
          )
        }
        locationField={commercial.location && <LocationField location={commercial.location} />}
        characteristics={
          <Characteristics characteristics={getCommercialCharacteristics(commercial)}>
            <Link
              target="_blank"
              prefetch={false}
              href={`/commercial/${commercial.id}/pdf`}
              className="w-full p-4 flex justify-center items-center text-primary bg-secondary hover:cursor-pointer"
            >
              Скачать мини-презентацию
            </Link>
          </Characteristics>
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
      <ProductViewsHandler type="commercial" id={commercial.id!} />
    </>
  );
};

export default CommercialPage;
