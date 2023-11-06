import {
  RoominessValues,
  HouseTypeValues,
  BalconyValues,
  SaleTermValues,
} from '@/enums/FlatsFilters';
import { FinishingValues } from '@/enums/FlatsFilters';
import {
  ElectricityValues,
  HeatingValues,
  HouseLevelValues,
  WallMaterialValues,
} from '@/enums/HousesAndLotsFilters';
import { CommercialTransaction } from '@/services/commercialFilters';

import { WaterValues, GasSupplyValues, SewerageValues } from './../enums/HousesAndLotsFilters';
import { CommercialCategory } from './../services/commercialFilters';
import { District, MicroDistrict } from './Location';

export type OptionType<T extends string> = Array<{
  label: string;
  value: T;
}>;

export type QueryMapType<T extends string> = Record<T, string | string[]>;

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
