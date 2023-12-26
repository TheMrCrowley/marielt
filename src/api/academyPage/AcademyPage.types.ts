import { StrapiFindOneResponse, StrapiFindResponse, StrapiImage } from '@/src/types/StrapiTypes';

interface TeacherResponse {
  name: string;
  position: string;
  description1?: string;
  description2?: string;
  photo: StrapiFindOneResponse<StrapiImage>;
  trainings: TrainingItemsStrapiResponse;
}

interface TrainingResponse {
  title: string;
  description?: string;
  content?: string;
  image?: StrapiFindOneResponse<StrapiImage>;
}

export type TrainingStrapiResponse = StrapiFindOneResponse<TrainingResponse>;
export type TrainingItemsStrapiResponse = StrapiFindResponse<TrainingResponse>;

export type TeacherStrapiResponse = StrapiFindOneResponse<TeacherResponse>;
export type TeacherItemsStrapiResponse = StrapiFindResponse<TeacherResponse>;

export abstract class AbstractTeachersApi {
  abstract getTeacherById(id: string): Promise<TeacherStrapiResponse>;
  abstract getAllTeachers(): Promise<TeacherItemsStrapiResponse>;
}

export abstract class AbstractTrainingsApi {
  abstract getTrainingById(id: string): Promise<TrainingStrapiResponse>;
  abstract getAllTrainings(): Promise<TrainingItemsStrapiResponse>;
}
