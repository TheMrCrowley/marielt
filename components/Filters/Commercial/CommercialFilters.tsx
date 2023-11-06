'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

import { createFiltersStateBySearchParams } from '@/helpers/filterHelpers';
import { CommercialFiltersType, useCommercialFilters } from '@/store/commercialFilters';

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

  useEffect(() => {
    const initialFilters = createFiltersStateBySearchParams(filters, searchParams);

    updateFilters({ ...initialFilters });
    setData(data);
  }, []);

  return (
    <>
      <DefaultFilters applyFilters={() => {}} openModal={() => setIsExpandedOpen(true)} />
      <ExpandedFilters
        applyFilters={() => {}}
        closeModal={() => setIsExpandedOpen(false)}
        isModalOpen={isExpandedOpen}
      />
    </>
  );
};

export default CommercialFilters;
