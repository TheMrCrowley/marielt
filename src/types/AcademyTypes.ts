import { StrapiFindOneResponse, StrapiFindResponse, StrapiImage } from '@/src/types/StrapiTypes';

export interface TrainingStrapiResponse {
  title: string;
  description?: string;
  content?: string;
  image?: StrapiFindOneResponse<StrapiImage>;
}

export interface Training {
  id: string;
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
  trainings: StrapiFindResponse<TrainingStrapiResponse>;
}

export interface Teacher {
  id: string;
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
  trainings: Array<Partial<Training>>;
}
