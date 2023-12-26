import { StrapiFindOneResponse, StrapiImage, StrapiFindResponse } from '@/src/types/StrapiTypes';

interface AgentPageDataResponse {
  video_link?: string;
  course_link?: string;
  course_media: StrapiFindOneResponse<StrapiImage>;
  carousel: StrapiFindResponse<StrapiImage>;
}

export type AgentPageStrapiResponse = StrapiFindOneResponse<AgentPageDataResponse>;

export abstract class AbstractAgentPageApi {
  abstract getAgentPageData(): Promise<AgentPageStrapiResponse>;
}
