import clsx from 'clsx';
import React, { useEffect } from 'react';

import Button from '@/components/Button';
import AreaFilter from '@/components/Filters/components/AreaFilter';
import ConstructionYearFilter from '@/components/Filters/components/ConstructionYearFilter';
import KitchenAreaFilter from '@/components/Filters/components/KitchenAreaFilter';
import LivingAreaFilter from '@/components/Filters/components/LivingAreaFilter';
import PlotAreaFilter from '@/components/Filters/components/PlotAreaFilter';
import SaleTermFilter from '@/components/Filters/components/SaleTermFilter';
import Select from '@/components/Select';
import Switch from '@/components/Switch';
import { useHousesAndLotsFilters } from '@/store/housesAndLotsFilters';

import ElectricityFilter from './components/ElectricityFilter';
import GasSupplyFilter from './components/GasSupplyFilter';
import HeatingFilter from './components/HeatingFilter';
import HouseLevelFilter from './components/HouseLevelFilter';
import ReadinessFilter from './components/ReadinessFilter';
import SewerageFilter from './components/SewerageFilter';
import WallMaterialFilter from './components/WallMaterialFilter';
import WaterFilter from './components/WaterFilter';

interface CottagesFiltersProps {
  applyFilters: () => void;
}

const CottagesFilters = ({ applyFilters }: CottagesFiltersProps) => {
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
      houseType,
    },
    data: { houseTypes },
    updateFilters,
  } = useHousesAndLotsFilters();

  useEffect(() => {
    return () =>
      updateFilters({
        areaFrom: '',
        areaTo: '',
        livingAreaFrom: '',
        livingAreaTo: '',
        kitchenAreaFrom: '',
        kitchenAreaTo: '',
        wallMaterial: [],
        houseLevels: [],
        constructionYearFrom: '',
        constructionYearTo: '',
        readinessFrom: '',
        readinessTo: '',
        heating: [],
        gasSupply: '',
        electricity: [],
        water: [],
        sewerage: [],
        nearLake: false,
        plotAreaFrom: '',
        plotAreaTo: '',
        saleTerm: [],
        houseType: [],
      });
  }, []);

  return (
    <>
      <div className={clsx('flex', 'gap-8', 'justify-start', 'items-end')}>
        <Select
          options={houseTypes.map((item) => ({
            label: item,
            value: item,
          }))}
          isMulti
          label="Вид Объекта"
          onChange={(selected) => updateFilters({ houseType: selected })}
          values={houseType}
          wrapperClassName="basis-3/12 shrink"
        />
      </div>
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
      <Button className={clsx('mt-auto', 'self-center')} onClick={applyFilters}>
        Применить
      </Button>
    </>
  );
};

export default CottagesFilters;
