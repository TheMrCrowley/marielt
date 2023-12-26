import { AbstractCommercialApi } from '@/src/api/commercial';
import { convertToDefaultCommercialItem } from '@/src/helpers/commercial/commercialHelpers';

const getCommercialByIdsFetchFunction = (api: AbstractCommercialApi) => async (ids: string[]) => {
  if (!ids.length) {
    return;
  }

  const { data } = await api.getCommercialByIds(ids);

  return convertToDefaultCommercialItem(data);
};

export default getCommercialByIdsFetchFunction;
