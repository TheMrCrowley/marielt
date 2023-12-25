import { StrapiFindOneResponse, StrapiImage } from './StrapiTypes';

export interface TeamItem {
  id: string;
  name: string;
  position: string;
  description: string;
  management: boolean;
  photo?: {
    width: number;
    height: number;
    url: string;
    placeholder: string;
  };
}
