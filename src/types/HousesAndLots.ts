import { HousesAndLotsRootCategory } from '@/src/enums/HousesAndLotsFilters';
import { AvailableCurrencies } from '@/src/types/Currency';

import { ImageType, ImageTypeWithThumb } from './ImageType';
import { StrapiVideo } from './VideoLink';

export type DefaultHousesAndLotsItem = {
  address: string;
  id: string;
  price?: string;
  name?: string;
  image?: ImageType;
  initialCurrency: AvailableCurrencies;
  metro?: string;
  parameters: {
    plotSize?: string;
    livingArea?: string;
    kitchenArea?: string;
    totalArea?: string;
  };
};

export type DetailedHousesAndLotsItem = {
  isPublished: boolean;
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
    bargain?: boolean;
    propertyType?: string;
    saleTerms?: string;
    contractNumber?: string;
  };
  additionalInfo: Array<{ name: string }>;
  note?: string;
  images: Array<ImageTypeWithThumb>;
  distance?: string;
  agents?: {
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
  rootType?: string;
  type?: string;
  direction: string;
  metro?: string;
} & DefaultHousesAndLotsItem;

export interface HousesAndLotsCategory {
  categoryName: string;
  belongTo: string | null;
  isRoot: boolean;
  uid: HousesAndLotsRootCategory;
}

export interface HousesAndLotsCategoryResponse {
  name: string;
  category: string | null;
  uid: HousesAndLotsRootCategory;
}
