import clsx from 'clsx';
import React from 'react';

import PropertyTypeFilter from '@/src/components/CommercialFilters/PropertyTypeFilter';
import Button from '@/src/components/common/Button';
import AreaFilter from '@/src/components/filters/AreaFilter';
import ConstructionYearFilter from '@/src/components/filters/ConstructionYearFilter';
import {
  CommercialRootCategoryTypeValues,
  TransactionTypeValues,
} from '@/src/enums/CommercialFilters';
import {
  CommercialFiltersType,
  getCommercialFiltersToApply,
  getCommercialRootCategoryUid,
  getTransactionTypeUid,
  useCommercialFilters,
} from '@/src/store/commercialFilters';

interface GarageFilterProps {
  applyFilters: (selectedFilters: Partial<CommercialFiltersType['filters']>) => void;
}

const GarageFilter = ({ applyFilters }: GarageFilterProps) => {
  const {
    filters,
    updateFilters,
    data: { categories, transactions },
  } = useCommercialFilters();

  const {
    areaFrom,
    areaTo,
    constructionYearFrom,
    constructionYearTo,
    transactionType,
    rootCategoryType,
  } = filters;

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
        <AreaFilter areaFrom={areaFrom} areaTo={areaTo} onChange={updateFilters} />
        <ConstructionYearFilter
          constructionYearFrom={constructionYearFrom}
          constructionYearTo={constructionYearTo}
          onChange={updateFilters}
        />
      </div>
      <Button className={clsx('sm:self-center', 'mt-auto')} onClick={onApply}>
        Применить
      </Button>
    </>
  );
};

export default GarageFilter;
