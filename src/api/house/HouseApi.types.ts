import { AvailableCurrencies } from '@/src/types/Currency';
import { DetailedHousesAndLotsItem } from '@/src/types/HousesAndLots';
import { StrapiFindOneResponse, StrapiFindResponse, StrapiImage } from '@/src/types/StrapiTypes';

interface HousesResponse {
  locality: string;
  street?: string;
  district_rb?: string;
  village_council?: string;
  distance?: string;
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
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  bargain?: boolean;
  land_status?: string;
  sale_terms?: string;
  contract_number?: string;
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
    built_up_area?: {
      length: string;
      width: string;
    };
    wall_material_add?: string;
    rooms_number?: string;
    water_add?: string;
    sewerage_add?: string;
    telephone?: string;
    balcony?: string;
    parking?: string;
    readiness_percentage?: string;
    construction_year?: string;
  };
  currency?: AvailableCurrencies;
  price: string;
  name?: string;
  additional_info?: Array<{ name: string }>;
  note?: string;
  agents: StrapiFindResponse<{
    full_name: string;
    phone1: string;
    phone2?: string;
    branch?: string;
    position?: string;
  }>;
  detailed_description?: string;
  image?: StrapiFindResponse<StrapiImage>;
  video_link?: string;
  location?: {
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  house_categories: StrapiFindResponse<{
    category?: string;
    name: string;
  }>;
  direction: StrapiFindOneResponse<{ name: string }>;
  metro?: StrapiFindOneResponse<{ name: string }>;
}

export type HouseStrapiResponse = StrapiFindOneResponse<HousesResponse>;
export type HouseItemsStrapiResponse = StrapiFindResponse<HousesResponse>;

export abstract class AbstractHouseApi {
  abstract getHouseById(id: string): Promise<HouseStrapiResponse>;
  abstract getSimilarHouses(house: DetailedHousesAndLotsItem): Promise<{
    byPrice: HouseItemsStrapiResponse;
    byLocation: HouseItemsStrapiResponse;
  }>;
  abstract getHousesForList(
    searchParams: Record<string, string | string[]>,
  ): Promise<HouseItemsStrapiResponse>;
  abstract getHousesForMap(
    searchParams: Record<string, string | string[]>,
  ): Promise<HouseItemsStrapiResponse>;
  abstract getHousesByIds(ids: string[]): Promise<HouseItemsStrapiResponse>;
  abstract getHouseByIdSeoFields(id: string): Promise<HouseStrapiResponse>;
  abstract getActualHouses(): Promise<HouseItemsStrapiResponse>;
}
