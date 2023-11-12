import clsx from 'clsx';
import React from 'react';

import PropertyTypeFilter from '@/src/components/CommercialFilters/PropertyTypeFilter';
import Button from '@/src/components/common/Button';
import DirectionFilter from '@/src/components/filters/DirectionFilter';
import DistanceFilter from '@/src/components/filters/DistanceFilter';
import PlotAreaFilter from '@/src/components/filters/PlotAreaFilter';
import { CommercialFiltersType, useCommercialFilters } from '@/src/store/commercialFilters';

interface PlotsFiltersProps {
  applyFilters: (selectedFilters: Partial<CommercialFiltersType['filters']>) => void;
}

const PlotsFilters = ({ applyFilters }: PlotsFiltersProps) => {
  const {
    filters: {
      plotAreaFrom,
      plotAreaTo,
      distance,
      directions,
      transactionType,
      rootCategoryType,
      priceFrom,
      priceTo,
      areaFrom,
      areaTo,
      propertyType,
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
      distance,
    });
  };

  return (
    <>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <PropertyTypeFilter />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <PlotAreaFilter
          plotAreaFrom={plotAreaFrom}
          plotAreaTo={plotAreaTo}
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
      <Button className={clsx('sm:self-center', 'mt-auto')} onClick={onApply}>
        Применить
      </Button>
    </>
  );
};

export default PlotsFilters;
