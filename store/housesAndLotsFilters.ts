import { create } from 'zustand';

import { SaleTermValues } from '@/enums/FlatsFilters';
import {
  GasSupplyValues,
  ElectricityValues,
  WaterValues,
  SewerageValues,
  WallMaterialValues,
  HouseLevelValues,
  HeatingValues,
} from '@/enums/HousesAndLotsFilters';
import { BaseFilters } from '@/types/Filters';

export type HousesAndLotsFiltersType = BaseFilters<
  {
    housesAndLotsType: string;
    priceFrom: string;
    priceTo: string;
    directions: string[];
    houseType: string[];
    distance: string;
    areaFrom: string;
    areaTo: string;
    plotAreaFrom: string;
    plotAreaTo: string;

    gasSupply: GasSupplyValues[];
    electricity: ElectricityValues[];
    water: WaterValues[];
    sewerage: SewerageValues[];
    nearLake: boolean;
    wallMaterial: WallMaterialValues[];
    houseLevels: HouseLevelValues[];

    livingAreaFrom: string;
    livingAreaTo: string;
    kitchenAreaFrom: string;
    kitchenAreaTo: string;

    constructionYearFrom: string;
    constructionYearTo: string;
    readinessFrom: string;
    readinessTo: string;
    heating: HeatingValues[];

    saleTerm: SaleTermValues[];
  },
  {
    directions: string[];
    houseTypes: string[];
  }
>;

export const initialHousesAndLotsFilters: HousesAndLotsFiltersType['filters'] = {
  housesAndLotsType: '',
  priceFrom: '',
  priceTo: '',
  directions: [],
  distance: '',
  areaFrom: '',
  areaTo: '',
  plotAreaFrom: '',
  plotAreaTo: '',
  kitchenAreaFrom: '',
  kitchenAreaTo: '',
  livingAreaFrom: '',
  livingAreaTo: '',
  houseType: [],
  gasSupply: [],
  electricity: [],
  water: [],
  sewerage: [],
  nearLake: false,
  wallMaterial: [],
  houseLevels: [],
  constructionYearFrom: '',
  constructionYearTo: '',
  readinessFrom: '',
  readinessTo: '',
  heating: [],

  saleTerm: [],
};

export const useHousesAndLotsFilters = create<HousesAndLotsFiltersType>((set) => ({
  filters: initialHousesAndLotsFilters,
  data: {
    directions: [],
    houseTypes: [],
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
