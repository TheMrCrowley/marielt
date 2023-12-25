import { AppChildRoutes } from '@/src/enums/AppRoutes';

import { ImageType } from './ImageType';
import { StrapiVideo } from './VideoLink';

export interface AgentPageData {
  agentVideo?: StrapiVideo;
  courseVideo?: StrapiVideo;
  courseImage: ImageType;
  media: Array<
    {
      type: 'image' | 'video';
    } & ImageType
  >;
}

export type CareersPageItem = {
  to: AppChildRoutes;
  image: ImageType;
  title: string;
  description: string;
  variant: 'primary';
};
