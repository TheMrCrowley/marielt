import { create } from 'zustand';

import { SaleTermValues } from '@/src/enums/FlatsFilters';
import {
  GasSupplyValues,
  ElectricityValues,
  WaterValues,
  SewerageValues,
  WallMaterialValues,
  HouseLevelValues,
  HeatingValues,
} from '@/src/enums/HousesAndLotsFilters';
import { BaseFilters } from '@/src/types/Filters';
import { HousesAndLotsCategory } from '@/src/types/HousesAndLots';

export type HousesAndLotsFiltersType = BaseFilters<
  {
    housesAndLotsRootCategory: string;
    housesAndLotsCategories: string[];
    priceFrom: string;
    priceTo: string;
    directions: string[];
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
    district_rb: string[];
    locality: string[];
    region: string[];
    street: string[];
  },
  {
    directions: string[];
    housesAndLotasCategories: HousesAndLotsCategory[];
  }
>;

export const initialHousesAndLotsFilters: HousesAndLotsFiltersType['filters'] = {
  housesAndLotsRootCategory: '',
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
  housesAndLotsCategories: [],
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

  district_rb: [],
  locality: [],
  region: [],
  street: [],
};

export const useHousesAndLotsFilters = create<HousesAndLotsFiltersType>((set) => ({
  filters: initialHousesAndLotsFilters,
  data: {
    directions: [],
    housesAndLotasCategories: [],
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
