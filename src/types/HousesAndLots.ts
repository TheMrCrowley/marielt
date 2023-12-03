import { HousesAndLotsRootCategory } from '@/src/enums/HousesAndLotsFilters';
import { AvailableCurrencies } from '@/src/types/Currency';

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
