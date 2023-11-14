import clsx from 'clsx';
import React from 'react';

import CommercialPriceForMeterFilter from '@/src/components/CommercialFilters/CommercialPriceForMeterFilter';
import CommercialRootCategoryTypeFilter from '@/src/components/CommercialFilters/CommercialRootCategoryTypeFilter';
import CommercialTransactionTypeFilter from '@/src/components/CommercialFilters/CommercialTransactionTypeFilter';
import Button from '@/src/components/common/Button';
import AreaFilter from '@/src/components/filters/AreaFilter';
import DefaultFiltersWrapper from '@/src/components/filters/DefaultFiltersWrapper';
import FiltersTagsList from '@/src/components/filters/FiltersTagsList';
import PlotAreaFilter from '@/src/components/filters/PlotAreaFilter';
import PriceFilter from '@/src/components/filters/PriceFilter';
import SearchField from '@/src/components/filters/SearchField';
import { CommercialRootCategoryTypeValues } from '@/src/enums/CommercialFilters';
import { getCommercialSearchResults } from '@/src/services/commercialServices';
import {
  CommercialFiltersType,
  getCommercialFiltersToApply,
  getCommercialRootCategoryUid,
  getTransactionTypeUid,
  useCommercialFilters,
} from '@/src/store/commercialFilters';

interface DefaultFiltersProps {
  openModal: () => void;
  applyFilters: (
    selectedFilters: Partial<CommercialFiltersType['filters']>,
    searchFilters?: Partial<CommercialFiltersType['filters']>,
  ) => void;
}

const DefaultFilters = ({ applyFilters, openModal }: DefaultFiltersProps) => {
  const {
    updateFilters,
    filters,
    data: { categories, transactions },
    tags,
    deleteTag,
    reset,
  } = useCommercialFilters();

  const {
    priceFrom,
    priceTo,
    areaFrom,
    areaTo,
    transactionType,
    rootCategoryType,
    district_rb,
    region,
    street,
    locality,
    plotAreaFrom,
    plotAreaTo,
  } = filters;

  const getAreaFilter = () => {
    const isPlotsSelected =
      getCommercialRootCategoryUid(categories, rootCategoryType) ===
      CommercialRootCategoryTypeValues.Uchastki;

    if (isPlotsSelected) {
      return (
        <PlotAreaFilter
          plotAreaFrom={plotAreaFrom}
          plotAreaTo={plotAreaTo}
          onChange={updateFilters}
        />
      );
    }

    return <AreaFilter onChange={updateFilters} areaFrom={areaFrom} areaTo={areaTo} />;
  };

  const onApply = (searchFilters?: Partial<typeof filters>) => {
    const selectedTransactionType = getTransactionTypeUid(transactions, transactionType);
    const selectedRootCategory = getCommercialRootCategoryUid(categories, rootCategoryType);

    const filtersToApply = getCommercialFiltersToApply(
      selectedTransactionType,
      selectedRootCategory,
      filters,
    );

    applyFilters(filtersToApply, searchFilters);
  };

  return (
    <DefaultFiltersWrapper
      openModal={openModal}
      filtersList={
        <FiltersTagsList
          deleteTag={(key, value) => {
            deleteTag(key as keyof CommercialFiltersType['filters'], value, onApply);
          }}
          tags={tags}
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
          'md:items-end',
          'md:justify-between',
          'md:flex-row',
          'flex-col',
        )}
      >
        <CommercialTransactionTypeFilter />
        <CommercialRootCategoryTypeFilter />
        <PriceFilter onChange={updateFilters} priceFrom={priceFrom} priceTo={priceTo} />
        <CommercialPriceForMeterFilter />
      </div>
      <div
        className={clsx(
          'flex',
          'gap-9',
          'flex-wrap',
          'w-full',
          'md:items-end',
          'md:justify-between',
          'md:flex-row',
          'flex-col',
        )}
      >
        {getAreaFilter()}
        <SearchField
          search={getCommercialSearchResults}
          onClick={(data) => {
            updateFilters({ ...data });
            applyFilters({ ...data });
          }}
          values={{ district_rb, region, street, locality }}
        />
        <Button className={clsx('md:self-end', 'flex-1', 'w-full')} onClick={() => onApply()}>
          Применить
        </Button>
      </div>
    </DefaultFiltersWrapper>
  );
};

export default DefaultFilters;
