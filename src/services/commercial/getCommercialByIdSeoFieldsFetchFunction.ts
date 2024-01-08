import { AbstractCommercialApi } from '@/src/api/commercial';
import { formatToItemImage } from '@/src/helpers/formatToPageImages';

const getCommercialByIdSeoFieldsFetchFunction =
  (api: AbstractCommercialApi) => async (id: string) => {
    const { data } = await api.getCommercialByIdSeoFields(id);

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

export default getCommercialByIdSeoFieldsFetchFunction;
