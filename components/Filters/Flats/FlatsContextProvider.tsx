import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PropsWithChildren, createContext, useState } from 'react';

import {
  createFiltersStateBySearchParams,
  formatFiltersToSearchParams,
} from '@/helpers/filterHelpers';
import { FlatsFiltersType } from '@/types/Filters';

export const FlatsFiltersContext = createContext<FlatsFiltersType>({} as FlatsFiltersType);

const initialFilters: FlatsFiltersType['filters'] = {
  areaFrom: '',
  areaTo: '',
  priceFrom: '',
  priceTo: '',

  currency: 'USD',
  district: [],
  roominess: [],
  microDistrict: [],
  metro: [],

  floorFrom: '',
  floorTo: '',
  isLastFloor: false,
  isNotFirstFloor: false,
  isNotLastFloor: false,
  maxFloorsFrom: '',
  maxFloorsTo: '',
  houseType: [],
  ceilingHeight: '',
  kitchenAreaFrom: '',
  kitchenAreaTo: '',
  livingAreaFrom: '',
  livingAreaTo: '',
  bathroom: [],
  finishing: [],
  constructionYearFrom: '',
  constructionYearTo: '',
  renovationYearFrom: '',
  renovationYearTo: '',
  balcony: [],
  saleTerm: [],
  furniture: false,
  parking: false,
};

interface FlatsContextProviderProps extends PropsWithChildren {
  filtersData: FlatsFiltersType['data'];
}

const FlatsContextProvider = ({ children, filtersData }: FlatsContextProviderProps) => {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FlatsFiltersType['filters']>(
    !searchParams.size
      ? initialFilters
      : createFiltersStateBySearchParams(initialFilters, searchParams),
  );
  const router = useRouter();
  const pathname = usePathname();

  const updateFilters: FlatsFiltersType['updateFilters'] = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const applyFilters = () => {
    router.push(pathname + '?' + formatFiltersToSearchParams(filters));
  };

  return (
    <FlatsFiltersContext.Provider
      value={{
        applyFilters,
        filters,
        updateFilters,
        data: {
          ...filtersData,
        },
      }}
    >
      {children}
    </FlatsFiltersContext.Provider>
  );
};

export default FlatsContextProvider;
