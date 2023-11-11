'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

import { HousesAndLotsRootCategory } from '@/src/enums/HousesAndLotsFilters';
import {
  createFiltersStateBySearchParams,
  formatFiltersToSearchParams,
} from '@/src/helpers/filterHelpers';
import { getHousesAndLotsRoute } from '@/src/helpers/getHousesAndLotsRoute';
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
  const { setIsExpandedOpen, setData, updateFilters, filters, isExpandedOpen } =
    useHousesAndLotsFilters();
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

export default HousesAndLotsFilters;
