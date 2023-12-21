import qs from 'qs';

import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import {
  getUrlWithQueries,
  getDefaultFlatListPopulateQuery,
  getDefaultHouseListPopulateQuery,
  getDefaultCommercialListPopulateQuery,
} from '@/src/helpers/queryHelpers';
import { fetchWrapper } from '@/src/services/baseServices';
import { CommercialStrapiResponse } from '@/src/types/Commercial';
import { FlatStrapiResponse } from '@/src/types/Flats';
import { HousesAndLotsStrapiResponse } from '@/src/types/HousesAndLots';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

import BaseApi from './BaseApi';

export abstract class AbstractActualProductsApi {
  abstract getActualFlats(): Promise<StrapiFindResponse<FlatStrapiResponse>>;
  abstract getActualHouses(): Promise<StrapiFindResponse<HousesAndLotsStrapiResponse>>;
  abstract getActualCommercial(): Promise<StrapiFindResponse<CommercialStrapiResponse>>;
}

export default class ActualProductsApi extends BaseApi implements AbstractActualProductsApi {
  private readonly apartItemsUrl: string;

  private readonly houseItemsUrl: string;

  private readonly commItemsUrl: string;

  public constructor(baseApiURL: string) {
    super(baseApiURL);
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

  public async getActualFlats(): Promise<StrapiFindResponse<FlatStrapiResponse>> {
    const url = getUrlWithQueries(
      this.apartItemsUrl,
      getDefaultFlatListPopulateQuery(),
      this.getActualQuery(),
    );

    const data = await fetchWrapper<StrapiFindResponse<FlatStrapiResponse>>(url);

    return data;
  }

  public async getActualHouses(): Promise<StrapiFindResponse<HousesAndLotsStrapiResponse>> {
    const url = getUrlWithQueries(
      this.houseItemsUrl,
      getDefaultHouseListPopulateQuery(),
      this.getActualQuery(),
    );

    const data = await fetchWrapper<StrapiFindResponse<HousesAndLotsStrapiResponse>>(url);

    return data;
  }

  public async getActualCommercial(): Promise<StrapiFindResponse<CommercialStrapiResponse>> {
    const url = getUrlWithQueries(
      this.commItemsUrl,
      getDefaultCommercialListPopulateQuery(),
      this.getActualQuery(),
    );

    const data = await fetchWrapper<StrapiFindResponse<CommercialStrapiResponse>>(url);

    return data;
  }
}
