'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

import {
  createFiltersStateBySearchParams,
  formatFiltersToSearchParams,
} from '@/src/helpers/filterHelpers';
import { CommercialFiltersType, useCommercialFilters } from '@/src/store/commercialFilters';
import { useCurrency } from '@/src/store/currency';

import DefaultFilters from './DefaultFilters';
import ExpandedFilters from './ExpandedFilters';

interface CommercialFilterProps {
  data: CommercialFiltersType['data'];
}

const CommercialFilters = ({ data }: CommercialFilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { setData, filters, updateFilters, setIsExpandedOpen, isExpandedOpen } =
    useCommercialFilters();
  const { selectedCurrency } = useCurrency();

  useEffect(() => {
    const initialFilters = createFiltersStateBySearchParams(filters, searchParams);

    updateFilters({ ...initialFilters });
    setData(data);
  }, []);

  const applyFilters = (selectedFilters: Partial<typeof filters>) => {
    router.push(pathname + '?' + formatFiltersToSearchParams(selectedFilters, selectedCurrency));
    router.refresh();
  };

  return (
    <>
      <DefaultFilters applyFilters={applyFilters} openModal={() => setIsExpandedOpen(true)} />
      <ExpandedFilters
        applyFilters={applyFilters}
        closeModal={() => setIsExpandedOpen(false)}
        isModalOpen={isExpandedOpen}
      />
    </>
  );
};

export default CommercialFilters;
