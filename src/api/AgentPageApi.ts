import qs from 'qs';

import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import { IMAGE_FIELDS_TO_POPULATE_WITH_META, getUrlWithQueries } from '@/src/helpers/queryHelpers';
import { StrapiFindOneResponse, StrapiFindResponse } from '@/src/types/StrapiTypes';
import { StrapiImage } from '@/src/types/StrapiTypes';

import BaseApi from './BaseApi';

const API_NAME = 'AgentPageApi';

export default class AgentPageApi extends BaseApi implements AbstractAgentPageApi {
  private readonly agentPageApiUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl, API_NAME);

    this.agentPageApiUrl = `${process.env.API_BASE_URL}${StrapiApiPath.AgentPage}`;
  }

  public async getAgentPageData(): Promise<StrapiFindOneResponse<AgentPageDataResponse>> {
    const url = getUrlWithQueries(this.agentPageApiUrl, this.getAgentPageDataQuery());

    const data = await this.fetchWrapper<StrapiFindOneResponse<AgentPageDataResponse>>(url);

    return data;
  }

  private getAgentPageDataQuery() {
    return qs.stringify(
      {
        populate: {
          carousel: {
            fields: IMAGE_FIELDS_TO_POPULATE_WITH_META,
          },
          course_media: {
            fields: IMAGE_FIELDS_TO_POPULATE_WITH_META,
          },
        },
      },
      { encodeValuesOnly: true },
    );
  }
}

export abstract class AbstractAgentPageApi {
  abstract getAgentPageData(): Promise<StrapiFindOneResponse<AgentPageDataResponse>>;
}

export interface AgentPageDataResponse {
  video_link?: string;
  course_link?: string;
  course_media: StrapiFindOneResponse<StrapiImage>;
  carousel: StrapiFindResponse<StrapiImage>;
}
