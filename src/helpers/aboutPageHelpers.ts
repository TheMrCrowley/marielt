import { AboutPageItemResponse } from '@/src/api/AboutPageApi';
import { AppRoutes } from '@/src/enums/AppRoutes';
import { AboutPageData } from '@/src/types/AboutPageTypes';
import { StrapiFindOneResponse } from '@/src/types/StrapiTypes';

export const convertToAboutPageData = (
  data: StrapiFindOneResponse<AboutPageItemResponse>['data'],
): AboutPageData[] =>
  data.attributes.section.map((item) => ({
    ...item,
    to: item.to as AppRoutes,
    image: {
      src: item.image.data.attributes.url,
      width: item.image.data.attributes.width,
      height: item.image.data.attributes.height,
      placeholder: item.image.data.attributes.placeholder,
    },
  }));
