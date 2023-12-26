import { StrapiFindOneResponse, StrapiImage } from '@/src/types/StrapiTypes';

interface AboutPageItemResponse {
  section: Array<{
    title: string;
    description: string;
    variant: 'primary';
    to: string;
    image: StrapiFindOneResponse<StrapiImage>;
  }>;
}

export type AboutPageItemStrapiResponse = StrapiFindOneResponse<AboutPageItemResponse>;

export abstract class AbstractAboutPageApi {
  abstract getAboutPageData(): Promise<AboutPageItemStrapiResponse>;
}
