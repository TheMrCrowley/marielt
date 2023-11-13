import { HousesAndLotsRootCategory } from '@/src/enums/HousesAndLotsFilters';
import { AvailableCurrencies } from '@/src/types/Currency';

export interface DefaultHousesAndLotsItem {
  address: string;
  id: string;
  price?: string;
  name?: string;
  img?: string;
  initialCurrency: AvailableCurrencies;
  parameters: {
    plotSize?: string;
    livingArea?: string;
    kitchenArea?: string;
  };
}

export interface HousesAndLotsCategory {
  categoryName: string;
  belongTo: string | null;
  isRoot: boolean;
  uid: HousesAndLotsRootCategory;
}
