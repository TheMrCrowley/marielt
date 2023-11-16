import { AppRoutes } from '@/src/enums/AppRoutes';
import { HomePageItemResponse, StrapiFindResponse } from '@/src/types/StrapiTypes';

export const getNavigationItems = async (): Promise<
  Array<{
    title: string;
    to: AppRoutes;
  }>
> => {
  const response = await fetch(`${process.env.API_BASE_URL}/home-pages?populate=*`, {});
  const { data } = (await response.json()) as StrapiFindResponse<HomePageItemResponse>;

  return data.map((item) => ({ title: item.attributes.navigation_title, to: item.attributes.to }));
};
