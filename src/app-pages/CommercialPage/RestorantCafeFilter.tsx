import clsx from 'clsx';
import React from 'react';

import CommercialBathroomToggle from '@/src/components/CommercialFilters/CommercialBathroomToggle';
import CommercialCeilingHeight from '@/src/components/CommercialFilters/CommercialCeilingHeight';
import CommercialFinishingFilter from '@/src/components/CommercialFilters/CommercialFinishingFilter';
import CommercialFloorFilter from '@/src/components/CommercialFilters/CommercialFloorFilter';
import CommercialLocationFilter from '@/src/components/CommercialFilters/CommercialLocationFilter';
import CommercialRampToggle from '@/src/components/CommercialFilters/CommercialRampToggle';
import SeparateEntrance from '@/src/components/CommercialFilters/SeparateEntrance';
import VatToggleFilter from '@/src/components/CommercialFilters/VatFilter';
import Button from '@/src/components/common/Button';
import AreaFilter from '@/src/components/filters/AreaFilter';
import ConstructionYearFilter from '@/src/components/filters/ConstructionYearFilter';
import FloorsFilter from '@/src/components/filters/FloorsFilter';
import {
  CommercialFiltersType,
  getCommercialFiltersToApply,
  getCommercialRootCategoryUid,
  getTransactionTypeUid,
  useCommercialFilters,
} from '@/src/store/commercialFilters';

interface RestorantCafeFilterProps {
  applyFilters: (selectedFilters: Partial<CommercialFiltersType['filters']>) => void;
}

const RestorantCafeFilter = ({ applyFilters }: RestorantCafeFilterProps) => {
  const {
    filters,
    updateFilters,
    data: { categories, transactions },
  } = useCommercialFilters();

  const {
    transactionType,
    rootCategoryType,
    areaFrom,
    areaTo,
    floorFrom,
    floorTo,
    constructionYearFrom,
    constructionYearTo,
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
        <CommercialLocationFilter />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <AreaFilter areaFrom={areaFrom} areaTo={areaTo} onChange={updateFilters} />
        <FloorsFilter floorFrom={floorFrom} floorTo={floorTo} onChange={updateFilters} />
        <CommercialFloorFilter
          floorTypes={{
            isFirstFloor: true,
            isLastFloor: false,
            isGroundFloor: true,
          }}
        />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <CommercialCeilingHeight />
        <ConstructionYearFilter
          constructionYearFrom={constructionYearFrom}
          constructionYearTo={constructionYearTo}
          onChange={updateFilters}
        />
        <CommercialFinishingFilter />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <VatToggleFilter />

        <CommercialBathroomToggle />
        <SeparateEntrance />
        <CommercialRampToggle />
      </div>
      <Button className={clsx('sm:self-center', 'mt-auto')} onClick={onApply}>
        Применить
      </Button>
    </>
  );
};

export default RestorantCafeFilter;
