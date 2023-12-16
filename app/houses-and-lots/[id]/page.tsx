import { Metadata } from 'next';
import React from 'react';

import HousesAndLotsProductPage from '@/src/app-pages/HousesAndLotsPage/HousesAndLotsProductPage';
import { getHouseSeoFields, getHousesAndLotsById } from '@/src/services/housesAndLotsServices';
import { canonicalUrlMap } from '@/src/services/seoServices';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const { seo } = await getHouseSeoFields(id);
  const canonical = canonicalUrlMap.housePageId(id);

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical,
    },
  };
}

const page = async ({ params: { id } }: Props) => {
  const houseAndLotsItem = await getHousesAndLotsById(id);

  return <HousesAndLotsProductPage item={houseAndLotsItem} />;
};
export default page;
