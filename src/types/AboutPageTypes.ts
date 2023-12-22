import { AppRoutes } from '@/src/enums/AppRoutes';

import { ImageType } from './ImageType';

export type AboutPageData = {
  title: string;
  description: string;
  variant: 'primary';
  to: AppRoutes;
  image: ImageType;
};
