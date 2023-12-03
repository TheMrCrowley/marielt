import { ReadonlyURLSearchParams } from 'next/navigation';

import { SortValues } from '@/src/enums/SortOptions';
import { AvailableCurrencies } from '@/src/types/Currency';
import { BaseFilters } from '@/src/types/Filters';

export const formatFiltersToSearchParams = <T extends Record<string, string | string[] | boolean>>(
  filters: BaseFilters<T, {}>['filters'],
  currency: AvailableCurrencies,
  sort: SortValues,
) => {
  console.log(new URLSearchParams(location.search).get('sort'));
  const searchParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (typeof value === 'string' && !value) {
      return;
    }

    if (typeof value === 'boolean' && value) {
      return searchParams.set(key, value.toString());
    }

    if (typeof value === 'string') {
      return searchParams.set(key, value.toString());
    }

    if (Array.isArray(value)) {
      value.forEach((item) => searchParams.append(key, item.toString()));
    }
  });

  searchParams.set('currency', currency);
  searchParams.set('sort', sort);

  return searchParams;
};

export const createFiltersStateBySearchParams = <
  T extends Record<string, string | string[] | boolean>,
>(
  initialFilters: BaseFilters<T, {}>['filters'],
  searchParams: ReadonlyURLSearchParams,
): Partial<BaseFilters<T, {}>['filters']> => {
  const filters = { ...initialFilters };

  (Object.keys(filters) as Array<keyof typeof filters>).forEach((key) => {
    const param = Array.isArray(filters[key])
      ? (searchParams.getAll(key as string) as string[])
      : (searchParams.get(key as string) as string);

    if (!param) {
      return;
    }

    (filters[key] as string | string[] | boolean) = param;
  });

  return filters;
};
