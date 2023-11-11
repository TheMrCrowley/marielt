import clsx from 'clsx';
import React from 'react';

import CommercialRootCategoryTypeFilter from '@/src/components/CommercialFilters/CommercialRootCategoryTypeFilter';
import CommercialTransactionTypeFilter from '@/src/components/CommercialFilters/CommercialTransactionTypeFilter';
import Button from '@/src/components/common/Button';
import AreaFilter from '@/src/components/filters/AreaFilter';
import DefaultFiltersWrapper from '@/src/components/filters/DefaultFiltersWrapper';
import PriceFilter from '@/src/components/filters/PriceFilter';
import { CommercialFiltersType, useCommercialFilters } from '@/src/store/commercialFilters';

interface DefaultFiltersProps {
  openModal: () => void;
  applyFilters: (selectedFilters: Partial<CommercialFiltersType['filters']>) => void;
}

const DefaultFilters = ({ applyFilters, openModal }: DefaultFiltersProps) => {
  const {
    updateFilters,
    filters: { priceFrom, priceTo, areaFrom, areaTo, transactionType, rootCategoryType },
  } = useCommercialFilters();

  const onApply = () => {
    applyFilters({
      transactionType,
      rootCategoryType,
      priceFrom,
      priceTo,
      areaFrom,
      areaTo,
    });
  };

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
        <CommercialTransactionTypeFilter />
        <CommercialRootCategoryTypeFilter />
        <PriceFilter onChange={updateFilters} priceFrom={priceFrom} priceTo={priceTo} />
        <AreaFilter onChange={updateFilters} areaFrom={areaFrom} areaTo={areaTo} />
      </div>
      <Button className={clsx('md:self-end', 'flex-1', 'w-full')} onClick={onApply}>
        Применить
      </Button>
    </DefaultFiltersWrapper>
  );
};

export default DefaultFilters;
