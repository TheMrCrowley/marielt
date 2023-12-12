import { StrapiFindOneResponse, StrapiImage } from '@/src/types/StrapiTypes';

export interface TrainingStrapiResponse {
  title: string;
  description?: string;
  content?: string;
  image?: StrapiFindOneResponse<StrapiImage>;
}

export interface Training {
  title: string;
  description?: string;
  content?: string;
  image?: {
    width: number;
    height: number;
    placeholder: string;
    url: string;
  };
}

export interface TeacherStrapiResponse {
  name: string;
  position: string;
  description1?: string;
  description2?: string;
  photo: StrapiFindOneResponse<StrapiImage>;
}

export interface Teacher {
  name: string;
  position: string;
  description1?: string;
  description2?: string;
  photo?: {
    width: number;
    height: number;
    placeholder: string;
    url: string;
  };
}
