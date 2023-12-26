import qs from 'qs';

import BaseApi, { IMAGE_FIELDS_TO_POPULATE_WITH_META } from '@/src/api/BaseApi';
import { StrapiApiPath } from '@/src/enums/StrapiApiPath';

import { AbstractAgentPageApi, AgentPageStrapiResponse } from './AgentPageApi.types';

const API_NAME = 'AgentPageApi';

export default class AgentPageApi extends BaseApi implements AbstractAgentPageApi {
  private readonly agentPageApiUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl, API_NAME);

    this.agentPageApiUrl = `${process.env.API_BASE_URL}${StrapiApiPath.AgentPage}`;
  }

  public async getAgentPageData(): Promise<AgentPageStrapiResponse> {
    const populateQuery = qs.stringify(
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

    const url = this.getUrlWithQueries(this.agentPageApiUrl, populateQuery);

    const data = await this.fetchWrapper<AgentPageStrapiResponse>(url);

    return data;
  }
}
