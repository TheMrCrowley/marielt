import { Training } from './TrainingType';

export type Teacher = {
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
};
