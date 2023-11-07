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
    const initialFilters = createFiltersStateBySearchParams(filters, searchParams);

    updateFilters({ ...initialFilters });
    setData(data);
  }, []);

  const applyFilters = (selectedFilters: Partial<typeof filters>) => {
    console.log(selectedFilters.propertyType);
    // console.log(formatFiltersToSearchParams(selectedFilters, selectedCurrency).toString());
    // console.log(selectedFilters);
    // parameters.premises_area.max

    // console.log(
    //   qs.stringify({
    //     filters: {
    //       parameters: {
    //         premises_area: {
    //           $or: [
    //             {
    //               max_area: {
    //                 $null: true,
    //               },
    //               min_area: {
    //                 $gte: 20,
    //                 $lte: 100,
    //               },
    //             },
    //             {
    //               max_area: {
    //                 $between: [20, 100],
    //               },
    //             },
    //             {
    //               min_area: {
    //                 $between: [20, 100],
    //               },
    //             },
    //             {
    //               max_area: {
    //                 $gte: 100,
    //                 $not: {
    //                   $lt: 20,
    //                 },
    //               },
    //               min_area: {
    //                 $lte: 20,
    //               },
    //             },
    //           ],
    //         },
    //       },
    //     },
    //   }),
    // );
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
