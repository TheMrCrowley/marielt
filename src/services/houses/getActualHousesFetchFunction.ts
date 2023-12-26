import { AbstractHouseApi } from '@/src/api/house';
import { convertToDefaultHouseItem } from '@/src/helpers/house/housesHelpers';

const getActualHousesFetchFunction = (api: AbstractHouseApi) => async () => {
  const { data } = await api.getActualHouses();

  return convertToDefaultHouseItem(data);
};

export default getActualHousesFetchFunction;
