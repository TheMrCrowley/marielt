import { create } from 'zustand';

import { SaleTermValues, saleTermQueryMap } from '@/src/enums/FlatsFilters';
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
  heatingFilterTagsMap,
  wallMaterialTagsMap,
  sewerageTagsMap,
  lotsWaterTagsMap,
  waterTagsMap,
  electricityFilterTagsMap,
  gasSupplyQueryMap,
} from '@/src/enums/HousesAndLotsFilters';
import { parseFiltersStateToTags } from '@/src/helpers/parseFiltersStateToTags';
import { AvailableCurrencies } from '@/src/types/Currency';
import { BaseFilters } from '@/src/types/Filters';
import { HousesAndLotsCategory } from '@/src/types/HousesAndLots';

import { houseLevelQueryMap } from './../enums/HousesAndLotsFilters';

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

const tagsDefaultState = {
  areaFrom: '',
  areaTo: '',
  priceFrom: '',
  priceTo: '',
  livingAreaFrom: '',
  livingAreaTo: '',
  kitchenAreaFrom: '',
  kitchenAreaTo: '',
  constructionYearFrom: '',
  constructionYearTo: '',
  housesAndLotsRootCategory: '',
  distance: '',
  plotAreaFrom: '',
  plotAreaTo: '',
  nearLake: '',
  readinessFrom: '',
  readinessTo: '',
  directions: [],
  housesAndLotsCategories: [],
  gasSupply: [],
  electricity: [],
  water: [],
  lotsWater: [],
  sewerage: [],
  wallMaterial: [],
  houseLevels: [],
  heating: [],
  saleTerm: [],
  district_rb: [],
  locality: [],
  region: [],
  street: [],
};

const filtersNameMap: Record<
  keyof typeof tagsDefaultState,
  (value: string | string[], currency?: AvailableCurrencies) => string
> = {
  areaFrom: (value) => `Площадь от: ${value} м²`,
  areaTo: (value) => `Площадь до: ${value} м²`,
  priceFrom: (value, currency) => `Цена от: ${value} ${currency}`,
  priceTo: (value, currency) => `Цена до: ${value} ${currency}`,
  livingAreaFrom: (value) => `Жилая площадь от: ${value} м²`,
  livingAreaTo: (value) => `Жилая площадь до: ${value} м²`,
  kitchenAreaFrom: (value) => `Площадь кухни от: ${value} м²`,
  kitchenAreaTo: (value) => `Площадь кухни до: ${value} м²`,
  constructionYearFrom: (value) => `Год постройки от: ${value}`,
  constructionYearTo: (value) => `Год постройки до: ${value}`,
  housesAndLotsRootCategory: (value) => `Тип: ${value}`,
  street: (value) => value as string,
  locality: (value) => value as string,
  district_rb: (value) => value as string,
  region: (value) => value as string,
  distance: (value) => `Расстояние от МКАД до: ${value} км.`,
  plotAreaFrom: (value) => `Площадь участка от: ${value} сот.`,
  plotAreaTo: (value) => `Площадь участка до: ${value} сот.`,
  readinessFrom: (value) => `Готовность от: ${value}%`,
  readinessTo: (value) => `Готовность до: ${value}%`,
  nearLake: () => 'Возле озера',
  directions: (value) => `${value} направление`,
  housesAndLotsCategories: (value) => `Вид объекта: ${value}`,
  gasSupply: (value) => `Газоснабжение: ${gasSupplyQueryMap[value as GasSupplyValues]}`,
  electricity: (value) =>
    `Электроснабжение: ${electricityFilterTagsMap[value as ElectricityValues]}`,
  water: (value) => `Водоснабжение: ${waterTagsMap[value as WaterValues]}`,
  lotsWater: (value) => `Водоснабжение: ${lotsWaterTagsMap[value as LotsWaterValues]}`,
  sewerage: (value) => `Канализация: ${sewerageTagsMap[value as SewerageValues]}`,
  wallMaterial: (value) => `Материал стен: ${wallMaterialTagsMap[value as WallMaterialValues]}`,
  houseLevels: (value) => `Уровней: ${houseLevelQueryMap[value as HouseLevelValues]}`,
  heating: (value) => `Отопление: ${heatingFilterTagsMap[value as HeatingValues]}`,
  saleTerm: (value) => `Тип сделки: ${saleTermQueryMap[value as SaleTermValues]}`,
};

export const useHousesAndLotsFilters = create<HousesAndLotsFiltersType>((set, get) => ({
  filters: initialHousesAndLotsFilters,
  data: {
    directions: [],
    housesAndLotasCategories: [],
  },
  deleteTag: (key, value, cb) => {
    if (typeof tagsDefaultState[key] === 'boolean') {
      set((prev) => ({
        filters: {
          ...prev.filters,
          [key]: false,
        },
      }));
      cb?.(get().filters);
      return;
    }
    if (typeof tagsDefaultState[key] === 'string') {
      set((prev) => ({
        tags: {
          ...prev.tags,
          [key]: tagsDefaultState[key],
        },
        filters: {
          ...prev.filters,
          [key]: '',
        },
      }));
      cb?.(get().filters);
      return;
    }
    if (Array.isArray(tagsDefaultState[key])) {
      set((prev) => ({
        tags: {
          ...prev.tags,
          [key]: (prev.tags[key] as Array<{ value: string; label: string }>)?.filter(
            (item) => item.value !== value,
          ),
        },
        filters: {
          ...prev.filters,
          [key]: (prev.filters[key] as string[]).filter((item) => item !== value),
        },
      }));
      cb?.(get().filters);
      return;
    }
  },
  tags: tagsDefaultState,
  updateTags: (update, currency) => {
    set({
      tags: {
        ...parseFiltersStateToTags(update, currency, tagsDefaultState, filtersNameMap),
      },
    });
  },
  updateFilters: (update) => {
    set((prev) => ({
      filters: {
        ...prev.filters,
        ...update,
      },
    }));
  },
  reset: (cb) => {
    set({
      filters: initialHousesAndLotsFilters,
      tags: tagsDefaultState,
    });
    cb(get().filters);
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
