import { AbstractFlatsApi } from '@/src/api/flats';
import { convertToDefaultFlatItem } from '@/src/helpers/flats/flatsHelpers';
import { DetailedFlatItem } from '@/src/types/Flats';

const getSimilarFlatsItemsFetchFunction =
  (api: AbstractFlatsApi) => async (flat: DetailedFlatItem) => {
    const { byLayout, byLocation, byPrice } = await api.getSimilarFlats(flat);

    return [
      { label: 'По цене', data: convertToDefaultFlatItem(byPrice.data) },
      {
        label: 'По расположению',
        data: convertToDefaultFlatItem(byLocation.data),
      },
      {
        label: 'По планировке',
        data: convertToDefaultFlatItem(byLayout.data),
      },
    ];
  };

export default getSimilarFlatsItemsFetchFunction;
