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
    priceForMeterTo,
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
        comm_categories: {
          name: {
            $in: [
              rootCategoryType,
              ...(propertyType && Array.isArray(propertyType) ? propertyType : [propertyType]),
            ].filter(Boolean),
          },
        },
        $and: [
          {
            price_total: (priceFrom || priceTo) && {
              $or: [
                !!priceFrom &&
                  !priceTo && {
                    from: {
                      $gte: getPriceByCurrency(priceFrom, selectedCurrency, targetCurrency, rates),
                    },
                  },
                !!priceFrom &&
                  !priceTo && {
                    from: {
                      $lte: getPriceByCurrency(priceFrom, selectedCurrency, targetCurrency, rates),
                    },
                    to: {
                      $gte: getPriceByCurrency(priceFrom, selectedCurrency, targetCurrency, rates),
                    },
                  },
                !!priceTo &&
                  !priceFrom && {
                    from: {
                      $lte: getPriceByCurrency(priceTo, selectedCurrency, targetCurrency, rates),
                    },
                    to: {
                      $lte: getPriceByCurrency(priceTo, selectedCurrency, targetCurrency, rates),
                    },
                  },
                !!priceTo &&
                  !priceFrom && {
                    from: {
                      $between: [0, priceTo],
                    },
                  },
                priceFrom &&
                  priceTo && {
                    to: {
                      $between: [
                        getPriceByCurrency(priceFrom, selectedCurrency, targetCurrency, rates),
                        priceTo,
                      ],
                    },
                  },
                priceFrom &&
                  priceTo && {
                    from: {
                      $between: [
                        getPriceByCurrency(priceFrom, selectedCurrency, targetCurrency, rates),
                        priceTo,
                      ],
                    },
                  },
                priceTo &&
                  priceFrom && {
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
              ].filter(Boolean),
            },
          },
          {
            price_meter: (priceForMeterFrom || priceForMeterTo) && {
              $or: [
                !!priceForMeterFrom &&
                  !priceForMeterTo && {
                    from: {
                      $gte: getPriceByCurrency(
                        priceForMeterFrom,
                        selectedCurrency,
                        targetCurrency,
                        rates,
                      ),
                    },
                  },
                !!priceForMeterFrom &&
                  !priceForMeterTo && {
                    from: {
                      $lte: getPriceByCurrency(
                        priceForMeterFrom,
                        selectedCurrency,
                        targetCurrency,
                        rates,
                      ),
                    },
                    to: {
                      $gte: getPriceByCurrency(
                        priceForMeterFrom,
                        selectedCurrency,
                        targetCurrency,
                        rates,
                      ),
                    },
                  },
                !!priceForMeterTo &&
                  !priceForMeterFrom && {
                    from: {
                      $lte: getPriceByCurrency(
                        priceForMeterTo,
                        selectedCurrency,
                        targetCurrency,
                        rates,
                      ),
                    },
                    to: {
                      $lte: getPriceByCurrency(
                        priceForMeterTo,
                        selectedCurrency,
                        targetCurrency,
                        rates,
                      ),
                    },
                  },
                !!priceForMeterTo &&
                  !priceForMeterFrom && {
                    from: {
                      $between: [0, priceForMeterTo],
                    },
                  },
                priceForMeterFrom &&
                  priceForMeterTo && {
                    to: {
                      $between: [
                        getPriceByCurrency(
                          priceForMeterFrom,
                          selectedCurrency,
                          targetCurrency,
                          rates,
                        ),
                        priceForMeterTo,
                      ],
                    },
                  },
                priceForMeterFrom &&
                  priceForMeterTo && {
                    from: {
                      $between: [
                        getPriceByCurrency(
                          priceForMeterFrom,
                          selectedCurrency,
                          targetCurrency,
                          rates,
                        ),
                        priceForMeterTo,
                      ],
                    },
                  },
                priceForMeterTo &&
                  priceForMeterFrom && {
                    to: {
                      $gte: getPriceByCurrency(
                        priceForMeterTo,
                        selectedCurrency,
                        targetCurrency,
                        rates,
                      ),
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
              ].filter(Boolean),
            },
          },
          {
            parameters: {
              premises_area: (areaFrom || areaTo) && {
                $or: [
                  !!areaFrom &&
                    !areaTo && {
                      min_area: {
                        $gte: areaFrom,
                      },
                    },
                  !!areaFrom &&
                    !areaTo && {
                      min_area: {
                        $lte: areaFrom,
                      },
                      max_area: {
                        $null: true,
                      },
                    },
                  !!areaFrom &&
                    !areaTo && {
                      min_area: {
                        $lte: areaFrom,
                      },
                      max_area: {
                        $gte: areaFrom,
                      },
                    },
                  !!areaTo &&
                    !areaFrom && {
                      min_area: {
                        $lte: areaTo,
                      },
                      max_area: {
                        $lte: areaTo,
                      },
                    },
                  !!areaTo &&
                    !areaFrom && {
                      min_area: {
                        $between: [0, areaTo],
                      },
                    },
                  areaFrom &&
                    areaTo && {
                      max_area: {
                        $between: [areaFrom, areaTo],
                      },
                    },
                  areaFrom &&
                    areaTo && {
                      min_area: {
                        $between: [areaFrom, areaTo],
                      },
                    },
                  areaTo &&
                    areaFrom && {
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
                ].filter(Boolean),
              },
            },
          },
          {
            parameters: {
              separate_rooms: (separateRoomsFrom || separateRoomsTo) && {
                $or: [
                  !!separateRoomsFrom &&
                    !separateRoomsTo && {
                      from: {
                        $gte: separateRoomsFrom,
                      },
                    },

                  !!separateRoomsFrom &&
                    !separateRoomsTo && {
                      min_fromarea: {
                        $lte: separateRoomsFrom,
                      },
                      to: {
                        $gte: separateRoomsFrom,
                      },
                    },
                  !!separateRoomsTo &&
                    !separateRoomsFrom && {
                      from: {
                        $lte: separateRoomsTo,
                      },
                      to: {
                        $lte: separateRoomsTo,
                      },
                    },
                  !!separateRoomsTo &&
                    !separateRoomsFrom && {
                      from: {
                        $between: [0, separateRoomsTo],
                      },
                    },
                  separateRoomsFrom &&
                    separateRoomsTo && {
                      to: {
                        $between: [separateRoomsFrom, separateRoomsTo],
                      },
                    },
                  separateRoomsFrom &&
                    separateRoomsTo && {
                      from: {
                        $between: [separateRoomsFrom, separateRoomsTo],
                      },
                    },
                  separateRoomsTo &&
                    separateRoomsFrom && {
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
                ].filter(Boolean),
              },
            },
          },
        ],
        parameters: {
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
            $gte: paybackFrom,
            $lte: paybackTo,
          },
          vat: {
            $eq: vat,
          },
        },
      },
      populate: ['parameters.premises_area', 'price_total', 'price_meter'],
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

  const url = `${process.env.API_BASE_URL}/comm-items?${query}`;

  const response = await fetch(url, {
    cache: 'no-cache',
  });

  const {
    data,
    meta: { pagination },
  } = (await response.json()) as StrapiFindResponse<CommercialStrapiResponse>;

  console.log(data.forEach((i) => console.log(i.attributes)));
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
