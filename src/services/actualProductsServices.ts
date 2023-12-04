import qs from 'qs';

import {
  formatToDefaultCommercial,
  formatToDefaultFlat,
  formatToDefaultHouseAndLotsItem,
} from '@/src/helpers/formatters';
import {
  getDefaultFlatListPopulateQuery,
  getDefaultCommercialListPopulateQuery,
} from '@/src/helpers/queryHelpers';
import { CommercialStrapiResponse, DefaultCommercialItem } from '@/src/types/Commercial';
import { DefaultFlatItem, FlatStrapiResponse } from '@/src/types/Flats';
import { DefaultHousesAndLotsItem, HousesAndLotsStrapiResponse } from '@/src/types/HousesAndLots';
import { ProductType } from '@/src/types/Product';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

import { getDefaultHouseListPopulateQuery } from './housesAndLotsServices';

const actualQuery = qs.stringify({
  filters: {
    home_page: true,
  },
});

const getActualFlats = async (): Promise<DefaultFlatItem[]> => {
  const populateQuery = getDefaultFlatListPopulateQuery();

  const url = `${process.env.API_BASE_URL}/apart-items?${actualQuery}&${populateQuery}`;
  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindResponse<FlatStrapiResponse>;

  return formatToDefaultFlat(data);
};

const getActualCommercial = async (): Promise<DefaultCommercialItem[]> => {
  const populateQuery = getDefaultCommercialListPopulateQuery();

  const url = `${process.env.API_BASE_URL}/comm-items?${actualQuery}&${populateQuery}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindResponse<CommercialStrapiResponse>;

  return formatToDefaultCommercial(data);
};

const getActualHousesAndLots = async (): Promise<DefaultHousesAndLotsItem[]> => {
  const populateQuery = getDefaultHouseListPopulateQuery();

  const url = `${process.env.API_BASE_URL}/house-items?${actualQuery}&${populateQuery}`;
  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindResponse<HousesAndLotsStrapiResponse>;

  return formatToDefaultHouseAndLotsItem(data);
};

export const getActualProductsByType = async (
  type: ProductType,
): Promise<DefaultFlatItem[] | DefaultCommercialItem[] | DefaultHousesAndLotsItem[]> => {
  switch (type) {
    case 'flats':
      return getActualFlats();
    case 'commercial':
      return getActualCommercial();
    case 'houses-and-lots':
      return getActualHousesAndLots();
    default:
      return null as never;
  }
};
