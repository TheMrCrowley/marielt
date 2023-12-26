import qs from 'qs';

import BaseApi, { IMAGE_FIELDS_TO_POPULATE } from '@/src/api/BaseApi';
import { StrapiApiPath } from '@/src/enums/StrapiApiPath';

import { AbstractAboutPageApi, AboutPageItemStrapiResponse } from './AboutPageApi.types';

const API_NAME = 'AboutPageApi';

export default class AboutPageApi extends BaseApi implements AbstractAboutPageApi {
  private readonly aboutPageApiUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl, API_NAME);

    this.aboutPageApiUrl = `${baseUrl}${StrapiApiPath.AboutPage}`;
  }

  public async getAboutPageData() {
    const populateQuery = qs.stringify(
      {
        populate: {
          section: {
            fields: ['title', 'description', 'variant', 'to'],

            populate: {
              image: {
                fields: IMAGE_FIELDS_TO_POPULATE,
              },
            },
          },
        },
      },
      { encodeValuesOnly: true },
    );

    const url = this.getUrlWithQueries(this.aboutPageApiUrl, populateQuery);

    const response = await this.fetchWrapper<AboutPageItemStrapiResponse>(url);

    return response;
  }
}
