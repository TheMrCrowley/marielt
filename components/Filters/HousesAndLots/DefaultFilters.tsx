'use client';

import clsx from 'clsx';
import React from 'react';

import Button from '@/components/Button';
import FiltersWrapper from '@/components/Filters/DefaultFiltersWrapper';
import AreaFilter from '@/components/Filters/components/AreaFilter';
import PlotAreaFilter from '@/components/Filters/components/PlotAreaFilter';
import PriceFilter from '@/components/Filters/components/PriceFilter';
import { HousesAndLotsType, getRouteByHouseType } from '@/enums/HousesAndLotsFilters';
import { HousesAndLotsFiltersType, useHousesAndLotsFilters } from '@/store/housesAndLotsFilters';

import DirectionFilter from './components/DirectionFilter';
import DistanceFilter from './components/DistanceFilter';
import HousesAndLotsTypeFilter from './components/HousesAndLotsTypeFilter';

interface DefaultFiltersProps {
  openModal: () => void;
  applyFilters: (selectedFilters: Partial<HousesAndLotsFiltersType['filters']>) => void;
}

const DefaultFilters = ({ applyFilters, openModal }: DefaultFiltersProps) => {
  const {
    filters: {
      priceFrom,
      priceTo,
      areaFrom,
      areaTo,
      housesAndLotsType,
      plotAreaFrom,
      plotAreaTo,
      distance,
      directions,
    },
    updateFilters,
  } = useHousesAndLotsFilters();

  const getAreaFilter = () => {
    const type = housesAndLotsType && getRouteByHouseType(housesAndLotsType);
    switch (type) {
      case HousesAndLotsType.Plots:
        return (
          <PlotAreaFilter
            plotAreaFrom={plotAreaFrom}
            plotAreaTo={plotAreaTo}
            onChange={updateFilters}
          />
        );
      default:
        return <AreaFilter areaFrom={areaFrom} areaTo={areaTo} onChange={updateFilters} />;
    }
  };

  const onApply = () => {
    const type = housesAndLotsType && getRouteByHouseType(housesAndLotsType);

    applyFilters({
      priceFrom,
      priceTo,
      areaFrom: type === HousesAndLotsType.Plots ? '' : areaFrom,
      areaTo: type === HousesAndLotsType.Plots ? '' : areaTo,
      plotAreaFrom: type !== HousesAndLotsType.Plots ? '' : plotAreaFrom,
      plotAreaTo: type !== HousesAndLotsType.Plots ? '' : plotAreaTo,
      distance,
      directions,
      housesAndLotsType,
    });
  };

  return (
    <FiltersWrapper openModal={openModal}>
      <div
        className={clsx(
          'flex',
          'gap-9',
          'flex-wrap',
          'w-full',
          'md:items-center',
          'md:justify-between',
          'md:flex-row',
          'flex-col',
        )}
      >
        <HousesAndLotsTypeFilter />
        <PriceFilter onChange={updateFilters} priceFrom={priceFrom} priceTo={priceTo} />
        <DirectionFilter />
        <DistanceFilter />
      </div>
      <div
        className={clsx('flex', 'justify-between', 'w-full', 'gap-4', 'md:flex-row', 'flex-col')}
      >
        {getAreaFilter()}
        <Button className={clsx('md:self-end', 'flex-1', 'w-full')} onClick={onApply}>
          Применить
        </Button>
      </div>
    </FiltersWrapper>
  );
};

export default DefaultFilters;
