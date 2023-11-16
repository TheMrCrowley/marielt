import { create } from 'zustand';

import {
  RoominessValues,
  HouseTypeValues,
  BalconyValues,
  FinishingValues,
  SaleTermValues,
  roominessFilterTagsMap,
  houseTypeQueryMap,
  BathroomValues,
  bathroomFilterTagsMap,
  finishingFilterTagsMap,
  balconyQueryMap,
  saleTermQueryMap,
} from '@/src/enums/FlatsFilters';
import { parseFiltersStateToTags } from '@/src/helpers/parseFiltersStateToTags';
import { AvailableCurrencies } from '@/src/types/Currency';
import { BaseFilters } from '@/src/types/Filters';
import { District, MicroDistrict } from '@/src/types/Location';

export type FlatsFiltersType = BaseFilters<
  {
    priceFrom: string;
    priceTo: string;
    areaFrom: string;
    areaTo: string;
    floorFrom: string;
    floorTo: string;
    maxFloorsFrom: string;
    maxFloorsTo: string;
    livingAreaFrom: string;
    livingAreaTo: string;
    kitchenAreaFrom: string;
    kitchenAreaTo: string;
    ceilingHeight: string;
    renovationYearFrom: string;
    renovationYearTo: string;
    constructionYearFrom: string;
    constructionYearTo: string;
    district: string[];
    microDistrict: string[];
    metro: string[];
    roominess: RoominessValues[];
    houseType: HouseTypeValues[];
    finishing: FinishingValues[];
    bathroom: string[];
    balcony: BalconyValues[];
    saleTerm: SaleTermValues[];
    street: string[];
    locality: string[];
    district_rb: string[];
    region: string[];

    isNotFirstFloor: boolean;
    isNotLastFloor: boolean;
    isLastFloor: boolean;
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
  floorFrom: '',
  floorTo: '',
  isLastFloor: '',
  isNotFirstFloor: '',
  isNotLastFloor: '',
  maxFloorsFrom: '',
  maxFloorsTo: '',
  ceilingHeight: '',
  kitchenAreaFrom: '',
  kitchenAreaTo: '',
  livingAreaFrom: '',
  livingAreaTo: '',
  constructionYearFrom: '',
  constructionYearTo: '',
  renovationYearFrom: '',
  renovationYearTo: '',
  furniture: '',
  parking: '',
  district: [],
  roominess: [],
  microDistrict: [],
  metro: [],
  houseType: [],
  bathroom: [],
  finishing: [],
  balcony: [],
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
  floorFrom: (value) => `Этаж от: ${value}`,
  floorTo: (value) => `Этаж до: ${value}`,
  maxFloorsFrom: (value) => `Этажей от: ${value}`,
  maxFloorsTo: (value) => `Этажей до: ${value}`,
  livingAreaFrom: (value) => `Жилая площадь от: ${value} м²`,
  livingAreaTo: (value) => `Жилая площадь до: ${value} м²`,
  kitchenAreaFrom: (value) => `Площадь кухни от: ${value} м²`,
  kitchenAreaTo: (value) => `Площадь кухни до: ${value} м²`,
  ceilingHeight: (value) => `Высота потолков от: ${value} м²`,
  renovationYearFrom: (value) => `Год ремонта от: ${value}`,
  renovationYearTo: (value) => `Год ремонта до: ${value}`,
  constructionYearFrom: (value) => `Год постройки от: ${value}`,
  constructionYearTo: (value) => `Год постройки до: ${value}`,
  isNotFirstFloor: () => 'Не первый этаж',
  isNotLastFloor: () => 'Не последний этаж',
  isLastFloor: () => 'Последний этаж',
  furniture: () => 'Мебель',
  parking: () => 'Парковка',
  roominess: (value) => `Комнатность: ${roominessFilterTagsMap[value as RoominessValues]}`,
  houseType: (value) => `Тип дома: ${houseTypeQueryMap[value as HouseTypeValues]}`,
  finishing: (value) => `Ремонт: ${finishingFilterTagsMap[value as FinishingValues]}`,
  bathroom: (value) => `Санузел: ${bathroomFilterTagsMap[value as BathroomValues]}`,
  balcony: (value) => `Балкон: ${balconyQueryMap[value as BalconyValues]}`,
  saleTerm: (value) => `Тип сделки: ${saleTermQueryMap[value as SaleTermValues]}`,
  street: (value) => value as string,
  locality: (value) => value as string,
  district_rb: (value) => value as string,
  district: (value) => value as string,
  microDistrict: (value) => value as string,
  metro: (value) => value as string,
  region: (value) => value as string,
};

export const useFlatsFilter = create<FlatsFiltersType>((set, get) => ({
  filters: initialFlatsFilters,
  tags: tagsDefaultState,
  data: {
    district: [],
    metro: [],
    microDistrict: [],
  },
  viewType: 'list',
  changeView: (type) => set({ viewType: type }),
  updateFilters: (update) => {
    set((prev) => ({
      filters: {
        ...prev.filters,
        ...update,
      },
    }));
  },
  updateTags: (update, currency) => {
    set({
      tags: {
        ...parseFiltersStateToTags(update, currency, tagsDefaultState, filtersNameMap),
      },
    });
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
  reset: (cb) => {
    set({
      filters: initialFlatsFilters,
      tags: tagsDefaultState,
    });
    cb(get().filters);
  },
  setData: (data) => set({ data }),
  isExpandedOpen: false,
  setIsExpandedOpen: (isExpandedOpen) => set({ isExpandedOpen }),
}));
