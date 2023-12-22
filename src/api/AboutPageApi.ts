import qs from 'qs';

import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import { IMAGE_FIELDS_TO_POPULATE, getUrlWithQueries } from '@/src/helpers/queryHelpers';
import { fetchWrapper } from '@/src/services/baseServices';
import { StrapiFindOneResponse } from '@/src/types/StrapiTypes';

import BaseApi from './BaseApi';

export abstract class AbstractAboutPageApi {
  abstract getAboutPageData(): Promise<StrapiFindOneResponse<AboutPageItemResponse>>;
}

export default class AboutPageApi extends BaseApi implements AbstractAboutPageApi {
  private readonly aboutPageApiUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl);

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

    const response = await fetchWrapper<StrapiFindOneResponse<AboutPageItemResponse>>(url);

    return response;
  }
}

export interface AboutPageItemResponse {
  section: Array<{
    title: string;
    description: string;
    variant: 'primary';
    to: string;
    image: StrapiFindOneResponse<{
      width: number;
      height: number;
      url: string;
      placeholder: string;
    }>;
  }>;
}
