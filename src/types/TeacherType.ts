import { ImageType } from './ImageType';
import { Training } from './TrainingType';

export type Teacher = {
  id: string;
  name: string;
  position: string;
  description1?: string;
  description2?: string;
  photo?: ImageType;
  trainings: Array<Partial<Training>>;
};
