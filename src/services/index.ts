import AboutPageApi from '@/src/api/AboutPageApi';
import ActualProductsApi from '@/src/api/ActualProductsApi';
import AgentPageApi from '@/src/api/AgentPageApi';
import CareersPageApi from '@/src/api/CareersPageApi';
import HomePageApi from '@/src/api/HomePageApi';
import TeachersApi from '@/src/api/TeachersApi';
import TeamPageApi from '@/src/api/TeamPageApi';
import TrainingsApi from '@/src/api/TrainingsApi';

import getAboutPageDataFetchFunction from './getAboutPageDataFetchFunction';
import getActualProductsByTypeFetchFunction from './getActualProductsByTypeFetchFunction';
import getAgentPageDataFetchFunction from './getAgentPageDataFetchFunction';
import getAllTeachersFetchFunction from './getAllTeachersFetchFunction';
import getCareersPageDataFetchFunction from './getCareersPageDataFetchFunction';
import getHomePageDataFetchFunction from './getHomePageDataFetchFunction';
import getTeacherByIdFetchFunction from './getTeacherByIdFetchFunction';
import getTeamPageDataFetchFunction from './getTeamPageDataFetchFunction';
import getTrainingByIdFetchFunction from './getTrainingByIdFetchFunction';

const homePageApi = new HomePageApi(process.env.API_BASE_URL as string);
const actualProductsApi = new ActualProductsApi(process.env.API_BASE_URL as string);
const teachersApi = new TeachersApi(process.env.API_BASE_URL as string);
const trainingsApi = new TrainingsApi(process.env.API_BASE_URL as string);
const aboutPageApi = new AboutPageApi(process.env.API_BASE_URL as string);
const teamPageApi = new TeamPageApi(process.env.API_BASE_URL as string);
const careersApi = new CareersPageApi(process.env.API_BASE_URL as string);
const agentPageApi = new AgentPageApi(process.env.API_BASE_URL as string);

// Home Page
export const getHomePageData = getHomePageDataFetchFunction(homePageApi);

// Actual Products
export const getActualProductsByType = getActualProductsByTypeFetchFunction(actualProductsApi);

// Teachers page
export const getTeacherById = getTeacherByIdFetchFunction(teachersApi);
export const getAllTeachers = getAllTeachersFetchFunction(teachersApi);

// Trainings page
export const getTrainingById = getTrainingByIdFetchFunction(trainingsApi);

// About Page
export const getAboutPageData = getAboutPageDataFetchFunction(aboutPageApi);

// Team Page
export const getTeamPageData = getTeamPageDataFetchFunction(teamPageApi);

// Careers Page
export const getCareersPageData = getCareersPageDataFetchFunction(careersApi);

// Agent Page
export const getAgentPageData = getAgentPageDataFetchFunction(agentPageApi);
