import clsx from 'clsx';
import React from 'react';

import PropertyTypeFilter from '@/src/components/CommercialFilters/PropertyTypeFilter';
import Button from '@/src/components/common/Button';
import AreaFilter from '@/src/components/filters/AreaFilter';
import ConstructionYearFilter from '@/src/components/filters/ConstructionYearFilter';
import { CommercialFiltersType, useCommercialFilters } from '@/src/store/commercialFilters';

interface GarageFilterProps {
  applyFilters: (selectedFilters: Partial<CommercialFiltersType['filters']>) => void;
}

const GarageFilter = ({ applyFilters }: GarageFilterProps) => {
  const {
    filters: {
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
      constructionYearFrom,
      constructionYearTo,
    },
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
      constructionYearFrom,
      constructionYearTo,
    });
  };

  return (
    <>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <PropertyTypeFilter />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <AreaFilter areaFrom={areaFrom} areaTo={areaTo} onChange={updateFilters} />
        <ConstructionYearFilter
          constructionYearFrom={constructionYearFrom}
          constructionYearTo={constructionYearTo}
          onChange={updateFilters}
        />
      </div>
      <Button className={clsx('sm:self-center', 'mt-auto')} onClick={onApply}>
        Применить
      </Button>
    </>
  );
};

export default GarageFilter;
