import qs from 'qs';

import BaseApi, { IMAGE_FIELDS_TO_POPULATE } from '@/src/api/BaseApi';
import { StrapiApiPath } from '@/src/enums/StrapiApiPath';

import { AbstractCareersApi, CareersPageStrapiResponse } from './CareersPageApi.types';

const API_NAME = 'CareersPageApi';

export default class CareersPageApi extends BaseApi implements AbstractCareersApi {
  private readonly careersPageApiUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl, API_NAME);

    this.careersPageApiUrl = `${process.env.API_BASE_URL}${StrapiApiPath.CareersPage}`;
  }

  public async getCareersPageData(): Promise<CareersPageStrapiResponse> {
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

    const url = this.getUrlWithQueries(this.careersPageApiUrl, populateQuery);

    const data = await this.fetchWrapper<CareersPageStrapiResponse>(url);

    return data;
  }
}
