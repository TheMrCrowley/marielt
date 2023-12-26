import qs from 'qs';

import BaseApi, { IMAGE_FIELDS_TO_POPULATE } from '@/src/api/BaseApi';
import { StrapiApiPath } from '@/src/enums/StrapiApiPath';

import { AbstractTeamMembersApi, TeamMemberStrapiResponse } from './TeamPage.types';

const API_NAME = 'TeamMembersApi';

export default class TeamMembersApi extends BaseApi implements AbstractTeamMembersApi {
  private readonly teamMembersApiUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl, API_NAME);

    this.teamMembersApiUrl = `${process.env.API_BASE_URL}${StrapiApiPath.TeamMembers}`;
  }

  async getTeamPageMembers(): Promise<TeamMemberStrapiResponse> {
    const populateQuery = qs.stringify(
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

    const url = this.getUrlWithQueries(this.teamMembersApiUrl, populateQuery);

    const data = await this.fetchWrapper<TeamMemberStrapiResponse>(url);

    return data;
  }
}
