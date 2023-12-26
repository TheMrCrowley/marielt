import qs from 'qs';

import BaseApi from '@/src/api/BaseApi';
import {
  commercialFinishingQueryMap,
  commercialLocationQueryMap,
  commercialWallMaterialQueryMap,
} from '@/src/enums/CommercialFilters';
import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import { getDefaultCommercialListPopulateQuery } from '@/src/helpers/commercial/commercialHelpers';
import { getPriceByCurrency } from '@/src/helpers/currencyHelpers';
import {
  IMAGE_FIELDS_TO_POPULATE,
  IMAGE_FIELDS_WITH_FORMATS,
  getDefaultMapPopulateQuery,
  getPaginationQuery,
  getQueryArray,
  getUrlWithQueries,
} from '@/src/helpers/queryHelpers';
import { getCurrencies } from '@/src/services/currencyServices';
import { CommercialFiltersType } from '@/src/store/commercialFilters';
import { CurrencyState } from '@/src/store/currency';
import { DetailedCommercialItem } from '@/src/types/Commercial';
import { AvailableCurrencies } from '@/src/types/Currency';

import { getIdsQuery, getActualItemQuery } from './../../helpers/queryHelpers';
import {
  AbstractCommercialApi,
  CommercialItemsStrapiResponse,
  CommercialStrapiResponse,
} from './CommercialApi.types';

const API_NAME = 'CommercialApi';

export default class CommercialApi extends BaseApi implements AbstractCommercialApi {
  private readonly commercialApiUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl, API_NAME);

    this.commercialApiUrl = `${process.env.API_BASE_URL}${StrapiApiPath.CommercialItems}`;
  }

  private getCommercialStrapiQueryParamsByFilters = (
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
                        $gte: getPriceByCurrency(
                          priceFrom,
                          selectedCurrency,
                          targetCurrency,
                          rates,
                        ),
                      },
                    },
                  !!priceFrom &&
                    !priceTo && {
                      from: {
                        $lte: getPriceByCurrency(
                          priceFrom,
                          selectedCurrency,
                          targetCurrency,
                          rates,
                        ),
                      },
                      to: {
                        $gte: getPriceByCurrency(
                          priceFrom,
                          selectedCurrency,
                          targetCurrency,
                          rates,
                        ),
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
                          $lt: getPriceByCurrency(
                            priceFrom,
                            selectedCurrency,
                            targetCurrency,
                            rates,
                          ),
                        },
                      },
                      from: {
                        $lte: getPriceByCurrency(
                          priceFrom,
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
            vat: {
              $eq: vat,
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
          },
        },
      },
      {
        encodeValuesOnly: true,
      },
    );

    return { query };
  };

  private async getSimilarByPrice(params: {
    priceTotalFrom?: string;
    priceMeterFrom?: string;
    rootType?: string;
    type?: string;
    id: string;
  }): Promise<CommercialItemsStrapiResponse> {
    const { id, priceMeterFrom, priceTotalFrom, rootType, type } = params;

    const filterQuery = qs.stringify(
      {
        filters: {
          price_total: priceTotalFrom && {
            from: {
              $between: [
                +priceTotalFrom - +priceTotalFrom * 0.2,
                +priceTotalFrom + +priceTotalFrom * 0.2,
              ],
            },
          },
          price_meter:
            !priceTotalFrom && priceMeterFrom
              ? {
                  from: {
                    $between: [
                      +priceMeterFrom - +priceMeterFrom * 0.2,
                      +priceMeterFrom + +priceMeterFrom * 0.2,
                    ],
                  },
                }
              : undefined,
          comm_categories: {
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

    const populateQuery = getDefaultCommercialListPopulateQuery();

    const url = getUrlWithQueries(this.commercialApiUrl, filterQuery, populateQuery);

    const data = await this.fetchWrapper<CommercialItemsStrapiResponse>(url);

    return data;
  }

  private async getSimilarByLocation(params: {
    latitude?: number;
    longitude?: number;
    rootType?: string;
    type?: string;
    id: string;
  }): Promise<CommercialItemsStrapiResponse> {
    const { id, latitude, longitude, rootType, type } = params;

    const filterQuery = qs.stringify(
      {
        filters: {
          coordinates: {
            latitude: { $between: [(latitude || 0) - 0.008, (latitude || 0) + 0.008] },
            longitude: { $between: [(longitude || 0) - 0.008, (longitude || 0) + 0.008] },
          },
          comm_categories: {
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

    const populateQuery = getDefaultCommercialListPopulateQuery();

    const url = getUrlWithQueries(this.commercialApiUrl, filterQuery, populateQuery);

    const data = await this.fetchWrapper<CommercialItemsStrapiResponse>(url);

    return data;
  }

  public async getCommercialById(id: string): Promise<CommercialStrapiResponse> {
    const populateQuery = qs.stringify(
      {
        populate: {
          price_total: {
            populate: '*',
          },
          business: {
            populate: '*',
          },
          price_meter: {
            populate: '*',
          },
          additional_info: {
            populate: '*',
          },
          image: {
            fields: IMAGE_FIELDS_WITH_FORMATS,
          },
          agents: {
            populate: {
              fields: ['full_name', 'phone1', 'phone2', 'branch', 'position'],
            },
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
          comm_categories: {
            fields: ['name', 'category'],
          },
          comm_tran: {
            fields: ['name', 'uid'],
          },
          direction: {
            fields: ['name'],
          },
          coordinates: {
            populate: '*',
          },
        },
      },
      {
        encodeValuesOnly: true,
      },
    );

    const url = getUrlWithQueries(`${this.commercialApiUrl}/${id}`, populateQuery);

    const data = await this.fetchWrapper<CommercialStrapiResponse>(url);

    return data;
  }

  public async getSimilarCommercial(commercial: DetailedCommercialItem): Promise<{
    byPrice: CommercialItemsStrapiResponse;
    byLocation: CommercialItemsStrapiResponse;
  }> {
    const [byPrice, byLocation] = await Promise.all([
      this.getSimilarByPrice({
        priceMeterFrom: commercial.pricePerMeter?.from,
        priceTotalFrom: commercial.totalPrice?.from,
        id: commercial.id!,
        rootType: commercial.rootType,
        type: commercial.type,
      }),
      this.getSimilarByLocation({
        id: commercial.id!,
        rootType: commercial.rootType,
        type: commercial.type,
        latitude: commercial.location?.lat,
        longitude: commercial.location?.lng,
      }),
    ]);

    return {
      byPrice,
      byLocation,
    };
  }

  public async getCommercialForList(
    searchParams: Record<string, string | string[]>,
  ): Promise<CommercialItemsStrapiResponse> {
    const rates = await getCurrencies();
    const { query: filterQuery } = this.getCommercialStrapiQueryParamsByFilters(
      searchParams,
      (searchParams.currency as AvailableCurrencies) || 'USD',
      rates,
    );

    const paginationQuery = getPaginationQuery('list', searchParams.page as string);
    const populateQuery = getDefaultCommercialListPopulateQuery();

    const url = getUrlWithQueries(
      this.commercialApiUrl,
      filterQuery,
      paginationQuery,
      populateQuery,
    );

    const data = await this.fetchWrapper<CommercialItemsStrapiResponse>(url);

    return data;
  }

  public async getCommercialForMap(
    searchParams: Record<string, string | string[]>,
  ): Promise<CommercialItemsStrapiResponse> {
    const rates = await getCurrencies();
    const { query: filterQuery } = this.getCommercialStrapiQueryParamsByFilters(
      searchParams,
      (searchParams.currency as AvailableCurrencies) || 'USD',
      rates,
    );

    const paginationQuery = getPaginationQuery('map');
    const populateQuery = getDefaultMapPopulateQuery();
    const priceQuery = qs.stringify(
      {
        populate: {
          price_total: {
            populate: '*',
          },
          price_meter: {
            populate: '*',
          },
        },
      },
      { encodeValuesOnly: true },
    );

    const url = getUrlWithQueries(
      this.commercialApiUrl,
      filterQuery,
      paginationQuery,
      populateQuery,
      priceQuery,
    );

    const data = await this.fetchWrapper<CommercialItemsStrapiResponse>(url);

    return data;
  }

  public async getCommercialByIds(ids: string[]): Promise<CommercialItemsStrapiResponse> {
    const idsQuery = getIdsQuery(ids);

    const paginationQuery = getPaginationQuery('map');

    const populateQuery = getDefaultCommercialListPopulateQuery();

    const url = getUrlWithQueries(this.commercialApiUrl, idsQuery, paginationQuery, populateQuery);

    const data = await this.fetchWrapper<CommercialItemsStrapiResponse>(url);

    return data;
  }

  public async getCommercialByIdSeoFields(id: string): Promise<CommercialStrapiResponse> {
    const populateQuery = qs.stringify(
      {
        populate: {
          image: {
            fields: IMAGE_FIELDS_TO_POPULATE,
          },
        },
      },
      {
        encodeValuesOnly: true,
      },
    );

    const url = getUrlWithQueries(`${this.commercialApiUrl}/${id}`, populateQuery);

    const data = await this.fetchWrapper<CommercialStrapiResponse>(url);

    return data;
  }

  public async getActualCommercial(): Promise<CommercialItemsStrapiResponse> {
    const actualQuery = getActualItemQuery();
    const populateQuery = getDefaultCommercialListPopulateQuery();

    const url = getUrlWithQueries(this.commercialApiUrl, actualQuery, populateQuery);

    const data = await this.fetchWrapper<CommercialItemsStrapiResponse>(url);

    return data;
  }
}
