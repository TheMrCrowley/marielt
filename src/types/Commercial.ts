import {
  CommercialRootCategoryTypeValues,
  TransactionTypeValues,
} from '@/src/enums/CommercialFilters';
import { AvailableCurrencies } from '@/src/types/Currency';

import { ImageType, ImageTypeWithThumb } from './ImageType';
import { StrapiFindOneResponse, StrapiFindResponse, StrapiImage } from './StrapiTypes';
import { StrapiVideo } from './VideoLink';

export type DefaultCommercialItem = Partial<{
  address: string;
  id: string;
  price: string;
  name: string;
  image: ImageType;
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

export type CommercialStrapiResponse = Partial<{
  locality: string;
  street: string;
  house_number: Partial<{
    building: string;
    number: string;
  }>;
  district_rb: string;
  parameters: Partial<{
    floor: string;
    floors_number: string;
    ceiling_height: string;
    wall_material: string;
    construction_year: string;
    finishing: string;
    plot_size: string;
    location: string;
    is_ground_floor: boolean;
    furniture: boolean;
    is_last_floor: boolean;
    separate_entrance: boolean;
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
    premises_area: {
      min_area: string;
      max_area: string;
    };
    separate_rooms: {
      from: string;
      to: string;
    };
    vat: string;
  }>;
  name: string;
  note: string;
  additional_info: Array<{ name: string }>;
  image: StrapiFindResponse<StrapiImage>;
  ownership: string;
  price_total: Partial<{
    from: string;
    to: string;
  }>;
  price_meter: Partial<{
    from: string;
    to: string;
  }>;
  commercial_phone: string;
  do_metro: Partial<{
    from: string;
    to: string;
  }>;
  home_page: boolean;
  currency: AvailableCurrencies;
  distance: string;
  business: Partial<{
    profitability: string;
    payback: string;
    rent_amount_month: string;
    rent_amount_year: string;
  }>;
  validity: Partial<{
    from: string;
    to: string;
  }>;
  village_council: string;
  agents: StrapiFindResponse<{
    full_name: string;
    phone1: string;
    phone2: string;
    branch: string;
    position: string;
  }>;
  comm_categories: StrapiFindResponse<{ name: string; category: string | null }>;
  region: StrapiFindOneResponse<{ name: string }>;
  microdistrict: StrapiFindOneResponse<{ name: string }>;
  district: StrapiFindOneResponse<{ name: string }>;
  direction: StrapiFindOneResponse<{ name: string }>;
  comm_tran: StrapiFindOneResponse<{ uid: TransactionTypeValues; name: string }>;
  location: {
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  detailed_description: string;
  video_link: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };

  // comm_group
  // metro
  // contract_number: string;
  // comment: string;
  // status: string;
  // deletion_reason: string;
}>;
