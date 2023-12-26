import qs from 'qs';

import BaseApi from '@/src/api/BaseApi';
import { SortValues } from '@/src/enums/SortOptions';
import { StrapiApiPath } from '@/src/enums/StrapiApiPath';
import { IMAGE_FIELDS_TO_POPULATE, getUrlWithQueries } from '@/src/helpers/queryHelpers';

import {
  AbstractTeachersApi,
  TeacherStrapiResponse,
  TeacherItemsStrapiResponse,
} from './AcademyPage.types';

const API_NAME = 'TeachersApi';
export default class TeachersApi extends BaseApi implements AbstractTeachersApi {
  private readonly teachersApiUrl: string;

  public constructor(baseUrl: string) {
    super(baseUrl, API_NAME);
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

    const data = await this.fetchWrapper<TeacherStrapiResponse>(url);

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

    const data = await this.fetchWrapper<TeacherItemsStrapiResponse>(url);

    return data;
  }
}
