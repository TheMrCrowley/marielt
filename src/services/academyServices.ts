import qs from 'qs';

import { Training, TrainingStrapiResponse } from '@/src/types/AcademyTypes';
import { StrapiFindOneResponse, StrapiFindResponse } from '@/src/types/StrapiTypes';

export const getAllTrainings = async () => {
  const query = qs.stringify(
    {
      pagination: {
        limit: -1,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const url = `${process.env.API_BASE_URL}/trainings?${query}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindResponse<TrainingStrapiResponse>;

  return data;
};

export const getTrainingById = async (id: string): Promise<Training> => {
  const populateQuery = qs.stringify(
    {
      populate: {
        image: {
          fields: ['width', 'height', 'url', 'placeholder'],
        },
      },
    },
    { encodeValuesOnly: true },
  );

  const url = `${process.env.API_BASE_URL}/trainings/${id}?${populateQuery}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindOneResponse<TrainingStrapiResponse>;

  return {
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
