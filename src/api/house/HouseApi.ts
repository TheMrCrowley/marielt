import qs from 'qs';

import BaseApi, { IMAGE_FIELDS_TO_POPULATE, IMAGE_FIELDS_WITH_FORMATS } from '@/src/api/BaseApi';
import { saleTermQueryMap } from '@/src/enums/FlatsFilters';
import {
  electricityQueryMap,
  gasSupplyQueryMap,
  heatingQueryMap,
  houseLevelQueryMap,
  lotsWaterQueryMap,
  sewerageQueryMap,
  wallMaterialQueryMap,
  waterQueryMap,
} from '@/src/enums/HousesAndLotsFilters';
import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import { getPriceByCurrency } from '@/src/helpers/currencyHelpers';
import { getDefaultHouseListPopulateQuery } from '@/src/helpers/house/housesHelpers';
import {
  getActualItemQuery,
  getDefaultMapPopulateQuery,
  getIdsQuery,
  getPaginationQuery,
  getQueryArray,
  getSortQuery,
} from '@/src/helpers/queryHelpers';
import { getCurrencies } from '@/src/services/currencyServices';
import { CurrencyState } from '@/src/store/currency';
import { HousesAndLotsFiltersType } from '@/src/store/housesAndLotsFilters';
import { AvailableCurrencies } from '@/src/types/Currency';
import { DetailedHousesAndLotsItem } from '@/src/types/HousesAndLots';

import { AbstractHouseApi, HouseStrapiResponse, HouseItemsStrapiResponse } from './HouseApi.types';

const API_NAME = 'HouseApi';

export default class HouseApi extends BaseApi implements AbstractHouseApi {
  private readonly houseApiUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl, API_NAME);

    this.houseApiUrl = `${process.env.API_BASE_URL}${StrapiApiPath.HouseItems}`;
  }

  private getHousesAndLotsStrapiQuery = (
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
          $or: [
            {
              locality: {
                $in: locality,
              },
            },
            {
              street: {
                $in: street,
              },
            },
            {
              district_rb: {
                $in: district_rb,
              },
            },
            {
              region: {
                name: {
                  $in: region,
                },
              },
            },
          ],
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

  private async getSimilarByPrice(params: {
    id: string;
    price?: string;
    rootType?: string;
    type?: string;
  }): Promise<HouseItemsStrapiResponse> {
    const { id, price, rootType, type } = params;

    const filterQuery = qs.stringify(
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

    const populateQuery = getDefaultHouseListPopulateQuery();

    const url = this.getUrlWithQueries(this.houseApiUrl, filterQuery, populateQuery);

    const data = await this.fetchWrapper<HouseItemsStrapiResponse>(url);

    return data;
  }

  private async getSimilarByLocation(params: {
    id: string;
    latitude?: number;
    longitude?: number;
    rootType?: string;
    type?: string;
  }): Promise<HouseItemsStrapiResponse> {
    const { id, latitude, longitude, rootType, type } = params;

    const filterQuery = qs.stringify(
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

    const populateQuery = getDefaultHouseListPopulateQuery();

    const url = this.getUrlWithQueries(this.houseApiUrl, filterQuery, populateQuery);

    const data = await this.fetchWrapper<HouseItemsStrapiResponse>(url);

    return data;
  }

  public async getHouseById(id: string): Promise<HouseStrapiResponse> {
    const populateQuery = qs.stringify(
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
            fields: IMAGE_FIELDS_WITH_FORMATS,
          },
        },
      },
      {
        encodeValuesOnly: true,
      },
    );

    const url = this.getUrlWithQueries(this.getUrlWithId(this.houseApiUrl, id), populateQuery);

    const data = await this.fetchWrapper<HouseStrapiResponse>(url);

    return data;
  }

  public async getSimilarHouses(house: DetailedHousesAndLotsItem): Promise<{
    byPrice: HouseItemsStrapiResponse;
    byLocation: HouseItemsStrapiResponse;
  }> {
    const { price, id, location, rootType, type } = house;

    const [byPrice, byLocation] = await Promise.all([
      this.getSimilarByPrice({ id, price, rootType, type }),
      this.getSimilarByLocation({
        id,
        latitude: location?.lat,
        longitude: location?.lng,
        rootType,
        type,
      }),
    ]);

    return {
      byPrice,
      byLocation,
    };
  }

  public async getHousesForList(
    searchParams: Record<string, string | string[]>,
  ): Promise<HouseItemsStrapiResponse> {
    const rates = await getCurrencies();

    const { query } = this.getHousesAndLotsStrapiQuery(
      searchParams,
      (searchParams.currency as AvailableCurrencies) || 'USD',
      rates,
    );

    const paginationQuery = getPaginationQuery('list', searchParams.page as string);

    const populateQuery = getDefaultHouseListPopulateQuery();

    const sortQuery = getSortQuery(searchParams.sort as string);

    const url = this.getUrlWithQueries(
      this.houseApiUrl,
      query,
      paginationQuery,
      populateQuery,
      sortQuery,
    );

    const data = await this.fetchWrapper<HouseItemsStrapiResponse>(url);

    return data;
  }

  public async getHousesForMap(
    searchParams: Record<string, string | string[]>,
  ): Promise<HouseItemsStrapiResponse> {
    const rates = await getCurrencies();

    const { query } = this.getHousesAndLotsStrapiQuery(
      searchParams,
      (searchParams.currency as AvailableCurrencies) || 'USD',
      rates,
    );

    const paginationQuery = getPaginationQuery('map');

    const populateQuery = getDefaultMapPopulateQuery();

    const sortQuery = getSortQuery(searchParams.sort as string);

    const url = this.getUrlWithQueries(
      this.houseApiUrl,
      query,
      paginationQuery,
      populateQuery,
      sortQuery,
    );

    const data = await this.fetchWrapper<HouseItemsStrapiResponse>(url);

    return data;
  }

  public async getHousesByIds(ids: string[]): Promise<HouseItemsStrapiResponse> {
    const idsQuery = getIdsQuery(ids);
    const paginationQuery = getPaginationQuery('map');
    const populateQuery = getDefaultHouseListPopulateQuery();

    const url = this.getUrlWithQueries(this.houseApiUrl, idsQuery, paginationQuery, populateQuery);

    const data = await this.fetchWrapper<HouseItemsStrapiResponse>(url);

    return data;
  }

  public async getHouseByIdSeoFields(id: string): Promise<HouseStrapiResponse> {
    const populateQuery = qs.stringify(
      {
        populate: {
          image: {
            fields: IMAGE_FIELDS_TO_POPULATE,
          },
        },
      },
      { encodeValuesOnly: true },
    );

    const url = this.getUrlWithQueries(this.getUrlWithId(this.houseApiUrl, id), populateQuery);

    const data = await this.fetchWrapper<HouseStrapiResponse>(url);

    return data;
  }

  public async getActualHouses(): Promise<HouseItemsStrapiResponse> {
    const url = this.getUrlWithQueries(
      this.houseApiUrl,
      getDefaultHouseListPopulateQuery(),
      getActualItemQuery(),
    );

    const data = await this.fetchWrapper<HouseItemsStrapiResponse>(url);

    return data;
  }
}
