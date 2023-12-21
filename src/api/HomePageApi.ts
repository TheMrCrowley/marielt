import qs from 'qs';

import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import { IMAGE_FIELDS_TO_POPULATE, getUrlWithQueries } from '@/src/helpers/queryHelpers';
import { fetchWrapper } from '@/src/services/baseServices';
import { HomePageItemResponse } from '@/src/types/HomePage';
import { StrapiFindOneResponse } from '@/src/types/StrapiTypes';

import BaseApi from './BaseApi';

export abstract class AbstractHomePageApi {
  abstract getHomePageData(): Promise<StrapiFindOneResponse<HomePageItemResponse>>;
}

export default class HomePageApi extends BaseApi implements AbstractHomePageApi {
  private readonly homePageUrl: string;

  public constructor(baseApiURL: string) {
    super(baseApiURL);
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

    const response = await fetchWrapper<StrapiFindOneResponse<HomePageItemResponse>>(url);

    return response;
  }
}
