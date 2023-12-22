import qs from 'qs';

import { TrainingStrapiResponse } from '@/src/api/TrainingsApi';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

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
