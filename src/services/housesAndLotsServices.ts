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
import { getPriceByCurrency } from '@/src/helpers/currencyHelpers';
import {
  formatToDefaultHouseAndLotsItem,
  formatToDetailedHousesAndLots,
} from '@/src/helpers/formatters';
import { getQueryArray } from '@/src/helpers/getQueryArray';
import { CurrencyState } from '@/src/store/currency';
import { HousesAndLotsFiltersType } from '@/src/store/housesAndLotsFilters';
import { AvailableCurrencies } from '@/src/types/Currency';
import { SearchResults } from '@/src/types/Filters';
import { DetailedHousesAndLotsItem } from '@/src/types/HousesAndLots';
import {
  HousesAndLotsStrapiResponse,
  StrapiFindOneResponse,
  StrapiFindResponse,
} from '@/src/types/StrapiTypes';

import { lotsWaterQueryMap } from './../enums/HousesAndLotsFilters';
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
      populate: '*',
      pagination: {
        pageSize: 6,
        page: filters.page || 1,
      },
    },
    { encodeValuesOnly: true },
  );

  return { query };
};

export const getHousesAndLots = async (searchParams: Record<string, string | string[]>) => {
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

  const url = `${process.env.API_BASE_URL}/house-items?${query}`;

  const response = await fetch(url, {
    cache: 'no-cache',
  });

  const {
    data,
    meta: { pagination },
  } = (await response.json()) as StrapiFindResponse<HousesAndLotsStrapiResponse>;

  return {
    housesAndLots: formatToDefaultHouseAndLotsItem(data),
    pagination,
  };
};

export const getHousesAndLotsById = async (id: string): Promise<DetailedHousesAndLotsItem> => {
  const query = qs.stringify(
    {
      populate: '*',
    },
    {
      encodeValuesOnly: true,
    },
  );

  const response = await fetch(`${process.env.API_BASE_URL}/house-items/${id}?${query}`, {
    cache: 'no-cache',
  });

  const { data } = (await response.json()) as StrapiFindOneResponse<HousesAndLotsStrapiResponse>;

  return formatToDetailedHousesAndLots(data);
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
    cache: 'no-cache',
  });

  const searchResults = (await response.json()) as SearchResults;

  return searchResults;
};
