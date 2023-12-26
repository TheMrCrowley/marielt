import { AbstractCommercialApi } from '@/src/api/commercial';
import { convertToDefaultCommercialItem } from '@/src/helpers/commercial/commercialHelpers';

const getCommercialForListFetchFunction =
  (api: AbstractCommercialApi) => async (searchParams: Record<string, string | string[]>) => {
    const {
      data,
      meta: { pagination },
    } = await api.getCommercialForList(searchParams);

    return {
      commercial: convertToDefaultCommercialItem(data),
      pagination,
    };
  };

export default getCommercialForListFetchFunction;
