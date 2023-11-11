import { AppRoutes } from '@/src/enums/AppRoutes';
import { StrapiFindOneResponse, StrapiFindResponse, StrapiImage } from '@/src/types/StrapiTypes';

export interface HomePageItem {
  title: string;
  description: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
  variant: 'primary' | 'secondary';
  type: 'product' | 'opportunity';
  to: AppRoutes;
}

interface HomePageItemResponse {
  title: string;
  description: string;
  variant: 'primary' | 'secondary';
  to: AppRoutes;
  type: 'product' | 'opportunity';
  image: {
    data: {
      attributes: StrapiImage;
    };
  };
}

interface WelcomeSectionItem {
  title: string;
  description: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
}

interface CarouselItemResponse {
  text_1: string;
  text_2: string;
  banner: {
    data: {
      attributes: StrapiImage;
    };
  };
}

export const getWelcomeSectionItem = async (): Promise<WelcomeSectionItem> => {
  const response = await fetch(`${process.env.API_BASE_URL}/carousels/1?populate=*`, {
    cache: 'no-cache',
  });
  const { data } = (await response.json()) as StrapiFindOneResponse<CarouselItemResponse>;

  return {
    description: data.attributes.text_2,
    title: data.attributes.text_1,
    image: {
      src: data.attributes.banner.data.attributes.url,
      width: data.attributes.banner.data.attributes.width,
      height: data.attributes.banner.data.attributes.height,
    },
  };
};

export const getHomePageItems = async (): Promise<{
  productItems: HomePageItem[];
  opportunityItems: HomePageItem[];
}> => {
  const response = await fetch(`${process.env.API_BASE_URL}/home-pages?populate=*`, {});
  const { data } = (await response.json()) as StrapiFindResponse<HomePageItemResponse>;

  const { opportunityItems, productItems } = data.reduce<{
    opportunityItems: HomePageItem[];
    productItems: HomePageItem[];
  }>(
    (acc, cur) => {
      const target = {
        title: cur.attributes.title,
        description: cur.attributes.description,
        variant: cur.attributes.variant,
        to: cur.attributes.to,
        type: cur.attributes.type,
        image: {
          src: cur.attributes.image.data.attributes.url,
          width: cur.attributes.image.data.attributes.width,
          height: cur.attributes.image.data.attributes.height,
        },
      };

      if (cur.attributes.type === 'product') {
        acc = { ...acc, productItems: [...acc.productItems, target] };
      } else {
        acc = { ...acc, opportunityItems: [...acc.opportunityItems, target] };
      }

      return acc;
    },
    { opportunityItems: [], productItems: [] },
  );

  return {
    opportunityItems,
    productItems,
  };
};
