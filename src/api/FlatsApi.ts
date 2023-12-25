import qs from 'qs';

import {
  balconyQueryMap,
  bathroomQueryMap,
  finishingQueryMap,
  houseTypeQueryMap,
  roominessQueryMap,
  saleTermQueryMap,
} from '@/src/enums/FlatsFilters';
import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import { getPriceByCurrency } from '@/src/helpers/currencyHelpers';
import { getDefaultFlatListPopulateQuery } from '@/src/helpers/flatsHelpers';
import {
  getPaginationQuery,
  getQueryArray,
  getSortQuery,
  getUrlWithQueries,
} from '@/src/helpers/queryHelpers';
import { IMAGE_FIELDS_WITH_FORMATS } from '@/src/helpers/queryHelpers';
import { getDefaultMapPopulateQuery } from '@/src/helpers/queryHelpers';
import { getCurrencies } from '@/src/services/currencyServices';
import { CurrencyState } from '@/src/store/currency';
import { FlatsFiltersType } from '@/src/store/flatsFilters';
import { AvailableCurrencies } from '@/src/types/Currency';
import { DetailedFlatItem } from '@/src/types/Flats';
import { StrapiFindOneResponse, StrapiFindResponse, StrapiImage } from '@/src/types/StrapiTypes';

import BaseApi from './BaseApi';

const API_NAME = 'FlatsApi';

export default class FlatsApi extends BaseApi implements AbstractFlatsApi {
  private readonly flatsApiUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl, API_NAME);

    this.flatsApiUrl = `${process.env.API_BASE_URL}${StrapiApiPath.ApartItems}`;
  }

  private getFlatsStrapiQueryParamsByFilters(
    filters: Record<string, string | string[] | boolean>,
    selectedCurrency: AvailableCurrencies,
    rates: CurrencyState['rates'],
  ): {
    query: string;
  } {
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
      district_rb,
      locality,
      region,
      isNotLastFloor,
      street,
    } = filters as FlatsFiltersType['filters'];

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
          metro: {
            name: {
              $in: metro,
            },
          },
          sale_terms: {
            $in: getQueryArray(saleTermQueryMap, saleTerm),
          },
          additional_info: (furniture || parking) && {
            $or: [
              {
                name: furniture ? { $containsi: 'мебель' } : '',
              },
              {
                name: parking ? { $in: ['гараж', 'стоянка автомобиля'] } : '',
              },
            ],
          },
          parameters: {
            is_last_floor: {
              $eq: isLastFloor ? isLastFloor : isNotLastFloor ? !isNotLastFloor : undefined,
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
  }

  private async getSimilarByPrice(params: {
    price?: string;
    roominess?: string;
    id: string;
  }): Promise<StrapiFindResponse<FlatStrapiResponse>> {
    const { price, id, roominess } = params;

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
          parameters: {
            roominess: {
              $eq: roominess || '',
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

    const populateQuery = getDefaultFlatListPopulateQuery();

    const url = getUrlWithQueries(this.flatsApiUrl, filterQuery, populateQuery);

    const data = await this.fetchWrapper<StrapiFindResponse<FlatStrapiResponse>>(url);

    return data;
  }

  private async getSimilarByLocation(params: {
    latitude?: number;
    longitude?: number;
    roominess?: string;
    id: string;
  }): Promise<StrapiFindResponse<FlatStrapiResponse>> {
    const { id, latitude, longitude, roominess } = params;

    const filterQuery = qs.stringify(
      {
        filters: {
          coordinates: {
            latitude: { $between: [(latitude || 0) - 0.008, (latitude || 0) + 0.008] },
            longitude: { $between: [(longitude || 0) - 0.008, (longitude || 0) + 0.008] },
          },
          parameters: {
            roominess: {
              $eq: roominess || '',
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

    const populateQuery = getDefaultFlatListPopulateQuery();

    const url = getUrlWithQueries(this.flatsApiUrl, filterQuery, populateQuery);

    const data = await this.fetchWrapper<StrapiFindResponse<FlatStrapiResponse>>(url);

    return data;
  }

  private async getSimilarByLayout(params: {
    layout?: string;
    roominess?: string;
    id: string;
  }): Promise<StrapiFindResponse<FlatStrapiResponse>> {
    const { id, layout, roominess } = params;

    const filterQuery = qs.stringify(
      {
        filters: {
          parameters: {
            layout: {
              ...(layout
                ? {
                    $eq: layout,
                  }
                : { $null: true }),
            },
            roominess: {
              $eq: roominess || '',
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

    const populateQuery = getDefaultFlatListPopulateQuery();

    const url = getUrlWithQueries(this.flatsApiUrl, filterQuery, populateQuery);

    const data = await this.fetchWrapper<StrapiFindResponse<FlatStrapiResponse>>(url);

    return data;
  }

  private getFlatByIdQuery() {
    return qs.stringify(
      {
        populate: {
          additional_info: {
            populate: '*',
          },
          image: {
            fields: IMAGE_FIELDS_WITH_FORMATS,
          },
          agents: {
            populate: '*',
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
          coordinates: {
            populate: '*',
          },
        },
      },
      {
        encodeValuesOnly: true,
      },
    );
  }

  public async getFlatById(id: string): Promise<StrapiFindOneResponse<FlatStrapiResponse>> {
    const url = getUrlWithQueries(`${this.flatsApiUrl}/${id}`, this.getFlatByIdQuery());

    const data = await this.fetchWrapper<StrapiFindOneResponse<FlatStrapiResponse>>(url);

    return data;
  }

  public async getSimilarFlats(flat: DetailedFlatItem) {
    const {
      price,
      id,
      parameters: { roominess, layout },
      location,
    } = flat;

    const [byPrice, byLocation, byLayout] = await Promise.all([
      this.getSimilarByPrice({
        roominess,
        price,
        id,
      }),
      this.getSimilarByLocation({
        latitude: location?.lat,
        longitude: location?.lng,
        id,
        roominess,
      }),
      this.getSimilarByLayout({
        layout,
        roominess,
        id,
      }),
    ]);

    return {
      byLayout,
      byLocation,
      byPrice,
    };
  }

  public async getFlatsForList(
    searchParams: Record<string, string | string[]>,
  ): Promise<StrapiFindResponse<FlatStrapiResponse>> {
    const rates = await getCurrencies();

    const { query: filterQuery } = this.getFlatsStrapiQueryParamsByFilters(
      searchParams,
      (searchParams.currency as AvailableCurrencies) || 'USD',
      rates,
    );

    const paginationQuery = getPaginationQuery('list', searchParams.page as string);

    const populateQuery = getDefaultFlatListPopulateQuery();

    const sortQuery = getSortQuery(searchParams.sort as string);

    const url = getUrlWithQueries(
      this.flatsApiUrl,
      filterQuery,
      paginationQuery,
      populateQuery,
      sortQuery,
    );

    const data = await this.fetchWrapper<StrapiFindResponse<FlatStrapiResponse>>(url);

    return data;
  }

  public async getFlatsForMap(
    searchParams: Record<string, string | string[]>,
  ): Promise<StrapiFindResponse<FlatStrapiResponse>> {
    const rates = await getCurrencies();

    const { query: filterQuery } = this.getFlatsStrapiQueryParamsByFilters(
      searchParams,
      (searchParams.currency as AvailableCurrencies) || 'USD',
      rates,
    );

    const paginationQuery = getPaginationQuery('map');

    const populateQuery = getDefaultMapPopulateQuery();

    const url = getUrlWithQueries(this.flatsApiUrl, filterQuery, paginationQuery, populateQuery);

    const data = await this.fetchWrapper<StrapiFindResponse<FlatStrapiResponse>>(url);

    return data;
  }

  public async getFlatsByIds(ids: string[]): Promise<StrapiFindResponse<FlatStrapiResponse>> {
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
    const populateQuery = getDefaultFlatListPopulateQuery();

    const url = getUrlWithQueries(this.flatsApiUrl, idsQuery, paginationQuery, populateQuery);

    const data = await this.fetchWrapper<StrapiFindResponse<FlatStrapiResponse>>(url);

    return data;
  }
}

export abstract class AbstractFlatsApi {
  abstract getFlatById(id: string): Promise<StrapiFindOneResponse<FlatStrapiResponse>>;
  abstract getSimilarFlats(flat: DetailedFlatItem): Promise<{
    byPrice: StrapiFindResponse<FlatStrapiResponse>;
    byLocation: StrapiFindResponse<FlatStrapiResponse>;
    byLayout: StrapiFindResponse<FlatStrapiResponse>;
  }>;
  abstract getFlatsForList(
    searchParams: Record<string, string | string[]>,
  ): Promise<StrapiFindResponse<FlatStrapiResponse>>;
  abstract getFlatsForMap(
    searchParams: Record<string, string | string[]>,
  ): Promise<StrapiFindResponse<FlatStrapiResponse>>;
  abstract getFlatsByIds(ids: string[]): Promise<StrapiFindResponse<FlatStrapiResponse>>;
}

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
    separate_rooms?: string;
    share_in_apartment?: string;
    floor_type?: string;
    balcony_area?: string;
    snb_area?: string;
    flooring?: string;
    telephone?: string;
    layout?: string;
    level_number?: string;
  };
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  additional_info?: Array<{ name: string }>;
  note: string;
  village_council?: string;
  district?: {
    data: {
      attributes: {
        name: string;
      };
    };
  };
  microdistrict?: {
    data: {
      attributes: {
        name: string;
      };
    };
  };
  locality: string;
  street?: string;
  district_rb?: string;
  region?: {
    data: {
      attributes: {
        name: string;
      };
    };
  };
  house_number?: {
    number: string;
    building: string;
  };
  currency?: AvailableCurrencies;
  price?: string;
  name?: string;
  image: StrapiFindResponse<StrapiImage>;
  detailed_description?: string;
  location?: {
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  agents?: StrapiFindResponse<{
    full_name: string;
    phone1: string;
    phone2?: string;
    branch?: string;
    position?: string;
  }>;
  video_link?: string;
}
