import { AppRoutes } from '@/src/enums/AppRoutes';

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
