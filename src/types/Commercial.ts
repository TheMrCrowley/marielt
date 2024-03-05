import {
  CommercialRootCategoryTypeValues,
  TransactionTypeValues,
} from '@/src/enums/CommercialFilters';
import { AvailableCurrencies } from '@/src/types/Currency';

import { ImageType, ImageTypeWithThumb } from './ImageType';
import { StrapiVideo } from './VideoLink';

export type DefaultCommercialItem = Partial<{
  address: string;
  id: string;
  price: string;
  name: string;
  image: ImageType;
  metro?: string;
  location?: {
    lng: number;
    lat: number;
  };
  initialCurrency: AvailableCurrencies;
  transactionType: TransactionTypeValues;
  parameters: Partial<{
    plotSize: string;
    floor: string;
    maxFloor: string;
    vat: string;
  }>;
  totalArea: {
    minArea?: string;
    maxArea?: string;
  };
  totalPrice: {
    from?: string;
    to?: string;
  };
  pricePerMeter: {
    from?: string;
    to?: string;
  };
}>;

export type DetailedCommercialItem = {
  isPublished: boolean;
  parameters: Partial<{
    profitability: string;
    payback: string;
    rentAmountMonth: string;
    rentAmountYear: string;
    floor: string;
    ceilingHeight: string;
    wallMaterial: string;
    constructionYear: string;
    finishing: string;
    location: string;
    isGroundFloor: boolean;
    furniture: boolean;
    separateEntrance: boolean;
    ramp: boolean;
    bathroom: boolean;
    daylight: boolean;
    equipment: boolean;
    electricity: boolean;
    heating: boolean;
    gas: boolean;
    water: boolean;
    ventilation: boolean;
    sewerage: boolean;
    vat: string;
    contractNumber: string;
  }>;
  distance?: string;
  direction?: string;
  rootType?: string;
  type?: string;
  totalArea?: {
    minArea?: string;
    maxArea?: string;
  };
  totalPrice?: {
    from?: string;
    to?: string;
  };
  pricePerMeter?: {
    from?: string;
    to?: string;
  };
  premisesArea?: {
    min: string;
    max: string;
  };
  separateRooms?: {
    from: string;
    to: string;
  };
  images: Array<ImageTypeWithThumb>;
  detailedDescription?: string;
  additionalInfo?: Array<{ name: string }>;
  note?: string;
  video: StrapiVideo;
  agents?: {
    fullName: string;
    phone1: string;
    phone2?: string;
    branch?: string;
    position?: string;
  };
  metro?: string;
} & DefaultCommercialItem;

export interface CommercialTransaction {
  transactionName: string;
  transactionId: string;
  transactionUid: TransactionTypeValues;
  commercialCategories: Array<{ categoryId: string; categoryName: string }>;
}

export interface CommercialCategory {
  categoryName: string;
  belongTo: string | null;
  categoryUid: CommercialRootCategoryTypeValues;
  isRoot: boolean;
  categoryId: string;
  commercialTransactions: Array<{
    transactionName: string;
    transactionId: string;
  }>;
}

export interface CommercialTransactionResponse {
  name: string;
  uid: TransactionTypeValues;
  comm_categories: {
    data: Array<{
      id: string;
      attributes: {
        name: string;
      };
    }>;
  };
}

export interface CommercialCategoryResponse {
  name: string;
  uid: CommercialRootCategoryTypeValues;
  category: string | null;
  comm_trans: {
    data: Array<{
      id: string;
      attributes: {
        name: string;
      };
    }>;
  };
}
