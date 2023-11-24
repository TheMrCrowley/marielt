import { AvailableCurrencies } from '@/src/types/Currency';

export interface DefaultFlatItem {
  address: string;
  id: string;
  price?: string;
  name?: string;
  image?: {
    url: string;
    width: number;
    height: number;
    placeholderUrl: string;
  };
  initialCurrency: AvailableCurrencies;
  parameters: {
    totalArea: string;
    floor: string;
    maxFloor: string;
    livingArea: string;
  };
  location?: {
    lng: number;
    lat: number;
  };
}
