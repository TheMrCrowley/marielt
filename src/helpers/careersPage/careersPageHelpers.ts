import { CareersPageStrapiResponse } from '@/src/api/careersPage';
import { AppRoutes, AppChildRoutes } from '@/src/enums/AppRoutes';
import { CareersPageItem } from '@/src/types/CareersTypes';

export const convertToCareersPageDateItem = (
  data: CareersPageStrapiResponse['data'],
): CareersPageItem[] => {
  return data.attributes.section.map((item) => ({
    title: item.title,
    description: item.description,
    variant: 'primary',
    to: (AppRoutes.Careers + item.to) as AppChildRoutes,
    image: {
      url: item.image.data.attributes.url,
      width: item.image.data.attributes.width,
      height: item.image.data.attributes.height,
      placeholder: item.image.data.attributes.placeholder,
    },
  }));
};
