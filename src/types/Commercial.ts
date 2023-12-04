import {
  CommercialRootCategoryTypeValues,
  TransactionTypeValues,
} from '@/src/enums/CommercialFilters';
import { AvailableCurrencies } from '@/src/types/Currency';

import { StrapiImage } from './StrapiTypes';

export type DefaultCommercialItem = {
  address: string;
  id: string;
  price?: string;
  name?: string;
  img?: string;
  initialCurrency: AvailableCurrencies;
  transactionType: TransactionTypeValues;
  parameters: {
    totalArea: {
      minArea?: string;
      maxArea?: string;
    };
    plotSize?: string;
    floor?: string;
    maxFloor?: string;
    totalPrice: {
      from?: string;
      to?: string;
    };
    pricePerMeter: {
      from?: string;
      to?: string;
    };
  };
};

// export type DetailedCommercialItem = {
//   parameters: {
//     premises_area?:string
// separate_rooms?:string

// floor/floors_number?:string
// is_ground_floor?:string
// ceiling_height?:string
// wall_material?:string
// construction_year?:string
// finishing?:string
// equipment?:string
// daylight?:string
// electricity?:string
// heating?:string
// gas?:string
// water?:string
// bathroom?:string
// ventilation?:string
// sewerage?:string
// furniture?:string
// location?:string
// separate_entrance?:string
// ramp?:string
//   }

// } & DefaultCommercialItem

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

export interface CommercialStrapiResponse {
  locality: string;
  coordinates: string;
  district_rb?: string;
  village_council?: string;
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
