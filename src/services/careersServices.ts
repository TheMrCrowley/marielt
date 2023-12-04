import qs from 'qs';

import { AppChildRoutes, AppRoutes } from '@/src/enums/AppRoutes';
import { CareersPageItemResponse } from '@/src/types/CareersTypes';
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
