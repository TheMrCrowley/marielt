import React from 'react';

import HousesAndLotsProductPage from '@/src/app-pages/HousesAndLotsPage/HousesAndLotsProductPage';
import { getHousesAndLotsById } from '@/src/services/housesAndLotsServices';

interface HousesAndLotsPageProps {
  params: {
    id: string;
  };
}
const page = async ({ params: { id } }: HousesAndLotsPageProps) => {
  const houseAndLotsItem = await getHousesAndLotsById(id);

  return <HousesAndLotsProductPage item={houseAndLotsItem} />;
};
export default page;
