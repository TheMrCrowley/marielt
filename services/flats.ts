import qs from 'qs';

import {
  roominessQueryMap,
  houseTypeQueryMap,
  bathroomQueryMap,
  balconyQueryMap,
  saleTermQueryMap,
  finishingQueryMap,
} from '@/enums/FlatsFilters';
import { getPriceByCurrency } from '@/helpers/currencyHelpers';
import { getFullAddress } from '@/helpers/getFullAddress';
import { getQueryArray } from '@/helpers/getQueryArray';
import { CurrencyState } from '@/store/currency';
import { AvailableCurrencies } from '@/types/Currency';
import { FlatsFiltersType } from '@/types/Filters';
import { StrapiFindResponse } from '@/types/StrapiFindResponse';
import { StrapiImage } from '@/types/StrapiImage';

import { getCurrencies } from './getCurrency';

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
          $or: [
            {
              name: furniture && 'мебель',
            },
            { name: parking && 'гараж' },
            { name: parking && 'стоянка автомобиля' },
          ],
        },
        parameters: {
          is_last_floor: {
            $eq: isLastFloor,
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

export const getFlats = async (searchParams: Record<string, string | string[]>) => {
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

  const response = await fetch(
    `${
      process.env.API_BASE_URL
    }/apartments-items?populate=*&${query}&pagination[pageSize]=6&pagination[page]=${
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
  } = (await response.json()) as StrapiFindResponse<FlatStrapiResponse>;

  return {
    flats: convertResponseToDefaultFlat(data),
    pagination,
  };
};

const convertResponseToDefaultFlat = (
  flats: StrapiFindResponse<FlatStrapiResponse>['data'],
): DefaultFlatItem[] => {
  return flats.map(({ attributes, id }) => ({
    address: getFullAddress({
      locality: attributes.locality,
      houseNumber: attributes.house_number?.number,
      street: attributes.street,
    }),
    floor: attributes.parameters.floor,
    id,
    livingArea: attributes.parameters.living_area,
    maxFloor: attributes.parameters.floors_number,
    price: attributes.price,
    totalArea: attributes.parameters.total_area,
    name: attributes.name,
    img: attributes.image?.url,
    initialCurrency: attributes.currency || 'USD',
  }));
};

export interface FlatStrapiResponse {
  parameters: {
    total_area: string;
    living_area: string;
    floors_number: string;
    floor: string;
    roominess: string;
    balcony: string;
    construction_year?: string;
    major_renovation_year?: string;
    finishing?: string;
    house_type?: string;
    kitchen_area?: string;
    ceiling_height?: string;
    bathroom?: string;
  };
  coordinates: string;
  locality: string;
  street?: string;
  house_number?: {
    number: string;
    building: string;
  };
  currency?: AvailableCurrencies;
  price?: string;
  name?: string;
  image?: StrapiImage;
}

export interface DefaultFlatItem {
  address: string;
  floor: string;
  maxFloor: string;
  totalArea: string;
  livingArea: string;
  id: string;
  price?: string;
  name?: string;
  img?: string;
  initialCurrency: AvailableCurrencies;
}
