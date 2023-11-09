import qs from 'qs';

import { getQueryArray } from '@/helpers/getQueryArray';
import { CommercialFiltersType } from '@/store/commercialFilters';
import { CurrencyState } from '@/store/currency';
import { AvailableCurrencies } from '@/types/Currency';

const getHousesAndLotsStrapiQuery = (
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
  } = filters as CommercialFiltersType['filters'];

  const query = qs.stringify(
    {
      comm_tran: {
        name: {
          $eq: transactionType,
        },
      },
      commercial_categories: {
        name: {
          $in: [rootCategoryType, ...propertyType].filter(Boolean),
        },
      },
      price_total: {
        $gte: priceFrom,
        $lte: priceTo,
      },
      premises_area:
        areaFrom || areaTo
          ? {
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
            }
          : null,
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
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  return { query };
};
