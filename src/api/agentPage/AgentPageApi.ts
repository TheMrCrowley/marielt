import qs from 'qs';

import BaseApi from '@/src/api/BaseApi';
import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import { IMAGE_FIELDS_TO_POPULATE_WITH_META, getUrlWithQueries } from '@/src/helpers/queryHelpers';

import { AbstractAgentPageApi, AgentPageStrapiResponse } from './AgentPageApi.types';

const API_NAME = 'AgentPageApi';

export default class AgentPageApi extends BaseApi implements AbstractAgentPageApi {
  private readonly agentPageApiUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl, API_NAME);

    this.agentPageApiUrl = `${process.env.API_BASE_URL}${StrapiApiPath.AgentPage}`;
  }

  public async getAgentPageData(): Promise<AgentPageStrapiResponse> {
    const url = getUrlWithQueries(this.agentPageApiUrl, this.getAgentPageDataQuery());

    const data = await this.fetchWrapper<AgentPageStrapiResponse>(url);

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
