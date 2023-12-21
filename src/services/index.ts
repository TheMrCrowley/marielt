import ActualProductsApi from '@/src/api/ActualProductsApi';
import HomePageApi from '@/src/api/HomePageApi';
import { getHomePageDataFetchFunction } from '@/src/services/homePageServices';

import { getActualProductsByTypeFetchFunction } from './actualProductsServices';

const homePageApi = new HomePageApi(process.env.API_BASE_URL as string);
const actualProductsApi = new ActualProductsApi(process.env.API_BASE_URL as string);

export const getHomePageData = getHomePageDataFetchFunction(homePageApi);
export const getActualProductsByType = getActualProductsByTypeFetchFunction(actualProductsApi);
