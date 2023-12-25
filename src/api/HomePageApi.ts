import qs from 'qs';

import { AppRoutes } from '@/src/enums/AppRoutes';
import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import { IMAGE_FIELDS_TO_POPULATE, getUrlWithQueries } from '@/src/helpers/queryHelpers';
import { StrapiFindOneResponse } from '@/src/types/StrapiTypes';

import BaseApi from './BaseApi';

const API_NAME = 'HomePageApi';

export default class HomePageApi extends BaseApi implements AbstractHomePageApi {
  private readonly homePageUrl: string;

  public constructor(baseApiURL: string) {
    super(baseApiURL, API_NAME);
    this.homePageUrl = `${process.env.API_BASE_URL}${StrapiApiPath.HomePage}`;
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

  public async getHomePageData() {
    const url = getUrlWithQueries(this.homePageUrl, this.getHomePageDataQuery());

    const response = await this.fetchWrapper<StrapiFindOneResponse<HomePageItemResponse>>(url);

    return response;
  }
}

export abstract class AbstractHomePageApi {
  abstract getHomePageData(): Promise<StrapiFindOneResponse<HomePageItemResponse>>;
}

export interface HomePageItemResponse {
  text_1: string;
  text_2: string;
  background: boolean;
  banner: StrapiFindOneResponse<{
    width: number;
    height: number;
    url: string;
    placeholder: string;
  }>;
  section: Array<{
    title: string;
    description: string;
    variant: 'primary' | 'secondary';
    to: AppRoutes;
    navigation_title: string;
    type: 'product' | 'opportunity';
    image: StrapiFindOneResponse<{
      width: number;
      height: number;
      url: string;
      placeholder: string;
    }>;
  }>;
}
