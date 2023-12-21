import { AppRoutes } from '@/src/enums/AppRoutes';

import { StrapiFindOneResponse } from './StrapiTypes';

export interface HomePageItemResponse {
  text_1: string;
  text_2: string;
  background: boolean;
  banner: StrapiFindOneResponse<{
    width: number;
    height: number;
    url: string;
    placeholder: string;
  }>;
  section: Array<{
    title: string;
    description: string;
    variant: 'primary' | 'secondary';
    to: AppRoutes;
    navigation_title: string;
    type: 'product' | 'opportunity';
    image: StrapiFindOneResponse<{
      width: number;
      height: number;
      url: string;
      placeholder: string;
    }>;
  }>;
}

export interface HomePageItem {
  title: string;
  description: string;
  image: {
    src: string;
    width: number;
    height: number;
    placeholder: string;
  };
  variant: 'primary' | 'secondary';
  type: 'product' | 'opportunity';
  to: AppRoutes;
}

export interface HomePageData {
  welcomeSection: {
    title: string;
    description: string;
    image: {
      width: number;
      height: number;
      url: string;
      placeholder: string;
    };
  };
  products: Array<HomePageItem>;
  opportunities: Array<HomePageItem>;
}
