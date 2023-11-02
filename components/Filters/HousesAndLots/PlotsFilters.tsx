import clsx from 'clsx';
import React, { useEffect } from 'react';

import Button from '@/components/Button';
import PlotAreaFilter from '@/components/Filters/components/PlotAreaFilter';
import Switch from '@/components/Switch';
import { useHousesAndLotsFilters } from '@/store/housesAndLotsFilters';

import ElectricityFilter from './components/ElectricityFilter';
import GasSupplyFilter from './components/GasSupplyFilter';
import SewerageFilter from './components/SewerageFilter';
import WaterFilter from './components/WaterFilter';

interface PlotsFiltersProps {
  applyFilters: () => void;
}

const PlotsFilters = ({ applyFilters }: PlotsFiltersProps) => {
  const {
    filters: { gasSupply, electricity, water, sewerage, nearLake, plotAreaFrom, plotAreaTo },
    updateFilters,
  } = useHousesAndLotsFilters();

  useEffect(() => {
    return () =>
      updateFilters({
        gasSupply: '',
        electricity: [],
        water: [],
        sewerage: [],
        nearLake: false,
        plotAreaFrom: '',
        plotAreaTo: '',
      });
  }, []);

  return (
    <>
      <PlotAreaFilter
        plotAreaFrom={plotAreaFrom}
        plotAreaTo={plotAreaTo}
        onChange={updateFilters}
      />
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end')}>
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
      <Button className={clsx('mt-auto', 'self-center')} onClick={applyFilters}>
        Применить
      </Button>
    </>
  );
};

export default PlotsFilters;
