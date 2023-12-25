import qs from 'qs';

import { SearchResults } from '@/src/types/Filters';

// TODO CLIENT FETCH

export const getHousesAndLotsSearchResults = async (value: string): Promise<SearchResults> => {
  const query = qs.stringify(
    {
      searchValue: value,
      type: 'houses-and-lots',
    },
    { encodeValuesOnly: true },
  );

  const url = `/api/search?${query}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const searchResults = (await response.json()) as SearchResults;

  return searchResults;
};
