import {
  RoominessValues,
  HouseTypeValues,
  BalconyValues,
  SaleTermValues,
} from '@/enums/FlatsFilters';
import { FinishingValues } from '@/enums/FlatsFilters';

import { District, MicroDistrict } from './Location';

export interface BaseFilters<
  T extends Record<string, string | string[] | boolean>,
  D extends Record<string, unknown[] | null>,
> {
  filters: T;
  data: D;
  updateFilters: <K extends keyof T>(
    values: Partial<Record<K, BaseFilters<T, D>['filters'][K]>>,
  ) => void;
  setData: (data: D) => void;
  isExpandedOpen: boolean;
  setIsExpandedOpen: (isExpandedOpen: boolean) => void;
}

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
    district: District[] | null;
    microDistrict: MicroDistrict[] | null;
    metro: string[] | null;
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

    gasSupply: string;
    electricity: string[];
    water: string[];
    sewerage: string[];
    nearLake: boolean;
    wallMaterial: string[];
    houseLevels: string[];
    // district: string[];
    // microDistrict: string[];
    // metro: string[];
    // roominess: RoominessValues[];

    // floorFrom: string;
    // floorTo: string;
    // isNotFirstFloor: boolean;
    // isNotLastFloor: boolean;
    // isLastFloor: boolean;

    // maxFloorsFrom: string;
    // maxFloorsTo: string;

    // houseType: HouseTypeValues[];

    livingAreaFrom: string;
    livingAreaTo: string;
    kitchenAreaFrom: string;
    kitchenAreaTo: string;
    // ceilingHeight: string;

    // finishing: FinishingValues[];
    // bathroom: string[];
    // renovationYearFrom: string;
    // renovationYearTo: string;
    constructionYearFrom: string;
    constructionYearTo: string;
    readinessFrom: string;
    readinessTo: string;
    heating: string[];
    // balcony: BalconyValues[];
    saleTerm: SaleTermValues[];
    // furniture: boolean;
    // parking: boolean;
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
  gasSupply: '',
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
  // district: [],
  // roominess: [],
  // microDistrict: [],
  // metro: [],
  // floorFrom: '',
  // floorTo: '',
  // isLastFloor: false,
  // isNotFirstFloor: false,
  // isNotLastFloor: false,
  // maxFloorsFrom: '',
  // maxFloorsTo: '',
  // houseType: [],
  // ceilingHeight: '',
  // kitchenAreaFrom: '',
  // kitchenAreaTo: '',
  // livingAreaFrom: '',
  // livingAreaTo: '',
  // bathroom: [],
  // finishing: [],

  // renovationYearFrom: '',
  // renovationYearTo: '',
  // balcony: [],
  saleTerm: [],
  // furniture: false,
  // parking: false,
};