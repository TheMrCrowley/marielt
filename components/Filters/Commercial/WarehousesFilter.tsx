import clsx from 'clsx';
import React from 'react';

import Button from '@/components/Button';
import AreaFilter from '@/components/Filters/components/AreaFilter';
import ConstructionYearFilter from '@/components/Filters/components/ConstructionYearFilter';
import DirectionFilter from '@/components/Filters/components/DirectionFilter';
import DistanceFilter from '@/components/Filters/components/DistanceFilter';
import PlotAreaFilter from '@/components/Filters/components/PlotAreaFilter';
import { CommercialFiltersType, useCommercialFilters } from '@/store/commercialFilters';

import CommercialCeilingHeight from './components/CommercialCeilingHeight';
import CommercialElectricityToggle from './components/CommercialElectricityToggle';
import CommercialHeatingToggle from './components/CommercialHeatingToggle';
import CommercialRampToggle from './components/CommercialRampToggle';
import CommercialSewerageToggle from './components/CommercialSewerageToggle';
import CommercialWallMaterialFilter from './components/CommercialWallMaterialFilter';
import CommercialWaterToggle from './components/CommercialWaterToggle';
import PropertyTypeFilter from './components/PropertyTypeFilter';

interface WarehousesFilterProps {
  applyFilters: (selectedFilters: Partial<CommercialFiltersType['filters']>) => void;
}

const WarehousesFilter = ({ applyFilters }: WarehousesFilterProps) => {
  const {
    filters: {
      areaFrom,
      areaTo,
      plotAreaFrom,
      plotAreaTo,
      constructionYearFrom,
      constructionYearTo,
      directions,
      distance,
      transactionType,
      rootCategoryType,
      priceFrom,
      priceTo,
      propertyType,
      wallMaterial,
      ceilingHeightFrom,
      ceilingHeightTo,
      heating,
      water,
      sewerage,
      electricity,
      ramp,
    },
    data: { directions: directionOptions },
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
      plotAreaFrom,
      plotAreaTo,
      wallMaterial,
      ceilingHeightFrom,
      ceilingHeightTo,
      constructionYearFrom,
      constructionYearTo,
      directions,
      distance,
      heating,
      water,
      sewerage,
      electricity,
      ramp,
    });
  };

  return (
    <>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <PropertyTypeFilter />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <AreaFilter areaFrom={areaFrom} areaTo={areaTo} onChange={updateFilters} />
        <PlotAreaFilter
          plotAreaFrom={plotAreaFrom}
          plotAreaTo={plotAreaTo}
          onChange={updateFilters}
        />
        <CommercialWallMaterialFilter />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <CommercialCeilingHeight />
        <ConstructionYearFilter
          constructionYearFrom={constructionYearFrom}
          constructionYearTo={constructionYearTo}
          onChange={updateFilters}
        />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <DirectionFilter
          directions={directionOptions}
          onChange={updateFilters}
          values={directions}
        />
        <DistanceFilter distance={distance} onChange={updateFilters} />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <CommercialHeatingToggle />
        <CommercialWaterToggle />
        <CommercialSewerageToggle />
        <CommercialElectricityToggle />
        <CommercialRampToggle />
      </div>
      <Button className={clsx('sm:self-center', 'mt-auto')} onClick={onApply}>
        Применить
      </Button>
    </>
  );
};

export default WarehousesFilter;
