import qs from 'qs';

import BaseApi, { IMAGE_FIELDS_TO_POPULATE } from '@/src/api/BaseApi';
import { StrapiApiPath } from '@/src/enums/StrapiApiPath';

import { AbstractHomePageApi, HomePageStrapiResponse } from './HomePageApi.types';

const API_NAME = 'HomePageApi';

export default class HomePageApi extends BaseApi implements AbstractHomePageApi {
  private readonly homePageUrl: string;

  public constructor(baseApiURL: string) {
    super(baseApiURL, API_NAME);
    this.homePageUrl = `${process.env.API_BASE_URL}${StrapiApiPath.HomePage}`;
  }

  public async getHomePageData() {
    const populateQuery = qs.stringify(
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
    const url = this.getUrlWithQueries(this.homePageUrl, populateQuery);

    const response = await this.fetchWrapper<HomePageStrapiResponse>(url);

    return response;
  }
}
