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
