import { create } from 'zustand';

import { initialFlatsFilters } from '@/types/Filters';
import { FlatsFiltersType } from '@/types/Filters';

export const useFlatsFilter = create<FlatsFiltersType>((set) => ({
  filters: initialFlatsFilters,
  data: {
    district: [],
    metro: [],
    microDistrict: [],
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
