'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

import { SortValues } from '@/src/enums/SortOptions';
import {
  createFiltersStateBySearchParams,
  formatFiltersToSearchParams,
} from '@/src/helpers/filterHelpers';
import { useCurrency } from '@/src/store/currency';
import {
  HousesAndLotsFiltersType,
  useHousesAndLotsFilters,
} from '@/src/store/housesAndLotsFilters';

import DefaultFilters from './DefaultFilters';
import ExpandedFilters from './ExpandedFilters';

interface HousesAndLotsFiltersProps {
  data: HousesAndLotsFiltersType['data'];
}

const HousesAndLotsFilters = ({ data }: HousesAndLotsFiltersProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { setIsExpandedOpen, setData, updateFilters, filters, isExpandedOpen, updateTags } =
    useHousesAndLotsFilters();
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
    const url =
      pathname +
      '?' +
      formatFiltersToSearchParams(
        filters,
        selectedCurrency,
        searchParams.get('sort') as SortValues,
      );

    router.prefetch(url);
  }, [filters]);

  const applyFilters = (
    selectedFilters: Partial<typeof filters>,
    searchFilters?: Partial<typeof filters>,
  ) => {
    router.push(
      pathname +
        '?' +
        formatFiltersToSearchParams(
          { ...selectedFilters, ...searchFilters },
          selectedCurrency,
          searchParams.get('sort') as SortValues,
        ),
    );
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

export default HousesAndLotsFilters;
