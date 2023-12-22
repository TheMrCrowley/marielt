import { Metadata } from 'next';
import React from 'react';

import HousesAndLotsProductPage from '@/src/app-pages/HousesAndLotsPage/HousesAndLotsProductPage';
import { getHouseSeoFields, getHousesAndLotsById } from '@/src/services/housesAndLotsServices';
import { canonicalUrlMap, getOpenGraphField } from '@/src/services/seoServices';
import { HousesAndLotsStrapiResponse } from '@/src/types/HousesAndLots';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const { seo, image } = await getHouseSeoFields(id);
  const canonical = canonicalUrlMap.housePageId(id);

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical,
    },
    openGraph: getOpenGraphField(seo.title, seo.description, image),
  };
}

// export async function generateStaticParams() {
//   const response = await fetch(`${process.env.API_BASE_URL}/house-items?pagination[limit]=-1`);

//   const { data } = (await response.json()) as StrapiFindResponse<HousesAndLotsStrapiResponse>;

//   return data.map((item) => ({
//     id: item.id.toString(),
//   }));
// }

// export const dynamicParams = true;

const page = async ({ params: { id } }: Props) => {
  const houseAndLotsItem = await getHousesAndLotsById(id);

  return <HousesAndLotsProductPage item={houseAndLotsItem} />;
};
export default page;
