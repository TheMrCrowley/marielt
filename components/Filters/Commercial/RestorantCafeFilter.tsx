import clsx from 'clsx';
import React from 'react';

import Button from '@/components/Button';
import AreaFilter from '@/components/Filters/components/AreaFilter';
import ConstructionYearFilter from '@/components/Filters/components/ConstructionYearFilter';
import FloorsFilter from '@/components/Filters/components/FloorsFilter';
import { CommercialFiltersType, useCommercialFilters } from '@/store/commercialFilters';

import CommercialBathroomToggle from './components/CommercialBathroomToggle';
import CommercialCeilingHeight from './components/CommercialCeilingHeight';
import CommercialFinishingFilter from './components/CommercialFinishingFilter';
import CommercialFloorFilter from './components/CommercialFloorFilter';
import CommercialLocationFilter from './components/CommercialLocationFilter';
import CommercialRampToggle from './components/CommercialRampToggle';
import SeparateEntrance from './components/SeparateEntrance';

interface RestorantCafeFilterProps {
  applyFilters: (selectedFilters: Partial<CommercialFiltersType['filters']>) => void;
}

const RestorantCafeFilter = ({ applyFilters }: RestorantCafeFilterProps) => {
  const {
    filters: {
      transactionType,
      rootCategoryType,
      priceFrom,
      priceTo,
      areaFrom,
      areaTo,

      commercialLocation,
      floorFrom,
      floorTo,
      isFirstFloor,
      isGroundFloor,
      ceilingHeightFrom,
      ceilingHeightTo,
      constructionYearFrom,
      constructionYearTo,
      finishing,
      bathroom,
      separateEntrance,
      ramp,
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
      commercialLocation,
      floorFrom,
      floorTo,
      isFirstFloor,
      isGroundFloor,
      ceilingHeightFrom,
      ceilingHeightTo,
      constructionYearFrom,
      constructionYearTo,
      finishing,
      bathroom,
      separateEntrance,
      ramp,
    });
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
