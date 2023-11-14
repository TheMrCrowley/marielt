'use client';

import clsx from 'clsx';
import React from 'react';

import HousesAndLotsRootCategoryFilter from '@/src/components/HousesAndLotsFilters/HousesAndLotsRootCategoryFilter';
import Button from '@/src/components/common/Button';
import AreaFilter from '@/src/components/filters/AreaFilter';
import FiltersWrapper from '@/src/components/filters/DefaultFiltersWrapper';
import DirectionFilter from '@/src/components/filters/DirectionFilter';
import DistanceFilter from '@/src/components/filters/DistanceFilter';
import FiltersTagsList from '@/src/components/filters/FiltersTagsList';
import PlotAreaFilter from '@/src/components/filters/PlotAreaFilter';
import PriceFilter from '@/src/components/filters/PriceFilter';
import SearchField from '@/src/components/filters/SearchField';
import { HousesAndLotsRootCategory } from '@/src/enums/HousesAndLotsFilters';
import { getHousesAndLotsRoute } from '@/src/helpers/getHousesAndLotsRoute';
import { getHousesAndLotsSearchResults } from '@/src/services/housesAndLotsServices';
import {
  HousesAndLotsFiltersType,
  getHousesAndLotsFiltersToApply,
  useHousesAndLotsFilters,
} from '@/src/store/housesAndLotsFilters';

interface DefaultFiltersProps {
  openModal: () => void;
  applyFilters: (
    selectedFilters: Partial<HousesAndLotsFiltersType['filters']>,
    searchFilters?: Partial<HousesAndLotsFiltersType['filters']>,
  ) => void;
}

const DefaultFilters = ({ applyFilters, openModal }: DefaultFiltersProps) => {
  const {
    filters,
    data: { housesAndLotasCategories, directions: directionOptions },
    updateFilters,
    tags,
    deleteTag,
    reset,
  } = useHousesAndLotsFilters();

  const {
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
  } = filters;

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

  const onApply = (searchFilters?: Partial<typeof filters>) => {
    const type =
      housesAndLotsRootCategory &&
      getHousesAndLotsRoute(housesAndLotsRootCategory, housesAndLotasCategories);

    const filtersToApply = getHousesAndLotsFiltersToApply(
      type as HousesAndLotsRootCategory,
      filters,
    );

    applyFilters(filtersToApply, searchFilters);
  };

  return (
    <FiltersWrapper
      openModal={openModal}
      filtersList={
        <FiltersTagsList
          tags={tags}
          deleteTag={(key, value) => {
            deleteTag(key as keyof HousesAndLotsFiltersType['filters'], value, onApply);
          }}
          reset={() => {
            reset(onApply);
          }}
        />
      }
    >
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
          onClick={(data) => {
            updateFilters({ ...data });
            onApply(data);
          }}
        />
        <Button className={clsx('md:self-end', 'flex-1', 'w-full')} onClick={() => onApply()}>
          Применить
        </Button>
      </div>
    </FiltersWrapper>
  );
};

export default DefaultFilters;
