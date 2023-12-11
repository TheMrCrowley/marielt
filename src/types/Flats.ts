import { AvailableCurrencies } from '@/src/types/Currency';

import { StrapiFindResponse, StrapiImage } from './StrapiTypes';
import { StrapiVideo } from './VideoLink';

export type DefaultFlatItem = {
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
  };
  detailedDescription?: string;
  additionalInfo: Array<{ name: string }>;
  note?: string;
  images: Array<{
    width: number;
    height: number;
    url: string;
    placeholderUrl: string;
  }>;
  video?: StrapiVideo;
  agents?: {
    fullName: string;
    phone1: string;
    phone2?: string;
    branch?: string;
    position?: string;
  };
} & DefaultFlatItem;

export interface FlatStrapiResponse {
  parameters: {
    total_area: string;
    living_area: string;
    floors_number: string;
    floor: string;
    roominess: string;
    balcony: string;
    construction_year?: string;
    major_renovation_year?: string;
    finishing?: string;
    house_type?: string;
    kitchen_area?: string;
    ceiling_height?: string;
    bathroom?: string;
    separate_rooms?: string;
    share_in_apartment?: string;
    floor_type?: string;
    balcony_area?: string;
    snb_area?: string;
    flooring?: string;
    telephone?: string;
    layout?: string;
    level_number?: string;
  };
  additional_info?: Array<{ name: string }>;
  note: string;
  village_council?: string;
  district?: {
    data: {
      attributes: {
        name: string;
      };
    };
  };
  microdistrict?: {
    data: {
      attributes: {
        name: string;
      };
    };
  };
  coordinates: string;
  locality: string;
  street?: string;
  district_rb?: string;
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
  currency?: AvailableCurrencies;
  price?: string;
  name?: string;
  image: {
    data: Array<{
      attributes: StrapiImage;
    }>;
  };
  detailed_description?: string;
  location?: {
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  agents?: StrapiFindResponse<{
    full_name: string;
    phone1: string;
    phone2?: string;
    branch?: string;
    position?: string;
  }>;
  video_link?: string;
}
