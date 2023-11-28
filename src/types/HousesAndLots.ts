import { HousesAndLotsRootCategory } from '@/src/enums/HousesAndLotsFilters';
import { AvailableCurrencies } from '@/src/types/Currency';

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
  };
};

export type DetailedHousesAndLotsItem = {
  parameters: {
    builtUpArea?: {
      length?: string;
      width?: string;
    };
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
  additionalInfo?: Array<{ name: string }>;
  note?: string;
  images?: Array<{
    width: number;
    height: number;
    url: string;
    placeholderUrl: string;
  }>;
} & DefaultHousesAndLotsItem;

export interface HousesAndLotsCategory {
  categoryName: string;
  belongTo: string | null;
  isRoot: boolean;
  uid: HousesAndLotsRootCategory;
}
