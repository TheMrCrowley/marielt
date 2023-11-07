import clsx from 'clsx';
import React from 'react';

import Button from '@/components/Button';
import DefaultFiltersWrapper from '@/components/Filters/DefaultFiltersWrapper';
import AreaFilter from '@/components/Filters/components/AreaFilter';
import PriceFilter from '@/components/Filters/components/PriceFilter';
import { CommercialFiltersType, useCommercialFilters } from '@/store/commercialFilters';

import CommercialCategoryTypeFilter from './components/CommercialRootCategoryTypeFilter';
import CommercialRootCategoryTypeFilter from './components/CommercialTransactionTypeFilter';
import PropertyTypeFilter from './components/PropertyTypeFilter';

interface DefaultFiltersProps {
  openModal: () => void;
  applyFilters: (selectedFilters: Partial<CommercialFiltersType['filters']>) => void;
}

const DefaultFilters = ({ applyFilters, openModal }: DefaultFiltersProps) => {
  const {
    updateFilters,
    filters: { priceFrom, priceTo, areaFrom, areaTo },
  } = useCommercialFilters();

  return (
    <DefaultFiltersWrapper openModal={openModal}>
      <div
        className={clsx(
          'flex',
          'gap-9',
          'flex-wrap',
          'w-full',
          'md:items-end',
          'md:justify-between',
          'md:flex-row',
          'flex-col',
        )}
      >
        <CommercialRootCategoryTypeFilter />
        <CommercialCategoryTypeFilter />
        <PriceFilter onChange={updateFilters} priceFrom={priceFrom} priceTo={priceTo} />
        <AreaFilter onChange={updateFilters} areaFrom={areaFrom} areaTo={areaTo} />
      </div>
      <Button className={clsx('md:self-end', 'flex-1', 'w-full')} onClick={() => {}}>
        Применить
      </Button>
    </DefaultFiltersWrapper>
  );
};

export default DefaultFilters;
