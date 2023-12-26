import qs from 'qs';

import { SortValues } from '@/src/enums/SortOptions';
import { ViewType } from '@/src/types/ViewType';

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
