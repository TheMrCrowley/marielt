import { AppChildRoutes } from '@/src/enums/AppRoutes';

import { ImageType } from './ImageType';
import { StrapiVideo } from './VideoLink';

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

export type CareersPageItem = {
  to: AppChildRoutes;
  image: ImageType;
  title: string;
  description: string;
  variant: 'primary';
};
