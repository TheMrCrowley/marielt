import clsx from 'clsx';
import React from 'react';

import Button from '@/components/Button';
import AreaFilter from '@/components/Filters/components/AreaFilter';
import ConstructionYearFilter from '@/components/Filters/components/ConstructionYearFilter';
import KitchenAreaFilter from '@/components/Filters/components/KitchenAreaFilter';
import LivingAreaFilter from '@/components/Filters/components/LivingAreaFilter';
import PlotAreaFilter from '@/components/Filters/components/PlotAreaFilter';
import SaleTermFilter from '@/components/Filters/components/SaleTermFilter';
import Switch from '@/components/Switch';
import { HousesAndLotsFiltersType, useHousesAndLotsFilters } from '@/store/housesAndLotsFilters';

import ElectricityFilter from './components/ElectricityFilter';
import GasSupplyFilter from './components/GasSupplyFilter';
import HeatingFilter from './components/HeatingFilter';
import HouseLevelFilter from './components/HouseLevelFilter';
import ReadinessFilter from './components/ReadinessFilter';
import SewerageFilter from './components/SewerageFilter';
import WallMaterialFilter from './components/WallMaterialFilter';
import WaterFilter from './components/WaterFilter';

interface DachiFiltersProps {
  applyFilters: (selectedFilters: Partial<HousesAndLotsFiltersType['filters']>) => void;
}

const DachiFilters = ({ applyFilters }: DachiFiltersProps) => {
  const {
    filters: {
      areaFrom,
      areaTo,
      livingAreaFrom,
      livingAreaTo,
      kitchenAreaFrom,
      kitchenAreaTo,
      plotAreaFrom,
      plotAreaTo,
      wallMaterial,
      houseLevels,
      constructionYearFrom,
      constructionYearTo,
      readinessFrom,
      readinessTo,
      heating,
      gasSupply,
      electricity,
      water,
      sewerage,
      nearLake,
      saleTerm,
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
      areaFrom,
      areaTo,
      livingAreaFrom,
      livingAreaTo,
      kitchenAreaFrom,
      kitchenAreaTo,
      plotAreaFrom,
      plotAreaTo,
      wallMaterial,
      houseLevels,
      constructionYearFrom,
      constructionYearTo,
      readinessFrom,
      readinessTo,
      heating,
      gasSupply,
      electricity,
      water,
      sewerage,
      nearLake,
      saleTerm,
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
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <AreaFilter areaFrom={areaFrom} areaTo={areaTo} onChange={updateFilters} />
        <LivingAreaFilter
          livingAreaFrom={livingAreaFrom}
          livingAreaTo={livingAreaTo}
          onChange={updateFilters}
        />
        <KitchenAreaFilter
          kitchenAreaFrom={kitchenAreaFrom}
          kitchenAreaTo={kitchenAreaTo}
          onChange={updateFilters}
        />
        <PlotAreaFilter
          plotAreaTo={plotAreaTo}
          plotAreaFrom={plotAreaFrom}
          onChange={updateFilters}
        />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <WallMaterialFilter wallMaterial={wallMaterial} onChange={updateFilters} />
        <HouseLevelFilter houseLevels={houseLevels} onChange={updateFilters} />
        <ConstructionYearFilter
          constructionYearFrom={constructionYearFrom}
          constructionYearTo={constructionYearTo}
          onChange={updateFilters}
        />
        <ReadinessFilter
          onChange={updateFilters}
          readinessFrom={readinessFrom}
          readinessTo={readinessTo}
        />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <HeatingFilter heating={heating} onChange={updateFilters} />
        <GasSupplyFilter gasSupply={gasSupply} onChange={updateFilters} />
        <ElectricityFilter electricity={electricity} onChange={updateFilters} />
        <WaterFilter onChange={updateFilters} water={water} />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <SewerageFilter onChange={updateFilters} sewerage={sewerage} />
        <SaleTermFilter saleTerm={saleTerm} onChange={updateFilters} />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end', 'flex-wrap')}>
        <Switch
          isChecked={nearLake}
          label="У озера"
          onChange={(checked) => updateFilters({ nearLake: checked })}
        />
      </div>
      <Button className={clsx('mt-auto', 'self-center')} onClick={onApply}>
        Применить
      </Button>
    </>
  );
};

export default DachiFilters;
