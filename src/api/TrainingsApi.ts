import qs from 'qs';

import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import { IMAGE_FIELDS_TO_POPULATE, getUrlWithQueries } from '@/src/helpers/queryHelpers';
import { fetchWrapper } from '@/src/services/baseServices';
import { StrapiFindOneResponse, StrapiImage } from '@/src/types/StrapiTypes';

import BaseApi from './BaseApi';

export default class TrainingsApi extends BaseApi implements AbstractTrainingsApi {
  private readonly trainingsApiUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl);

    this.trainingsApiUrl = `${baseUrl}${StrapiApiPath}`;
  }

  private getTrainingByIdQuery() {
    return qs.stringify(
      {
        populate: {
          image: {
            fields: IMAGE_FIELDS_TO_POPULATE,
          },
        },
      },
      { encodeValuesOnly: true },
    );
  }

  public async getTrainingById(id: string) {
    const url = getUrlWithQueries(`${this.trainingsApiUrl}/${id}`, this.getTrainingByIdQuery());

    const data = await fetchWrapper<StrapiFindOneResponse<TrainingStrapiResponse>>(url);

    return data;
  }
}

export interface TrainingStrapiResponse {
  title: string;
  description?: string;
  content?: string;
  image?: StrapiFindOneResponse<StrapiImage>;
}

export abstract class AbstractTrainingsApi {
  abstract getTrainingById(id: string): Promise<StrapiFindOneResponse<TrainingStrapiResponse>>;
}
