import { AbstractFlatsApi } from '@/src/api/flats';
import { convertToDefaultFlatItem } from '@/src/helpers/flats/flatsHelpers';

const getActualFlatsFetchFunction = (api: AbstractFlatsApi) => async () => {
  const { data } = await api.getActualFlats();

  return convertToDefaultFlatItem(data);
};

export default getActualFlatsFetchFunction;
