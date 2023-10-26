import qs from 'qs';

import { AvailableCurrencies } from '@/types/Currency';
import { FlatsFiltersType } from '@/types/Filters';
import { StrapiFindResponse } from '@/types/StrapiFindResponse';

// const REVALIDATE_TIME = 10000;

const roominessMap: Record<string, string[]> = {
  part: ['комната (доля)'],
  1: ['однокомнатная квартира'],
  2: ['двухкомнатная квартира'],
  3: ['трехкомнатная квартира'],
  '4+': [
    'четырехкомнатная квартира',
    'пятикомнатная квартира',
    'шестикомнатная квартира',
    'семикомнатная квартира',
    'восьмикомнатная квартира',
    'девятикомнатная квартира',
    'десять и более комнат',
  ],
};

export const getFlatsStrapiQueryParamsByFilters = (
  filters: Record<string, string | string[] | boolean>,
): {
  query: string;
  currency: AvailableCurrencies;
} => {
  const {
    areaFrom,
    areaTo,
    priceFrom,
    priceTo,
    district,
    microDistrict,
    metro,
    currency,
    roominess,
    floorFrom,
    floorTo,
    houseType,
    //TODO add fields in strapi
    isLastFloor,
    isNotFirstFloor,
    isNotLastFloor,
    maxFloorsFrom,
    maxFloorsTo,
  } = filters as FlatsFiltersType['filters'];

  const query = qs.stringify(
    {
      filters: {
        metro: {
          name: {
            $in: metro,
          },
        },
        parameters: {
          total_area: {
            $gte: areaFrom,
            $lte: areaTo,
          },
          roominess: {
            $in: Array.isArray(roominess)
              ? roominess.map((item) => roominessMap[item]).join()
              : roominessMap[roominess],
          },
          floor: {
            $gte: floorFrom,
            $lte: floorTo,
          },
          house_type: {
            $in: houseType,
          },
          floors_number: {
            $gte: maxFloorsFrom,
            $lte: maxFloorsTo,
          },
        },
        price: {
          $gte: priceFrom,
          $lte: priceTo,
        },
        district: {
          name: {
            $in: district,
          },
        },
        microDistrict: {
          name: {
            $in: microDistrict,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  return { query, currency: currency || 'USD' };
};

export const getFlats = async (searchParams: Record<string, string | string[]>) => {
  const { currency, query } = getFlatsStrapiQueryParamsByFilters(searchParams);
  const response = await fetch(`${process.env.API_BASE_URL}/apartments-items?populate=*&${query}`, {
    next: {
      // revalidate: REVALIDATE_TIME,
    },
  });
  const { data } = (await response.json()) as StrapiFindResponse<{}>;

  return data;
};
