import { AbstractFlatsApi } from '@/src/api/flats';
import { formatToDefaultMapItem } from '@/src/helpers/formatters';
import { DefaultMapItem } from '@/src/types/Product';

const getFlatsForMapFetchFunction =
  (api: AbstractFlatsApi) =>
  async (
    searchParams: Record<string, string | string[]>,
  ): Promise<{
    flats: DefaultMapItem[];
  }> => {
    const { data } = await api.getFlatsForMap(searchParams);

    return {
      flats: formatToDefaultMapItem(data),
    };
  };

export default getFlatsForMapFetchFunction;
