import { AbstractHouseApi } from '@/src/api/house';
import { convertToDefaultHouseItem } from '@/src/helpers/house/housesHelpers';

const getHousesForListFetchFunction =
  (api: AbstractHouseApi) => async (searchParams: Record<string, string | string[]>) => {
    const {
      data,
      meta: { pagination },
    } = await api.getHousesForList(searchParams);

    return {
      housesAndLots: convertToDefaultHouseItem(data),
      pagination,
    };
  };

export default getHousesForListFetchFunction;
