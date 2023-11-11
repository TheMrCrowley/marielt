import qs from 'qs';

import {
  formatToDefaultCommercial,
  formatToDefaultFlat,
  formatToDefaultHouseAndLotsItem,
} from '@/src/helpers/formatters';
import { DefaultCommercialItem } from '@/src/types/Commercial';
import { DefaultFlatItem } from '@/src/types/Flats';
import { DefaultHousesAndLotsItem } from '@/src/types/HousesAndLots';
import { ProductType } from '@/src/types/Product';
import {
  CommercialStrapiResponse,
  FlatStrapiResponse,
  HousesAndLotsStrapiResponse,
  StrapiFindResponse,
} from '@/src/types/StrapiTypes';

const actualQuery = qs.stringify({
  filters: {
    home_page: true,
  },
  populate: '*',
});

const getActualFlats = async (): Promise<DefaultFlatItem[]> => {
  const response = await fetch(`${process.env.API_BASE_URL}/apartments-items?${actualQuery}`);

  const { data } = (await response.json()) as StrapiFindResponse<FlatStrapiResponse>;

  return formatToDefaultFlat(data);
};

const getActualCommercial = async (): Promise<DefaultCommercialItem[]> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/commercial-property-items?${actualQuery}`,
  );

  const { data } = (await response.json()) as StrapiFindResponse<CommercialStrapiResponse>;

  return formatToDefaultCommercial(data);
};

const getActualHousesAndLots = async (): Promise<DefaultHousesAndLotsItem[]> => {
  const response = await fetch(`${process.env.API_BASE_URL}/houses-and-lots-items?${actualQuery}`);

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
