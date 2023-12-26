import { AbstractHouseApi } from '@/src/api/house';
import { formatToDefaultMapItem } from '@/src/helpers/formatters';

const getHousesForMapFetchFunction =
  (api: AbstractHouseApi) => async (searchParams: Record<string, string | string[]>) => {
    const { data } = await api.getHousesForMap(searchParams);

    return {
      houses: formatToDefaultMapItem(data),
    };
  };

export default getHousesForMapFetchFunction;
