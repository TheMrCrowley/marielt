import { AppRoutes } from '@/src/enums/AppRoutes';

import { ImageType } from './ImageType';

export interface HomePageItem {
  title: string;
  description: string;
  image: ImageType;
  variant: 'primary' | 'secondary';
  type: 'product' | 'opportunity';
  to: AppRoutes;
}

export interface HomePageData {
  welcomeSection: {
    title: string;
    description: string;
    image: ImageType;
  };
  products: Array<HomePageItem>;
  opportunities: Array<HomePageItem>;
}
