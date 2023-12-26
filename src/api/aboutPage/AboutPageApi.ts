import qs from 'qs';

import BaseApi from '@/src/api/BaseApi';
import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import { IMAGE_FIELDS_TO_POPULATE, getUrlWithQueries } from '@/src/helpers/queryHelpers';

import { AbstractAboutPageApi, AboutPageItemStrapiResponse } from './AboutPageApi.types';

const API_NAME = 'AboutPageApi';

export default class AboutPageApi extends BaseApi implements AbstractAboutPageApi {
  private readonly aboutPageApiUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl, API_NAME);

    this.aboutPageApiUrl = `${baseUrl}${StrapiApiPath.AboutPage}`;
  }

  private getAboutPageUrlQuery(): string {
    return qs.stringify(
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
  }

  public async getAboutPageData() {
    const url = getUrlWithQueries(this.aboutPageApiUrl, this.getAboutPageUrlQuery());

    const response = await this.fetchWrapper<AboutPageItemStrapiResponse>(url);

    return response;
  }
}
