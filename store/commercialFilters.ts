import { create } from 'zustand';

import { CommercialCategory, CommercialTransaction } from '@/services/commercialFilters';
import { BaseFilters } from '@/types/Filters';

export type CommercialFiltersType = BaseFilters<
  {
    // Default
    transactionType: string;
    categoryType: string;
    priceFrom: string;
    priceTo: string;
    areaFrom: string;
    areaTo: string;
    //
  },
  {
    transactions: CommercialTransaction[];
    categories: CommercialCategory[];
  }
>;

const initialCommercialFilters: CommercialFiltersType['filters'] = {
  transactionType: '',
  categoryType: '',
  priceFrom: '',
  priceTo: '',
  areaFrom: '',
  areaTo: '',
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
