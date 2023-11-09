import { create } from 'zustand';

import { CommercialCategory, CommercialTransaction } from '@/services/commercialFilters';
import { BaseFilters } from '@/types/Filters';

export type CommercialFiltersType = BaseFilters<
  {
    // Default
    transactionType: string;
    rootCategoryType: string;
    propertyType: string[];
    priceFrom: string;
    priceTo: string;
    areaFrom: string;
    areaTo: string;
    floorFrom: string;
    floorTo: string;
    constructionYearFrom: string;
    constructionYearTo: string;
    profitabilityFrom: string;
    profitabilityTo: string;
    paybackFrom: string;
    paybackTo: string;
    isFirstFloor: boolean;
    isLastFloor: boolean;
    isGroundFloor: boolean;
    vat: boolean;
    separateEntrance: boolean;
    commercialLocation: string[];
    separateRoomsFrom: string;
    separateRoomsTo: string;
    ceilingHeightFrom: string;
    ceilingHeightTo: string;
    finishing: string[];
    bathroom: boolean;
    furniture: boolean;
    ramp: boolean;
    plotAreaFrom: string;
    plotAreaTo: string;
    wallMaterial: string[];
    directions: string[];
    distance: string;
    heating: boolean;
    water: boolean;
    sewerage: boolean;
    electricity: boolean;
    gas: boolean;
    //
  },
  {
    transactions: CommercialTransaction[];
    categories: CommercialCategory[];
    directions: string[];
  }
>;

const initialCommercialFilters: CommercialFiltersType['filters'] = {
  transactionType: '',
  rootCategoryType: '',
  propertyType: [],
  priceFrom: '',
  priceTo: '',
  areaFrom: '',
  areaTo: '',
  floorFrom: '',
  floorTo: '',
  isFirstFloor: false,
  isLastFloor: false,
  isGroundFloor: false,
  constructionYearFrom: '',
  constructionYearTo: '',
  profitabilityFrom: '',
  profitabilityTo: '',
  paybackFrom: '',
  paybackTo: '',
  vat: false,
  separateEntrance: false,
  commercialLocation: [],
  separateRoomsFrom: '',
  separateRoomsTo: '',
  ceilingHeightFrom: '',
  ceilingHeightTo: '',
  finishing: [],
  bathroom: false,
  furniture: false,
  ramp: false,
  plotAreaFrom: '',
  plotAreaTo: '',
  wallMaterial: [],
  directions: [],
  distance: '',
  heating: false,
  water: false,
  sewerage: false,
  electricity: false,
  gas: false,
};

export const useCommercialFilters = create<CommercialFiltersType>((set) => ({
  filters: initialCommercialFilters,
  data: {
    transactions: [],
    categories: [],
    directions: [],
  },
  updateFilters: (update) => {
    set((prev) => ({
      filters: {
        ...prev.filters,
        ...update,
      },
    }));
  },
  setData: (data) => {
    console.log('set commercial data');
    set({ data });
  },
  isExpandedOpen: false,
  setIsExpandedOpen: (isExpandedOpen) => set({ isExpandedOpen }),
}));
