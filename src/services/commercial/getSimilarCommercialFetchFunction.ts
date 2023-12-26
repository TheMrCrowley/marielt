import { AbstractCommercialApi } from '@/src/api/commercial';
import { convertToDefaultCommercialItem } from '@/src/helpers/commercial/commercialHelpers';
import { DetailedCommercialItem } from '@/src/types/Commercial';

const getSimilarCommercialFetchFunction =
  (api: AbstractCommercialApi) => async (commercial: DetailedCommercialItem) => {
    const { byLocation, byPrice } = await api.getSimilarCommercial(commercial);

    return [
      { label: 'По цене', data: convertToDefaultCommercialItem(byPrice.data) },
      {
        label: 'По расположению',
        data: convertToDefaultCommercialItem(byLocation.data),
      },
    ];
  };

export default getSimilarCommercialFetchFunction;
