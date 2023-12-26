import { AbstractAboutPageApi } from '@/src/api/aboutPage';
import { convertToAboutPageData } from '@/src/helpers/aboutPage/aboutPageHelpers';
import { AboutPageData } from '@/src/types/AboutPageTypes';

const getAboutPageDataFetchFunction =
  (api: AbstractAboutPageApi) => async (): Promise<AboutPageData[]> => {
    const { data } = await api.getAboutPageData();

    return convertToAboutPageData(data);
  };

export default getAboutPageDataFetchFunction;
