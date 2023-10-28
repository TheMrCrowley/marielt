'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useLayoutEffect } from 'react';

import {
  createFiltersStateBySearchParams,
  formatFiltersToSearchParams,
} from '@/helpers/filterHelpers';
import { useCurrency } from '@/store/currency';
import { useFlatsFilter } from '@/store/flatsFilters';
import { FlatsFiltersType } from '@/types/Filters';

import DefaultFilters from './DefaultFilters';
import ExpandedFilters from './ExpandedFilters';

interface FlatsFiltersProps {
  data: FlatsFiltersType['data'];
}

const FlatsFilters = ({ data }: FlatsFiltersProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { setData, isExpandedOpen, setIsExpandedOpen, updateFilters, filters } = useFlatsFilter();
  const { selectedCurrency } = useCurrency();

  useLayoutEffect(() => {
    updateFilters({ ...createFiltersStateBySearchParams(filters, searchParams) });
    setData(data);
  }, []);

  const applyFilters = () => {
    router.push(pathname + '?' + formatFiltersToSearchParams(filters, selectedCurrency));
    router.refresh();
  };

  return (
    <>
      <DefaultFilters openModal={() => setIsExpandedOpen(true)} applyFilters={applyFilters} />
      <ExpandedFilters
        closeModal={() => setIsExpandedOpen(false)}
        isModalOpen={isExpandedOpen}
        applyFilters={applyFilters}
      />
    </>
  );
};

export default FlatsFilters;
