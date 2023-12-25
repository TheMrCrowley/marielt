import qs from 'qs';

import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import { getUrlWithQueries, IMAGE_FIELDS_TO_POPULATE } from '@/src/helpers/queryHelpers';
import { fetchWrapper } from '@/src/services/baseServices';
import { StrapiFindOneResponse, StrapiFindResponse, StrapiImage } from '@/src/types/StrapiTypes';

import BaseApi from './BaseApi';

export default class TeamPageApi extends BaseApi implements AbstractTeamPageApi {
  private readonly teamPageUrl: string;

  private readonly teamMembersUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl);

    this.teamMembersUrl = `${process.env.API_BASE_URL}${StrapiApiPath.TeamMembers}`;
    this.teamPageUrl = `${process.env.API_BASE_URL}${StrapiApiPath.TeamPage}`;
  }

  public async getTeamPageDescription(): Promise<string> {
    const { data } = await fetchWrapper<StrapiFindOneResponse<StrapiTeamPageDescriptionResponse>>(
      this.teamPageUrl,
    );

    return data.attributes.text;
  }

  async getTeamPageMembers(): Promise<StrapiFindResponse<TeamStrapiResponse>> {
    const url = getUrlWithQueries(this.teamMembersUrl, this.getTeamPageMembersQuery());

    const data = await fetchWrapper<StrapiFindResponse<TeamStrapiResponse>>(url);

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

export abstract class AbstractTeamPageApi {
  abstract getTeamPageMembers(): Promise<StrapiFindResponse<TeamStrapiResponse>>;
  abstract getTeamPageDescription(): Promise<string>;
}

interface StrapiTeamPageDescriptionResponse {
  text: string;
}

export interface TeamStrapiResponse {
  name: string;
  position: string;
  description: string;
  management: boolean;
  photo: StrapiFindOneResponse<StrapiImage>;
}
