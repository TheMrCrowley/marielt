import { AbstractAboutPageApi } from '@/src/api/AboutPageApi';
import { convertToAboutPageData } from '@/src/helpers/aboutPageHelpers';
import { AboutPageData } from '@/src/types/AboutPageTypes';

const getAboutPageDataFetchFunction =
  (api: AbstractAboutPageApi) => async (): Promise<AboutPageData[]> => {
    const { data } = await api.getAboutPageData();

    return convertToAboutPageData(data);
  };

export default getAboutPageDataFetchFunction;
