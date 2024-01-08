import { AbstractCommercialApi } from '@/src/api/commercial';
import { formatToCommercialMapItem } from '@/src/helpers/commercial/commercialHelpers';

const getCommercialForMapFetchFunction =
  (api: AbstractCommercialApi) => async (searchParams: Record<string, string | string[]>) => {
    const { data } = await api.getCommercialForMap(searchParams);

    return {
      commercial: formatToCommercialMapItem(data),
    };
  };

export default getCommercialForMapFetchFunction;
