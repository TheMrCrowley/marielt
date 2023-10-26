import { AvailableCurrencies } from '@/types/Currency';

export interface BaseFiltersContext<T extends Record<string, string | string[] | boolean>> {
  applyFilters: () => void;
  filters: T;
  data: Partial<T>;
  updateFilters: <K extends keyof T>(
    values: Partial<Record<K, BaseFiltersContext<T>['filters'][K]>>,
  ) => void;
}

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
}>;
