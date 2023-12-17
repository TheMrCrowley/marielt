import qs from 'qs';

import Logo from '@/public/opengraph-image.jpg';
import { AppChildRoutes, AppRoutes } from '@/src/enums/AppRoutes';
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
  aboutPage: (query: string) => `${process.env.API_BASE_URL}/about-page?${query}`,
  docPage: (query: string) => `${process.env.API_BASE_URL}/doc-page?${query}`,
  teamPage: (query: string) => `${process.env.API_BASE_URL}/team-page?${query}`,
};

export const canonicalUrlMap = {
  homePage: () => `${process.env.CANONICAL_URL}`,
  apartPage: () => `${process.env.CANONICAL_URL}${AppRoutes.Flats}`,
  apartPageId: (id: string) => `${process.env.CANONICAL_URL}${AppRoutes.Flats}/${id}`,
  apartPageMap: () => `${process.env.CANONICAL_URL}${AppRoutes.Flats}/map`,
  careersPage: () => `${process.env.CANONICAL_URL}${AppRoutes.Careers}`,
  salesPage: () => `${process.env.CANONICAL_URL}${AppChildRoutes.Sales}`,
  realtorPage: () => `${process.env.CANONICAL_URL}${AppChildRoutes.Realtor}`,
  agentPage: () => `${process.env.CANONICAL_URL}${AppChildRoutes.Agent}`,
  housePage: () => `${process.env.CANONICAL_URL}${AppRoutes.HousesAndLots}`,
  housePageId: (id: string) => `${process.env.CANONICAL_URL}${AppRoutes.HousesAndLots}/${id}`,
  housePageMap: () => `${process.env.CANONICAL_URL}${AppRoutes.HousesAndLots}/map`,
  commPage: () => `${process.env.CANONICAL_URL}${AppRoutes.Commercial}`,
  commPageId: (id: string) => `${process.env.CANONICAL_URL}${AppRoutes.Commercial}/${id}`,
  commPageMap: () => `${process.env.CANONICAL_URL}${AppRoutes.Commercial}/map`,
  dubaiPage: () => `${process.env.CANONICAL_URL}${AppRoutes.Dubai}`,
  academyPage: () => `${process.env.CANONICAL_URL}${AppRoutes.Academy}`,
  teacherPage: (id: string) => `${process.env.CANONICAL_URL}${AppRoutes.Academy}/teacher/${id}`,
  trainingPage: (id: string) => `${process.env.CANONICAL_URL}${AppRoutes.Academy}/training/${id}`,
  docsPage: () => `${process.env.CANONICAL_URL}${AppRoutes.Docs}`,
  aboutPage: () => `${process.env.CANONICAL_URL}${AppRoutes.About}`,
};

export const getOpenGraphField = (
  title: string,
  description = '',
  media?: string,
  alt?: string,
) => ({
  title,
  description,
  url: `${process.env.CANONICAL_URL}`,
  siteName: `${process.env.OPENGRAPH_SITE_NAME}`,
  images: [
    {
      url: media || Logo.src,
      width: 'auto',
      height: 'auto',
      alt: alt || 'logo',
    },
  ],
  locale: 'ru_RU',
  type: 'website',
});

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
