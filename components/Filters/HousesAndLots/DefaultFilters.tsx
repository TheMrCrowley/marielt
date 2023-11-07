'use client';

import clsx from 'clsx';
import React from 'react';

import Button from '@/components/Button';
import FiltersWrapper from '@/components/Filters/DefaultFiltersWrapper';
import AreaFilter from '@/components/Filters/components/AreaFilter';
import DirectionFilter from '@/components/Filters/components/DirectionFilter';
import DistanceFilter from '@/components/Filters/components/DistanceFilter';
import PlotAreaFilter from '@/components/Filters/components/PlotAreaFilter';
import PriceFilter from '@/components/Filters/components/PriceFilter';
import { HousesAndLotsRootCategory } from '@/enums/HousesAndLotsFilters';
import { getHousesAndLotsRoute } from '@/helpers/getHousesAndLotsRoute';
import { HousesAndLotsFiltersType, useHousesAndLotsFilters } from '@/store/housesAndLotsFilters';

import HousesAndLotsRootCategoryFilter from './components/HousesAndLotsRootCategoryFilter';

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
      housesAndLotsRootCategory,
      plotAreaFrom,
      plotAreaTo,
      distance,
      directions,
    },
    data: { housesAndLotasCategories, directions: directionOptions },
    updateFilters,
  } = useHousesAndLotsFilters();

  const getAreaFilter = () => {
    const type =
      housesAndLotsRootCategory &&
      getHousesAndLotsRoute(housesAndLotsRootCategory, housesAndLotasCategories);

    switch (type) {
      case HousesAndLotsRootCategory.Plots:
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
    const type =
      housesAndLotsRootCategory &&
      getHousesAndLotsRoute(housesAndLotsRootCategory, housesAndLotasCategories);

    applyFilters({
      priceFrom,
      priceTo,
      areaFrom: type === HousesAndLotsRootCategory.Plots ? '' : areaFrom,
      areaTo: type === HousesAndLotsRootCategory.Plots ? '' : areaTo,
      plotAreaFrom: type !== HousesAndLotsRootCategory.Plots ? '' : plotAreaFrom,
      plotAreaTo: type !== HousesAndLotsRootCategory.Plots ? '' : plotAreaTo,
      distance,
      directions,
      housesAndLotsRootCategory,
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
        <HousesAndLotsRootCategoryFilter />
        <PriceFilter onChange={updateFilters} priceFrom={priceFrom} priceTo={priceTo} />
        <DirectionFilter
          directions={directionOptions}
          onChange={updateFilters}
          values={directions}
        />
        <DistanceFilter distance={distance} onChange={updateFilters} />
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
