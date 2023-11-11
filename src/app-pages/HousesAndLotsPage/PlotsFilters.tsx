import clsx from 'clsx';
import React from 'react';

import ElectricityFilter from '@/src/components/HousesAndLotsFilters/ElectricityFilter';
import GasSupplyFilter from '@/src/components/HousesAndLotsFilters/GasSupplyFilter';
import SewerageFilter from '@/src/components/HousesAndLotsFilters/SewerageFilter';
import WaterFilter from '@/src/components/HousesAndLotsFilters/WaterFilter';
import Button from '@/src/components/common/Button';
import Switch from '@/src/components/common/Switch';
import PlotAreaFilter from '@/src/components/filters/PlotAreaFilter';
import {
  HousesAndLotsFiltersType,
  useHousesAndLotsFilters,
} from '@/src/store/housesAndLotsFilters';

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
      housesAndLotsRootCategory,
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
      housesAndLotsRootCategory,
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
