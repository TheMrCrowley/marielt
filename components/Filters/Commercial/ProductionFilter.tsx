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
import CommercialGasToggle from './components/CommercialGasToggle';
import CommercialHeatingToggle from './components/CommercialHeatingToggle';
import CommercialSewerageToggle from './components/CommercialSewerageToggle';
import CommercialWaterToggle from './components/CommercialWaterToggle';
import PropertyTypeFilter from './components/PropertyTypeFilter';

interface ProductionFilterProps {
  applyFilters: (selectedFilters: Partial<CommercialFiltersType['filters']>) => void;
}

const ProductionFilter = ({ applyFilters }: ProductionFilterProps) => {
  const {
    filters: {
      areaFrom,
      areaTo,
      plotAreaFrom,
      plotAreaTo,
      directions,
      constructionYearFrom,
      constructionYearTo,
      distance,
      transactionType,
      rootCategoryType,
      priceFrom,
      priceTo,
      propertyType,
      ceilingHeightFrom,
      ceilingHeightTo,
      heating,
      water,
      sewerage,
      electricity,
      gas,
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
      directions,
      ceilingHeightFrom,
      ceilingHeightTo,
      constructionYearFrom,
      constructionYearTo,
      distance,
      heating,
      water,
      sewerage,
      electricity,
      gas,
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
        <DirectionFilter
          directions={directionOptions}
          onChange={updateFilters}
          values={directions}
        />
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
        <DistanceFilter distance={distance} onChange={updateFilters} />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <CommercialHeatingToggle />
        <CommercialWaterToggle />
        <CommercialSewerageToggle />
        <CommercialElectricityToggle />
        <CommercialGasToggle />
      </div>
      <Button className={clsx('sm:self-center', 'mt-auto')} onClick={onApply}>
        Применить
      </Button>
    </>
  );
};

export default ProductionFilter;
