import { AbstractActualProductsApi } from '@/src/api/ActualProductsApi';
import { convertToDefaultCommercialItem } from '@/src/helpers/commercialHelpers';
import { convertToDefaultFlatItem } from '@/src/helpers/flatsHelpers';
import { convertToDefaultHouseItem } from '@/src/helpers/housesHelpers';
import { DefaultCommercialItem } from '@/src/types/Commercial';
import { DefaultFlatItem } from '@/src/types/Flats';
import { DefaultHousesAndLotsItem } from '@/src/types/HousesAndLots';
import { ProductType } from '@/src/types/Product';

const getActualFlats = (api: AbstractActualProductsApi) => async (): Promise<DefaultFlatItem[]> => {
  const { data } = await api.getActualFlats();

  return convertToDefaultFlatItem(data);
};

const getActualCommercial =
  (api: AbstractActualProductsApi) => async (): Promise<DefaultCommercialItem[]> => {
    const { data } = await api.getActualCommercial();

    return convertToDefaultCommercialItem(data);
  };

const getActualHousesAndLots =
  (api: AbstractActualProductsApi) => async (): Promise<DefaultHousesAndLotsItem[]> => {
    const { data } = await api.getActualHouses();

    return convertToDefaultHouseItem(data);
  };

const getActualProductsByTypeFetchFunction =
  (api: AbstractActualProductsApi) =>
  async (
    type: ProductType,
  ): Promise<DefaultFlatItem[] | DefaultCommercialItem[] | DefaultHousesAndLotsItem[]> => {
    switch (type) {
      case 'flats':
        return getActualFlats(api)();
      case 'commercial':
        return getActualCommercial(api)();
      case 'houses-and-lots':
        return getActualHousesAndLots(api)();
      default:
        return null as never;
    }
  };

export default getActualProductsByTypeFetchFunction;
