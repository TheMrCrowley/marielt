import qs from 'qs';

import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import { getUrlWithQueries, IMAGE_FIELDS_TO_POPULATE } from '@/src/helpers/queryHelpers';
import { StrapiFindOneResponse, StrapiImage } from '@/src/types/StrapiTypes';

import BaseApi from './BaseApi';

const API_NAME = 'CareersPageApi';

export default class CareersPageApi extends BaseApi implements AbstractCareersApi {
  private readonly careersPageApiUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl, API_NAME);

    this.careersPageApiUrl = `${process.env.API_BASE_URL}${StrapiApiPath.CareersPage}`;
  }

  public async getCareersPageData(): Promise<StrapiFindOneResponse<CareersPageItemResponse>> {
    const url = getUrlWithQueries(this.careersPageApiUrl, this.getCareersPageDataQuery());

    const data = await this.fetchWrapper<StrapiFindOneResponse<CareersPageItemResponse>>(url);

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

export abstract class AbstractCareersApi {
  abstract getCareersPageData(): Promise<StrapiFindOneResponse<CareersPageItemResponse>>;
}

export interface CareersPageItemResponse {
  section: Array<{
    title: string;
    description: string;
    variant: 'primary';
    to: string;
    image: StrapiFindOneResponse<StrapiImage>;
  }>;
}
