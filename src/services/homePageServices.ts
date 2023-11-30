import qs from 'qs';

import { HomePageData, HomePageItem } from '@/src/types/HomePage';
import { HomePageItemResponse, StrapiFindOneResponse } from '@/src/types/StrapiTypes';

export const getHomePageData = async (): Promise<HomePageData> => {
  const query = qs.stringify(
    {
      populate: {
        banner: {
          fields: ['width', 'height', 'url', 'placeholder'],
        },
        section: {
          populate: {
            image: {
              fields: ['width', 'height', 'url', 'placeholder'],
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const url = `${process.env.API_BASE_URL}/home-page?${query}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const { data } = (await response.json()) as StrapiFindOneResponse<HomePageItemResponse>;

  const { opportunityItems, productItems } = data.attributes.section.reduce<{
    opportunityItems: HomePageItem[];
    productItems: HomePageItem[];
  }>(
    (acc, cur) => {
      const target = {
        title: cur.title,
        description: cur.description,
        variant: cur.variant,
        to: cur.to,
        type: cur.type,
        image: {
          src: cur.image.data.attributes.url,
          width: cur.image.data.attributes.width,
          height: cur.image.data.attributes.height,
          placeholder: cur.image.data.attributes.placeholder,
        },
      };

      if (cur.type === 'product') {
        acc = { ...acc, productItems: [...acc.productItems, target] };
      } else {
        acc = { ...acc, opportunityItems: [...acc.opportunityItems, target] };
      }

      return acc;
    },
    { opportunityItems: [], productItems: [] },
  );

  return {
    products: productItems,
    opportunities: opportunityItems,
    welcomeSection: {
      description: data.attributes.text_2,
      title: data.attributes.text_1,
      image: data.attributes.banner.data.attributes,
    },
  };
};
