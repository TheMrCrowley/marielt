import { HomePageStrapiResponse } from '@/src/api/homePage';
import { HomePageData, HomePageItem } from '@/src/types/HomePage';

const convertToHomePageItem = (
  data: HomePageStrapiResponse['data']['attributes']['section'],
): Pick<HomePageData, 'opportunities' | 'products'> => {
  const { opportunityItems, productItems } = data.reduce<{
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
          url: `https://marielt.by:6060${cur.image.data.attributes.url}`,
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
    opportunities: opportunityItems,
    products: productItems,
  };
};

export const convertToHomePageData = (
  data: HomePageStrapiResponse['data']['attributes'],
): HomePageData => {
  const { opportunities, products } = convertToHomePageItem(data.section);

  return {
    products,
    opportunities,
    welcomeSection: {
      description: data.text_2,
      title: data.text_1,
      image: {
        height: data.banner.data.attributes.height,
        placeholder: data.banner.data.attributes.placeholder,
        url: `https://marielt.by:6060${data.banner.data.attributes.url}`,
        width: data.banner.data.attributes.width,
      },
    },
  };
};
