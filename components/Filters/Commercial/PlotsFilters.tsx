import clsx from 'clsx';
import React from 'react';

import Button from '@/components/Button';
import DirectionFilter from '@/components/Filters/components/DirectionFilter';
import DistanceFilter from '@/components/Filters/components/DistanceFilter';
import PlotAreaFilter from '@/components/Filters/components/PlotAreaFilter';
import { CommercialFiltersType, useCommercialFilters } from '@/store/commercialFilters';

import PropertyTypeFilter from './components/PropertyTypeFilter';

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
