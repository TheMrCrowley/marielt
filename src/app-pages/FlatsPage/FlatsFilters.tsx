'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

import { SortValues } from '@/src/enums/SortOptions';
import {
  createFiltersStateBySearchParams,
  formatFiltersToSearchParams,
} from '@/src/helpers/filterHelpers';
import { useCurrency } from '@/src/store/currency';
import { FlatsFiltersType, useFlatsFilter } from '@/src/store/flatsFilters';

import DefaultFilters from './components/DefaultFilters';
import ExpandedFilters from './components/ExpandedFilters';

interface FlatsFiltersProps {
  data: FlatsFiltersType['data'];
}

const FlatsFilters = ({ data }: FlatsFiltersProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { setData, isExpandedOpen, setIsExpandedOpen, updateFilters, filters, updateTags } =
    useFlatsFilter();
  const { selectedCurrency } = useCurrency();

  useEffect(() => {
    const initialFilters = createFiltersStateBySearchParams(filters, searchParams);
    updateFilters({ ...initialFilters });
    setData(data);
  }, []);

  useEffect(() => {
    const initialFilters = createFiltersStateBySearchParams(filters, searchParams);

    updateTags(
      {
        ...initialFilters,
      },
      selectedCurrency,
    );
  }, [searchParams]);

  const applyFilters = (searchFilters?: Partial<typeof filters>): string => {
    return (
      pathname +
      '?' +
      formatFiltersToSearchParams(
        { ...filters, ...searchFilters },
        selectedCurrency,
        searchParams.get('sort') as SortValues,
      )
    );
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
