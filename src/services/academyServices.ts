import qs from 'qs';

import {
  Teacher,
  TeacherStrapiResponse,
  Training,
  TrainingStrapiResponse,
} from '@/src/types/AcademyTypes';
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

  return data.filter((item) => item.attributes.description && item.attributes.content);
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

export const getTeacherById = async (id: string): Promise<Teacher> => {
  const populateQuery = qs.stringify(
    {
      populate: {
        photo: {
          fields: ['width', 'height', 'url', 'placeholder'],
        },
        trainings: {
          populate: {
            fields: ['name', 'description', 'content'],
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  const url = `${process.env.API_BASE_URL}/teachers/${id}?${populateQuery}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindOneResponse<TeacherStrapiResponse>;

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

export const getAllTeachers = async (): Promise<Teacher[]> => {
  const query = qs.stringify(
    {
      pagination: {
        limit: -1,
      },
      populate: {
        photo: {
          fields: ['width', 'height', 'url', 'placeholder'],
        },
        trainings: {
          populate: {
            fields: ['name', 'description', 'content'],
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const url = `${process.env.API_BASE_URL}/teachers?${query}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindResponse<TeacherStrapiResponse>;

  return data.map((item) => ({
    id: item.id,
    name: item.attributes.name,
    position: item.attributes.position,
    trainings: item.attributes.trainings.data.map((t) => ({
      title: t.attributes.title,
      description: t.attributes.description,
      content: t.attributes.content,
      id: t.id,
    })),
    description1: item.attributes.description1,
    description2: item.attributes.description2,
    photo: item.attributes.photo?.data
      ? {
          height: item.attributes.photo.data.attributes.height,
          width: item.attributes.photo.data.attributes.width,
          placeholder: item.attributes.photo.data.attributes.placeholder,
          url: item.attributes.photo.data.attributes.url,
        }
      : undefined,
  }));
};
