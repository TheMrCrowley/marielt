import { getUrlByType } from '@/src/helpers/apiHelpers';
import { formatResponseToSearchResult } from '@/src/helpers/formatters';
import { getSearchFieldQuery } from '@/src/services/filtersDataServices';
import { SearchResults } from '@/src/types/Filters';
import { FlatStrapiResponse } from '@/src/types/Flats';
import { ProductType } from '@/src/types/Product';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

export const getFlatsSearchResults = async (
  value: string,
  type: ProductType,
): Promise<SearchResults> => {
  const query = getSearchFieldQuery(value);

  const url = `${getUrlByType(type)}?${query}`;

  const response = await fetch(url, {
    // cache: 'no-cache',
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindResponse<FlatStrapiResponse>;

  return formatResponseToSearchResult(data, value);
};
