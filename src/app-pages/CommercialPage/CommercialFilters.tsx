'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

import { SortValues } from '@/src/enums/SortOptions';
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
  const { setData, filters, updateFilters, setIsExpandedOpen, isExpandedOpen, updateTags } =
    useCommercialFilters();
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

  const applyFilters = (
    selectedFilters: Partial<typeof filters>,
    searchFilters?: Partial<typeof filters>,
  ) => {
    console.log(searchParams.get('sort') as SortValues);
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

export default CommercialFilters;
