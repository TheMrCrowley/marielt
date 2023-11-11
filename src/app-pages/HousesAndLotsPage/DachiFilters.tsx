import clsx from 'clsx';
import React from 'react';

import ElectricityFilter from '@/src/components/HousesAndLotsFilters/ElectricityFilter';
import GasSupplyFilter from '@/src/components/HousesAndLotsFilters/GasSupplyFilter';
import HeatingFilter from '@/src/components/HousesAndLotsFilters/HeatingFilter';
import HouseLevelFilter from '@/src/components/HousesAndLotsFilters/HouseLevelFilter';
import ReadinessFilter from '@/src/components/HousesAndLotsFilters/ReadinessFilter';
import SewerageFilter from '@/src/components/HousesAndLotsFilters/SewerageFilter';
import WallMaterialFilter from '@/src/components/HousesAndLotsFilters/WallMaterialFilter';
import WaterFilter from '@/src/components/HousesAndLotsFilters/WaterFilter';
import Button from '@/src/components/common/Button';
import Switch from '@/src/components/common/Switch';
import AreaFilter from '@/src/components/filters/AreaFilter';
import ConstructionYearFilter from '@/src/components/filters/ConstructionYearFilter';
import KitchenAreaFilter from '@/src/components/filters/KitchenAreaFilter';
import LivingAreaFilter from '@/src/components/filters/LivingAreaFilter';
import PlotAreaFilter from '@/src/components/filters/PlotAreaFilter';
import SaleTermFilter from '@/src/components/filters/SaleTermFilter';
import {
  HousesAndLotsFiltersType,
  useHousesAndLotsFilters,
} from '@/src/store/housesAndLotsFilters';

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

      housesAndLotsRootCategory,
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
      housesAndLotsRootCategory,
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
