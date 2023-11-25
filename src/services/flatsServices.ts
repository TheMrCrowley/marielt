import qs from 'qs';

import {
  balconyQueryMap,
  bathroomQueryMap,
  finishingQueryMap,
  houseTypeQueryMap,
  roominessQueryMap,
  saleTermQueryMap,
} from '@/src/enums/FlatsFilters';
import { getPriceByCurrency } from '@/src/helpers/currencyHelpers';
import { formatToDefaultFlat, formatToDefaultMapFlat } from '@/src/helpers/formatters';
import { getQueryArray } from '@/src/helpers/getQueryArray';
import { CurrencyState } from '@/src/store/currency';
import { FlatsFiltersType } from '@/src/store/flatsFilters';
import { AvailableCurrencies } from '@/src/types/Currency';
import { SearchResults } from '@/src/types/Filters';
import { DefaultFlatItem, DefaultMapFlatItem } from '@/src/types/Flats';
import { FlatStrapiResponse, StrapiFindResponse } from '@/src/types/StrapiTypes';

import { getPaginationQuery } from './../helpers/getPaginationQuery';
import { getCurrencies } from './currencyServices';

const getFlatsStrapiQueryParamsByFilters = (
  filters: Record<string, string | string[] | boolean>,
  selectedCurrency: AvailableCurrencies,
  rates: CurrencyState['rates'],
): {
  query: string;
} => {
  const {
    areaFrom,
    areaTo,
    priceFrom,
    priceTo,
    district,
    microDistrict,
    metro,
    roominess,
    floorFrom,
    floorTo,
    houseType,
    isLastFloor,
    isNotFirstFloor,
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
    district_rb,
    locality,
    region,
    isNotLastFloor,
    street,
  } = filters as FlatsFiltersType['filters'];

  const query = qs.stringify(
    {
      filters: {
        locality: {
          $in: locality,
        },
        street: {
          $in: street,
        },
        district_rb: {
          $in: district_rb,
        },
        region: {
          name: {
            $in: region,
          },
        },
        metro: {
          name: {
            $in: metro,
          },
        },
        sale_terms: {
          $in: getQueryArray(saleTermQueryMap, saleTerm),
        },

        parameters: {
          furniture: {
            $eq: furniture,
          },
          parking: {
            $eq: parking,
          },
          is_last_floor: {
            $eq: isLastFloor ? isLastFloor : isNotFirstFloor ? !isNotLastFloor : undefined,
          },
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
            $ne: isNotFirstFloor && 1,
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
          $gte: priceFrom && getPriceByCurrency(priceFrom, selectedCurrency, 'USD', rates),
          $lte: priceTo && getPriceByCurrency(priceTo, selectedCurrency, 'USD', rates),
        },
        district: {
          name: {
            $in: district,
          },
        },
        microdistrict: {
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

  return { query };
};

const getDefaultFlatListPopulateQuery = () => {
  return qs.stringify(
    {
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
    },
    { encodeValuesOnly: true },
  );
};

const getDefaultFlatMapPopulateQuery = () => {
  return qs.stringify(
    {
      populate: {
        location: '*',
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
};

export const getFlatsForList = async (
  searchParams: Record<string, string | string[]>,
): Promise<{
  flats: DefaultFlatItem[];
  pagination: StrapiFindResponse<{}>['meta']['pagination'];
}> => {
  const { eur, rub, usd } = await getCurrencies();
  const { query } = getFlatsStrapiQueryParamsByFilters(
    searchParams,
    (searchParams.currency as AvailableCurrencies) || 'USD',
    {
      rub,
      eur,
      usd,
    },
  );
  const paginationQuery = getPaginationQuery('list', searchParams.page as string);

  const url = `${
    process.env.API_BASE_URL
  }/apart-items?${query}&${paginationQuery}&${getDefaultFlatListPopulateQuery()}`;

  const response = await fetch(url, {
    // cache: 'no-cache',
    next: {
      revalidate: 60,
    },
  });

  const {
    data,
    meta: { pagination },
  } = (await response.json()) as StrapiFindResponse<FlatStrapiResponse>;

  return {
    flats: formatToDefaultFlat(data),
    pagination,
  };
};

export const getFlatsForMap = async (
  searchParams: Record<string, string | string[]>,
): Promise<{
  flats: DefaultMapFlatItem[];
}> => {
  const { eur, rub, usd } = await getCurrencies();
  const { query } = getFlatsStrapiQueryParamsByFilters(
    searchParams,
    (searchParams.currency as AvailableCurrencies) || 'USD',
    {
      rub,
      eur,
      usd,
    },
  );
  const paginationQuery = getPaginationQuery('map');

  const url = `${
    process.env.API_BASE_URL
  }/apart-items?${query}&${paginationQuery}&${getDefaultFlatMapPopulateQuery()}`;

  console.log(url);

  const response = await fetch(url, {
    // cache: 'no-cache',
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindResponse<FlatStrapiResponse>;

  return {
    flats: formatToDefaultMapFlat(data),
  };
};

export const getFlatsSearchResults = async (value: string): Promise<SearchResults> => {
  const query = qs.stringify(
    {
      searchValue: value,
      type: 'flats',
    },
    { encodeValuesOnly: true },
  );

  const url = `/api/search?${query}`;

  const response = await fetch(url, {
    cache: 'no-cache',
  });

  const searchResults = (await response.json()) as SearchResults;

  return searchResults;
};
