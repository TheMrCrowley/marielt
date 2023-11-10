import qs from 'qs';

import {
  TransactionTypeValues,
  commercialFinishingQueryMap,
  commercialLocationQueryMap,
  commercialWallMaterialQueryMap,
} from '@/enums/CommercialFilters';
import { getPriceByCurrency } from '@/helpers/currencyHelpers';
import { getFullAddress } from '@/helpers/getFullAddress';
import { getQueryArray } from '@/helpers/getQueryArray';
import { CommercialFiltersType } from '@/store/commercialFilters';
import { CurrencyState } from '@/store/currency';
import { AvailableCurrencies } from '@/types/Currency';
import { StrapiFindResponse } from '@/types/StrapiFindResponse';
import { StrapiImage } from '@/types/StrapiImage';

import { getCurrencies } from './getCurrency';

const getCommercialStrapiQueryParamsByFilters = (
  filters: Record<string, string | string[] | boolean>,
  selectedCurrency: AvailableCurrencies,
  rates: CurrencyState['rates'],
): { query: string } => {
  const {
    transactionType,
    rootCategoryType,
    propertyType,
    priceFrom,
    priceTo,
    areaFrom,
    areaTo,
    floorFrom,
    floorTo,
    isFirstFloor,
    isLastFloor,
    isGroundFloor,
    constructionYearFrom,
    constructionYearTo,
    profitabilityFrom,
    profitabilityTo,
    paybackFrom,
    paybackTo,
    vat,
    separateEntrance,
    commercialLocation,
    separateRoomsFrom,
    separateRoomsTo,
    ceilingHeightFrom,
    ceilingHeightTo,
    finishing,
    bathroom,
    furniture,
    ramp,
    plotAreaFrom,
    plotAreaTo,
    wallMaterial,
    directions,
    distance,
    heating,
    water,
    sewerage,
    electricity,
    gas,
  } = filters as CommercialFiltersType['filters'];

  const targetCurrency: AvailableCurrencies = transactionType === 'Аренда' ? 'EUR' : 'USD';

  console.log(transactionType);
  const query = qs.stringify(
    {
      filters: {
        comm_tran: {
          name: {
            $in: [transactionType],
          },
        },
        commercial_categories: {
          name: {
            $in: [rootCategoryType, ...(propertyType ? propertyType : [])].filter(Boolean),
          },
        },
        price_total: {
          $gte: priceFrom && getPriceByCurrency(priceFrom, selectedCurrency, targetCurrency, rates),
          $lte: priceTo && getPriceByCurrency(priceTo, selectedCurrency, targetCurrency, rates),
        },
        parameters: {
          premises_area: (areaFrom || areaTo) && {
            $or: [
              {
                max_area: {
                  $null: true,
                },
                min_area: {
                  $gte: areaFrom,
                  $lte: areaTo,
                },
              },
              {
                max_area: {
                  $between: [areaFrom, areaTo],
                },
              },
              {
                min_area: {
                  $between: [areaFrom, areaTo],
                },
              },
              {
                max_area: {
                  $gte: areaTo,
                  $not: {
                    $lt: areaFrom,
                  },
                },
                min_area: {
                  $lte: areaFrom,
                },
              },
            ],
          },
          $or: [
            {
              floor: {
                $gte: floorFrom,
                $lte: floorTo,
              },
            },
            {
              floor: {
                $eq: isFirstFloor && 1,
              },
            },
          ],
          is_ground_floor: {
            $eq: isGroundFloor,
          },
          construction_year: {
            $gte: constructionYearFrom,
            $lte: constructionYearTo,
          },
          separate_rooms: (separateRoomsFrom || separateRoomsTo) && {
            $or: [
              {
                to: {
                  $null: true,
                },
                from: {
                  $gte: separateRoomsFrom,
                  $lte: separateRoomsTo,
                },
              },
              {
                to: {
                  $between: [separateRoomsFrom, separateRoomsTo],
                },
              },
              {
                from: {
                  $between: [separateRoomsFrom, separateRoomsTo],
                },
              },
              {
                to: {
                  $gte: separateRoomsTo,
                  $not: {
                    $lt: separateRoomsFrom,
                  },
                },
                from: {
                  $lte: separateRoomsFrom,
                },
              },
            ],
          },
          ceiling_height: {
            $gte: ceilingHeightFrom,
            $lte: ceilingHeightTo,
          },
          finishing: {
            $in: getQueryArray(commercialFinishingQueryMap, finishing),
          },
          bathroom: {
            $eq: bathroom,
          },
          furniture: {
            $eq: furniture,
          },
          separate_entrance: {
            $eq: separateEntrance,
          },
          ramp: {
            $eq: ramp,
          },
          plot_size: {
            $gte: plotAreaFrom,
            $lte: plotAreaTo,
          },
          is_last_floor: {
            $eq: isLastFloor,
          },
          location: {
            $in: getQueryArray(commercialLocationQueryMap, commercialLocation),
          },
          wall_material: {
            $in: getQueryArray(commercialWallMaterialQueryMap, wallMaterial),
          },
          heating: {
            $eq: heating,
          },
          water: {
            $eq: water,
          },
          sewerage: {
            $eq: sewerage,
          },
          electricity: {
            $eq: electricity,
          },
          gas: {
            $eq: gas,
          },
        },
        direction: {
          name: {
            $in: directions,
          },
        },
        distance: {
          $lte: distance,
        },
        business: {
          profitability: {
            $gte: profitabilityFrom,
            $lte: profitabilityTo,
          },
          payback: {
            $lte: paybackFrom,
            $gte: paybackTo,
          },
          vat: {
            $eq: vat,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  console.log(query);

  return { query };
};

export const getCommercialItems = async (searchParams: Record<string, string | string[]>) => {
  const { eur, rub, usd } = await getCurrencies();
  const { query } = getCommercialStrapiQueryParamsByFilters(
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
    }/commercial-property-items?populate=*&${query}&pagination[pageSize]=6&pagination[page]=${
      searchParams.page || 1
    }`,
    {
      cache: 'no-cache',
    },
  );

  const {
    data,
    meta: { pagination },
  } = (await response.json()) as StrapiFindResponse<CommercialStrapiResponse>;

  console.log(data[0]?.attributes.comm_tran);

  return {
    commercial: data.map(({ id, attributes }) => formatResponseToDefault(id, attributes)),
    pagination,
  };
};

const formatResponseToDefault = (
  id: string,
  { locality, street, house_number, currency, comm_tran }: CommercialStrapiResponse,
): DefaultCommercialItem => ({
  address: getFullAddress({
    locality,
    houseNumber: house_number?.number,
    street,
  }),
  id,
  initialCurrency: currency || 'USD',
  transactionType: comm_tran?.data?.attributes?.uid,
});

interface CommercialStrapiResponse {
  locality: string;
  coordinates: string;
  parameters: {
    premises_area?: {
      min_area: string;
      max_area?: string;
    };
    separate_rooms?: {
      from?: string;
      to?: string;
    };
    plot_size?: string;
    floor?: string;
    floors_number?: string;
    ceiling_height?: string;
    wall_material?: string;
    construction_year?: string;
    finishing?: string;
    equipment?: boolean;
    daylight?: boolean;
    electricity?: boolean;
    heating?: boolean;
    gas?: boolean;
    water?: boolean;
    bathroom?: boolean;
    ventilation?: boolean;
    is_ground_floor?: boolean;
    sewerage?: boolean;
    furniture?: boolean;
    is_last_floor?: boolean;
    location?: string;
    separate_entrance?: boolean;
    ramp?: boolean;
  };
  business?: {
    profitability: string;
    payback: string;
    vat: string;
    rent_amount_month: string;
    rent_amount_year: string;
  };
  price_total?: {
    from?: string;
    to?: string;
  };
  commercial_phone: string;
  home_page: boolean;
  currency?: AvailableCurrencies;
  price?: string;
  name?: string;
  image?: StrapiImage;
  street?: string;
  house_number?: {
    number: string;
    building: string;
  };
  comm_tran: {
    data: {
      attributes: {
        uid: TransactionTypeValues;
      };
    };
  };
}

export interface DefaultCommercialItem {
  address: string;
  id: string;
  price?: string;
  name?: string;
  img?: string;
  initialCurrency: AvailableCurrencies;
  transactionType: TransactionTypeValues;
}
