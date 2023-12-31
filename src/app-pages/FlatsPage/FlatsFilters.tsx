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

import DefaultFilters from './DefaultFilters';
import ExpandedFilters from './ExpandedFilters';

interface FlatsFiltersProps {
  data: FlatsFiltersType['data'];
}

const FlatsFilters = ({ data }: FlatsFiltersProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
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

  useEffect(() => {
    router.prefetch(
      pathname +
        '?' +
        formatFiltersToSearchParams(
          { ...filters },
          selectedCurrency,
          searchParams.get('sort') as SortValues,
        ),
    );
  }, [filters]);

  const applyFilters = (searchFilters?: Partial<typeof filters>) => {
    router.push(
      pathname +
        '?' +
        formatFiltersToSearchParams(
          { ...filters, ...searchFilters },
          selectedCurrency,
          searchParams.get('sort') as SortValues,
        ),
    );
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
