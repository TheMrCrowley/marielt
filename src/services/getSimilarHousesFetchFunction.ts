import { AbstractHouseApi } from '@/src/api/HouseApi';
import { convertToDefaultHouseItem } from '@/src/helpers/housesHelpers';
import { DetailedHousesAndLotsItem } from '@/src/types/HousesAndLots';

const getSimilarHousesFetchFunction =
  (api: AbstractHouseApi) => async (house: DetailedHousesAndLotsItem) => {
    const { byLocation, byPrice } = await api.getSimilarHouses(house);

    return [
      { label: 'По цене', data: convertToDefaultHouseItem(byPrice.data) },
      {
        label: 'По расположению',
        data: convertToDefaultHouseItem(byLocation.data),
      },
    ];
  };

export default getSimilarHousesFetchFunction;
