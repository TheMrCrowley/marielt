import { TrainingStrapiResponse } from '@/src/api/academyPage';

export const convertToTraining = (data: TrainingStrapiResponse['data']) => {
  return {
    id: data.id,
    title: data.attributes.title,
    content: data.attributes.content,
    description: data.attributes.description,
    image: data.attributes.image?.data
      ? {
          height: data.attributes.image.data.attributes.height,
          width: data.attributes.image.data.attributes.width,
          placeholder: data.attributes.image.data.attributes.placeholder,
          url: data.attributes.image.data.attributes.url,
        }
      : undefined,
  };
};
