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
import CommercialFurnitureToggle from './components/CommercialFurnitureToggle';
import CommercialLocationFilter from './components/CommercialLocationFilter';
import CommercialSeparateRooms from './components/CommercialSeparateRooms';
import SeparateEntrance from './components/SeparateEntrance';

interface OfficeFilterProps {
  applyFilters: (selectedFilters: Partial<CommercialFiltersType['filters']>) => void;
}

const OfficeFilter = ({ applyFilters }: OfficeFilterProps) => {
  const {
    filters: {
      areaFrom,
      areaTo,
      floorFrom,
      floorTo,
      constructionYearFrom,
      constructionYearTo,
      transactionType,
      rootCategoryType,
      priceFrom,
      priceTo,
      finishing,
      bathroom,
      separateEntrance,
      furniture,
      commercialLocation,
      isFirstFloor,
      isLastFloor,
      separateRoomsFrom,
      separateRoomsTo,
      ceilingHeightFrom,
      ceilingHeightTo,
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
      isLastFloor,
      separateRoomsFrom,
      separateRoomsTo,
      ceilingHeightFrom,
      ceilingHeightTo,
      constructionYearFrom,
      constructionYearTo,
      finishing,
      bathroom,
      separateEntrance,
      furniture,
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
            isLastFloor: true,
            isGroundFloor: false,
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
        <CommercialFurnitureToggle />
      </div>
      <Button className={clsx('sm:self-center', 'mt-auto')} onClick={onApply}>
        Применить
      </Button>
    </>
  );
};

export default OfficeFilter;
