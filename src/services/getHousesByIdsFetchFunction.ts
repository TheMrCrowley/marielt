import { AbstractHouseApi } from '@/src/api/HouseApi';
import { convertToDefaultHouseItem } from '@/src/helpers/housesHelpers';

const getHousesByIdsFetchFunction = (api: AbstractHouseApi) => async (ids: string[]) => {
  const { data } = await api.getHousesByIds(ids);

  return convertToDefaultHouseItem(data);
};

export default getHousesByIdsFetchFunction;
