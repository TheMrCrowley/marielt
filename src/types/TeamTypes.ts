import { ImageType } from './ImageType';

export interface TeamItem {
  id: string;
  name: string;
  position: string;
  description: string;
  management: boolean;
  photo?: ImageType;
}
