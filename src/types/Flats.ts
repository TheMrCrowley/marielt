import { AvailableCurrencies } from '@/src/types/Currency';

import { ImageType, ImageTypeWithThumb } from './ImageType';
import { StrapiVideo } from './VideoLink';

export type DefaultFlatItem = {
  address: string;
  id: string;
  price?: string;
  name?: string;
  image?: ImageType;
  initialCurrency: AvailableCurrencies;
  metro?: string;
  parameters: {
    totalArea: string;
    floor: string;
    maxFloor: string;
    livingArea: string;
  };
  location?: {
    lng: number;
    lat: number;
  };
};

export type DetailedFlatItem = {
  isPublished: boolean;
  parameters: {
    constructionYear?: string;
    roominess?: string;
    bathroom?: string;
    finishing?: string;
    houseType?: string;
    ceilingHeight?: string;
    kitchenArea?: string;
    separateRooms?: string;
    shareInApartment?: string;
    floorType?: string;
    balconyArea?: string;
    snbArea?: string;
    flooring?: string;
    balcony?: string;
    telephone?: string;
    layout?: string;
    majorRenovationYear?: string;
    levelNumber?: string;
    parking?: boolean;
    lastFloor?: boolean;
    furniture?: boolean;
    bargain?: boolean;
    propertyType?: string;
    saleTerms?: string;
    contractNumber?: string;
  };
  detailedDescription?: string;
  additionalInfo: Array<{ name: string }>;
  note?: string;
  images: Array<ImageTypeWithThumb>;
  video?: StrapiVideo;
  metro?: string;
  agents?: {
    fullName: string;
    phone1: string;
    phone2?: string;
    branch?: string;
    position?: string;
  };
} & DefaultFlatItem;
