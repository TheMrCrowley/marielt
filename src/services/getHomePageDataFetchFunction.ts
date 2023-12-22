import { AbstractHomePageApi } from '@/src/api/HomePageApi';
import { convertToHomePageData } from '@/src/helpers/homePageHelpers';
import { HomePageData } from '@/src/types/HomePage';

const getHomePageDataFetchFunction =
  (api: AbstractHomePageApi) => async (): Promise<HomePageData> => {
    const { data } = await api.getHomePageData();

    const homePageData = convertToHomePageData(data.attributes);

    return homePageData;
  };

export default getHomePageDataFetchFunction;
