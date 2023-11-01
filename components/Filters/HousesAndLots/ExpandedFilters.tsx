import clsx from 'clsx';
import React from 'react';

import Button from '@/components/Button';
import CheckboxButton from '@/components/CheckboxButton';
import ExpandedFiltersWrapper from '@/components/Filters/ExpandedFiltersWrapper';
import AreaFilter from '@/components/Filters/components/AreaFilter';
import ConstructionYearFilter from '@/components/Filters/components/ConstructionYearFilter';
import KitchenAreaFilter from '@/components/Filters/components/KitchenAreaFilter';
import LivingAreaFilter from '@/components/Filters/components/LivingAreaFilter';
import PlotAreaFilter from '@/components/Filters/components/PlotAreaFilter';
import SaleTermFilter from '@/components/Filters/components/SaleTermFilter';
import Select from '@/components/Select';
import Switch from '@/components/Switch';
import {
  HousesAndLotsType,
  getRouteByHouseType,
  housesAndLotsTypeMap,
} from '@/enums/HousesAndLotsFilters';
import { useHousesAndLotsFilters } from '@/store/housesAndLotsFilters';

import ElectricityFilter from './components/ElectricityFilter';
import GasSupplyFilter from './components/GasSupplyFilter';
import HeatingFilter from './components/HeatingFilter';
import HouseLevelFilter from './components/HouseLevelFilter';
import ReadinessFilter from './components/ReadinessFilter';
import SewerageFilter from './components/SewerageFilter';
import WallMaterialFilter from './components/WallMaterialFilter';
import WaterFilter from './components/WaterFilter';

interface ExpandedFiltersProps {
  isModalOpen: boolean;
  closeModal: () => void;
  applyFilters: () => void;
}

const TypeChanger = () => {
  const {
    filters: { housesAndLotsType },
    updateFilters,
  } = useHousesAndLotsFilters();

  // TODO think to not rerender page while modal is open, but after apply
  return (
    <div className={clsx('flex', 'justify-between', 'items-center', 'gap-5', 'w-max')}>
      {Object.entries(housesAndLotsTypeMap).map(([key, value]) => (
        <CheckboxButton
          key={`houses-and-lots-type-changer-item-${key}-${value}`}
          isChecked={housesAndLotsType === value}
          onChange={(checked) => {
            updateFilters({ housesAndLotsType: value });
          }}
        >
          {value}
        </CheckboxButton>
      ))}
    </div>
  );
};

const PlotsFilters = ({ applyFilters }: Pick<ExpandedFiltersProps, 'applyFilters'>) => {
  const {
    filters: { gasSupply, electricity, water, sewerage, nearLake, plotAreaFrom, plotAreaTo },
    updateFilters,
  } = useHousesAndLotsFilters();

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

const DachiFilters = ({ applyFilters }: Pick<ExpandedFiltersProps, 'applyFilters'>) => {
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
    },
    updateFilters,
  } = useHousesAndLotsFilters();

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

const CottagesFilter = ({ applyFilters }: Pick<ExpandedFiltersProps, 'applyFilters'>) => {
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

const ExpandedFilters = ({ applyFilters, closeModal, isModalOpen }: ExpandedFiltersProps) => {
  const {
    filters: { housesAndLotsType },
  } = useHousesAndLotsFilters();

  const getFiltersByType = (type: string) => {
    switch (getRouteByHouseType(type)) {
      case HousesAndLotsType.Plots:
        return <PlotsFilters applyFilters={applyFilters} />;
      case HousesAndLotsType.Dachi:
        return <DachiFilters applyFilters={applyFilters} />;
      case HousesAndLotsType.Cottages:
        return <CottagesFilter applyFilters={applyFilters} />;
      default:
        return 'Выбери тип';
    }
  };

  return (
    <ExpandedFiltersWrapper closeModal={closeModal} isModalOpen={isModalOpen}>
      <TypeChanger />
      {getFiltersByType(housesAndLotsType)}
    </ExpandedFiltersWrapper>
  );
};

export default ExpandedFilters;
