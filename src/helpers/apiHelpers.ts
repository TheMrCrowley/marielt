import { ProductType } from '@/src/types/Product';

export const getUrlByType = (type: ProductType): string => {
  switch (type) {
    case 'flats':
      return `${process.env.API_BASE_URL}/apart-items`;
    case 'commercial':
      return `${process.env.API_BASE_URL}/comm-items`;
    case 'houses-and-lots':
      return `${process.env.API_BASE_URL}/house-items`;
    default:
      return null as never;
  }
};
