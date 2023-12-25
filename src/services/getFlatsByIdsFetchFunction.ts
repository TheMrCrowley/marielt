import { AbstractFlatsApi } from '@/src/api/FlatsApi';
import { convertToDefaultFlatItem } from '@/src/helpers/flatsHelpers';
import { DefaultFlatItem } from '@/src/types/Flats';

const getFlatsByIdsFetchFunction =
  (api: AbstractFlatsApi) =>
  async (ids: string[]): Promise<DefaultFlatItem[] | undefined> => {
    if (!ids) {
      return;
    }
    const { data } = await api.getFlatsByIds(ids);

    return convertToDefaultFlatItem(data);
  };

export default getFlatsByIdsFetchFunction;
