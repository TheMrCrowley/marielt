import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import { StrapiFindOneResponse } from '@/src/types/StrapiTypes';

import BaseApi from './BaseApi';

const API_NAME = 'TeamPageApi';

export default class TeamPageApi extends BaseApi implements AbstractTeamPageApi {
  private readonly teamPageUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl, API_NAME);

    this.teamPageUrl = `${process.env.API_BASE_URL}${StrapiApiPath.TeamPage}`;
  }

  public async getTeamPageDescription(): Promise<string> {
    const { data } = await this.fetchWrapper<
      StrapiFindOneResponse<StrapiTeamPageDescriptionResponse>
    >(this.teamPageUrl);

    return data.attributes.text;
  }
}

export abstract class AbstractTeamPageApi {
  abstract getTeamPageDescription(): Promise<string>;
}

interface StrapiTeamPageDescriptionResponse {
  text: string;
}
