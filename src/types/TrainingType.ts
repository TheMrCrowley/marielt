import { ImageType } from './ImageType';

export type Training = {
  id: string;
  title: string;
  description?: string;
  content?: string;
  image?: ImageType;
};
