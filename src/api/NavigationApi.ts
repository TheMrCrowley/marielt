import qs from 'qs';

import { AppRoutes } from '@/src/enums/AppRoutes';
import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import { getUrlWithQueries } from '@/src/helpers/queryHelpers';
import { StrapiFindOneResponse, StrapiImage } from '@/src/types/StrapiTypes';

import BaseApi from './BaseApi';

const API_NAME = 'NavigationApi';

export default class NavigationApi extends BaseApi implements AbstractNavigationApi {
  private readonly navigationApiUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl, API_NAME);

    this.navigationApiUrl = `${process.env.API_BASE_URL}${StrapiApiPath.HomePage}`;
  }

  public async getNavigationItems(): Promise<StrapiFindOneResponse<NavigationItemResponse>> {
    const url = getUrlWithQueries(this.navigationApiUrl, this.getNavigationItemsQuery());

    const data = await this.fetchWrapper<StrapiFindOneResponse<NavigationItemResponse>>(url);

    return data;
  }

  private getNavigationItemsQuery() {
    return qs.stringify(
      {
        populate: {
          section: {
            fields: ['navigation_title', 'to'],
          },
        },
      },
      { encodeValuesOnly: true },
    );
  }
}

export abstract class AbstractNavigationApi {
  abstract getNavigationItems(): Promise<StrapiFindOneResponse<NavigationItemResponse>>;
}

export interface NavigationItemResponse {
  section: Array<{
    title: string;
    description: string;
    variant: 'primary' | 'secondary';
    to: AppRoutes;
    navigation_title: string;
    type: 'product' | 'opportunity';
    image: StrapiFindOneResponse<StrapiImage>;
  }>;
}
