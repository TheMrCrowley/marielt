import HomePageApi from '@/src/api/HomePageApi';
import { convertToHomePageData } from '@/src/helpers/homePageHelpers';
import { HomePageData } from '@/src/types/HomePage';

export const getHomePageDataFetchFunction =
  (api: HomePageApi) => async (): Promise<HomePageData> => {
    const { data } = await api.getHomePageData();

    const homePageData = convertToHomePageData(data.attributes);

    return homePageData;
  };
