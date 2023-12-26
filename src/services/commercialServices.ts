import qs from 'qs';

import { SearchResults } from '@/src/types/Filters';

// TODO CLIENT FETCH

export const getCommercialSearchResults = async (value: string): Promise<SearchResults> => {
  const query = qs.stringify(
    {
      searchValue: value,
      type: 'commercial',
    },
    { encodeValuesOnly: true },
  );

  const url = `/api/search?${query}`;

  const response = await fetch(url, {
    cache: 'no-cache',
  });

  const searchResults = (await response.json()) as SearchResults;

  return searchResults;
};
