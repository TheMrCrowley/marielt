import { AppRoutes } from '@/enums/AppRoutes';

export interface HomePageItem {
  title: string;
  description: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
  variant: 'primary' | 'secondary';
  type: 'product' | 'opportunity';
  to: AppRoutes;
}

export interface WelcomeSectionItem {
  title: string;
  description: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
}
