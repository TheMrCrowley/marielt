import BaseApi from '@/src/api/BaseApi';
import { StrapiApiPath } from '@/src/enums/StrapiApiPath';

import { AbstractTeamPageApi, TeamPageStrapiResponse } from './TeamPage.types';

const API_NAME = 'TeamPageApi';

export default class TeamPageApi extends BaseApi implements AbstractTeamPageApi {
  private readonly teamPageUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl, API_NAME);

    this.teamPageUrl = `${process.env.API_BASE_URL}${StrapiApiPath.TeamPage}`;
  }

  public async getTeamPageDescription(): Promise<TeamPageStrapiResponse> {
    const data = await this.fetchWrapper<TeamPageStrapiResponse>(this.teamPageUrl);

    return data;
  }
}
