import qs from 'qs';

import BaseApi from '@/src/api/BaseApi';
import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import { IMAGE_FIELDS_TO_POPULATE, getUrlWithQueries } from '@/src/helpers/queryHelpers';

import { AbstractTeamMembersApi, TeamMemberStrapiResponse } from './TeamPage.types';

const API_NAME = 'TeamMembersApi';

export default class TeamMembersApi extends BaseApi implements AbstractTeamMembersApi {
  private readonly teamMembersApiUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl, API_NAME);

    this.teamMembersApiUrl = `${process.env.API_BASE_URL}${StrapiApiPath.TeamMembers}`;
  }

  async getTeamPageMembers(): Promise<TeamMemberStrapiResponse> {
    const url = getUrlWithQueries(this.teamMembersApiUrl, this.getTeamPageMembersQuery());

    const data = await this.fetchWrapper<TeamMemberStrapiResponse>(url);

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
