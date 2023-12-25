import { HomePageItemResponse } from '@/src/api/HomePageApi';
import { HomePageData, HomePageItem } from '@/src/types/HomePage';

const convertToHomePageItem = (
  data: HomePageItemResponse['section'],
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
          url: cur.image.data.attributes.url,
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

export const convertToHomePageData = (data: HomePageItemResponse): HomePageData => {
  const { opportunities, products } = convertToHomePageItem(data.section);

  return {
    products,
    opportunities,
    welcomeSection: {
      description: data.text_2,
      title: data.text_1,
      image: data.banner.data.attributes,
    },
  };
};
