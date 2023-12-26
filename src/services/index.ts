import ActualProductsApi from '@/src/api/ActualProductsApi';
import CreditsApi from '@/src/api/CreditsApi';
import NavigationApi from '@/src/api/NavigationApi';
import AboutPageApi from '@/src/api/aboutPage';
import { TeachersApi, TrainingsApi } from '@/src/api/academyPage';
import AgentPageApi from '@/src/api/agentPage';
import CareersPageApi from '@/src/api/careersPage';
import FlatsApi from '@/src/api/flats';
import HomePageApi from '@/src/api/homePage';
import HouseApi from '@/src/api/house';
import { TeamMembersApi, TeamPageApi } from '@/src/api/teamPage';

import getAboutPageDataFetchFunction from './aboutPage/getAboutPageDataFetchFunction';
import getAllTeachersFetchFunction from './academyPage/getAllTeachersFetchFunction';
import getAllTrainingsFetchFunction from './academyPage/getAllTrainingsFetchFunction';
import getTeacherByIdFetchFunction from './academyPage/getTeacherByIdFetchFunction';
import getTrainingByIdFetchFunction from './academyPage/getTrainingByIdFetchFunction';
import getActualProductsByTypeFetchFunction from './actualProducts/getActualProductsByTypeFetchFunction';
import getAgentPageDataFetchFunction from './agentPage/getAgentPageDataFetchFunction';
import getCareersPageDataFetchFunction from './careersPage/getCareersPageDataFetchFunction';
import getFlatByIdFetchFunction from './flats/getFlatByIdFetchFunction';
import getFlatByIdSeoDataFetchFunction from './flats/getFlatByIdSeoDataFetchFunction';
import getFlatsByIdsFetchFunction from './flats/getFlatsByIdsFetchFunction';
import getFlatsForListFetchFunction from './flats/getFlatsForListFetchFunction';
import getFlatsForMapFetchFunction from './flats/getFlatsForMapFetchFunction';
import getSimilarFlatsItemsFetchFunction from './flats/getSimilarFlatsItemsFetchFunction';
import getInterestRateFetchFunction from './getInterestRateFetchFunction';
import getNavigationItemsFetchFunction from './getNavigationItemsFetchFunction';
import getHomePageDataFetchFunction from './homePage/getHomePageDataFetchFunction';
import getHouseByIdFetchFunction from './houses/getHouseByIdFetchFunction';
import getHouseByIdSeoDataFetchFunction from './houses/getHouseByIdSeoDataFetchFunction';
import getHousesByIdsFetchFunction from './houses/getHousesByIdsFetchFunction';
import getHousesForListFetchFunction from './houses/getHousesForListFetchFunction';
import getHousesForMapFetchFunction from './houses/getHousesForMapFetchFunction';
import getSimilarHousesFetchFunction from './houses/getSimilarHousesFetchFunction';
import getTeamMembersFetchFunction from './teamPage/getTeamMembersFetchFunction';
import getTeamPageDataFetchFunction from './teamPage/getTeamPageDataFetchFunction';

const homePageApi = new HomePageApi(process.env.API_BASE_URL as string);
const actualProductsApi = new ActualProductsApi(process.env.API_BASE_URL as string);
const teachersApi = new TeachersApi(process.env.API_BASE_URL as string);
const trainingsApi = new TrainingsApi(process.env.API_BASE_URL as string);
const aboutPageApi = new AboutPageApi(process.env.API_BASE_URL as string);
const teamPageApi = new TeamPageApi(process.env.API_BASE_URL as string);
const teamMembersApi = new TeamMembersApi(process.env.API_BASE_URL as string);
const careersApi = new CareersPageApi(process.env.API_BASE_URL as string);
const agentPageApi = new AgentPageApi(process.env.API_BASE_URL as string);
const navigationApi = new NavigationApi(process.env.API_BASE_URL as string);
const flatsApi = new FlatsApi(process.env.API_BASE_URL as string);
const creditsApi = new CreditsApi(process.env.API_BASE_URL as string);
const houseApi = new HouseApi(process.env.API_BASE_URL as string);

// Home Page
export const getHomePageData = getHomePageDataFetchFunction(homePageApi);

// Actual Products
export const getActualProductsByType = getActualProductsByTypeFetchFunction(actualProductsApi);

// Teachers page
export const getTeacherById = getTeacherByIdFetchFunction(teachersApi);
export const getAllTeachers = getAllTeachersFetchFunction(teachersApi);

// Trainings page
export const getTrainingById = getTrainingByIdFetchFunction(trainingsApi);
export const getAllTrainings = getAllTrainingsFetchFunction(trainingsApi);

// About Page
export const getAboutPageData = getAboutPageDataFetchFunction(aboutPageApi);

// Team Page
export const getTeamPageData = getTeamPageDataFetchFunction(teamPageApi);
export const getTeamMembers = getTeamMembersFetchFunction(teamMembersApi);

// Careers Page
export const getCareersPageData = getCareersPageDataFetchFunction(careersApi);

// Agent Page
export const getAgentPageData = getAgentPageDataFetchFunction(agentPageApi);

// Navigation
export const getNavigationItems = getNavigationItemsFetchFunction(navigationApi);

// Flats
export const getFlatById = getFlatByIdFetchFunction(flatsApi);
export const getSimilarFlats = getSimilarFlatsItemsFetchFunction(flatsApi);
export const getFlatsForList = getFlatsForListFetchFunction(flatsApi);
export const getFlatsForMap = getFlatsForMapFetchFunction(flatsApi);
export const getFlatsByIds = getFlatsByIdsFetchFunction(flatsApi);
export const getFlatByIdSeoData = getFlatByIdSeoDataFetchFunction(flatsApi);

// Credits
export const getInterestRate = getInterestRateFetchFunction(creditsApi);

// Houses
export const getHouseById = getHouseByIdFetchFunction(houseApi);
export const getSimilarHouses = getSimilarHousesFetchFunction(houseApi);
export const getHousesForList = getHousesForListFetchFunction(houseApi);
export const getHousesForMap = getHousesForMapFetchFunction(houseApi);
export const getHousesByIds = getHousesByIdsFetchFunction(houseApi);
export const getHouseByIdSeoData = getHouseByIdSeoDataFetchFunction(houseApi);
