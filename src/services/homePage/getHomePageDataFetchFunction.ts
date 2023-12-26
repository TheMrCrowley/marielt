import { AbstractHomePageApi } from '@/src/api/homePage';
import { convertToHomePageData } from '@/src/helpers/homePage/homePageHelpers';
import { HomePageData } from '@/src/types/HomePage';

const getHomePageDataFetchFunction =
  (api: AbstractHomePageApi) => async (): Promise<HomePageData> => {
    const { data } = await api.getHomePageData();

    const homePageData = convertToHomePageData(data.attributes);

    return homePageData;
  };

export default getHomePageDataFetchFunction;
