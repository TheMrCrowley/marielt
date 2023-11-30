import { AvailableCurrencies } from '@/src/types/Currency';

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

export interface DefaultMapFlatItem {
  id: string;
  price?: string;
  location?: {
    lng: number;
    lat: number;
  };
  initialCurrency: AvailableCurrencies;
}

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
  agents: {
    fullName: string;
    phone1: string;
    phone2?: string;
    branch?: string;
    position?: string;
  };
} & DefaultFlatItem;
