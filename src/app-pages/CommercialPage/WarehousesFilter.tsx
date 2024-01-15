import clsx from 'clsx';
import React from 'react';

import CommercialCeilingHeight from '@/src/components/CommercialFilters/CommercialCeilingHeight';
import CommercialDistanceFilter from '@/src/components/CommercialFilters/CommercialDistanceFilter';
import CommercialElectricityToggle from '@/src/components/CommercialFilters/CommercialElectricityToggle';
import CommercialHeatingToggle from '@/src/components/CommercialFilters/CommercialHeatingToggle';
import CommercialRampToggle from '@/src/components/CommercialFilters/CommercialRampToggle';
import CommercialSewerageToggle from '@/src/components/CommercialFilters/CommercialSewerageToggle';
import CommercialWallMaterialFilter from '@/src/components/CommercialFilters/CommercialWallMaterialFilter';
import CommercialWaterToggle from '@/src/components/CommercialFilters/CommercialWaterToggle';
import PropertyTypeFilter from '@/src/components/CommercialFilters/PropertyTypeFilter';
import VatToggleFilter from '@/src/components/CommercialFilters/VatFilter';
import Button from '@/src/components/common/Button';
import AreaFilter from '@/src/components/filters/AreaFilter';
import ConstructionYearFilter from '@/src/components/filters/ConstructionYearFilter';
import DirectionFilter from '@/src/components/filters/DirectionFilter';
import PlotAreaFilter from '@/src/components/filters/PlotAreaFilter';
import {
  CommercialFiltersType,
  getCommercialFiltersToApply,
  getCommercialRootCategoryUid,
  getTransactionTypeUid,
  useCommercialFilters,
} from '@/src/store/commercialFilters';

interface WarehousesFilterProps {
  applyFilters: (selectedFilters: Partial<CommercialFiltersType['filters']>) => void;
}

const WarehousesFilter = ({ applyFilters }: WarehousesFilterProps) => {
  const {
    filters,
    data: { directions: directionOptions, categories, transactions },
    updateFilters,
  } = useCommercialFilters();

  const {
    areaFrom,
    areaTo,
    plotAreaFrom,
    plotAreaTo,
    constructionYearFrom,
    constructionYearTo,
    directions,
    distance,
    transactionType,
    rootCategoryType,
  } = filters;

  const onApply = () => {
    const selectedTransactionType = getTransactionTypeUid(transactions, transactionType);
    const selectedRootCategory = getCommercialRootCategoryUid(categories, rootCategoryType);

    const filtersToApply = getCommercialFiltersToApply(
      selectedTransactionType,
      selectedRootCategory,
      filters,
    );
    applyFilters(filtersToApply);
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
        <CommercialWallMaterialFilter />
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
        <DirectionFilter
          directions={directionOptions}
          onChange={updateFilters}
          values={directions}
        />
        <CommercialDistanceFilter distance={distance} onChange={updateFilters} />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <VatToggleFilter />

        <CommercialHeatingToggle />
        <CommercialWaterToggle />
        <CommercialSewerageToggle />
        <CommercialElectricityToggle />
        <CommercialRampToggle />
      </div>
      <Button className={clsx('sm:self-center', 'mt-auto')} onClick={onApply}>
        Применить
      </Button>
    </>
  );
};

export default WarehousesFilter;
