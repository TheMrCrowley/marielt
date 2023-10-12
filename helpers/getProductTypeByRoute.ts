import { AppRoutes } from '@/enums/AppRoutes';
import { ProductType } from '@/types/Product.type';

export const getProductTypeByRoute = (route: AppRoutes): ProductType => {
  if (route === AppRoutes.Flats) {
    return 'flats';
  }
  if (route === AppRoutes.HousesAndLots) {
    return 'houses-and-lots';
  }
  return 'commercial';
};
