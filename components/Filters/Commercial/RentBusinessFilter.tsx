import clsx from 'clsx';
import React from 'react';

import Button from '@/components/Button';
import AreaFilter from '@/components/Filters/components/AreaFilter';
import ConstructionYearFilter from '@/components/Filters/components/ConstructionYearFilter';
import FloorsFilter from '@/components/Filters/components/FloorsFilter';
import { CommercialFiltersType, useCommercialFilters } from '@/store/commercialFilters';

import CommercialFloorFilter from './components/CommercialFloorFilter';
import PaybackFilter from './components/PaybackFilter';
import ProfitabilityFilter from './components/ProfitabilityFilter';
import PropertyTypeFilter from './components/PropertyTypeFilter';
import SeparateEntrance from './components/SeparateEntrance';
import VatToggleFilter from './components/VatToggleFilter';

interface RentBusinessFilterProps {
  applyFilters: (selectedFilters: Partial<CommercialFiltersType['filters']>) => void;
}

const RentBusinessFilter = ({ applyFilters }: RentBusinessFilterProps) => {
  const {
    filters: {
      areaFrom,
      areaTo,
      floorFrom,
      floorTo,
      isFirstFloor,
      isGroundFloor,
      constructionYearFrom,
      constructionYearTo,
      profitabilityFrom,
      profitabilityTo,
      paybackFrom,
      paybackTo,
      vat,
      separateEntrance,
      transactionType,
      rootCategoryType,
      priceFrom,
      priceTo,
      propertyType,
    },
    updateFilters,
  } = useCommercialFilters();

  const onApply = () => {
    applyFilters({
      //Default
      transactionType,
      rootCategoryType,
      priceFrom,
      priceTo,
      areaFrom,
      areaTo,
      //
      propertyType,
      floorFrom,
      floorTo,
      isFirstFloor,
      isGroundFloor,
      constructionYearFrom,
      constructionYearTo,
      profitabilityFrom,
      profitabilityTo,
      paybackFrom,
      paybackTo,
      vat,
      separateEntrance,
    });
  };

  return (
    <>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <PropertyTypeFilter />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <AreaFilter areaFrom={areaFrom} areaTo={areaTo} onChange={updateFilters} />
        <FloorsFilter floorFrom={floorFrom} floorTo={floorTo} onChange={updateFilters} />
        <CommercialFloorFilter
          floorTypes={{
            isFirstFloor: true,
            isGroundFloor: true,
            isLastFloor: false,
          }}
        />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <ConstructionYearFilter
          constructionYearFrom={constructionYearFrom}
          constructionYearTo={constructionYearTo}
          onChange={updateFilters}
        />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <ProfitabilityFilter />
        <PaybackFilter />
        <VatToggleFilter />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <SeparateEntrance />
      </div>
      <Button className={clsx('sm:self-center', 'mt-auto')} onClick={onApply}>
        Применить
      </Button>
    </>
  );
};

export default RentBusinessFilter;
