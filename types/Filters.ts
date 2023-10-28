import {
  RoominessValues,
  HouseTypeValues,
  BalconyValues,
  SaleTermValues,
} from '@/enums/FlatsFilters';
import { FinishingValues } from '@/enums/FlatsFilters';
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
  roominess: RoominessValues[];
  currency: AvailableCurrencies;

  floorFrom: string;
  floorTo: string;
  isNotFirstFloor: boolean;
  isNotLastFloor: boolean;
  isLastFloor: boolean;

  maxFloorsFrom: string;
  maxFloorsTo: string;

  houseType: HouseTypeValues[];

  livingAreaFrom: string;
  livingAreaTo: string;
  kitchenAreaFrom: string;
  kitchenAreaTo: string;
  ceilingHeight: string;

  finishing: FinishingValues[];
  bathroom: string[];
  renovationYearFrom: string;
  renovationYearTo: string;
  constructionYearFrom: string;
  constructionYearTo: string;
  balcony: BalconyValues[];
  saleTerm: SaleTermValues[];
  furniture: boolean;
  parking: boolean;
}>;
