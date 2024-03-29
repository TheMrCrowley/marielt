import { AbstractHouseApi } from '@/src/api/house';
import { convertToDefaultHouseItem } from '@/src/helpers/house/housesHelpers';

const getHousesByIdsFetchFunction = (api: AbstractHouseApi) => async (ids: string[]) => {
  if (!ids.length) {
    return;
  }

  const { data } = await api.getHousesByIds(ids);

  return convertToDefaultHouseItem(data);
};

export default getHousesByIdsFetchFunction;
