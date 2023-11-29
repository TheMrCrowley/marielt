import {
  CommercialRootCategoryTypeValues,
  TransactionTypeValues,
} from '@/src/enums/CommercialFilters';
import { AvailableCurrencies } from '@/src/types/Currency';

export interface DefaultCommercialItem {
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
}

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