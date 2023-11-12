import { formatResponseToSearchResult } from '@/src/helpers/formatters';
import { getSearchFieldQuery } from '@/src/services/filtersDataServices';
import { SearchResults } from '@/src/types/Filters';
import { FlatStrapiResponse, StrapiFindResponse } from '@/src/types/StrapiTypes';

export const getFlatsSearchResults = async (value: string): Promise<SearchResults> => {
  const query = getSearchFieldQuery(value);

  const url = `http://185.251.38.44:1337/api/apartments-items?${query}`;

  const response = await fetch(url, {
    cache: 'no-cache',
  });

  const { data } = (await response.json()) as StrapiFindResponse<FlatStrapiResponse>;

  return formatResponseToSearchResult(data, value);
};
