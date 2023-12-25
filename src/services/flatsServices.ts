import qs from 'qs';

import { FlatStrapiResponse } from '@/src/api/FlatsApi';
import { SearchResults } from '@/src/types/Filters';
import { StrapiFindOneResponse } from '@/src/types/StrapiTypes';

export const getFlatsSearchResults = async (value: string): Promise<SearchResults> => {
  const query = qs.stringify(
    {
      searchValue: value,
      type: 'flats',
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

export const getFlatSeoFields = async (id: string) => {
  const populateQuery = qs.stringify(
    {
      populate: {
        image: {
          fields: ['width', 'height', 'url', 'placeholder'],
        },
      },
    },
    { encodeValuesOnly: true },
  );

  const url = `${process.env.API_BASE_URL}/apart-items/${id}?${populateQuery}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindOneResponse<FlatStrapiResponse>;

  return {
    seo: {
      title: data.attributes.name || 'Static Apart Title',
      description: '' + data.attributes.detailed_description || '' + data.attributes.note || '',
    },
    image: data.attributes.image?.data?.length
      ? data.attributes.image.data[0].attributes.url
      : undefined,
  };
};
