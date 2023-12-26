import { AbstractFlatsApi } from '@/src/api/flats';
import { convertToDetailedFlatItem } from '@/src/helpers/flats/flatsHelpers';
import { DetailedFlatItem } from '@/src/types/Flats';

const getFlatByIdFetchFunction =
  (api: AbstractFlatsApi) =>
  async (id: string): Promise<DetailedFlatItem> => {
    const { data } = await api.getFlatById(id);

    return convertToDetailedFlatItem(data);
  };

export default getFlatByIdFetchFunction;
