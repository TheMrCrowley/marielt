import qs from 'qs';

import { saleTermQueryMap } from '@/enums/FlatsFilters';
import {
  electricityQueryMap,
  heatingQueryMap,
  houseLevelQueryMap,
  wallMaterialQueryMap,
} from '@/enums/HousesAndLotsFilters';
import { getFullAddress } from '@/helpers/getFullAddress';
import { CurrencyState } from '@/store/currency';
import { AvailableCurrencies } from '@/types/Currency';
import { HousesAndLotsFiltersType } from '@/types/Filters';
import { StrapiFindResponse } from '@/types/StrapiFindResponse';

import { waterQueryMap, sewerageQueryMap } from './../enums/HousesAndLotsFilters';
import { getPriceByCurrency } from './../helpers/currencyHelpers';
import { getQueryArray } from './../helpers/getQueryArray';
import { StrapiImage } from './../types/StrapiImage';
import { getCurrencies } from './getCurrency';

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
    houseType,
    water,
    wallMaterial,
    saleTerm,
    readinessFrom,
    readinessTo,
    sewerage,
    directions,
    distance,
    nearLake,
    housesAndLotsType,
  } = filters as HousesAndLotsFiltersType['filters'];

  const query = qs.stringify(
    {
      filters: {
        price: {
          $gte: priceFrom && getPriceByCurrency(priceFrom, selectedCurrency, 'USD', rates),
          $lte: priceTo && getPriceByCurrency(priceTo, selectedCurrency, 'USD', rates),
        },
        additional_info: {
          name: {
            $eq: nearLake && 'водоем/река рядом',
          },
        },
        houses_and_lots_categories: {
          name: {
            $in: houseType && houseType.length ? houseType : [housesAndLotsType],
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
            $eq: gasSupply,
          },
          heating: {
            $in: getQueryArray(heatingQueryMap, heating),
          },
          level_number: {
            $in: getQueryArray(houseLevelQueryMap, houseLevels),
          },
          water: {
            $in: getQueryArray(waterQueryMap, water),
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
          $gte: distance,
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

  const response = await fetch(
    `${
      process.env.API_BASE_URL
    }/houses-and-lots-items?populate=*&${query}&pagination[pageSize]=6&pagination[page]=${
      searchParams.page || 1
    }`,
    {
      next: {
        // revalidate: REVALIDATE_TIME,
      },
      cache: 'no-cache',
    },
  );

  const {
    data,
    meta: { pagination },
  } = (await response.json()) as StrapiFindResponse<HousesAndLotsStrapiResponse>;

  return {
    housesAndLots: convertResponseToDefaultItem(data),
    pagination,
  };
};

export const getCottages = async (searchParams: Record<string, string | string[]>) => {};

export const getPlots = async (searchParams: Record<string, string | string[]>) => {};

export const getDachas = async (searchParams: Record<string, string | string[]>) => {};

const convertResponseToDefaultItem = (
  data: StrapiFindResponse<HousesAndLotsStrapiResponse>['data'],
): DefaultHousesAndLotsItem[] => {
  return data.map(
    ({
      attributes: { name, price, locality, street, house_number, currency, parameters, image },
      id,
    }) => ({
      id,
      address: getFullAddress({
        locality,
        houseNumber: house_number?.number,
        street,
      }),
      initialCurrency: currency || 'USD',
      plotSize: parameters.plot_size || 'Нету площади',
      img: image?.url,
      name,
      price,
    }),
  );
};

interface HousesAndLotsStrapiResponse {
  locality: string;
  street?: string;
  house_number?: {
    number: string;
    building: string;
  };
  coordinates: string;
  parameters: {
    plot_size?: string;
    level_number?: string;
    roof_material?: string;
    wall_material?: string;
    total_area?: string;
    living_area?: string;
    kitchen_area?: string;
    heating?: string;
    gas?: string;
    water?: string;
    sewerage?: string;
    electricity?: string;
  };
  currency?: AvailableCurrencies;
  price: string;
  image?: StrapiImage;
  name?: string;
}

export interface DefaultHousesAndLotsItem {
  address: string;
  plotSize: string;
  id: string;
  price?: string;
  name?: string;
  img?: string;
  initialCurrency: AvailableCurrencies;
}
