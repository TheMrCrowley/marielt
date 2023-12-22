import qs from 'qs';

import { SortValues } from '@/src/enums/SortOptions';
import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import { IMAGE_FIELDS_TO_POPULATE, getUrlWithQueries } from '@/src/helpers/queryHelpers';
import { fetchWrapper } from '@/src/services/baseServices';
import { StrapiFindOneResponse, StrapiFindResponse, StrapiImage } from '@/src/types/StrapiTypes';

import BaseApi from './BaseApi';
import { TrainingStrapiResponse } from './TrainingsApi';

export default class TeachersApi extends BaseApi implements AbstractTeachersApi {
  private readonly teachersApiUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl);
    this.teachersApiUrl = `${baseUrl}${StrapiApiPath.Teachers}`;
  }

  private getTeachersByIdQuery() {
    return qs.stringify(
      {
        populate: {
          photo: {
            fields: IMAGE_FIELDS_TO_POPULATE,
          },
          trainings: {
            populate: {
              fields: ['name', 'description', 'content'],
            },
          },
        },
      },
      { encodeValuesOnly: true },
    );
  }

  public async getTeacherById(id: string) {
    const url = getUrlWithQueries(`${this.teachersApiUrl}/${id}`, this.getTeachersByIdQuery());

    const data = await fetchWrapper<StrapiFindOneResponse<TeacherStrapiResponse>>(url);

    return data;
  }

  private getAllTeachersQuery() {
    return qs.stringify(
      {
        pagination: {
          limit: -1,
        },
        sort: SortValues.DateAsc,
        populate: {
          photo: {
            fields: IMAGE_FIELDS_TO_POPULATE,
          },
          trainings: {
            populate: {
              fields: ['name', 'description', 'content'],
            },
          },
        },
      },
      {
        encodeValuesOnly: true,
      },
    );
  }

  public async getAllTeachers() {
    const url = getUrlWithQueries(this.teachersApiUrl, this.getAllTeachersQuery());

    const data = await fetchWrapper<StrapiFindResponse<TeacherStrapiResponse>>(url);

    return data;
  }
}

export interface TeacherStrapiResponse {
  name: string;
  position: string;
  description1?: string;
  description2?: string;
  photo: StrapiFindOneResponse<StrapiImage>;
  trainings: StrapiFindResponse<TrainingStrapiResponse>;
}

export abstract class AbstractTeachersApi {
  abstract getTeacherById(id: string): Promise<StrapiFindOneResponse<TeacherStrapiResponse>>;
  abstract getAllTeachers(): Promise<StrapiFindResponse<TeacherStrapiResponse>>;
}
