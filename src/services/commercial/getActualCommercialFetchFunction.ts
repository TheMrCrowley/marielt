import { AbstractCommercialApi } from '@/src/api/commercial';
import { convertToDefaultCommercialItem } from '@/src/helpers/commercial/commercialHelpers';

const getActualCommercialFetchFunction = (api: AbstractCommercialApi) => async () => {
  const { data } = await api.getActualCommercial();

  return convertToDefaultCommercialItem(data);
};

export default getActualCommercialFetchFunction;
