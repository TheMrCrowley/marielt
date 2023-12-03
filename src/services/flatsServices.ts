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
import {
  formatToDefaultFlat,
  formatToDefaultMapItem,
  formatToDetailedFlat,
} from '@/src/helpers/formatters';
import { getPaginationQuery } from '@/src/helpers/getPaginationQuery';
import { getQueryArray } from '@/src/helpers/getQueryArray';
import { CurrencyState } from '@/src/store/currency';
import { FlatsFiltersType } from '@/src/store/flatsFilters';
import { AvailableCurrencies } from '@/src/types/Currency';
import { SearchResults } from '@/src/types/Filters';
import { DefaultFlatItem, DetailedFlatItem } from '@/src/types/Flats';
import { DefaultMapItem } from '@/src/types/Product';
import {
  FlatStrapiResponse,
  StrapiFindOneResponse,
  StrapiFindResponse,
} from '@/src/types/StrapiTypes';

import { getSortQuery } from './../helpers/getSortQuery';
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
        additional_info: (furniture || parking) && {
          $or: [
            {
              name: furniture ? { $containsi: 'мебель' } : '',
            },
            {
              name: parking ? { $in: ['гараж', 'стоянка автомобиля'] } : '',
            },
          ],
        },
        parameters: {
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

  const populateQuery = getDefaultFlatListPopulateQuery();

  const sortQuery = getSortQuery(searchParams.sort as string);

  const url = `${process.env.API_BASE_URL}/apart-items?${query}&${paginationQuery}&${populateQuery}&${sortQuery}`;

  const response = await fetch(url, {
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
  flats: DefaultMapItem[];
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
  const populateQuery = getDefaultFlatMapPopulateQuery();

  const url = `${process.env.API_BASE_URL}/apart-items?${query}&${paginationQuery}&${populateQuery}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindResponse<FlatStrapiResponse>;

  return {
    flats: formatToDefaultMapItem(data),
  };
};

export const getFlatsByIds = async (ids: string[]) => {
  if (!ids.length) {
    return;
  }

  const idsQuery = qs.stringify(
    {
      filters: {
        id: {
          $in: ids,
        },
      },
    },
    { encodeValuesOnly: true },
  );
  const paginationQuery = getPaginationQuery('map');
  const populateQuery = getDefaultFlatListPopulateQuery();

  const url = `${process.env.API_BASE_URL}/apart-items?${paginationQuery}&${populateQuery}&${idsQuery}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindResponse<FlatStrapiResponse>;

  return formatToDefaultFlat(data);
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
    next: {
      revalidate: 60,
    },
  });

  const searchResults = (await response.json()) as SearchResults;

  return searchResults;
};

export const getFlatById = async (id: string): Promise<DetailedFlatItem> => {
  const query = qs.stringify(
    {
      populate: {
        additional_info: {
          populate: '*',
        },
        image: {
          fields: ['width', 'height', 'url', 'placeholder'],
        },
        agents: {
          populate: '*',
        },
        region: {
          populate: {
            fields: ['name'],
          },
        },
        district: {
          populate: {
            fields: ['name'],
          },
        },
        microdistrict: {
          populate: {
            fields: ['name'],
          },
        },
        parameters: {
          populate: '*',
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const url = `${process.env.API_BASE_URL}/apart-items/${id}?${query}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindOneResponse<FlatStrapiResponse>;

  return formatToDetailedFlat(data);
};

const getSimilarByPrice = async ({
  price,
  roominess,
  id,
}: {
  price?: string;
  roominess?: string;
  id: string;
}) => {
  const query = qs.stringify(
    {
      filters: {
        price: {
          ...(price
            ? {
                $between: [+price - 5000, +price + 5000],
              }
            : {
                $eq: price,
              }),
        },
        parameters: {
          roominess: {
            $eq: roominess || '',
          },
        },
        id: {
          $ne: id,
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const url = `${
    process.env.API_BASE_URL
  }/apart-items?${query}&${getDefaultFlatListPopulateQuery()}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindResponse<FlatStrapiResponse>;

  return formatToDefaultFlat(data);
};

const getSimilarByLocation = async ({
  latitude,
  longitude,
  roominess,
  id,
}: {
  latitude?: number;
  longitude?: number;
  roominess?: string;
  id: string;
}) => {
  const query = qs.stringify(
    {
      filters: {
        coordinates: {
          latitude: { $between: [(latitude || 0) - 0.008, (latitude || 0) + 0.008] },
          longitude: { $between: [(longitude || 0) - 0.008, (longitude || 0) + 0.008] },
        },
        parameters: {
          roominess: {
            $eq: roominess || '',
          },
        },
        id: {
          $ne: id,
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const url = `${
    process.env.API_BASE_URL
  }/apart-items?${query}&${getDefaultFlatListPopulateQuery()}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindResponse<FlatStrapiResponse>;

  return formatToDefaultFlat(data);
};

const getSimilarByLayout = async ({
  layout,
  roominess,
  id,
}: {
  layout?: string;
  roominess?: string;
  id: string;
}) => {
  const query = qs.stringify(
    {
      filters: {
        parameters: {
          layout: {
            ...(layout
              ? {
                  $eq: layout,
                }
              : { $null: true }),
          },
          roominess: {
            $eq: roominess || '',
          },
        },
        id: {
          $ne: id,
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const url = `${
    process.env.API_BASE_URL
  }/apart-items?${query}&${getDefaultFlatListPopulateQuery()}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindResponse<FlatStrapiResponse>;

  return formatToDefaultFlat(data);
};

export const getSimilarFlatsItems = async (flat: DetailedFlatItem) => {
  const {
    parameters: { roominess, layout },
    price,
    id,
    location,
  } = flat;
  const [similarByPrice, similarByLocation, similarByLayout] = await Promise.all([
    getSimilarByPrice({
      price: price,
      roominess: roominess,
      id,
    }),
    getSimilarByLocation({
      latitude: location?.lat,
      longitude: location?.lng,
      roominess: roominess,
      id,
    }),
    getSimilarByLayout({
      layout: layout,
      roominess: roominess,
      id,
    }),
  ]);

  return [
    { label: 'По цене', data: similarByPrice },
    {
      label: 'По расположению',
      data: similarByLocation,
    },
    {
      label: 'По планировке',
      data: similarByLayout,
    },
  ];
};
