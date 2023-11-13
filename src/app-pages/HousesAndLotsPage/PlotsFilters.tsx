import clsx from 'clsx';
import React from 'react';

import ElectricityFilter from '@/src/components/HousesAndLotsFilters/ElectricityFilter';
import GasSupplyFilter from '@/src/components/HousesAndLotsFilters/GasSupplyFilter';
import LotsWaterFilter from '@/src/components/HousesAndLotsFilters/LotsWaterFilter';
import SewerageFilter from '@/src/components/HousesAndLotsFilters/SewerageFilter';
import Button from '@/src/components/common/Button';
import Switch from '@/src/components/common/Switch';
import PlotAreaFilter from '@/src/components/filters/PlotAreaFilter';
import { HousesAndLotsRootCategory } from '@/src/enums/HousesAndLotsFilters';
import {
  HousesAndLotsFiltersType,
  getHousesAndLotsFiltersToApply,
  useHousesAndLotsFilters,
} from '@/src/store/housesAndLotsFilters';

interface PlotsFiltersProps {
  applyFilters: (selectedFilters: Partial<HousesAndLotsFiltersType['filters']>) => void;
}

const PlotsFilters = ({ applyFilters }: PlotsFiltersProps) => {
  const { filters, updateFilters } = useHousesAndLotsFilters();
  const { gasSupply, electricity, sewerage, nearLake, plotAreaFrom, plotAreaTo } = filters;

  const onApply = () => {
    const filtersToApply = getHousesAndLotsFiltersToApply(HousesAndLotsRootCategory.Plots, filters);
    applyFilters(filtersToApply);
  };

  return (
    <>
      <PlotAreaFilter
        plotAreaFrom={plotAreaFrom}
        plotAreaTo={plotAreaTo}
        onChange={updateFilters}
      />
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <GasSupplyFilter gasSupply={gasSupply} onChange={updateFilters} />
        <ElectricityFilter electricity={electricity} onChange={updateFilters} />
        <LotsWaterFilter />
        <SewerageFilter onChange={updateFilters} sewerage={sewerage} />
      </div>
      <Switch
        isChecked={nearLake}
        label="У озера"
        onChange={(checked) => updateFilters({ nearLake: checked })}
      />
      <Button className={clsx('mt-auto', 'self-center')} onClick={onApply}>
        Применить
      </Button>
    </>
  );
};

export default PlotsFilters;
