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
  LotsWaterValues,
  HousesAndLotsRootCategory,
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
    lotsWater: LotsWaterValues[];
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
  lotsWater: [],
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

export const getHousesAndLotsFiltersToApply = (
  category: HousesAndLotsRootCategory,
  filters: HousesAndLotsFiltersType['filters'],
): Partial<HousesAndLotsFiltersType['filters']> => {
  const {
    priceFrom,
    priceTo,
    directions,
    distance,
    district_rb,
    region,
    locality,
    street,
    housesAndLotsRootCategory,
    plotAreaTo,
    plotAreaFrom,
    gasSupply,
    electricity,
    lotsWater,
    sewerage,
    nearLake,
    housesAndLotsCategories,
    areaFrom,
    areaTo,
    livingAreaFrom,
    livingAreaTo,
    kitchenAreaFrom,
    kitchenAreaTo,
    wallMaterial,
    houseLevels,
    constructionYearFrom,
    constructionYearTo,
    readinessFrom,
    readinessTo,
    heating,
    water,
    saleTerm,
  } = filters;

  const defaultFilters = {
    priceFrom,
    priceTo,
    directions,
    distance,
    district_rb,
    region,
    locality,
    street,
    housesAndLotsRootCategory,
    areaFrom: category === HousesAndLotsRootCategory.Plots ? '' : areaFrom,
    areaTo: category === HousesAndLotsRootCategory.Plots ? '' : areaTo,
    plotAreaFrom: category !== HousesAndLotsRootCategory.Plots ? '' : plotAreaFrom,
    plotAreaTo: category !== HousesAndLotsRootCategory.Plots ? '' : plotAreaTo,
  };

  const plotFilters = {
    plotAreaTo,
    plotAreaFrom,
    gasSupply,
    electricity,
    lotsWater,
    sewerage,
    nearLake,
  };

  const cottageFilters = {
    plotAreaFrom,
    plotAreaTo,
    gasSupply,
    electricity,
    sewerage,
    nearLake,
    housesAndLotsCategories,
    areaFrom,
    areaTo,
    livingAreaFrom,
    livingAreaTo,
    kitchenAreaFrom,
    kitchenAreaTo,
    wallMaterial,
    houseLevels,
    constructionYearFrom,
    constructionYearTo,
    readinessFrom,
    readinessTo,
    heating,
    water,
    saleTerm,
  };

  const dachifilters = {
    areaFrom,
    areaTo,
    livingAreaFrom,
    livingAreaTo,
    kitchenAreaFrom,
    kitchenAreaTo,
    plotAreaFrom,
    plotAreaTo,
    wallMaterial,
    houseLevels,
    constructionYearFrom,
    constructionYearTo,
    readinessFrom,
    readinessTo,
    heating,
    gasSupply,
    electricity,
    water,
    sewerage,
    saleTerm,
    nearLake,
  };

  switch (category) {
    case HousesAndLotsRootCategory.Plots:
      return {
        ...defaultFilters,
        ...plotFilters,
      };
    case HousesAndLotsRootCategory.Cottages:
      return {
        ...defaultFilters,
        ...cottageFilters,
      };
    case HousesAndLotsRootCategory.Dachi:
      return {
        ...defaultFilters,
        ...dachifilters,
      };
    default:
      return {
        ...defaultFilters,
      };
  }
};
