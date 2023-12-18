import { StrapiFindOneResponse, StrapiFindResponse, StrapiImage } from './StrapiTypes';
import { StrapiVideo } from './VideoLink';

export interface CareersPageItemResponse {
  section: Array<{
    title: string;
    description: string;
    variant: 'primary';
    to: string;
    image: StrapiFindOneResponse<{
      width: number;
      height: number;
      url: string;
      placeholder: string;
    }>;
  }>;
}

export interface AgentPageData {
  agentVideo?: StrapiVideo;
  courseVideo?: StrapiVideo;
  courseImage: {
    width: number;
    height: number;
    url: string;
    placeholder: string;
  };
  media: Array<{
    width: number;
    height: number;
    url: string;
    placeholder: string | null;
    type: 'image' | 'video';
  }>;
}

export interface AgentPageDataResponse {
  video_link?: string;
  course_link?: string;
  course_media: StrapiFindOneResponse<StrapiImage>;
  carousel: StrapiFindResponse<StrapiImage>;
}
