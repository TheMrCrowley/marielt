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

export const getDefaultFlatListPopulateQuery = () => {
  return qs.stringify(
    {
      populate: {
        image: {
          fields: ['width', 'height', 'url', 'placeholder'],
        },
        house_number: {
          fields: ['number'],
        },
        parameters: {
          fields: ['floor', 'living_area', 'floors_number', 'total_area'],
        },
        location: '*',
      },
    },
    { encodeValuesOnly: true },
  );
};

export const getDefaultCommercialListPopulateQuery = () => {
  return qs.stringify(
    {
      populate: {
        price_total: {
          populate: '*',
        },
        price_meter: {
          populate: '*',
        },
        image: {
          fields: ['width', 'height', 'url', 'placeholder'],
        },
        house_number: {
          fields: ['number'],
        },
        parameters: {
          fields: ['plot_size', 'floor', 'floors_number', 'living_area'],
          populate: {
            premises_area: {
              populate: '*',
            },
          },
        },
        location: '*',
      },
    },
    { encodeValuesOnly: true },
  );
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

export const concatQueries = (queries: string[]) => `?${queries.join('&')}`;
