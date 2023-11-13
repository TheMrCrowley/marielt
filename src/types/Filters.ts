import { AvailableCurrencies } from './Currency';

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
  tags: Partial<Record<keyof T, string | Array<{ value: string; label: string }>>>;
  updateTags: (
    values: Partial<Record<keyof T, string | string[] | boolean>>,
    currency: AvailableCurrencies,
  ) => void;
  deleteTag: (key: keyof T, value?: string) => void;
  data: D;
  updateFilters: <K extends keyof T>(
    values: Partial<Record<K, BaseFilters<T, D>['filters'][K]>>,
  ) => void;
  setData: (data: D) => void;
  isExpandedOpen: boolean;
  setIsExpandedOpen: (isExpandedOpen: boolean) => void;
}

export interface SearchResults {
  street: string[];
  locality: string[];
  district_rb: string[];
  region: string[];
}
