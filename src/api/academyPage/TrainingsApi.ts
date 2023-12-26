import qs from 'qs';

import BaseApi from '@/src/api/BaseApi';
import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import { IMAGE_FIELDS_TO_POPULATE, getUrlWithQueries } from '@/src/helpers/queryHelpers';

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

    const url = getUrlWithQueries(this.trainingsApiUrl, populateQuery);

    const data = await this.fetchWrapper<TrainingItemsStrapiResponse>(url);

    return data;
  }
}
