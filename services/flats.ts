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

const bathroomMap: Record<string, string[]> = {
  separate: ['раздельный'],
  combined: ['совмещенный'],
  twoAndMore: ['два санузла', 'три санузла', 'четыре санузла'],
};

const balconyMap: Record<string, string> = {
  none: 'нет',
  balcony: 'балкон',
  loggia: 'лоджия',
};

const saleTermMap: Record<string, string> = {
  clear: 'чистая продажа',
  change: 'обмен',
  changeMoveOut: 'обмен - разъезд',
  changeMoveIn: 'обмен - съезд',
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
    livingAreaTo,
    livingAreaFrom,
    kitchenAreaTo,
    ceilingHeight,
    kitchenAreaFrom,
    bathroom,
    constructionYearFrom,
    constructionYearTo,
    finishing,
    renovationYearFrom,
    renovationYearTo,
    balcony,
    saleTerm,
    furniture,
    parking,
  } = filters as FlatsFiltersType['filters'];

  const query = qs.stringify(
    {
      // TODO doublecheck filters
      filters: {
        metro: {
          name: {
            $in: metro,
          },
        },
        sale_terms: {
          $in: Array.isArray(saleTerm)
            ? saleTerm.map((term) => saleTermMap[term])
            : saleTermMap[saleTerm],
        },
        additional_info: {
          $and: [
            {
              name: furniture && 'мебель',
            },
            { name: parking && 'парковка' },
          ],
        },
        parameters: {
          construction_year: {
            $gte: constructionYearFrom,
            $lte: constructionYearTo,
          },
          major_renovation_year: {
            $gte: renovationYearFrom,
            $lte: renovationYearTo,
          },
          finishing: {
            $in: finishing,
          },
          total_area: {
            $gte: areaFrom,
            $lte: areaTo,
          },
          roominess: {
            $in: Array.isArray(roominess)
              ? roominess.map((item) => roominessMap[item]).flat()
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
          living_area: {
            $gte: livingAreaFrom,
            $lte: livingAreaTo,
          },
          kitchen_area: {
            $gte: kitchenAreaFrom,
            $lte: kitchenAreaTo,
          },
          ceilingHeight: {
            $gte: ceilingHeight,
          },
          bathroom: {
            $in: Array.isArray(bathroom)
              ? bathroom.map((item) => bathroomMap[item]).flat()
              : bathroomMap[bathroom],
          },
          balcony: {
            $containsi: Array.isArray(balcony)
              ? balcony.map((type) => balconyMap[type])
              : balconyMap[balcony],
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
  console.log(query);
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
