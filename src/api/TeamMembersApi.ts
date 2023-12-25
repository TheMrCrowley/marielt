import qs from 'qs';

import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import { IMAGE_FIELDS_TO_POPULATE, getUrlWithQueries } from '@/src/helpers/queryHelpers';
import { StrapiFindOneResponse, StrapiFindResponse, StrapiImage } from '@/src/types/StrapiTypes';

import BaseApi from './BaseApi';

const API_NAME = 'TeamMembersApi';

export default class TeamMembersApi extends BaseApi implements AbstractTeamMembersApi {
  private readonly teamMembersApiUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl, API_NAME);

    this.teamMembersApiUrl = `${process.env.API_BASE_URL}${StrapiApiPath.TeamMembers}`;
  }

  async getTeamPageMembers(): Promise<StrapiFindResponse<TeamStrapiResponse>> {
    const url = getUrlWithQueries(this.teamMembersApiUrl, this.getTeamPageMembersQuery());

    const data = await this.fetchWrapper<StrapiFindResponse<TeamStrapiResponse>>(url);

    return data;
  }

  private getTeamPageMembersQuery() {
    return qs.stringify(
      {
        populate: {
          photo: {
            fields: IMAGE_FIELDS_TO_POPULATE,
          },
        },
        sort: {
          order: 'asc',
        },
      },
      {
        encodeValuesOnly: true,
      },
    );
  }
}

export abstract class AbstractTeamMembersApi {
  abstract getTeamPageMembers(): Promise<StrapiFindResponse<TeamStrapiResponse>>;
}

export interface TeamStrapiResponse {
  name: string;
  position: string;
  description: string;
  management: boolean;
  photo: StrapiFindOneResponse<StrapiImage>;
}
