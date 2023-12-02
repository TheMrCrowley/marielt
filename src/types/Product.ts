import { AvailableCurrencies } from './Currency';

export type ProductType = 'flats' | 'commercial' | 'houses-and-lots';

export interface DefaultMapItem {
  id: string;
  price?: string;
  location?: {
    lng: number;
    lat: number;
  };
  initialCurrency: AvailableCurrencies;
}
