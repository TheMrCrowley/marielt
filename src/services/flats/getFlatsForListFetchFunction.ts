import { AbstractFlatsApi } from '@/src/api/flats';
import { convertToDefaultFlatItem } from '@/src/helpers/flats/flatsHelpers';
import { DefaultFlatItem } from '@/src/types/Flats';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

const getFlatsForListFetchFunction =
  (api: AbstractFlatsApi) =>
  async (
    searchParams: Record<string, string | string[]>,
  ): Promise<{
    flats: DefaultFlatItem[];
    pagination: StrapiFindResponse<{}>['meta']['pagination'];
  }> => {
    const {
      data,
      meta: { pagination },
    } = await api.getFlatsForList(searchParams);

    return {
      flats: convertToDefaultFlatItem(data),
      pagination,
    };
  };

export default getFlatsForListFetchFunction;
