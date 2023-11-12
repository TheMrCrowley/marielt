import clsx from 'clsx';
import React from 'react';

import CommercialCeilingHeight from '@/src/components/CommercialFilters/CommercialCeilingHeight';
import CommercialElectricityToggle from '@/src/components/CommercialFilters/CommercialElectricityToggle';
import CommercialGasToggle from '@/src/components/CommercialFilters/CommercialGasToggle';
import CommercialHeatingToggle from '@/src/components/CommercialFilters/CommercialHeatingToggle';
import CommercialSewerageToggle from '@/src/components/CommercialFilters/CommercialSewerageToggle';
import CommercialWaterToggle from '@/src/components/CommercialFilters/CommercialWaterToggle';
import PropertyTypeFilter from '@/src/components/CommercialFilters/PropertyTypeFilter';
import Button from '@/src/components/common/Button';
import AreaFilter from '@/src/components/filters/AreaFilter';
import ConstructionYearFilter from '@/src/components/filters/ConstructionYearFilter';
import DirectionFilter from '@/src/components/filters/DirectionFilter';
import DistanceFilter from '@/src/components/filters/DistanceFilter';
import PlotAreaFilter from '@/src/components/filters/PlotAreaFilter';
import { CommercialFiltersType, useCommercialFilters } from '@/src/store/commercialFilters';

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
      district_rb,
      region,
      street,
      locality,
      priceForMeterFrom,
      priceFromMeterTo,
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
      district_rb,
      region,
      street,
      locality,
      priceForMeterFrom,
      priceFromMeterTo,
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
