import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

import BaseApi from './BaseApi';

const API_NAME = 'CreditsApi';

export default class CreditsApi extends BaseApi implements AbstractCreditsApi {
  private readonly creditsApiUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl, API_NAME);

    this.creditsApiUrl = `${process.env.API_BASE_URL}${StrapiApiPath.Credits}`;
  }

  public async getInterestRate(): Promise<StrapiFindResponse<CreditStrapiResponse>> {
    const data = await this.fetchWrapper<StrapiFindResponse<CreditStrapiResponse>>(
      this.creditsApiUrl,
    );

    return data;
  }
}

export abstract class AbstractCreditsApi {
  abstract getInterestRate(): Promise<StrapiFindResponse<CreditStrapiResponse>>;
}

export interface CreditStrapiResponse {
  interest_rate: number;
}
