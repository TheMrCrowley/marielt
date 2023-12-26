import { AboutPageItemStrapiResponse } from '@/src/api/aboutPage';
import { AppRoutes } from '@/src/enums/AppRoutes';
import { AboutPageData } from '@/src/types/AboutPageTypes';

export const convertToAboutPageData = (
  data: AboutPageItemStrapiResponse['data'],
): AboutPageData[] =>
  data.attributes.section.map((item) => ({
    ...item,
    to: item.to as AppRoutes,
    image: {
      url: item.image.data.attributes.url,
      width: item.image.data.attributes.width,
      height: item.image.data.attributes.height,
      placeholder: item.image.data.attributes.placeholder,
    },
  }));
