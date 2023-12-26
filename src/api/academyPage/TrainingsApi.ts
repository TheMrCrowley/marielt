import qs from 'qs';

import BaseApi, { IMAGE_FIELDS_TO_POPULATE } from '@/src/api/BaseApi';
import { StrapiApiPath } from '@/src/enums/StrapiApiPath';

import {
  AbstractTrainingsApi,
  TrainingStrapiResponse,
  TrainingItemsStrapiResponse,
} from './AcademyPage.types';

const API_NAME = 'TrainingsApi';

export default class TrainingsApi extends BaseApi implements AbstractTrainingsApi {
  private readonly trainingsApiUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl, API_NAME);

    this.trainingsApiUrl = `${baseUrl}${StrapiApiPath.Trainings}`;
  }

  public async getTrainingById(id: string) {
    const populateQuery = qs.stringify(
      {
        populate: {
          image: {
            fields: IMAGE_FIELDS_TO_POPULATE,
          },
        },
      },
      { encodeValuesOnly: true },
    );

    const url = this.getUrlWithQueries(this.getUrlWithId(this.trainingsApiUrl, id), populateQuery);

    const data = await this.fetchWrapper<TrainingStrapiResponse>(url);

    return data;
  }

  public async getAllTrainings(): Promise<TrainingItemsStrapiResponse> {
    const populateQuery = qs.stringify(
      {
        pagination: {
          limit: -1,
        },
      },
      {
        encodeValuesOnly: true,
      },
    );

    const url = this.getUrlWithQueries(this.trainingsApiUrl, populateQuery);

    const data = await this.fetchWrapper<TrainingItemsStrapiResponse>(url);

    return data;
  }
}
