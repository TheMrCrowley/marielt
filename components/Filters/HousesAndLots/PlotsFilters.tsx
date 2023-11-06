import clsx from 'clsx';
import React from 'react';

import Button from '@/components/Button';
import PlotAreaFilter from '@/components/Filters/components/PlotAreaFilter';
import Switch from '@/components/Switch';
import { HousesAndLotsFiltersType, useHousesAndLotsFilters } from '@/store/housesAndLotsFilters';

import ElectricityFilter from './components/ElectricityFilter';
import GasSupplyFilter from './components/GasSupplyFilter';
import SewerageFilter from './components/SewerageFilter';
import WaterFilter from './components/WaterFilter';

interface PlotsFiltersProps {
  applyFilters: (selectedFilters: Partial<HousesAndLotsFiltersType['filters']>) => void;
}

const PlotsFilters = ({ applyFilters }: PlotsFiltersProps) => {
  const {
    filters: {
      gasSupply,
      electricity,
      water,
      sewerage,
      nearLake,
      plotAreaFrom,
      plotAreaTo,
      //Default filters
      priceFrom,
      priceTo,
      housesAndLotsType,
      directions,
      distance,
    },
    updateFilters,
  } = useHousesAndLotsFilters();

  const onApply = () => {
    applyFilters({
      gasSupply,
      electricity,
      water,
      sewerage,
      nearLake,
      plotAreaFrom,
      plotAreaTo,
      //Default filters
      priceFrom,
      priceTo,
      housesAndLotsType,
      directions,
      distance,
    });
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
        <WaterFilter onChange={updateFilters} water={water} />
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
