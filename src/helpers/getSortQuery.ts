import qs from 'qs';

import { SortValues } from '@/src/enums/SortOptions';

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
