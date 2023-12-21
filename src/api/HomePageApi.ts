import qs from 'qs';

import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import {
  IMAGE_FIELDS_TO_POPULATE,
  getDefaultHouseListPopulateQuery,
  getUrlWithQueries,
} from '@/src/helpers/queryHelpers';
import {
  getDefaultFlatListPopulateQuery,
  getDefaultCommercialListPopulateQuery,
} from '@/src/helpers/queryHelpers';
import { fetchWrapper } from '@/src/services/baseServices';
import { CommercialStrapiResponse } from '@/src/types/Commercial';
import { FlatStrapiResponse } from '@/src/types/Flats';
import { HomePageItemResponse } from '@/src/types/HomePage';
import { HousesAndLotsStrapiResponse } from '@/src/types/HousesAndLots';
import { ProductType } from '@/src/types/Product';
import { StrapiFindOneResponse, StrapiFindResponse } from '@/src/types/StrapiTypes';

import BaseApi from './BaseApi';

abstract class IHomePageApi {
  abstract getHomePageData(): Promise<StrapiFindOneResponse<HomePageItemResponse>>;
  abstract getActualProductsByProductType(
    type: ProductType,
  ):
    | Promise<StrapiFindResponse<FlatStrapiResponse>>
    | Promise<StrapiFindResponse<HousesAndLotsStrapiResponse>>
    | Promise<StrapiFindResponse<CommercialStrapiResponse>>;
}

export default class HomePageApi extends BaseApi implements IHomePageApi {
  private readonly homePageUrl: string;

  private readonly apartItemsUrl: string;

  private readonly houseItemsUrl: string;

  private readonly commItemsUrl: string;

  public constructor(baseApiURL: string) {
    super(baseApiURL);
    this.homePageUrl = `${process.env.API_BASE_URL}${StrapiApiPath.HomePage}`;
    this.apartItemsUrl = `${process.env.API_BASE_URL}${StrapiApiPath.ApartItems}`;
    this.houseItemsUrl = `${process.env.API_BASE_URL}${StrapiApiPath.HouseItems}`;
    this.commItemsUrl = `${process.env.API_BASE_URL}${StrapiApiPath.CommercialItems}`;
  }

  private getHomePageDataQuery() {
    return qs.stringify(
      {
        populate: {
          banner: {
            fields: IMAGE_FIELDS_TO_POPULATE,
          },
          section: {
            populate: {
              image: {
                fields: IMAGE_FIELDS_TO_POPULATE,
              },
            },
          },
        },
      },
      {
        encodeValuesOnly: true,
      },
    );
  }

  private async getActualFlats(): Promise<StrapiFindResponse<FlatStrapiResponse>> {
    const url = getUrlWithQueries(this.apartItemsUrl, getDefaultFlatListPopulateQuery());

    const data = await fetchWrapper<StrapiFindResponse<FlatStrapiResponse>>(url);

    return data;
  }

  private async getActualHouses(): Promise<StrapiFindResponse<HousesAndLotsStrapiResponse>> {
    const url = getUrlWithQueries(this.houseItemsUrl, getDefaultHouseListPopulateQuery());

    const data = await fetchWrapper<StrapiFindResponse<HousesAndLotsStrapiResponse>>(url);

    return data;
  }

  private async getActualCommercialItems(): Promise<StrapiFindResponse<CommercialStrapiResponse>> {
    const url = getUrlWithQueries(this.commItemsUrl, getDefaultCommercialListPopulateQuery());

    const data = await fetchWrapper<StrapiFindResponse<CommercialStrapiResponse>>(url);

    return data;
  }

  public getActualProductsByProductType(type: ProductType) {
    switch (type) {
      case 'flats':
        return this.getActualFlats();
      case 'commercial':
        return this.getActualCommercialItems();
      case 'houses-and-lots':
        return this.getActualHouses();
      default:
        return null as never;
    }
  }

  public async getHomePageData() {
    const url = getUrlWithQueries(this.homePageUrl, this.getHomePageDataQuery());

    const response = await fetchWrapper<StrapiFindOneResponse<HomePageItemResponse>>(url);

    return response;
  }
}
