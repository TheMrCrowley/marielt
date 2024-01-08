import { Metadata } from 'next';
import React from 'react';

import { HouseItemsStrapiResponse } from '@/src/api/house';
import HousesAndLotsProductPage from '@/src/app-pages/HousesAndLotsPage/HousesAndLotsProductPage';
import { getHouseById, getHouseByIdSeoData } from '@/src/services';
import { canonicalUrlMap, getOpenGraphField } from '@/src/services/seoServices';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const { seo, image } = await getHouseByIdSeoData(id);
  const canonical = canonicalUrlMap.housePageId(id);

  const title = seo.title || 'Купить загородную недвижимость';

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical,
    },
    openGraph: getOpenGraphField(title, seo.description, image?.url),
  };
}

export async function generateStaticParams() {
  const response = await fetch(`${process.env.API_BASE_URL}/house-items?pagination[limit]=-1`);

  const { data } = (await response.json()) as HouseItemsStrapiResponse;

  return data.map((item) => ({
    id: item.id.toString(),
  }));
}

export const dynamicParams = true;

const page = async ({ params: { id } }: Props) => {
  const houseAndLotsItem = await getHouseById(id);

  return <HousesAndLotsProductPage item={houseAndLotsItem} />;
};
export default page;
