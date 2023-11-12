'use client';

import clsx from 'clsx';
import React from 'react';

import HousesAndLotsRootCategoryFilter from '@/src/components/HousesAndLotsFilters/HousesAndLotsRootCategoryFilter';
import Button from '@/src/components/common/Button';
import AreaFilter from '@/src/components/filters/AreaFilter';
import FiltersWrapper from '@/src/components/filters/DefaultFiltersWrapper';
import DirectionFilter from '@/src/components/filters/DirectionFilter';
import DistanceFilter from '@/src/components/filters/DistanceFilter';
import PlotAreaFilter from '@/src/components/filters/PlotAreaFilter';
import PriceFilter from '@/src/components/filters/PriceFilter';
import SearchField from '@/src/components/filters/SearchField';
import { HousesAndLotsRootCategory } from '@/src/enums/HousesAndLotsFilters';
import { getHousesAndLotsRoute } from '@/src/helpers/getHousesAndLotsRoute';
import { getHousesAndLotsSearchResults } from '@/src/services/housesAndLotsServices';
import {
  HousesAndLotsFiltersType,
  useHousesAndLotsFilters,
} from '@/src/store/housesAndLotsFilters';

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
      district_rb,
      street,
      region,
      locality,
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
      district_rb,
      street,
      region,
      locality,
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
        className={clsx(
          'flex',
          'justify-between',
          'items-end',
          'w-full',
          'gap-4',
          'md:flex-row',
          'flex-col',
        )}
      >
        {getAreaFilter()}
        <SearchField
          search={getHousesAndLotsSearchResults}
          values={{
            district_rb,
            street,
            region,
            locality,
          }}
          onClick={updateFilters}
        />
        <Button className={clsx('md:self-end', 'flex-1', 'w-full')} onClick={onApply}>
          Применить
        </Button>
      </div>
    </FiltersWrapper>
  );
};

export default DefaultFilters;
