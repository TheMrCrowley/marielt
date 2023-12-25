import qs from 'qs';

import { saleTermQueryMap } from '@/src/enums/FlatsFilters';
import {
  electricityQueryMap,
  gasSupplyQueryMap,
  heatingQueryMap,
  houseLevelQueryMap,
  waterQueryMap,
  wallMaterialQueryMap,
  sewerageQueryMap,
} from '@/src/enums/HousesAndLotsFilters';
import { lotsWaterQueryMap } from '@/src/enums/HousesAndLotsFilters';
import { getPriceByCurrency } from '@/src/helpers/currencyHelpers';
import { formatToDefaultMapItem } from '@/src/helpers/formatters';
import { convertToDefaultHouseItem, convertToDetailedHouseItem } from '@/src/helpers/housesHelpers';
import {
  getDefaultMapPopulateQuery,
  getPaginationQuery,
  getQueryArray,
  getSortQuery,
} from '@/src/helpers/queryHelpers';
import { CurrencyState } from '@/src/store/currency';
import { HousesAndLotsFiltersType } from '@/src/store/housesAndLotsFilters';
import { AvailableCurrencies } from '@/src/types/Currency';
import { SearchResults } from '@/src/types/Filters';
import { DetailedHousesAndLotsItem, HousesAndLotsStrapiResponse } from '@/src/types/HousesAndLots';
import { StrapiFindOneResponse, StrapiFindResponse } from '@/src/types/StrapiTypes';

import { getCurrencies } from './currencyServices';

const getHousesAndLotsStrapiQuery = (
  filters: Record<string, string | string[] | boolean>,
  selectedCurrency: AvailableCurrencies,
  rates: CurrencyState['rates'],
): { query: string } => {
  const {
    priceFrom,
    priceTo,
    areaFrom,
    areaTo,
    livingAreaFrom,
    livingAreaTo,
    plotAreaFrom,
    plotAreaTo,
    kitchenAreaFrom,
    kitchenAreaTo,
    constructionYearFrom,
    constructionYearTo,
    electricity,
    gasSupply,
    heating,
    houseLevels,
    housesAndLotsCategories,
    water,
    wallMaterial,
    saleTerm,
    readinessFrom,
    readinessTo,
    sewerage,
    directions,
    distance,
    nearLake,
    housesAndLotsRootCategory,
    district_rb,
    locality,
    region,
    street,
    lotsWater,
  } = filters as HousesAndLotsFiltersType['filters'];

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
        price: {
          $gte: priceFrom && getPriceByCurrency(priceFrom, selectedCurrency, 'USD', rates),
          $lte: priceTo && getPriceByCurrency(priceTo, selectedCurrency, 'USD', rates),
        },
        additional_info: {
          name: {
            $eq: nearLake && 'водоем/река рядом',
          },
        },
        house_categories: {
          name: {
            $in:
              housesAndLotsCategories && housesAndLotsCategories.length
                ? housesAndLotsCategories
                : [housesAndLotsRootCategory],
          },
        },
        sale_terms: {
          $in: getQueryArray(saleTermQueryMap, saleTerm),
        },
        parameters: {
          total_area: {
            $gte: areaFrom,
            $lte: areaTo,
          },
          living_area: {
            $gte: livingAreaFrom,
            $lte: livingAreaTo,
          },
          kitchen_area: {
            $gte: kitchenAreaFrom,
            $lte: kitchenAreaTo,
          },
          plot_size: {
            $gte: plotAreaFrom,
            $lte: plotAreaTo,
          },
          construction_year: {
            $gte: constructionYearFrom,
            $lte: constructionYearTo,
          },
          electricity: {
            $in: getQueryArray(electricityQueryMap, electricity),
          },
          gas: {
            $in: getQueryArray(gasSupplyQueryMap, gasSupply),
          },
          heating: {
            $in: getQueryArray(heatingQueryMap, heating),
          },
          level_number: {
            $in: getQueryArray(houseLevelQueryMap, houseLevels),
          },
          water: {
            $in:
              (water && getQueryArray(waterQueryMap, water)) ||
              (lotsWater && getQueryArray(lotsWaterQueryMap, lotsWater)),
          },
          wall_material: {
            $in: getQueryArray(wallMaterialQueryMap, wallMaterial),
          },
          readiness_percentage: {
            $gte: readinessFrom,
            $lte: readinessTo,
          },
          sewerage: {
            $in: getQueryArray(sewerageQueryMap, sewerage),
          },
        },
        distance: {
          $lte: distance,
        },
        direction: {
          name: {
            $in: directions,
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  return { query };
};

export const getDefaultHouseListPopulateQuery = () => {
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
          fields: ['plot_size', 'kitchen_area', 'living_area', 'total_area'],
        },
        location: '*',
      },
    },
    { encodeValuesOnly: true },
  );
};

export const getHousesAndLotsForList = async (searchParams: Record<string, string | string[]>) => {
  const { eur, rub, usd } = await getCurrencies();
  const { query } = getHousesAndLotsStrapiQuery(
    searchParams,
    (searchParams.currency as AvailableCurrencies) || 'USD',
    {
      rub,
      eur,
      usd,
    },
  );

  const paginationQuery = getPaginationQuery('list', searchParams.page as string);

  const populateQuery = getDefaultHouseListPopulateQuery();

  const sortQuery = getSortQuery(searchParams.sort as string);

  const url = `${process.env.API_BASE_URL}/house-items?${query}&${paginationQuery}&${populateQuery}&${sortQuery}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const {
    data,
    meta: { pagination },
  } = (await response.json()) as StrapiFindResponse<HousesAndLotsStrapiResponse>;

  return {
    housesAndLots: convertToDefaultHouseItem(data),
    pagination,
  };
};

export const getHousesAndLotsForMap = async (searchParams: Record<string, string | string[]>) => {
  const { eur, rub, usd } = await getCurrencies();
  const { query } = getHousesAndLotsStrapiQuery(
    searchParams,
    (searchParams.currency as AvailableCurrencies) || 'USD',
    {
      rub,
      eur,
      usd,
    },
  );

  const paginationQuery = getPaginationQuery('map');

  const populateQuery = getDefaultMapPopulateQuery();

  const url = `${process.env.API_BASE_URL}/house-items?${query}&${paginationQuery}&${populateQuery}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindResponse<HousesAndLotsStrapiResponse>;

  return {
    houses: formatToDefaultMapItem(data),
  };
};

export const getHousesByIds = async (ids: string[]) => {
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
  const populateQuery = getDefaultHouseListPopulateQuery();

  const url = `${process.env.API_BASE_URL}/house-items?${paginationQuery}&${populateQuery}&${idsQuery}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindResponse<HousesAndLotsStrapiResponse>;

  return convertToDefaultHouseItem(data);
};

export const getHousesAndLotsById = async (id: string): Promise<DetailedHousesAndLotsItem> => {
  const query = qs.stringify(
    {
      populate: {
        fields: ['price'],
        region: {
          populate: {
            fields: ['name'],
          },
        },
        coordinates: {
          populate: '*',
        },
        house_number: {
          populate: '*',
        },
        house_categories: {
          populate: {
            fields: ['category', 'name'],
          },
        },
        agents: {
          populate: '*',
        },
        direction: {
          populate: {
            fields: ['name'],
          },
        },
        parameters: {
          populate: '*',
        },
        image: {
          fields: ['width', 'height', 'url', 'placeholder', 'formats'],
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const url = `${process.env.API_BASE_URL}/house-items/${id}?${query}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindOneResponse<HousesAndLotsStrapiResponse>;

  return convertToDetailedHouseItem(data);
};

export const getHousesAndLotsSearchResults = async (value: string): Promise<SearchResults> => {
  const query = qs.stringify(
    {
      searchValue: value,
      type: 'houses-and-lots',
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

const getSimilarByPrice = async ({
  price,
  id,
  rootType,
  type,
}: {
  id: string;
  price?: string;
  rootType?: string;
  type?: string;
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
        house_categories: {
          name: {
            $in: rootType && type ? [type] : rootType ? [rootType] : [],
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
  }/house-items?${query}&${getDefaultHouseListPopulateQuery()}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindResponse<HousesAndLotsStrapiResponse>;

  return convertToDefaultHouseItem(data);
};

const getSimilarByLocation = async ({
  latitude,
  longitude,
  id,
  rootType,
  type,
}: {
  id: string;
  latitude?: number;
  longitude?: number;
  rootType?: string;
  type?: string;
}) => {
  const query = qs.stringify(
    {
      filters: {
        coordinates: {
          latitude: { $between: [(latitude || 0) - 0.1, (latitude || 0) + 0.1] },
          longitude: { $between: [(longitude || 0) - 0.1, (longitude || 0) + 0.1] },
        },
        house_categories: {
          name: {
            $in: rootType && type ? [type] : rootType ? [rootType] : [],
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
  }/house-items?${query}&${getDefaultHouseListPopulateQuery()}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindResponse<HousesAndLotsStrapiResponse>;

  return convertToDefaultHouseItem(data);
};

export const getSimilarHouseItems = async (flat: DetailedHousesAndLotsItem) => {
  const { price, id, location, rootType, type } = flat;
  const [similarByPrice, similarByLocation] = await Promise.all([
    getSimilarByPrice({
      price: price,
      id,
      rootType,
      type,
    }),
    getSimilarByLocation({
      latitude: location?.lat,
      longitude: location?.lng,
      id,
      rootType,
      type,
    }),
  ]);

  return [
    { label: 'По цене', data: similarByPrice },
    {
      label: 'По расположению',
      data: similarByLocation,
    },
  ];
};

export const getHouseSeoFields = async (id: string) => {
  const populateQuery = qs.stringify(
    {
      populate: {
        image: {
          fields: ['width', 'height', 'url', 'placeholder'],
        },
      },
    },
    { encodeValuesOnly: true },
  );
  const url = `${process.env.API_BASE_URL}/house-items/${id}?${populateQuery}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindOneResponse<HousesAndLotsStrapiResponse>;

  return {
    seo: {
      title: data.attributes.name || 'Static House Title',
      description: '' + data.attributes.detailed_description || '' + data.attributes.note || '',
    },
    image: data.attributes.image?.data ? data.attributes.image.data[0].attributes.url : undefined,
  };
};
