import HomePageApi from '@/src/api/HomePageApi';
import { getHomePageDataFetchFunction } from '@/src/services/homePageServices';

const homePageApi = new HomePageApi(process.env.API_BASE_URL as string);

export const getHomePageData = getHomePageDataFetchFunction(homePageApi);
