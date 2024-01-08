import { AbstractFlatsApi } from '@/src/api/flats';
import { formatToItemImage } from '@/src/helpers/formatToPageImages';
import { SeoType } from '@/src/types/SeoTypes';

const getFlatByIdSeoDataFetchFunction =
  (api: AbstractFlatsApi) =>
  async (id: string): Promise<SeoType> => {
    const { data } = await api.getFlatByIdSeoData(id);

    return {
      seo: {
        title: data.attributes.name,
        description: [data.attributes.detailed_description, data.attributes.note]
          .filter(Boolean)
          .join('\n'),
      },
      image: formatToItemImage(data.attributes.image.data),
    };
  };

export default getFlatByIdSeoDataFetchFunction;
