import { AppRoutes } from '@/enums/AppRoutes';
import { HomePageItem, WelcomeSectionItem } from '@/types/HomePage';
import { StrapiFindOneResponse, StrapiFindResponse } from '@/types/StrapiFindResponse';
import { StrapiImage } from '@/types/StrapiImage';

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

interface CarouselItemResponse {
  text_1: string;
  text_2: string;
  banner: {
    data: {
      attributes: StrapiImage;
    };
  };
}

const getHomePageItems = async (): Promise<{
  productItems: HomePageItem[];
  opportunityItems: HomePageItem[];
}> => {
  const response = await fetch(`${process.env.API_BASE_URL}/home-pages?populate=*`, {
    next: {
      revalidate: 1000 * 60 * 60,
    },
  });
  const { data } = (await response.json()) as StrapiFindResponse<HomePageItemResponse>;

  const productItems = data
    .filter((item) => item.attributes.type === 'product')
    .map((item) => ({
      title: item.attributes.title,
      description: item.attributes.description,
      variant: item.attributes.variant,
      to: item.attributes.to,
      type: item.attributes.type,
      image: {
        src: item.attributes.image.data.attributes.url,
        width: item.attributes.image.data.attributes.width,
        height: item.attributes.image.data.attributes.height,
      },
    }));

  const opportunityItems = data
    .filter((item) => item.attributes.type === 'opportunity')
    .map((item) => ({
      title: item.attributes.title,
      description: item.attributes.description,
      variant: item.attributes.variant,
      to: item.attributes.to,
      type: item.attributes.type,
      image: {
        src: item.attributes.image.data.attributes.url,
        width: item.attributes.image.data.attributes.width,
        height: item.attributes.image.data.attributes.height,
      },
    }));

  return {
    opportunityItems,
    productItems,
  };
};

const getWelcomeSectionItem = async (): Promise<WelcomeSectionItem> => {
  const response = await fetch(`${process.env.API_BASE_URL}/carousels/1?populate=*`, {
    next: {
      revalidate: 1000 * 60 * 60,
    },
  });
  const { data } = (await response.json()) as StrapiFindOneResponse<CarouselItemResponse>;

  return {
    description: data.attributes.text_1,
    title: data.attributes.text_1,
    image: {
      src: data.attributes.banner.data.attributes.url,
      width: data.attributes.banner.data.attributes.width,
      height: data.attributes.banner.data.attributes.height,
    },
  };
};

export const getHomePageData = async () => {
  const [{ opportunityItems, productItems }, welcomeSectionItem] = await Promise.all([
    getHomePageItems(),
    getWelcomeSectionItem(),
  ]);

  return {
    opportunityItems,
    productItems,
    welcomeSectionItem,
  };
};
