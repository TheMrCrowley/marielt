import clsx from 'clsx';
import React from 'react';

import CommercialFloorFilter from '@/src/components/CommercialFilters/CommercialFloorFilter';
import PaybackFilter from '@/src/components/CommercialFilters/PaybackFilter';
import ProfitabilityFilter from '@/src/components/CommercialFilters/ProfitabilityFilter';
import PropertyTypeFilter from '@/src/components/CommercialFilters/PropertyTypeFilter';
import SeparateEntrance from '@/src/components/CommercialFilters/SeparateEntrance';
import VatToggleFilter from '@/src/components/CommercialFilters/VatToggleFilter';
import Button from '@/src/components/common/Button';
import AreaFilter from '@/src/components/filters/AreaFilter';
import ConstructionYearFilter from '@/src/components/filters/ConstructionYearFilter';
import FloorsFilter from '@/src/components/filters/FloorsFilter';
import { CommercialFiltersType, useCommercialFilters } from '@/src/store/commercialFilters';

interface BusinessFilterProps {
  applyFilters: (selectedFilters: Partial<CommercialFiltersType['filters']>) => void;
}

const BusinessFilter = ({ applyFilters }: BusinessFilterProps) => {
  const {
    filters: {
      transactionType,
      rootCategoryType,
      priceFrom,
      priceTo,
      areaFrom,
      areaTo,
      floorFrom,
      floorTo,
      constructionYearFrom,
      constructionYearTo,
      propertyType,
      isFirstFloor,
      isGroundFloor,
      paybackFrom,
      paybackTo,
      profitabilityFrom,
      profitabilityTo,
      vat,
      separateEntrance,
      district_rb,
      region,
      street,
      locality,
      priceForMeterFrom,
      priceFromMeterTo,
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
      district_rb,
      region,
      street,
      locality,
      priceForMeterFrom,
      priceFromMeterTo,
      //
      floorFrom,
      floorTo,
      constructionYearFrom,
      constructionYearTo,
      propertyType,
      isFirstFloor,
      isGroundFloor,
      paybackFrom,
      paybackTo,
      profitabilityFrom,
      profitabilityTo,
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
          floorTypes={{ isFirstFloor: true, isGroundFloor: true, isLastFloor: false }}
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
      <SeparateEntrance />
      <Button className={clsx('sm:self-center', 'mt-auto')} onClick={onApply}>
        Применить
      </Button>
    </>
  );
};

export default BusinessFilter;
