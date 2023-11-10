'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'qs';
import React, { useEffect } from 'react';

import {
  createFiltersStateBySearchParams,
  formatFiltersToSearchParams,
} from '@/helpers/filterHelpers';
import { CommercialFiltersType, useCommercialFilters } from '@/store/commercialFilters';
import { useCurrency } from '@/store/currency';

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
    console.log('commercial filters mounted');
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
