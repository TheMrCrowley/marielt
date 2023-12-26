import qs from 'qs';

import { SortValues } from '@/src/enums/SortOptions';
import { ViewType } from '@/src/types/ViewType';

export const IMAGE_FIELDS_TO_POPULATE = ['width', 'height', 'url', 'placeholder'];

export const IMAGE_FIELDS_TO_POPULATE_WITH_META = [
  ...IMAGE_FIELDS_TO_POPULATE,
  'provider_metadata',
];

export const IMAGE_FIELDS_WITH_FORMATS = [...IMAGE_FIELDS_TO_POPULATE, 'formats'];

export const getSortQuery = (sort: string) => {
  return qs.stringify(
    {
      sort: sort || SortValues.DateAsc,
    },
    {
      encodeValuesOnly: true,
    },
  );
};

export const getQueryArray = (
  map: Record<string, string | string[]>,
  query: string[] | string,
): string[] =>
  (Array.isArray(query) ? query.map((key) => map[key]) : [map[query]]).flat(Infinity) as string[];

export const getPaginationQuery = (type: ViewType, page?: string) => {
  if (type === 'list') {
    return qs.stringify({
      pagination: {
        pageSize: 24,
        page: page || 1,
      },
    });
  }

  return qs.stringify({
    pagination: {
      limit: -1,
    },
  });
};

export const getDefaultMapPopulateQuery = () => {
  return qs.stringify(
    {
      populate: {
        coordinates: '*',
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
};

export const getIdsQuery = (ids: string[]) => {
  return qs.stringify(
    {
      filters: {
        id: {
          $in: ids,
        },
      },
    },
    { encodeValuesOnly: true },
  );
};

export const concatQueries = (queries: string[]) => `?${queries.join('&')}`;

export const getUrlWithQueries = (url: string, ...query: string[]): string => {
  return `${url}${concatQueries(query)}`;
};

export const getActualItemQuery = () =>
  qs.stringify(
    {
      filters: {
        home_page: true,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
