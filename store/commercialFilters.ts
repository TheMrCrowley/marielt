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
    //
  },
  {
    transactions: CommercialTransaction[];
    categories: CommercialCategory[];
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
  constructionYearFrom: '',
  constructionYearTo: '',
  profitabilityFrom: '',
  profitabilityTo: '',
  paybackFrom: '',
  paybackTo: '',
  isFirstFloor: false,
  isLastFloor: false,
  isGroundFloor: false,
  vat: false,
  separateEntrance: false,
};

export const useCommercialFilters = create<CommercialFiltersType>((set) => ({
  filters: initialCommercialFilters,
  data: {
    transactions: [],
    categories: [],
  },
  updateFilters: (update) => {
    set((prev) => ({
      filters: {
        ...prev.filters,
        ...update,
      },
    }));
  },
  setData: (data) => set({ data }),
  isExpandedOpen: false,
  setIsExpandedOpen: (isExpandedOpen) => set({ isExpandedOpen }),
}));
