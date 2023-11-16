import { AvailableCurrencies } from '@/src/types/Currency';

export interface DefaultFlatItem {
  address: string;
  id: string;
  price?: string;
  name?: string;
  img?: string;
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
