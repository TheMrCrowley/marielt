import {
  RoominessValues,
  HouseTypeValues,
  BalconyValues,
  SaleTermValues,
} from '@/enums/FlatsFilters';
import { FinishingValues } from '@/enums/FlatsFilters';

import { District, MicroDistrict } from './Location';

export interface BaseFilters<T extends Record<string, string | string[] | boolean>> {
  filters: T;
  data: {
    district: District[] | null;
    microDistrict: MicroDistrict[] | null;
    metro: string[] | null;
  };
  updateFilters: <K extends keyof T>(
    values: Partial<Record<K, BaseFilters<T>['filters'][K]>>,
  ) => void;
  setData: (data: {
    district: District[] | null;
    microDistrict: MicroDistrict[] | null;
    metro: string[] | null;
  }) => void;
  isExpandedOpen: boolean;
  setIsExpandedOpen: (isExpandedOpen: boolean) => void;
}

export type FlatsFiltersType = BaseFilters<{
  priceFrom: string;
  priceTo: string;
  district: string[];
  microDistrict: string[];
  metro: string[];
  areaFrom: string;
  areaTo: string;
  roominess: RoominessValues[];

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

export const initialFlatsFilters: FlatsFiltersType['filters'] = {
  areaFrom: '',
  areaTo: '',
  priceFrom: '',
  priceTo: '',
  district: [],
  roominess: [],
  microDistrict: [],
  metro: [],
  floorFrom: '',
  floorTo: '',
  isLastFloor: false,
  isNotFirstFloor: false,
  isNotLastFloor: false,
  maxFloorsFrom: '',
  maxFloorsTo: '',
  houseType: [],
  ceilingHeight: '',
  kitchenAreaFrom: '',
  kitchenAreaTo: '',
  livingAreaFrom: '',
  livingAreaTo: '',
  bathroom: [],
  finishing: [],
  constructionYearFrom: '',
  constructionYearTo: '',
  renovationYearFrom: '',
  renovationYearTo: '',
  balcony: [],
  saleTerm: [],
  furniture: false,
  parking: false,
};
