import qs from 'qs';

import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import { getDefaultFlatListPopulateQuery } from '@/src/helpers/flats/flatsHelpers';
import { getDefaultHouseListPopulateQuery } from '@/src/helpers/house/housesHelpers';
import {
  getUrlWithQueries,
  getDefaultCommercialListPopulateQuery,
} from '@/src/helpers/queryHelpers';
import { CommercialStrapiResponse } from '@/src/types/Commercial';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

import BaseApi from './BaseApi';
import { FlatItemsStrapiResponse } from './flats';
import { HouseItemsStrapiResponse } from './house';

const API_NAME = 'ActualProductsApi';

export default class ActualProductsApi extends BaseApi implements AbstractActualProductsApi {
  private readonly apartItemsUrl: string;

  private readonly houseItemsUrl: string;

  private readonly commItemsUrl: string;

  public constructor(baseApiURL: string) {
    super(baseApiURL, API_NAME);
    this.apartItemsUrl = `${process.env.API_BASE_URL}${StrapiApiPath.ApartItems}`;
    this.houseItemsUrl = `${process.env.API_BASE_URL}${StrapiApiPath.HouseItems}`;
    this.commItemsUrl = `${process.env.API_BASE_URL}${StrapiApiPath.CommercialItems}`;
  }

  private getActualQuery() {
    return qs.stringify({
      filters: {
        home_page: true,
      },
    });
  }

  public async getActualFlats(): Promise<FlatItemsStrapiResponse> {
    const url = getUrlWithQueries(
      this.apartItemsUrl,
      getDefaultFlatListPopulateQuery(),
      this.getActualQuery(),
    );

    const data = await this.fetchWrapper<FlatItemsStrapiResponse>(url);

    return data;
  }

  public async getActualHouses(): Promise<HouseItemsStrapiResponse> {
    const url = getUrlWithQueries(
      this.houseItemsUrl,
      getDefaultHouseListPopulateQuery(),
      this.getActualQuery(),
    );

    const data = await this.fetchWrapper<HouseItemsStrapiResponse>(url);

    return data;
  }

  public async getActualCommercial(): Promise<StrapiFindResponse<CommercialStrapiResponse>> {
    const url = getUrlWithQueries(
      this.commItemsUrl,
      getDefaultCommercialListPopulateQuery(),
      this.getActualQuery(),
    );

    const data = await this.fetchWrapper<StrapiFindResponse<CommercialStrapiResponse>>(url);

    return data;
  }
}

export abstract class AbstractActualProductsApi {
  abstract getActualFlats(): Promise<FlatItemsStrapiResponse>;
  abstract getActualHouses(): Promise<HouseItemsStrapiResponse>;
  abstract getActualCommercial(): Promise<StrapiFindResponse<CommercialStrapiResponse>>;
}
