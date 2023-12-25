import { CareersPageItemResponse } from '@/src/api/CareersPageApi';
import { AppRoutes, AppChildRoutes } from '@/src/enums/AppRoutes';
import { CareersPageItem } from '@/src/types/CareersTypes';
import { StrapiFindOneResponse } from '@/src/types/StrapiTypes';

export const convertToCareersPageDateItem = (
  data: StrapiFindOneResponse<CareersPageItemResponse>['data'],
): CareersPageItem[] => {
  return data.attributes.section.map((item) => ({
    title: item.title,
    description: item.description,
    variant: 'primary',
    to: (AppRoutes.Careers + item.to) as AppChildRoutes,
    image: {
      src: item.image.data.attributes.url,
      width: item.image.data.attributes.width,
      height: item.image.data.attributes.height,
      placeholder: item.image.data.attributes.placeholder,
    },
  }));
};
