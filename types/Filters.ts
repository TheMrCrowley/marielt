import { AvailableCurrencies } from '@/types/Currency';

export interface BaseFiltersContext<T extends Record<string, string | string[] | boolean>> {
  applyFilters: () => void;
  filters: T;
  data: Partial<T>;
  updateFilters: <K extends keyof T>(
    values: Partial<Record<K, BaseFiltersContext<T>['filters'][K]>>,
  ) => void;
}

export const finishingValues = [
  'евроремонт',
  'отличный ремонт',
  'хороший ремонт',
  'нормальный ремонт',
  'удовлетворительный ремонт',
  'плохое состояние',
  'аварийное состояние',
  'без отделки',
  'строительная отделка',
];

export type FlatsFiltersType = BaseFiltersContext<{
  priceFrom: string;
  priceTo: string;
  district: string[];
  microDistrict: string[];
  metro: string[];
  areaFrom: string;
  areaTo: string;
  roominess: string[];
  currency: AvailableCurrencies;

  floorFrom: string;
  floorTo: string;
  isNotFirstFloor: boolean;
  isNotLastFloor: boolean;
  isLastFloor: boolean;

  maxFloorsFrom: string;
  maxFloorsTo: string;

  houseType: string[];

  livingAreaFrom: string;
  livingAreaTo: string;
  kitchenAreaFrom: string;
  kitchenAreaTo: string;
  ceilingHeight: string;

  finishing: string[];
  bathroom: string[];
  renovationYearFrom: string;
  renovationYearTo: string;
  constructionYearFrom: string;
  constructionYearTo: string;
  balcony: string[];
  saleTerm: string[];
  furniture: boolean;
  parking: boolean;
}>;
