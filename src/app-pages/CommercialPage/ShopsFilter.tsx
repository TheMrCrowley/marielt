import clsx from 'clsx';
import React from 'react';

import CommercialBathroomToggle from '@/src/components/CommercialFilters/CommercialBathroomToggle';
import CommercialCeilingHeight from '@/src/components/CommercialFilters/CommercialCeilingHeight';
import CommercialFinishingFilter from '@/src/components/CommercialFilters/CommercialFinishingFilter';
import CommercialFloorFilter from '@/src/components/CommercialFilters/CommercialFloorFilter';
import CommercialLocationFilter from '@/src/components/CommercialFilters/CommercialLocationFilter';
import CommercialRampToggle from '@/src/components/CommercialFilters/CommercialRampToggle';
import CommercialSeparateRooms from '@/src/components/CommercialFilters/CommercialSeparateRooms';
import SeparateEntrance from '@/src/components/CommercialFilters/SeparateEntrance';
import Button from '@/src/components/common/Button';
import AreaFilter from '@/src/components/filters/AreaFilter';
import ConstructionYearFilter from '@/src/components/filters/ConstructionYearFilter';
import FloorsFilter from '@/src/components/filters/FloorsFilter';
import { CommercialFiltersType, useCommercialFilters } from '@/src/store/commercialFilters';

interface ShopsFilterProps {
  applyFilters: (selectedFilters: Partial<CommercialFiltersType['filters']>) => void;
}

const ShopsFilter = ({ applyFilters }: ShopsFilterProps) => {
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
      separateRoomsFrom,
      separateRoomsTo,
      ceilingHeightFrom,
      ceilingHeightTo,
      constructionYearFrom,
      constructionYearTo,
      finishing,
      bathroom,
      separateEntrance,
      ramp,
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
      commercialLocation,
      floorFrom,
      floorTo,
      isFirstFloor,
      isGroundFloor,
      separateRoomsFrom,
      separateRoomsTo,
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
        <CommercialSeparateRooms />
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

export default ShopsFilter;
