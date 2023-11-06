import qs from 'qs';

import { HousesAndLotsRootCategory } from '@/enums/HousesAndLotsFilters';
import { StrapiFindResponse } from '@/types/StrapiFindResponse';

interface DirectionResponse {
  name: string;
  id: number;
}

interface HousesAndLotsCategoryResponse {
  name: string;
  category: string | null;
  uid: HousesAndLotsRootCategory;
}

export interface HousesAndLotsCategory {
  categoryName: string;
  belongTo: string | null;
  isRoot: boolean;
  uid: HousesAndLotsRootCategory;
}

const getDirections = async () => {
  const directionsResponse = await fetch(`${process.env.API_BASE_URL}/directions`);
  const { data } = (await directionsResponse.json()) as StrapiFindResponse<DirectionResponse>;

  return data.map((direction) => direction.attributes.name);
};

const getHouseAndLotsCategories = async () => {
  const query = qs.stringify(
    {
      pagination: {
        limit: -1,
      },
      populate: '*',
    },
    {
      encodeValuesOnly: true,
    },
  );
  const directionsResponse = await fetch(
    `${process.env.API_BASE_URL}/houses-and-lots-categories?${query}`,
  );
  const { data } =
    (await directionsResponse.json()) as StrapiFindResponse<HousesAndLotsCategoryResponse>;

  return formatHousesAndLotsCategories(data);
};

export const getHousesAndLotsFiltersData = async () => {
  const [directions, housesAndLotasCategories] = await Promise.all([
    getDirections(),
    getHouseAndLotsCategories(),
  ]);

  return {
    directions,
    housesAndLotasCategories,
  };
};

const formatHousesAndLotsCategories = (
  data: StrapiFindResponse<HousesAndLotsCategoryResponse>['data'],
): HousesAndLotsCategory[] =>
  data.map((category) => ({
    categoryName: category.attributes.name,
    belongTo: category.attributes.category,
    isRoot: !category.attributes.category,
    uid: category.attributes.uid,
  }));
