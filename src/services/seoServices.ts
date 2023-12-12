import qs from 'qs';

import { StrapiFindOneResponse } from '@/src/types/StrapiTypes';

interface SeoFieldsResponse {
  seo: {
    title: string;
    description: string;
  };
}

const seoUrlMap = {
  homePage: (query: string) => `${process.env.API_BASE_URL}/home-page?${query}`,
  apartPage: (query: string) => `${process.env.API_BASE_URL}/apart-page?${query}`,
  careersPage: (query: string) => `${process.env.API_BASE_URL}/careers-page?${query}`,
  agentPage: (query: string) => `${process.env.API_BASE_URL}/agent-page?${query}`,
  housePage: (query: string) => `${process.env.API_BASE_URL}/house-page?${query}`,
  commPage: (query: string) => `${process.env.API_BASE_URL}/comm-page?${query}`,
  dubaiPage: (query: string) => `${process.env.API_BASE_URL}/dubai-page?${query}`,
  academyPage: (query: string) => `${process.env.API_BASE_URL}/academy-page?${query}`,
};

const populateQuery = qs.stringify(
  {
    populate: 'seo',
  },
  { encodeValuesOnly: true },
);

export const getSeoFields = async (page: keyof typeof seoUrlMap): Promise<SeoFieldsResponse> => {
  const url = seoUrlMap[page](populateQuery);
  const response = await fetch(url);
  const { data } = (await response.json()) as StrapiFindOneResponse<SeoFieldsResponse>;

  return data.attributes;
};
