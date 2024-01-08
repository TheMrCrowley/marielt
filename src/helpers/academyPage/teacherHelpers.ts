import { TeacherStrapiResponse } from '@/src/api/academyPage';
import { Teacher } from '@/src/types/TeacherType';

export const convertToTeacher = (data: TeacherStrapiResponse['data']): Teacher => {
  return {
    id: data.id,
    name: data.attributes.name,
    position: data.attributes.position,
    description1: data.attributes.description1,
    description2: data.attributes.description2,
    trainings: data.attributes.trainings.data.map((item) => ({
      title: item.attributes.title,
      description: item.attributes.description,
      content: item.attributes.content,
      id: item.id,
    })),
    photo: data.attributes.photo?.data
      ? {
          height: data.attributes.photo.data.attributes.height,
          width: data.attributes.photo.data.attributes.width,
          placeholder: data.attributes.photo.data.attributes.placeholder,
          url: data.attributes.photo.data.attributes.url,
        }
      : undefined,
  };
};
