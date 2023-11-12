import clsx from 'clsx';
import React from 'react';

import CommercialPriceForMeterFilter from '@/src/components/CommercialFilters/CommercialPriceForMeterFilter';
import CommercialRootCategoryTypeFilter from '@/src/components/CommercialFilters/CommercialRootCategoryTypeFilter';
import CommercialTransactionTypeFilter from '@/src/components/CommercialFilters/CommercialTransactionTypeFilter';
import Button from '@/src/components/common/Button';
import AreaFilter from '@/src/components/filters/AreaFilter';
import DefaultFiltersWrapper from '@/src/components/filters/DefaultFiltersWrapper';
import PriceFilter from '@/src/components/filters/PriceFilter';
import SearchField from '@/src/components/filters/SearchField';
import { getCommercialSearchResults } from '@/src/services/commercialServices';
import { CommercialFiltersType, useCommercialFilters } from '@/src/store/commercialFilters';

interface DefaultFiltersProps {
  openModal: () => void;
  applyFilters: (selectedFilters: Partial<CommercialFiltersType['filters']>) => void;
}

const DefaultFilters = ({ applyFilters, openModal }: DefaultFiltersProps) => {
  const {
    updateFilters,
    filters: {
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
      priceForMeterFrom,
      priceFromMeterTo,
    },
  } = useCommercialFilters();

  const onApply = () => {
    applyFilters({
      transactionType,
      rootCategoryType,
      priceForMeterFrom,
      priceFromMeterTo,
      priceFrom,
      priceTo,
      areaFrom,
      areaTo,
      district_rb,
      region,
      street,
      locality,
    });
  };

  return (
    <DefaultFiltersWrapper openModal={openModal}>
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
        <AreaFilter onChange={updateFilters} areaFrom={areaFrom} areaTo={areaTo} />
        <SearchField
          search={getCommercialSearchResults}
          onClick={updateFilters}
          values={{ district_rb, region, street, locality }}
        />
        <Button className={clsx('md:self-end', 'flex-1', 'w-full')} onClick={onApply}>
          Применить
        </Button>
      </div>
    </DefaultFiltersWrapper>
  );
};

export default DefaultFilters;
