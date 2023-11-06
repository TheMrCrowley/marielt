import { create } from 'zustand';

import {
  RoominessValues,
  HouseTypeValues,
  BalconyValues,
  FinishingValues,
  SaleTermValues,
} from '@/enums/FlatsFilters';
import { BaseFilters } from '@/types/Filters';
import { District, MicroDistrict } from '@/types/Location';

export type FlatsFiltersType = BaseFilters<
  {
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
  },
  {
    district: District[];
    microDistrict: MicroDistrict[];
    metro: string[];
  }
>;

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

export const useFlatsFilter = create<FlatsFiltersType>((set) => ({
  filters: initialFlatsFilters,
  data: {
    district: [],
    metro: [],
    microDistrict: [],
  },
  updateFilters: (update) => {
    set((prev) => ({
      filters: {
        ...prev.filters,
        ...update,
      },
    }));
  },
  setData: (data) => set({ data }),
  isExpandedOpen: false,
  setIsExpandedOpen: (isExpandedOpen) => set({ isExpandedOpen }),
}));
