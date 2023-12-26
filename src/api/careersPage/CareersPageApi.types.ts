import { StrapiFindOneResponse, StrapiImage } from '@/src/types/StrapiTypes';

interface CareersPageItemResponse {
  section: Array<{
    title: string;
    description: string;
    variant: 'primary';
    to: string;
    image: StrapiFindOneResponse<StrapiImage>;
  }>;
}

export type CareersPageStrapiResponse = StrapiFindOneResponse<CareersPageItemResponse>;

export abstract class AbstractCareersApi {
  abstract getCareersPageData(): Promise<CareersPageStrapiResponse>;
}
