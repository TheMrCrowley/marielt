import qs from 'qs';

import BaseApi, { IMAGE_FIELDS_TO_POPULATE } from '@/src/api/BaseApi';
import { SortValues } from '@/src/enums/SortOptions';
import { StrapiApiPath } from '@/src/enums/StrapiApiPath';

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

  public async getTeacherById(id: string) {
    const populateQuery = qs.stringify(
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

    const url = this.getUrlWithQueries(this.getUrlWithId(this.teachersApiUrl, id), populateQuery);

    const data = await this.fetchWrapper<TeacherStrapiResponse>(url);

    return data;
  }

  public async getAllTeachers() {
    const allTeachersQuery = qs.stringify(
      {
        pagination: {
          limit: -1,
        },
        sort: 'createdAt:asc',
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
    const url = this.getUrlWithQueries(this.teachersApiUrl, allTeachersQuery);

    const data = await this.fetchWrapper<TeacherItemsStrapiResponse>(url);

    return data;
  }
}
