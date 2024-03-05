import { TransactionTypeValues } from '@/src/enums/CommercialFilters';
import { DetailedCommercialItem } from '@/src/types/Commercial';
import { AvailableCurrencies } from '@/src/types/Currency';
import { StrapiFindResponse, StrapiImage, StrapiFindOneResponse } from '@/src/types/StrapiTypes';

type CommercialResponse = Partial<{
  publishedAt: string | null;
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
  metro: StrapiFindOneResponse<{ name: string }>;
  contract_number: string;
}>;

export type CommercialStrapiResponse = StrapiFindOneResponse<CommercialResponse>;
export type CommercialItemsStrapiResponse = StrapiFindResponse<CommercialResponse>;

export abstract class AbstractCommercialApi {
  abstract getCommercialById(id: string): Promise<CommercialStrapiResponse>;
  abstract getSimilarCommercial(commercial: DetailedCommercialItem): Promise<{
    byPrice: CommercialItemsStrapiResponse;
    byLocation: CommercialItemsStrapiResponse;
  }>;
  abstract getCommercialForList(
    searchParams: Record<string, string | string[]>,
  ): Promise<CommercialItemsStrapiResponse>;
  abstract getCommercialForMap(
    searchParams: Record<string, string | string[]>,
  ): Promise<CommercialItemsStrapiResponse>;
  abstract getCommercialByIds(ids: string[]): Promise<CommercialItemsStrapiResponse>;
  abstract getCommercialByIdSeoFields(id: string): Promise<CommercialStrapiResponse>;
  abstract getActualCommercial(): Promise<CommercialItemsStrapiResponse>;
}
