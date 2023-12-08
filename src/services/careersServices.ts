import qs from 'qs';

import { AppChildRoutes, AppRoutes } from '@/src/enums/AppRoutes';
import {
  AgentPageData,
  AgentPageDataResponse,
  CareersPageItemResponse,
} from '@/src/types/CareersTypes';
import { StrapiFindOneResponse } from '@/src/types/StrapiTypes';

export const getCareers = async () => {
  const populateQuery = qs.stringify(
    {
      populate: {
        section: {
          fields: ['title', 'description', 'variant', 'to'],

          populate: {
            image: {
              fields: ['width', 'height', 'url', 'placeholder'],
            },
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );
  const url = `${process.env.API_BASE_URL}/careers-page?${populateQuery}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindOneResponse<CareersPageItemResponse>;

  return data.attributes.section.map((item) => ({
    ...item,
    to: (AppRoutes.Careers + item.to) as AppChildRoutes,
    image: {
      src: item.image.data.attributes.url,
      width: item.image.data.attributes.width,
      height: item.image.data.attributes.height,
      placeholder: item.image.data.attributes.placeholder,
    },
  }));
};

export const getAgentPageData = async (): Promise<AgentPageData> => {
  const qeury = qs.stringify(
    {
      populate: {
        carousel: {
          fields: ['width', 'height', 'url', 'placeholder', 'provider_metadata'],
        },
      },
    },
    { encodeValuesOnly: true },
  );

  const url = `${process.env.API_BASE_URL}/agent-page?${qeury}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindOneResponse<AgentPageDataResponse>;

  return {
    agentVideo: data.attributes.video_link ? JSON.parse(data.attributes.video_link) : undefined,
    courseVideo: data.attributes.course_link ? JSON.parse(data.attributes.course_link) : undefined,
    media: Array.isArray(data.attributes.carousel.data)
      ? data.attributes.carousel.data.map((item) => ({
          height: item.attributes.height,
          placeholder: item.attributes.placeholder,
          type: item.attributes.provider_metadata.resource_type,
          url: item.attributes.url,
          width: item.attributes.width,
        }))
      : [],
  };
};
