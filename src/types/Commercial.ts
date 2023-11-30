import {
  CommercialRootCategoryTypeValues,
  TransactionTypeValues,
} from '@/src/enums/CommercialFilters';
import { AvailableCurrencies } from '@/src/types/Currency';

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
