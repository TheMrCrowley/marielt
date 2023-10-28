import qs from 'qs';

import {
  roominessQueryMap,
  houseTypeQueryMap,
  bathroomQueryMap,
  balconyQueryMap,
  saleTermQueryMap,
  finishingQueryMap,
} from '@/enums/FlatsFilters';
import { getQueryArray } from '@/helpers/getQueryArray';
import { AvailableCurrencies } from '@/types/Currency';
import { FlatsFiltersType } from '@/types/Filters';
import { StrapiFindResponse } from '@/types/StrapiFindResponse';

// const REVALIDATE_TIME = 10000;

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
          $in: getQueryArray(saleTermQueryMap, saleTerm),
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
            $in: getQueryArray(finishingQueryMap, finishing),
          },
          total_area: {
            $gte: areaFrom,
            $lte: areaTo,
          },
          roominess: {
            $in: getQueryArray(roominessQueryMap, roominess),
          },
          floor: {
            $gte: floorFrom,
            $lte: floorTo,
          },
          house_type: {
            $in: getQueryArray(houseTypeQueryMap, houseType),
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
          ceiling_height: {
            $gte: ceilingHeight,
          },
          bathroom: {
            $in: getQueryArray(bathroomQueryMap, bathroom),
          },
          balcony: {
            $containsi: getQueryArray(balconyQueryMap, balcony),
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

  console.log(getQueryArray(finishingQueryMap, finishing));

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
