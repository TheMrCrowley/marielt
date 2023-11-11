import { HousesAndLotsFiltersType } from '@/src/store/housesAndLotsFilters';

export const getHousesAndLotsRoute = (
  rootCategory: string,
  categories: HousesAndLotsFiltersType['data']['housesAndLotasCategories'],
): string => categories.find((category) => category.categoryName === rootCategory)?.uid || '';
