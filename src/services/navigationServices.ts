import qs from 'qs';

import { HomePageItemResponse } from '@/src/api/HomePageApi';
import { AppRoutes } from '@/src/enums/AppRoutes';
import { StrapiFindOneResponse } from '@/src/types/StrapiTypes';

export const getNavigationItems = async (): Promise<
  Array<{
    title: string;
    to: AppRoutes;
  }>
> => {
  const query = qs.stringify(
    {
      populate: {
        section: {
          fields: ['navigation_title', 'to'],
        },
      },
    },
    { encodeValuesOnly: true },
  );
  const response = await fetch(`${process.env.API_BASE_URL}/home-page?${query}`, {
    next: {
      revalidate: 60,
    },
  });
  const { data } = (await response.json()) as StrapiFindOneResponse<HomePageItemResponse>;

  return data.attributes.section.map((item) => ({ title: item.navigation_title, to: item.to }));
};
