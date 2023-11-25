import qs from 'qs';

import { ViewType } from '@/src/types/ViewType';

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
