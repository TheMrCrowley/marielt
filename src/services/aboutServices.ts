import qs from 'qs';

import { AppRoutes } from '@/src/enums/AppRoutes';
import { AboutPageItemResponse } from '@/src/types/AboutTypes';
import { StrapiFindOneResponse } from '@/src/types/StrapiTypes';

export const getAbout = async () => {
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

  const url = `${process.env.API_BASE_URL}/about-page?${populateQuery}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindOneResponse<AboutPageItemResponse>;

  return data.attributes.section.map((item) => ({
    ...item,
    to: item.to as AppRoutes,
    image: {
      src: item.image.data.attributes.url,
      width: item.image.data.attributes.width,
      height: item.image.data.attributes.height,
      placeholder: item.image.data.attributes.placeholder,
    },
  }));
};
