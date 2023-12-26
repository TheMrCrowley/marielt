import qs from 'qs';

import BaseApi from '@/src/api/BaseApi';
import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import { getUrlWithQueries, IMAGE_FIELDS_TO_POPULATE } from '@/src/helpers/queryHelpers';

import { AbstractCareersApi, CareersPageStrapiResponse } from './CareersPageApi.types';

const API_NAME = 'CareersPageApi';

export default class CareersPageApi extends BaseApi implements AbstractCareersApi {
  private readonly careersPageApiUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl, API_NAME);

    this.careersPageApiUrl = `${process.env.API_BASE_URL}${StrapiApiPath.CareersPage}`;
  }

  public async getCareersPageData(): Promise<CareersPageStrapiResponse> {
    const url = getUrlWithQueries(this.careersPageApiUrl, this.getCareersPageDataQuery());

    const data = await this.fetchWrapper<CareersPageStrapiResponse>(url);

    return data;
  }

  private getCareersPageDataQuery() {
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
}
