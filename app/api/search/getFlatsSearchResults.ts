import { formatResponseToSearchResult } from '@/src/helpers/formatters';
import { getSearchFieldQuery } from '@/src/services/filtersDataServices';
import { SearchResults } from '@/src/types/Filters';
import { ProductType } from '@/src/types/Product';
import { FlatStrapiResponse, StrapiFindResponse } from '@/src/types/StrapiTypes';

const getUrlByType = (type: ProductType): string => {
  switch (type) {
    case 'flats':
      return `${process.env.API_BASE_URL}/apart-items`;
    case 'commercial':
      return `${process.env.API_BASE_URL}/comm-items`;
    case 'houses-and-lots':
      return `${process.env.API_BASE_URL}/house-items`;
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
