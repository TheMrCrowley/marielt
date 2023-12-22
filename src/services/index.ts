import AboutPageApi from '@/src/api/AboutPageApi';
import ActualProductsApi from '@/src/api/ActualProductsApi';
import HomePageApi from '@/src/api/HomePageApi';
import TeachersApi from '@/src/api/TeachersApi';
import TrainingsApi from '@/src/api/TrainingsApi';

import getAboutPageDataFetchFunction from './getAboutPageDataFetchFunction';
import getActualProductsByTypeFetchFunction from './getActualProductsByTypeFetchFunction';
import getAllTeachersFetchFunction from './getAllTeachersFetchFunction';
import getHomePageDataFetchFunction from './getHomePageDataFetchFunction';
import getTeacherByIdFetchFunction from './getTeacherByIdFetchFunction';
import getTrainingByIdFetchFunction from './getTrainingByIdFetchFunction';

const homePageApi = new HomePageApi(process.env.API_BASE_URL as string);
const actualProductsApi = new ActualProductsApi(process.env.API_BASE_URL as string);
const teachersApi = new TeachersApi(process.env.API_BASE_URL as string);
const trainingsApi = new TrainingsApi(process.env.API_BASE_URL as string);
const aboutPageApi = new AboutPageApi(process.env.API_BASE_URL as string);

// Home Page
export const getHomePageData = getHomePageDataFetchFunction(homePageApi);

// Actual Products
export const getActualProductsByType = getActualProductsByTypeFetchFunction(actualProductsApi);

// Teachers
export const getTeacherById = getTeacherByIdFetchFunction(teachersApi);
export const getAllTeachers = getAllTeachersFetchFunction(teachersApi);

// Trainings
export const getTrainingById = getTrainingByIdFetchFunction(trainingsApi);

// About Page
export const getAboutPageData = getAboutPageDataFetchFunction(aboutPageApi);
