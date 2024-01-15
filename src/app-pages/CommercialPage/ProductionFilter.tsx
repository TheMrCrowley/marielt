import clsx from 'clsx';
import React from 'react';

import CommercialCeilingHeight from '@/src/components/CommercialFilters/CommercialCeilingHeight';
import CommercialDistanceFilter from '@/src/components/CommercialFilters/CommercialDistanceFilter';
import CommercialElectricityToggle from '@/src/components/CommercialFilters/CommercialElectricityToggle';
import CommercialGasToggle from '@/src/components/CommercialFilters/CommercialGasToggle';
import CommercialHeatingToggle from '@/src/components/CommercialFilters/CommercialHeatingToggle';
import CommercialSewerageToggle from '@/src/components/CommercialFilters/CommercialSewerageToggle';
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

interface ProductionFilterProps {
  applyFilters: (selectedFilters: Partial<CommercialFiltersType['filters']>) => void;
}

const ProductionFilter = ({ applyFilters }: ProductionFilterProps) => {
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
    directions,
    constructionYearFrom,
    constructionYearTo,
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
        <DirectionFilter
          directions={directionOptions}
          onChange={updateFilters}
          values={directions}
        />
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
        <CommercialDistanceFilter distance={distance} onChange={updateFilters} />
        <VatToggleFilter />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <CommercialHeatingToggle />
        <CommercialWaterToggle />
        <CommercialSewerageToggle />
        <CommercialElectricityToggle />
        <CommercialGasToggle />
      </div>
      <Button className={clsx('sm:self-center', 'mt-auto')} onClick={onApply}>
        Применить
      </Button>
    </>
  );
};

export default ProductionFilter;
