import { AbstractHouseApi } from '@/src/api/HouseApi';
import { formatToItemImage } from '@/src/helpers/formatToPageImages';

const getHouseByIdSeoDataFetchFunction = (api: AbstractHouseApi) => async (id: string) => {
  const { data } = await api.getHouseByIdSeoFields(id);

  return {
    seo: {
      title: data.attributes.name,
      description: [data.attributes.detailed_description, data.attributes.note]
        .filter(Boolean)
        .join('\n'),
    },
    image: formatToItemImage(data.attributes.image?.data),
  };
};

export default getHouseByIdSeoDataFetchFunction;
