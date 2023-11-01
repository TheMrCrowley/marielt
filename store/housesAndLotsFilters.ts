import { create } from 'zustand';

import { HousesAndLotsFiltersType, initialHousesAndLotsFilters } from '@/types/Filters';

export const useHousesAndLotsFilters = create<HousesAndLotsFiltersType>((set) => ({
  filters: initialHousesAndLotsFilters,
  data: {
    directions: [],
    houseTypes: [],
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
