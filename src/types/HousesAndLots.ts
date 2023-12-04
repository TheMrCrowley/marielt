import { HousesAndLotsRootCategory } from '@/src/enums/HousesAndLotsFilters';
import { AvailableCurrencies } from '@/src/types/Currency';

import { StrapiFindOneResponse, StrapiFindResponse, StrapiImage } from './StrapiTypes';
import { StrapiVideo } from './VideoLink';

export type DefaultHousesAndLotsItem = {
  address: string;
  id: string;
  price?: string;
  name?: string;
  image?: {
    url: string;
    width: number;
    height: number;
    placeholderUrl: string;
  };
  initialCurrency: AvailableCurrencies;
  parameters: {
    plotSize?: string;
    livingArea?: string;
    kitchenArea?: string;
    totalArea?: string;
  };
};

export type DetailedHousesAndLotsItem = {
  parameters: {
    builtUpAreaLength?: string;
    builtUpAreaWidth?: string;
    levelNumber?: string;
    roofMaterial?: string;
    wallMaterial?: string;
    wallMaterialAdd?: string;
    totalArea?: string;
    roomsNumber?: string;
    heating?: string;
    gas?: string;
    water?: string;
    waterAdd?: string;
    sewerage?: string;
    sewerageAdd?: string;
    electricity?: string;
    telephone?: string;
    balcony?: string;
    parking?: string;
    readinessPercentage?: string;
    constructionYear?: string;
  };
  additionalInfo: Array<{ name: string }>;
  note?: string;
  images: Array<{
    width: number;
    height: number;
    url: string;
    placeholderUrl: string;
  }>;
  distance?: string;
  agent: {
    fullName: string;
    phone1: string;
    phone2?: string;
    branch?: string;
    position?: string;
  };
  detailedDescription?: string;
  video?: StrapiVideo;
  location?: {
    lng: number;
    lat: number;
  };
  category?: string;
  houseCategories: {
    category?: string;
    name?: string;
  };
  direction: string;
} & DefaultHousesAndLotsItem;

export interface HousesAndLotsCategory {
  categoryName: string;
  belongTo: string | null;
  isRoot: boolean;
  uid: HousesAndLotsRootCategory;
}

export interface HousesAndLotsStrapiResponse {
  locality: string;
  street?: string;
  district_rb?: string;
  village_council?: string;
  distance?: string;
  region?: {
    data: {
      attributes: {
        name: string;
      };
    };
  };
  house_number?: {
    number: string;
    building: string;
  };
  coordinates: string;
  parameters: {
    plot_size?: string;
    level_number?: string;
    roof_material?: string;
    wall_material?: string;
    total_area?: string;
    living_area?: string;
    kitchen_area?: string;
    heating?: string;
    gas?: string;
    water?: string;
    sewerage?: string;
    electricity?: string;
    built_up_area?: {
      length: string;
      width: string;
    };
    wall_material_add?: string;
    rooms_number?: string;
    water_add?: string;
    sewerage_add?: string;
    telephone?: string;
    balcony?: string;
    parking?: string;
    readiness_percentage?: string;
    construction_year?: string;
  };
  currency?: AvailableCurrencies;
  price: string;
  name?: string;
  additional_info?: Array<{ name: string }>;
  note?: string;
  agents: StrapiFindResponse<{
    full_name: string;
    phone1: string;
    phone2?: string;
    branch?: string;
    position?: string;
  }>;
  detailed_description?: string;
  image?: StrapiFindResponse<StrapiImage>;
  video_link?: string;
  location?: {
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  house_categories: StrapiFindResponse<{
    category: string;
    name: string;
  }>;
  direction: StrapiFindOneResponse<{ name: string }>;
}

export interface HousesAndLotsCategoryResponse {
  name: string;
  category: string | null;
  uid: HousesAndLotsRootCategory;
}
