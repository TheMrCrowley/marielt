import { FlatItemsStrapiResponse } from '@/src/api/flats';
import { getUrlByType } from '@/src/helpers/apiHelpers';
import { formatResponseToSearchResult } from '@/src/helpers/formatters';
import { getSearchFieldQuery } from '@/src/services/filtersDataServices';
import { SearchResults } from '@/src/types/Filters';
import { ProductType } from '@/src/types/Product';

export const getFlatsSearchResults = async (
  value: string,
  type: ProductType,
): Promise<SearchResults> => {
  const query = getSearchFieldQuery(value);

  const url = `${getUrlByType(type)}?${query}`;

  const response = await fetch(url, {
    cache: 'no-cache',
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as FlatItemsStrapiResponse;

  return formatResponseToSearchResult(data, value);
};
