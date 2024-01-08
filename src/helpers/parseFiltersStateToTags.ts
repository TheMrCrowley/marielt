import { FlatsFiltersType } from '@/src/store/flatsFilters';
import { AvailableCurrencies } from '@/src/types/Currency';
import { BaseFilters } from '@/src/types/Filters';

export function parseFiltersStateToTags<T extends BaseFilters<{}, {}>>(
  filters: Partial<Record<keyof T['filters'], string | string[] | boolean>>,
  currency: AvailableCurrencies,
  defaultState: T['tags'],
  tagsMap: Record<string, (value: string | string[], currency?: AvailableCurrencies) => string>,
): FlatsFiltersType['tags'] {
  return Object.entries(filters)
    .filter(([, value]) => {
      return (
        (Array.isArray(value) && value.length) ||
        (typeof value === 'string' && value.length) ||
        !!value
      );
    })
    .reduce<T['tags']>((acc, [key, value]) => {
      if ((typeof value === 'string' || typeof value === 'boolean') && !!value) {
        return { ...acc, [key]: tagsMap[key](value as string, currency) };
      }
      return {
        ...acc,
        [key]: (value as string[]).map((item) => ({
          value: item,
          label: tagsMap[key](item as string, currency),
        })),
      };
    }, defaultState);
}
