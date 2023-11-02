'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

import {
  HousesAndLotsType,
  getRouteByHouseType,
  housesAndLotsTypeMap,
} from '@/enums/HousesAndLotsFilters';
import {
  createFiltersStateBySearchParams,
  formatFiltersToSearchParams,
} from '@/helpers/filterHelpers';
import { useCurrency } from '@/store/currency';
import { useHousesAndLotsFilters } from '@/store/housesAndLotsFilters';
import { HousesAndLotsFiltersType } from '@/types/Filters';

import DefaultFilters from './DefaultFilters';
import ExpandedFilters from './ExpandedFilters';

interface HousesAndLotsFiltersProps {
  type?: HousesAndLotsType;
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
    if (type) {
      updateFilters({ housesAndLotsType: housesAndLotsTypeMap[type] });
      initialFilters.housesAndLotsType = housesAndLotsTypeMap[type];
    }
    updateFilters({ ...initialFilters });
    setData(data);
  }, []);

  const applyFilters = () => {
    const [path, houseType] = pathname.split('/').filter(Boolean);

    if (houseType !== getRouteByHouseType(filters.housesAndLotsType)) {
      router.push(
        '/' +
          path +
          '/' +
          getRouteByHouseType(filters.housesAndLotsType) +
          '?' +
          formatFiltersToSearchParams(filters, selectedCurrency),
      );
    } else {
      router.push('/' + path + '?' + formatFiltersToSearchParams(filters, selectedCurrency));
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
