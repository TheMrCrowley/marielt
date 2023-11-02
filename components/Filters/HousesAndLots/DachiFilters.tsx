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
import { useHousesAndLotsFilters } from '@/store/housesAndLotsFilters';
import { HousesAndLotsFiltersType } from '@/types/Filters';

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
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end')}>
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
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end')}>
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
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end')}>
        <HeatingFilter heating={heating} onChange={updateFilters} />
        <GasSupplyFilter gasSupply={gasSupply} onChange={updateFilters} />
        <ElectricityFilter electricity={electricity} onChange={updateFilters} />
        <WaterFilter onChange={updateFilters} water={water} />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end')}>
        <SewerageFilter onChange={updateFilters} sewerage={sewerage} wrapperClassName="flex-" />
        <SaleTermFilter saleTerm={saleTerm} onChange={updateFilters} />
      </div>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end')}>
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
