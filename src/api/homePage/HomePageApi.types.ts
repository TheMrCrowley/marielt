import { AppRoutes } from '@/src/enums/AppRoutes';
import { StrapiFindOneResponse, StrapiImage } from '@/src/types/StrapiTypes';

interface HomePageItemResponse {
  text_1: string;
  text_2: string;
  background: boolean;
  banner: StrapiFindOneResponse<StrapiImage>;
  section: Array<{
    title: string;
    description: string;
    variant: 'primary' | 'secondary';
    to: AppRoutes;
    navigation_title: string;
    type: 'product' | 'opportunity';
    image: StrapiFindOneResponse<StrapiImage>;
  }>;
}

export type HomePageStrapiResponse = StrapiFindOneResponse<HomePageItemResponse>;

export abstract class AbstractHomePageApi {
  abstract getHomePageData(): Promise<HomePageStrapiResponse>;
}
