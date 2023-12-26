import { AbstractCommercialApi } from '@/src/api/commercial';
import { convertToDetailedCommercial } from '@/src/helpers/commercial/commercialHelpers';
import { DetailedCommercialItem } from '@/src/types/Commercial';

const getCommercialByIdFetchFunction =
  (api: AbstractCommercialApi) =>
  async (id: string): Promise<DetailedCommercialItem> => {
    const { data } = await api.getCommercialById(id);

    return convertToDetailedCommercial(data);
  };

export default getCommercialByIdFetchFunction;
