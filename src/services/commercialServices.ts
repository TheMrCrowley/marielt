import qs from 'qs';

import {
  commercialFinishingQueryMap,
  commercialLocationQueryMap,
  commercialWallMaterialQueryMap,
} from '@/src/enums/CommercialFilters';
import { getPriceByCurrency } from '@/src/helpers/currencyHelpers';
import { formatToDefaultCommercial } from '@/src/helpers/formatters';
import { getQueryArray } from '@/src/helpers/getQueryArray';
import { CommercialFiltersType } from '@/src/store/commercialFilters';
import { CurrencyState } from '@/src/store/currency';
import { AvailableCurrencies } from '@/src/types/Currency';
import { SearchResults } from '@/src/types/Filters';
import { CommercialStrapiResponse, StrapiFindResponse } from '@/src/types/StrapiTypes';

import { getCurrencies } from './currencyServices';

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
    district_rb,
    locality,
    priceForMeterFrom,
    priceFromMeterTo,
    region,
    street,
  } = filters as CommercialFiltersType['filters'];

  const targetCurrency: AvailableCurrencies = transactionType === 'Аренда' ? 'EUR' : 'USD';

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
        price_total: (priceFrom || priceTo) && {
          $or: [
            {
              to: {
                $null: true,
              },
              from: {
                $gte:
                  priceFrom &&
                  getPriceByCurrency(priceFrom, selectedCurrency, targetCurrency, rates),
                $lte:
                  priceTo && getPriceByCurrency(priceTo, selectedCurrency, targetCurrency, rates),
              },
            },
            {
              to: {
                $between: priceFrom &&
                  priceTo && [
                    getPriceByCurrency(priceFrom, selectedCurrency, targetCurrency, rates),
                    getPriceByCurrency(priceTo, selectedCurrency, targetCurrency, rates),
                  ],
              },
            },
            {
              from: {
                $between: priceFrom &&
                  priceTo && [
                    getPriceByCurrency(priceFrom, selectedCurrency, targetCurrency, rates),
                    getPriceByCurrency(priceTo, selectedCurrency, targetCurrency, rates),
                  ],
              },
            },
            {
              to: {
                $gte: getPriceByCurrency(priceTo, selectedCurrency, targetCurrency, rates),
                $not: {
                  $lt: getPriceByCurrency(priceFrom, selectedCurrency, targetCurrency, rates),
                },
              },
              from: {
                $lte: getPriceByCurrency(priceFrom, selectedCurrency, targetCurrency, rates),
              },
            },
          ],
        },
        price_meter: (priceForMeterFrom || priceFromMeterTo) && {
          $or: [
            {
              to: {
                $null: true,
              },
              from: {
                $gte:
                  priceForMeterFrom &&
                  getPriceByCurrency(priceForMeterFrom, selectedCurrency, targetCurrency, rates),
                $lte:
                  priceFromMeterTo &&
                  getPriceByCurrency(priceFromMeterTo, selectedCurrency, targetCurrency, rates),
              },
            },
            {
              to: {
                $between: priceForMeterFrom &&
                  priceFromMeterTo && [
                    getPriceByCurrency(priceForMeterFrom, selectedCurrency, targetCurrency, rates),
                    getPriceByCurrency(priceFromMeterTo, selectedCurrency, targetCurrency, rates),
                  ],
              },
            },
            {
              from: {
                $between: priceForMeterFrom &&
                  priceFromMeterTo && [
                    getPriceByCurrency(priceForMeterFrom, selectedCurrency, targetCurrency, rates),
                    getPriceByCurrency(priceFromMeterTo, selectedCurrency, targetCurrency, rates),
                  ],
              },
            },
            {
              to: {
                $gte: getPriceByCurrency(priceFromMeterTo, selectedCurrency, targetCurrency, rates),
                $not: {
                  $lt: getPriceByCurrency(
                    priceForMeterFrom,
                    selectedCurrency,
                    targetCurrency,
                    rates,
                  ),
                },
              },
              from: {
                $lte: getPriceByCurrency(
                  priceForMeterFrom,
                  selectedCurrency,
                  targetCurrency,
                  rates,
                ),
              },
            },
          ],
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
                  $between: areaFrom && areaTo && [areaFrom, areaTo],
                },
              },
              {
                min_area: {
                  $between: areaFrom && areaTo && [areaFrom, areaTo],
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
      populate: '*',
      pagination: {
        pageSize: 6,
        page: filters.page || 1,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

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

  const url = `${process.env.API_BASE_URL}/commercial-property-items?${query}`;
  console.log({ url });
  const response = await fetch(url, {
    cache: 'no-cache',
  });

  const d = (await response.json()) as StrapiFindResponse<CommercialStrapiResponse>;
  console.log({ d });
  const {
    data,
    meta: { pagination },
  } = d;
  return {
    commercial: formatToDefaultCommercial(data),
    pagination,
  };
};

export const getCommercialSearchResults = async (value: string): Promise<SearchResults> => {
  const query = qs.stringify(
    {
      searchValue: value,
      type: 'commercial',
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
