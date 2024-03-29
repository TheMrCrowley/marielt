import clsx from 'clsx';
import React from 'react';

import CommercialDistanceFilter from '@/src/components/CommercialFilters/CommercialDistanceFilter';
import PropertyTypeFilter from '@/src/components/CommercialFilters/PropertyTypeFilter';
import VatToggleFilter from '@/src/components/CommercialFilters/VatFilter';
import Button from '@/src/components/common/Button';
import DirectionFilter from '@/src/components/filters/DirectionFilter';
import PlotAreaFilter from '@/src/components/filters/PlotAreaFilter';
import {
  CommercialFiltersType,
  getCommercialFiltersToApply,
  getCommercialRootCategoryUid,
  getTransactionTypeUid,
  useCommercialFilters,
} from '@/src/store/commercialFilters';

interface PlotsFiltersProps {
  applyFilters: (selectedFilters: Partial<CommercialFiltersType['filters']>) => void;
}

const PlotsFilters = ({ applyFilters }: PlotsFiltersProps) => {
  const {
    filters,
    data: { directions: directionOptions, categories, transactions },
    updateFilters,
  } = useCommercialFilters();

  const { plotAreaFrom, plotAreaTo, distance, directions, transactionType, rootCategoryType } =
    filters;

  const onApply = () => {
    const selectedTransactionType = getTransactionTypeUid(transactions, transactionType);
    const selectedRootCategory = getCommercialRootCategoryUid(categories, rootCategoryType);

    const filtersToApply = getCommercialFiltersToApply(
      selectedTransactionType,
      selectedRootCategory,
      filters,
    );
    applyFilters(filtersToApply);
  };

  return (
    <>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <PropertyTypeFilter />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <PlotAreaFilter
          plotAreaFrom={plotAreaFrom}
          plotAreaTo={plotAreaTo}
          onChange={updateFilters}
        />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <DirectionFilter
          directions={directionOptions}
          onChange={updateFilters}
          values={directions}
        />
        <CommercialDistanceFilter distance={distance} onChange={updateFilters} />
        <VatToggleFilter />
      </div>
      <Button className={clsx('sm:self-center', 'mt-auto')} onClick={onApply}>
        Применить
      </Button>
    </>
  );
};

export default PlotsFilters;
