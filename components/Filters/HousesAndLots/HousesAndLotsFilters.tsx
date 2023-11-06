'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

import { HousesAndLotsRootCategory } from '@/enums/HousesAndLotsFilters';
import {
  createFiltersStateBySearchParams,
  formatFiltersToSearchParams,
} from '@/helpers/filterHelpers';
import { getHousesAndLotsRoute } from '@/helpers/getHousesAndLotsRoute';
import { useCurrency } from '@/store/currency';
import { HousesAndLotsFiltersType, useHousesAndLotsFilters } from '@/store/housesAndLotsFilters';

import DefaultFilters from './DefaultFilters';
import ExpandedFilters from './ExpandedFilters';

interface HousesAndLotsFiltersProps {
  type?: HousesAndLotsRootCategory;
  data: HousesAndLotsFiltersType['data'];
}

const HousesAndLotsFilters = ({ data, type }: HousesAndLotsFiltersProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { setIsExpandedOpen, setData, updateFilters, filters, isExpandedOpen } =
    useHousesAndLotsFilters();
  const { selectedCurrency } = useCurrency();

  useEffect(() => {
    const initialFilters = createFiltersStateBySearchParams(filters, searchParams);
    if (
      type &&
      type ===
        getHousesAndLotsRoute(filters.housesAndLotsRootCategory, data.housesAndLotasCategories)
    ) {
      const target = data.housesAndLotasCategories.find((category) => category.uid === type);
      updateFilters({ housesAndLotsRootCategory: target?.categoryName || '' });
      initialFilters.housesAndLotsRootCategory = target?.categoryName || '';
    }
    updateFilters({ ...initialFilters });
    setData(data);
  }, []);

  const applyFilters = (selectedFilters: Partial<typeof filters>) => {
    const [path, rootCategory] = pathname.split('/').filter(Boolean);
    if (
      filters.housesAndLotsRootCategory &&
      rootCategory !==
        getHousesAndLotsRoute(filters.housesAndLotsRootCategory, data.housesAndLotasCategories)
    ) {
      router.push(
        '/' +
          path +
          '/' +
          getHousesAndLotsRoute(filters.housesAndLotsRootCategory, data.housesAndLotasCategories) +
          '?' +
          formatFiltersToSearchParams(selectedFilters, selectedCurrency),
      );
    } else {
      router.push(
        '/' +
          path +
          (rootCategory && filters.housesAndLotsRootCategory ? `/${rootCategory}` : '') +
          '?' +
          formatFiltersToSearchParams(selectedFilters, selectedCurrency),
      );
    }
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
