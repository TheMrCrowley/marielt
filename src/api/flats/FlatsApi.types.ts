import { AvailableCurrencies } from '@/src/types/Currency';
import { DetailedFlatItem } from '@/src/types/Flats';
import { StrapiFindOneResponse, StrapiFindResponse, StrapiImage } from '@/src/types/StrapiTypes';

interface FlatResponse {
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
    parking?: boolean;
    is_last_floor?: boolean;
    furniture?: boolean;
  };
  bargain?: boolean;
  property_type?: string;
  sale_terms?: string;
  contract_number?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
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
  metro?: {
    data: {
      attributes: {
        name: string;
      };
    };
  };
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
  image: StrapiFindResponse<StrapiImage>;
  detailed_description?: string;
  publishedAt: string | null;
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

export type FlatStrapiResponse = StrapiFindOneResponse<FlatResponse>;
export type FlatItemsStrapiResponse = StrapiFindResponse<FlatResponse>;

export abstract class AbstractFlatsApi {
  abstract getFlatById(id: string): Promise<FlatStrapiResponse>;
  abstract getSimilarFlats(flat: DetailedFlatItem): Promise<{
    byPrice: FlatItemsStrapiResponse;
    byLocation: FlatItemsStrapiResponse;
    byLayout: FlatItemsStrapiResponse;
  }>;
  abstract getFlatsForList(
    searchParams: Record<string, string | string[]>,
  ): Promise<FlatItemsStrapiResponse>;
  abstract getFlatsForMap(
    searchParams: Record<string, string | string[]>,
  ): Promise<FlatItemsStrapiResponse>;
  abstract getFlatsByIds(ids: string[]): Promise<FlatItemsStrapiResponse>;
  abstract getFlatByIdSeoData(id: string): Promise<FlatStrapiResponse>;
  abstract getActualFlats(): Promise<FlatItemsStrapiResponse>;
}
