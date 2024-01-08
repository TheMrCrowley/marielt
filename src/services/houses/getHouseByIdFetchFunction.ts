import { AbstractHouseApi } from '@/src/api/house';
import { convertToDetailedHouseItem } from '@/src/helpers/house/housesHelpers';
import { DetailedHousesAndLotsItem } from '@/src/types/HousesAndLots';

const getHouseByIdFetchFunction =
  (api: AbstractHouseApi) =>
  async (id: string): Promise<DetailedHousesAndLotsItem> => {
    const { data } = await api.getHouseById(id);

    return convertToDetailedHouseItem(data);
  };

export default getHouseByIdFetchFunction;
