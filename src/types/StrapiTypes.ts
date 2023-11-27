import { AppRoutes } from '@/src/enums/AppRoutes';
import {
  CommercialRootCategoryTypeValues,
  TransactionTypeValues,
} from '@/src/enums/CommercialFilters';
import { HousesAndLotsRootCategory } from '@/src/enums/HousesAndLotsFilters';
import { AvailableCurrencies } from '@/src/types/Currency';

export interface StrapiFindResponse<T> {
  data: Array<{
    id: string;
    attributes: T;
  }>;
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

export interface StrapiFindOneResponse<T> {
  data: {
    id: string;
    attributes: T;
  };
}

export interface HomePageItemResponse {
  title: string;
  navigation_title: string;
  description: string;
  variant: 'primary' | 'secondary';
  to: AppRoutes;
  type: 'product' | 'opportunity';
  image: {
    data: {
      attributes: StrapiImage;
    };
  };
}

export interface StrapiImage {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  placeholder: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: ProviderMetadata;
  createdAt: string;
  updatedAt: string;
}

interface Formats {
  small: Format;
  medium: Format;
  thumbnail: Format;
}

interface Format {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  provider_metadata: ProviderMetadata;
}

interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

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
  location?: {
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

export interface CommercialStrapiResponse {
  locality: string;
  coordinates: string;
  district_rb?: string;
  region?: {
    data: {
      attributes: {
        name: string;
      };
    };
  };
  parameters: {
    premises_area?: {
      min_area: string;
      max_area?: string;
    };
    separate_rooms?: {
      from?: string;
      to?: string;
    };
    plot_size?: string;
    floor?: string;
    floors_number?: string;
    ceiling_height?: string;
    wall_material?: string;
    construction_year?: string;
    finishing?: string;
    equipment?: boolean;
    daylight?: boolean;
    electricity?: boolean;
    heating?: boolean;
    gas?: boolean;
    water?: boolean;
    bathroom?: boolean;
    ventilation?: boolean;
    is_ground_floor?: boolean;
    sewerage?: boolean;
    furniture?: boolean;
    is_last_floor?: boolean;
    location?: string;
    separate_entrance?: boolean;
    ramp?: boolean;
  };
  business?: {
    profitability: string;
    payback: string;
    vat: string;
    rent_amount_month: string;
    rent_amount_year: string;
  };
  price_total?: {
    from?: string;
    to?: string;
  };
  price_meter?: {
    from?: string;
    to?: string;
  };
  commercial_phone: string;
  home_page: boolean;
  currency?: AvailableCurrencies;
  price?: string;
  name?: string;
  image?: StrapiImage;
  street?: string;
  house_number?: {
    number: string;
    building: string;
  };
  comm_tran: {
    data: {
      attributes: {
        uid: TransactionTypeValues;
      };
    };
  };
}

export interface HousesAndLotsStrapiResponse {
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
  };
  currency?: AvailableCurrencies;
  price: string;
  image?: StrapiImage;
  name?: string;
}

export interface DistrictResponse {
  name: string;
  microdistricts: {
    data: Array<{
      id: string;
      attributes: {
        name: string;
      };
    }>;
  };
}

export interface MicroDistrictResponse {
  name: string;
  district: {
    data: {
      id: string;
      attributes: {
        name: string;
      };
    };
  };
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

export interface DirectionResponse {
  name: string;
  id: number;
}

export interface HousesAndLotsCategoryResponse {
  name: string;
  category: string | null;
  uid: HousesAndLotsRootCategory;
}

export interface CreditStrapiResponse {
  interest_rate: number;
}
