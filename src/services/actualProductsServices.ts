import qs from 'qs';

import {
  formatToDefaultCommercial,
  formatToDefaultFlat,
  formatToDefaultHouseAndLotsItem,
} from '@/src/helpers/formatters';
import { CommercialStrapiResponse, DefaultCommercialItem } from '@/src/types/Commercial';
import { DefaultFlatItem, FlatStrapiResponse } from '@/src/types/Flats';
import { DefaultHousesAndLotsItem, HousesAndLotsStrapiResponse } from '@/src/types/HousesAndLots';
import { ProductType } from '@/src/types/Product';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

const actualQuery = qs.stringify({
  filters: {
    home_page: true,
  },
  populate: {
    image: {
      fields: ['width', 'height', 'url', 'placeholder'],
    },
    house_number: {
      fields: ['number'],
    },
    parameters: {
      fields: ['floor', 'living_area', 'floors_number', 'total_area'],
    },
    location: '*',
  },
});

const getActualFlats = async (): Promise<DefaultFlatItem[]> => {
  const response = await fetch(`${process.env.API_BASE_URL}/apart-items?${actualQuery}`);

  const { data } = (await response.json()) as StrapiFindResponse<FlatStrapiResponse>;

  return formatToDefaultFlat(data);
};

const getActualCommercial = async (): Promise<DefaultCommercialItem[]> => {
  const response = await fetch(`${process.env.API_BASE_URL}/comm-items?${actualQuery}`);

  const { data } = (await response.json()) as StrapiFindResponse<CommercialStrapiResponse>;

  return formatToDefaultCommercial(data);
};

const getActualHousesAndLots = async (): Promise<DefaultHousesAndLotsItem[]> => {
  const response = await fetch(`${process.env.API_BASE_URL}/house-items?${actualQuery}`);

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
