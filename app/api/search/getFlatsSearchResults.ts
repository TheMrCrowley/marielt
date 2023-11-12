import { formatResponseToSearchResult } from '@/src/helpers/formatters';
import { getSearchFieldQuery } from '@/src/services/filtersDataServices';
import { SearchResults } from '@/src/types/Filters';
import { ProductType } from '@/src/types/Product';
import { FlatStrapiResponse, StrapiFindResponse } from '@/src/types/StrapiTypes';

const getUrlByType = (type: ProductType): string => {
  switch (type) {
    case 'flats':
      return 'http://185.251.38.44:1337/api/apartments-items';
    case 'commercial':
      return 'http://185.251.38.44:1337/api/commercial-property-items';
    case 'houses-and-lots':
      return 'http://185.251.38.44:1337/api/houses-and-lots-items';
    default:
      return null as never;
  }
};

export const getFlatsSearchResults = async (
  value: string,
  type: ProductType,
): Promise<SearchResults> => {
  const query = getSearchFieldQuery(value);

  const url = `${getUrlByType(type)}?${query}`;

  const response = await fetch(url, {
    cache: 'no-cache',
  });

  const { data } = (await response.json()) as StrapiFindResponse<FlatStrapiResponse>;

  return formatResponseToSearchResult(data, value);
};
